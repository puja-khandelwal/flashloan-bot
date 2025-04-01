import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Container,
  Card,
  Button,
  Typography,
  Grid,
  makeStyles,
  Dialog,
  InputBase,
} from "@material-ui/core";
import StakeDialog from "./StakeDialog";
import moment from "moment";
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
import ConnectWallet from "src/component/ConnectWallet";
import NFTStakingABI from "src/ABI/NFTStakingABI.json";
import { useWeb3React } from "@web3-react/core";
import { UserContext } from "src/context/User";
import { getContract, getWeb3Obj, swichNetworkHandler } from "src/utils";
import GenerativeNFTABI from "src/ABI/GenerativeNFTABI.json";
import {
  ACTIVE_NETWORK,
  NftContractAddress,
  NftStakingAddress,
} from "src/constants";
import { useLocation } from "react-router-dom";
import ButtonCircularProgress from "./ButtonCircularProgress";
import axios from "axios";
import ApiConfig from "src/config/APICongig";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  cardBox: {
    border: "1px solid #5b33b842",
    padding: "15px",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    boxShadow: "0px 0px 53px rgb(0 0 0 / 25%)",
    transition: "0.5s",
    borderRadius: "5px",
    backdropFilter: "blur(5px)",
    "&:hover": {
      transform: "translateY(-10px)",
    },
  },
  cont: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogBox: {
    position: "relative",
    overflow: "hidden",
    border: "2px solid #1eb808",
    background: "#131313",
  },
  inputFeild: {
    border: "1px solid #1EB808",
    padding: "5px",
    color: "#fff",
    borderRadius: "5px",
    marginTop: "5px",
    "& svg": {
      color: "#1eb808",
      fontSize: "16px",
    },
  },
  padd: {
    padding: "20px",
  },
  dialogBoxText: {
    margin: "18px 0",
    [theme.breakpoints.down("md")]: {
      margin: "14px 0",
    },
    "& span": {
      color: "#1EB808",
      fontWeight: "bold",
    },
  },
  mainimg: {
    width: "100%",
    height: "auto !important",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "5px",
    backgroundColor: "#ccc !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: "-1",
    [theme.breakpoints.only("xs")]: {
      height: "330px !important",
    },
  },
  imgBox: {
    width: "100%",
    height: "250px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      width: "auto",
      maxWidth: "100%",
      maxHeight: "327px",
    },
  },
}));

