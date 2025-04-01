import React, { useState } from "react";
import {
  Box,
  Container,
  Card,
  Button,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";
import moment from "moment";
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
    backdropFilter: "blur(5px)",
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #5b33b842",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    boxShadow: "0px 0px 53px rgba(0, 0, 0, 0.25)",
    transition: "0.5s",
    "&:hover": {
      transform: "translateY(-10px)",
    },
    "& p": {
      fontSize: "12px",
      marginTop: "-11px",
    },
  },
  imgBox: {},
  cont: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
}));

export default function Stake({ data, NFTList }) {
  const classes = useStyles();
  const { account, chainId, library } = useWeb3React();
  const [isUploading, setIsUploading] = useState(false);

  const nftUnstakeHandler = async () => {
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
        console.log(
          data,
          "contractGenerativeNFT========>>>>>>>>>",
          contractGenerativeNFT
        );
        console.log(data.tokenId, "contract========>>>>>>>>>", contract);
        const web3 = await getWeb3Obj();
        const tokenURI = await contractGenerativeNFT.tokenURI(
          data.nftId.tokenId
        );
        // const approved = await contractGenerativeNFT.approve(
        //   NftStakingAddress,
        //   data.tokenId
        // );
        // await approved.wait();
        console.log("tokenURI========>>>>>>>>>", tokenURI);
        await fetch(tokenURI).then(async (response) => {
          const dataResult = await response.json();

          console.log(dataResult);
        });
        const stakeNFT = await contract.unStakeNFT(data.nftId.tokenId);
        await stakeNFT.wait();
        UnStakeAPI(data);
        console.log("stakeNFT========>>>>>>>>>", stakeNFT);

        setIsUploading(false);
      } catch (error) {
        // UnStakeAPI(data);
        setIsUploading(false);
        console.log("ERROR", error);
        // toast.error(error.data.message);
      }
    } else {
      swichNetworkHandler();
    }
  };
  const UnStakeAPI = async (data) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: ApiConfig.unstakeNFT,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          // fromDate: moment(formData.fromDate).format("L"),
          // toDate: moment(formData.toDate).format("L"),
          nftId: data.nftId._id,

          // expectedEarning: expectedEarning,
        },
      });

      if (res.data.statusCode === 200) {
        // toast.success(
        //   "Your NFT has been minted successfully"
        // );
        NFTList();
        toast.success(`NFT Unstaked`);
      } else {
        // toast.warn(res.data.responseMessage);
      }
    } catch (error) {}
  };
  return (
    <Card className={classes.cardBox}>
      <Box className={classes.imgBox}>
        <img src={data.nftId.coverImage} alt=" " width="100%" />
      </Box>
      <Box className={classes.cont} mb={2} mt={2}>
        <Typography variant="h6">{data.nftId.tokenName}</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item lg={6} xs={6}>
          <Typography variant="body1">Stake on</Typography>
        </Grid>
        <Grid item lg={6} xs={6} align="right">
          <Typography variant="body1">
            {moment(data.fromDate).format("L")}
          </Typography>
        </Grid>
        <Grid item lg={6} xs={6}>
          <Typography variant="body1">Stake upto</Typography>
        </Grid>
        <Grid item lg={6} xs={6} align="right">
          <Typography variant="body1">
            {moment(data.toDate).format("lll")}
          </Typography>
        </Grid>
        <Grid item lg={6} xs={6}>
          <Typography variant="body1">Expected Earning</Typography>
        </Grid>
        <Grid item lg={6} xs={6} align="right">
          <Typography variant="body1" style={{ color: "#1EB808" }}>
            {parseFloat(data.expectedEarning).toFixed(6)}
          </Typography>
        </Grid>
      </Grid>

      <Box align="center" mt={2}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          style={{ width: "calc(100% - 49px)" }}
          onClick={nftUnstakeHandler}
          disabled={
            isUploading || moment(data.toDate).unix() >= moment().unix()
          }
        >
          Unstake {isUploading && <ButtonCircularProgress />}
        </Button>
      </Box>
    </Card>
  );
}