export default function Stake({ data, type, index, NFTList }) {
  const updateDimensions = () => {
    var offsetWidth = document.getElementById("imagecard" + index).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + index).style.height =
      newoofsetWidth + "px";
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const { account, chainId, library } = useWeb3React();
  const user = useContext(UserContext);
  const location = useLocation();
  const [isUploading, setIsUploading] = useState(false);
  const [openConnectWallet, setOpenConnectWallet] = useState(false);
  const [expectedEarning, setExpectedEarning] = useState();
  const [formData, setFormData] = useState({
    fromDate: moment().format("YYYY-MM-DDTHH:mm"),
    toDate: moment().format("YYYY-MM-DDTHH:mm"),
  });
  const _onInputChangeById = (value, id) => {
    const temp = { ...formData, [id]: value };
    setFormData(temp);
    // setIsApproved(false);
  };
  useEffect(() => {
    nftStakingFunctions();
  }, []);
  useEffect(() => {
    nftStakingFunctions();
  }, [formData.toDate]);
  const nftStakingFunctions = async () => {
    if (chainId === ACTIVE_NETWORK) {
      try {
        const dateTo = moment(formData.toDate).unix();
        const dateFrom = moment(formData.fromDate).unix();
        const differenceDate = dateTo - dateFrom;
        const contract = getContract(
          NftStakingAddress,
          NFTStakingABI,
          library,
          account
        );
        const web3 = await getWeb3Obj();
        const emissionPerDay = await contract.emissionPerDay();
        const emissionPerDayNumber = web3.utils.fromWei(
          emissionPerDay.toString()
        );
        setExpectedEarning(
          (differenceDate * Number(emissionPerDayNumber)) / 86400
        );
      } catch (error) {
        console.log("ERROR", error);
      }
    } else {
      swichNetworkHandler();
    }
  };

  const nftStakeHandler = async () => {
    if (chainId === ACTIVE_NETWORK) {
      // console.log(data.tokenId, "tokenId");
      // console.log("fromDate", moment(formData.fromDate).format("lll"));
      // console.log("toDate", moment(formData.toDate).format("lll"));
      // console.log("expectedEarning", expectedEarning);
      try {
        setIsUploading(true);
        const contract = getContract(
          NftStakingAddress,
          NFTStakingABI,
          library,
          account
        );
        const contractGenerativeNFT = getContract(
          NftContractAddress,
          GenerativeNFTABI,
          library,
          account
        );
        // console.log(
        //   data,
        //   "contractGenerativeNFT========>>>>>>>>>",
        //   contractGenerativeNFT
        // );
        // console.log(data.tokenId, "contract========>>>>>>>>>", contract);
        const web3 = await getWeb3Obj();
        const tokenURI = await contractGenerativeNFT.tokenURI(data.tokenId);
        const approved = await contractGenerativeNFT.approve(
          NftStakingAddress,
          data.tokenId
        );
        await approved.wait();
        // console.log("tokenURI========>>>>>>>>>", tokenURI);
        await fetch(tokenURI).then(async (response) => {
          const dataResult = await response.json();

          console.log(dataResult);
        });
        const stakeNFT = await contract.stakeNFT(data.tokenId);
        await stakeNFT.wait();
        StakeAPI(data);
        console.log("stakeNFT========>>>>>>>>>", stakeNFT);

        setIsUploading(false);
      } catch (error) {
        // StakeAPI(data);
        setIsUploading(false);
        // toast.error(error.data.message);
        console.log("ERROR", error);
      }
    } else {
      swichNetworkHandler();
    }
  };
  const StakeAPI = async (data) => {
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.stakeNFT,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          fromDate: moment(formData.fromDate).format("lll"),
          toDate: moment(formData.toDate).format("lll"),
          nftId: data._id,
          expectedEarning: expectedEarning,
        },
      });

      if (res.data.statusCode === 200) {
        // toast.success(
        //   "Your NFT has been minted successfully"
        // );
        NFTList();
        handleClose();
        toast.success(`NFT staked`);
      } else {
        // toast.warn(res.data.responseMessage);
      }
    } catch (error) {}
  };
  return (
    <>
      <Card className={classes.cardBox}>
        <Box className={classes.imgBox}>
          <img src={data.coverImage} alt=" " width="100%" />
        </Box>
        <Grid container spacing={2}>
          <Grid item lg={12} xs={12} align="center">
            <Box align="center" mt={2}>
              <Typography variant="h6" style={{ textAlign: "center" }}>
                {data.tokenName}
              </Typography>
            </Box>

            <Box align="center" mt={2}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleClickOpen}
                style={{ width: "calc(100% - 49px)" }}
              >
                STAKE
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>

      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Box className={classes.dialogBox}>
          <Grid container spacing={5} style={{ alignItems: "center" }}>
            <Grid item xs={12} sm={6} md={6} lg={6} style={{ padding: "0px" }}>
              <Box
                className={classes.mainimg}
                style={{
                  background: `url(${data.coverImage})`,
                }}
              >
                <img src={data.coverImage} width="100%" alt={data.tokenName} />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box className="padd" pb={2}>
                <Typography variant="h6">{data.tokenName}</Typography>
                <Box mt={1}>
                  <Typography variant="body1" style={{ fontSize: "13px" }}>
                    From
                  </Typography>
                  <KeyboardDateTimePicker
                    className={classes.inputFeild}
                    ampm={false}
                    value={formData.fromDate}
                    onChange={(date) => _onInputChangeById(date, "fromDate")}
                    onError={console.log}
                    disabled
                    format="YYYY/MM/DD"
                  />
                </Box>
                <Box mt={2}>
                  <Typography variant="body1" style={{ fontSize: "13px" }}>
                    TO
                  </Typography>
                  <KeyboardDateTimePicker
                    className={classes.inputFeild}
                    ampm={false}
                    value={formData.toDate}
                    onChange={(date) => _onInputChangeById(date, "toDate")}
                    onError={console.log}
                    disablePast
                    minDate={moment(formData.fromDate).format(
                      "YYYY-MM-DD HH:mm"
                    )}
                    format="YYYY-MM-DD HH:mm"
                  />
                </Box>
                <Box className={classes.dialogBoxText}>
                  <Typography
                    variant="body2"
                    style={{ fontSize: "14px", fontWeight: "200" }}
                  >
                    EXPECTED EARNING &nbsp;&nbsp;{" "}
                    <span style={{}}>
                      {parseFloat(expectedEarning).toFixed(6)} &nbsp; MSTEP
                    </span>
                  </Typography>
                </Box>

                <Button
                  onClick={nftStakeHandler}
                  disabled={isUploading || expectedEarning < 0}
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  style={{ maxWidth: "239px" }}
                >
                  Stake {isUploading && <ButtonCircularProgress />}
                  {/* disabled{movement()unix() >
                  moment(-).unix()} */}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
}
