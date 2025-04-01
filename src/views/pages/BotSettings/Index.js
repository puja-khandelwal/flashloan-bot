import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  makeStyles,
  Box,
  Typography,
  Paper,
  Button,
  FormHelperText,
  Dialog,
  Grid,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Radio,
} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Page from "src/component/Page";
import axios from "axios";
import ApiConfig, { socketURL } from "src/config/APICongig";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { BiChevronDown, BiChevronLeft } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import {
  ArbitrageContract,
  fromWeiDecimals,
  getContract,
  getWeb3Obj,
} from "src/utils";
import ERC20ABI from "src/ABI/IERC20ABI.json";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import WalletConnectModal from "src/component/ConnectWallet/WalletConnectModal";
import { UserContext } from "src/context/User";
import { TokenAddressToUsed } from "src/constants";
const useStyles = makeStyles((theme) => ({
  paperBox: {
    padding: "30px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px",
    },
  },
  textheadBox: {
    paddingBottom: "9px",
    borderBottom: "1px solid #80808052",
    "& h2": {
      fontSize: "40px",
      color: "rgb(243, 109, 54)",
    },
  },
  root: {
    marginTop: "16px",
    "& .MuiFormHelperText": {
      marginTop: "0",
      marginBottom: "5px",
      textAlign: "end",
    },
  },
  mainBox: {
    "& h5": {
      color: "rgba(0, 0, 0, 1)",
      fontWeight: "400",
    },
  },
  boatlimitBox: {
    marginTop: "20px",
    "& h5": {
      color: "rgba(0, 0, 0, 1)",
    },
  },
  simple: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    [theme.breakpoints.down("md")]: {
      padding: "10px",
      flexWrap: "wrap",
    },
    "& div": {
      display: "flex",
      alignItems: "center",
      // justifyContent: "space-between",
      "& h6": {
        color: " rgba(61, 61, 61, 1)",
        fontSize: "15px",
        marginLeft: "-4px",
      },
    },
  },
  connetwallet: {
    marginTop: "10px",
    fontWeight: 500,
    minWidth: "200px",
  },
  connetwallet12: {
    marginTop: "10px",
    fontWeight: 500,
    cursor: "no-drop",
    background: "#3f4a51 !important",
    border: "1px solid #3f4a51 !important",
  },
  Arbitrage: {
    borderRadius: "10px",
    backgroundColor: "#fff",
    border: "1px solid rgba(243, 109, 54, 1)",
    "& .MuiSwitch-switchBase": {
      color: "#fff",
    },
    "& .MuiIconButton-root": {
      color: "rgba(243, 109, 54, 1) !important",
    },
  },

  fifteen: {
    backgroundColor: "#ffffff",
    cursor: "pointer",
    zIndex: "9",
    width: "90px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    "& h6": {
      lineHeight: "35px",
      color: "rgba(0, 0, 0, 1)",
    },
    "& input": {
      backgroundColor: "transparent",
      border: "none",
      color: "#000000",
      fontWeight: 500,
      textAlign: "center",
      width: "100%",
      fontSize: "14px",
      lineHeight: "30px",
      "&:focus-visible": {
        outline: "none !important",
      },
    },
  },

  selectHover: {
    border: "1px solid #0f212e",
    cursor: "pointer",
    "&:hover": {
      border: "1px solid #fafafa",
    },
  },
  icons: {
    position: "absolute",
    left: "0px",
    top: "12px",
    color: "rgba(0, 0, 0, 1)",
  },
  imagebox: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    borderRadius: "8px",
    justifyContent: "center",
    padding: "10px",
    "& p": {
      marginLeft: "8px",
      color: "rgba(0, 0, 0, 1)",
    },
  },
  heading: {
    marginLeft: "25px",
  },
  dialogbox: {
    position: "relative",
    padding: "20px",
    maxHeight: "95%",
    [theme.breakpoints.down("sm")]: {
      overflowY: "auto",
    },
  },
}));
const detailscard = [
  {
    image: "images/image3.png",
    heading: "Ethereum",
    discription: "ETH",
    number: "12",
  },
  {
    image: "images/imageT.png",
    heading: "USD Coin",
    discription: "USDT",
    number: "10",
  },
  {
    image: "images/imageS.png",
    heading: "Dai Stablecoin",
    discription: "DAI",
    number: "11",
  },
  {
    image: "images/imageD.png",
    heading: "Tether USD",
    discription: "USD",
    number: "13",
  },
  {
    image: "images/imageS.png",
    heading: "USDT Coin",
    discription: "USDT",
    number: "13",
  },
];

function Index() {
  const classes = useStyles();
  const history = useHistory();
  const { activate, account, chainId, library, deactivate } = useWeb3React();
  const user = useContext(UserContext); // onClick={user.connectWallet}
  const [loader, setLoader] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const [approveLoader, setApproveLoader] = useState(false);
  const [expectProfit, setexpectProfit] = useState("");
  const [price1, setprice1] = useState("");
  const [transactionLimit, setTransactionLimit] = useState("");
  const [tokenList, setTokenList] = useState([]);
  const [tokenName, settokenName] = useState("");
  const [myBalance, setmyBalance] = useState("");
  const [openWallect, setOpenWallect] = useState(false);
  const [tokenAllowanceTF, settokenAllowanceTF] = useState(false);
  const [AppTF, setAppTF] = useState(false);
  const [state, setState] = useState({
    simpleArb: false,
    triangularArb: false,
    flashLoan: false,
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSelect = (data) => {
    setOpen(false);
    settokenName(data);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const listToken = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.listToken,
      });
      if (res.data.responseCode == 200) {
        setLoader(false);
        console.log(res.data.result);
        setTokenList(res.data.result);
      }
    } catch (error) {
      setLoader(false);
      console.log("error", error);
    }
  };
  useEffect(() => {
    listToken();
  }, []);
  const AddAutoTradingArbitrage = async () => {
    setIsSubmit(true);
    if (
      transactionLimit != "" &&
      transactionLimit > 0 &&
      expectProfit != "" &&
      expectProfit > 0 &&
      price1 != "" &&
      price1 > 0 &&
      tokenName != ""
    ) {
      try {
        setLoader(true);
        const res = await axios({
          method: "POST",
          url: ApiConfig.addAutoTradingArbitrage,
          headers: {
            token:
              sessionStorage.getItem("token") ||
              localStorage.getItem("creatturAccessToken"),
          },
          data: {
            tradeCount: transactionLimit,
            expectProfit: expectProfit,
            price: price1,
            tokenName: tokenName.tokenName,
            arbitrageTriangular: state.triangularArb,
            arbitrageSimple: state.simpleArb,
            arbitrageFlashLon: state.flashLoan,
          },
        });
        if (res.data.responseCode == 200) {
          setLoader(false);
          setIsSubmit(false);
          setTransactionLimit("");
          setprice1("");
          settokenName("");
          setexpectProfit("");
          toast.success(
            `${res.data.responseMessage} for ${
              state.triangularArb ? "Triagular Arbitrage" : ""
            } ${state.simpleArb ? "Simple Arbitrage" : ""} ${
              state.flashLoan ? "Flash Loan" : ""
            }`
          );
          console.log(res.data);
          // setexecutionsList(res.data.result);
          // setexecutionsList1(res.data.result.docs);
        }
      } catch (error) {
        setLoader(false);
        console.log("error", error);
      }
    }
  };

  const approveToken = async () => {
    try {
      setApproveLoader(true);
      const web3 = await getWeb3Obj();
      const TokenAddress = TokenAddressToUsed.filter(
        (data12) => data12.heading == tokenName.tokenName
      )[0];
      const myContract = getContract(
        TokenAddress.token,
        ERC20ABI,
        library,
        account
      );
      console.log("myContract", myContract);
      let allowance = await myContract.allowance(account, ArbitrageContract);
      setAppTF(true);
      if (Number(allowance) < Number(web3.utils.toWei(price1, "gwei"))) {
        const allowance = await myContract.approve(
          ArbitrageContract,
          web3.utils.toWei(price1),
          {
            from: account,
            gasPrice: "50000000000",
            gasLimit: web3.utils.toHex("300000"),
          }
        );
        await allowance.wait();
        CheckmaxApproval();
        toast.success(
          <span
            style={{ color: "#fff" }}
          >{`${TokenAddress.heading} is approved`}</span>
        );
        setApproveLoader(false);
      } else {
        toast.success(
          <span
            style={{ color: "#fff" }}
          >{`${TokenAddress.heading} is already approved`}</span>
        );
        setApproveLoader(false);
      }
    } catch (err) {
      setApproveLoader(false);
      toast.error(
        <span className={classes.toastStyl}>
          {err.message.split(":")[err.message.split(":").length - 1]}
        </span>
      );
      console.log(err.message.slice(":")[err.message.slice(":").length - 1]);
    }
  };

  const CheckmaxApproval = async () => {
    try {
      // setApproveLoader(true);
      // console.log("--------data-------", data);
      const web3 = await getWeb3Obj();
      const aTokenAddress = TokenAddressToUsed.filter(
        (data12) => data12.heading == tokenName.tokenName
      )[0];
      // console.log("aTokenAddress===>>", aTokenAddress.token);
      const myContract = getContract(
        aTokenAddress.token,
        ERC20ABI,
        library,
        account
      );

      let allowance = await myContract.allowance(account, ArbitrageContract);
      let getBalanceOf = await myContract.balanceOf(account);
      let deciamls = await myContract.decimals();
      setmyBalance(fromWeiDecimals(getBalanceOf.toString(), deciamls));
      setAppTF(true);
      if (
        Number(allowance) < Number(web3.utils.toWei(price1.toString(), "gwei"))
      ) {
        // settokenAllowance(Number(allowance));  for Zero
        console.log("ALLOWANCE FAIL OR SUCCESS", allowance);
        settokenAllowanceTF(false);
      } else {
        console.log("ALLOWANCE FAIL OR SUCCESS", allowance);
        // settokenAllowance(Number(allowance));
        settokenAllowanceTF(true);
      }
    } catch (err) {
      settokenAllowanceTF(false);
      console.log(err.message);
    }
  };
  useEffect(() => {
    if ((tokenName.tokenName, price1)) {
      CheckmaxApproval();
    }
  }, [tokenName.tokenName, price1]);
  const HandleWalletModal = () => {
    setOpenWallect(true);
    user.connectWallet();
  };
  const CloseWalletModal = () => {
    setOpenWallect(false);
  };

  return (
    <Page title="Bot Setting">
      <Paper elevation={2} className={classes.paperBox}>
        <Box className={classes.textheadBox}>
          <Box className="displayStart">
            <img
              onClick={() => history.goBack("/")}
              src="/images/arrowback.svg"
              width="35px"
              style={{ cursor: "pointer" }}
            />
            &nbsp;&nbsp;
            <Typography variant="h2" style={{ color: "rgba(243, 109, 54, 1)" }}>
              Trade Settings
            </Typography>
          </Box>
        </Box>
        {openWallect && (
          <WalletConnectModal
            open={openWallect}
            handleClose={CloseWalletModal}
          />
        )}
        <Grid container spacing={0}>
          <Grid item lg={6} md={6} sm={12} xs={12} align="center">
            <Box className={classes.mainBox} mt={3} align="left">
              <Typography variant="h5" style={{ color: "rgba(61, 61, 61, 1)" }}>
                Arbitrage Strategy
              </Typography>
              <Box className={classes.Arbitrage} mt={2}>
                <Box className={classes.simple}>
                  <Box display="flex" alignItems="center">
                    <Radio
                      checked={state.simpleArb}
                      onChange={handleChange}
                      name="simpleArb"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                    <Typography variant="h6">Simple Arbitrage</Typography>
                  </Box>

                  <Box display="flex" alignItems="center">
                    <Radio
                      checked={state.triangularArb}
                      onChange={handleChange}
                      name="triangularArb"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <Typography variant="h6">Triagular Arbitrage</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Radio
                      checked={state.flashLoan}
                      onChange={handleChange}
                      name="flashLoan"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                    <Typography variant="h6">Flash Loan</Typography>
                  </Box>
                </Box>
              </Box>

              {(state.simpleArb || state.triangularArb || state.flashLoan) && (
                <Box className={classes.boatlimitBox}>
                  <Typography
                    variant="h5"
                    style={{ color: "rgba(61, 61, 61, 1)" }}
                  >
                    Bot Limit
                  </Typography>
                  <Paper
                    elevation={2}
                    style={{ padding: "20px", marginBottom: "10px" }}
                  >
                    <Box
                      style={{
                        justifyContent: "start",
                        background: "transparent",
                        padding: "0px",
                      }}
                    >
                      <Box
                        className={classes.simple}
                        style={{
                          justifyContent: "start",
                          padding: "0px",
                        }}
                      >
                        <Box
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            width: "100%",
                          }}
                        >
                          <Typography
                            variant="h6"
                            style={{ whiteSpace: "pre" }}
                          >
                            Min Profit:
                          </Typography>
                          <Box
                            className={`numberTextField ${classes.fifteen}`}
                            style={{
                              background: "rgba(61, 61, 61, 0.1)",
                              width: "100%",
                              padding: "9px",
                              marginLeft: "20px",
                            }}
                          >
                            <input
                              type="number"
                              placeholder="15"
                              onChange={(e) =>
                                setTransactionLimit(e.target.value)
                              }
                              value={transactionLimit}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <FormHelperText
                        error
                        style={{
                          textAlign: "end",
                          marginTop: "0",
                          marginBottom: "5px",
                        }}
                      >
                        {transactionLimit == "" &&
                          isSubmit &&
                          "Transaction limit is required field"}
                        {transactionLimit <= 0 &&
                          isSubmit &&
                          "Transaction limit must be greater than 0"}
                      </FormHelperText>
                    </Box>
                  </Paper>
                  <Paper
                    elevation={2}
                    style={{ padding: "20px", marginBottom: "10px" }}
                  >
                    <Box
                      style={{
                        justifyContent: "start",
                        background: "transparent",
                        padding: "0px",
                      }}
                    >
                      <Box
                        className={classes.simple}
                        style={{
                          justifyContent: "start",
                          padding: "0px",
                        }}
                      >
                        <Box
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            width: "100%",
                          }}
                        >
                          <Typography
                            variant="h6"
                            style={{ whiteSpace: "pre" }}
                          >
                            Currency:
                          </Typography>
                          <Box
                            className={`numberTextField ${classes.fifteen}`}
                            style={{
                              background: "rgba(61, 61, 61, 0.1)",
                              width: "100%",
                              padding: "9px",
                              marginLeft: "20px",
                            }}
                          >
                            <input
                              type="number"
                              placeholder="500"
                              onChange={(e) => setprice1(e.target.value)}
                              value={price1}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <FormHelperText
                        error
                        style={{
                          textAlign: "end",
                          marginTop: "0",
                          marginBottom: "5px",
                        }}
                      >
                        {price1 == "" &&
                          isSubmit &&
                          "Max investment is required field"}
                        {price1 <= 0 &&
                          isSubmit &&
                          "Max investment must be greater than 0"}
                      </FormHelperText>
                    </Box>
                  </Paper>
                  <Paper
                    elevation={2}
                    style={{ padding: "20px", marginBottom: "10px" }}
                  >
                    <Box
                      style={{
                        justifyContent: "start",
                        background: "transparent",
                        padding: "0px",
                      }}
                    >
                      <Box
                        className={classes.simple}
                        style={{
                          justifyContent: "start",
                          padding: "0px",
                        }}
                      >
                        <Box
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            width: "100%",
                          }}
                        >
                          <Typography
                            variant="h6"
                            style={{ whiteSpace: "pre" }}
                          >
                            Expect Profit :{" "}
                          </Typography>
                          <Box
                            className={`numberTextField ${classes.fifteen}`}
                            style={{
                              background: "rgba(61, 61, 61, 0.1)",
                              width: "100%",
                              padding: "9px",
                              marginLeft: "20px",
                            }}
                          >
                            <input
                              type="number"
                              placeholder="100"
                              onChange={(e) => setexpectProfit(e.target.value)}
                              value={expectProfit}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <FormHelperText
                        error
                        style={{
                          textAlign: "end",
                          marginTop: "0",
                          marginBottom: "5px",
                        }}
                      >
                        {expectProfit == "" &&
                          isSubmit &&
                          "Expect profit is required field"}
                        {expectProfit <= 0 &&
                          isSubmit &&
                          "Expect profit limit must be greater than 0"}
                      </FormHelperText>
                    </Box>
                  </Paper>
                  <Paper elevation={2} style={{ padding: "20px" }}>
                    <Box
                      style={{
                        justifyContent: "start",
                        background: "transparent",
                        padding: "0px",
                      }}
                    >
                      <Box
                        className={classes.simple}
                        style={{
                          justifyContent: "start",
                          padding: "0px",
                        }}
                      >
                        <Box
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            width: "100%",
                          }}
                        >
                          <Typography
                            variant="h6"
                            style={{ whiteSpace: "pre" }}
                          >
                            Token Name :{" "}
                          </Typography>
                          <Box
                            className={`numberTextField ${classes.fifteen}`}
                            style={{
                              background: "rgba(61, 61, 61, 0.1)",
                              width: "100%",
                              padding: "9px",
                              marginLeft: "20px",
                            }}
                            onClick={() => handleClickOpen()}
                          >
                            <input
                              style={{ cursor: "pointer" }}
                              // type="number"
                              placeholder="select"
                              // onChange={(e) => settokenName(e.target.value)}
                              disabled
                              value={tokenName.tokenName}
                            />
                            {/* <Box className={classes.iconBox}> */}
                            <BiChevronDown
                              style={{
                                width: "30px",
                                height: "30px",
                                cursor: "pointer",
                              }}
                              // onClick={handleClickOpenBuy}
                              onClick={() => handleClickOpen()}
                            />
                            {/* </Box> */}
                          </Box>
                        </Box>
                      </Box>
                      <FormHelperText
                        error
                        style={{
                          textAlign: "end",
                          marginTop: "0",
                          marginBottom: "5px",
                        }}
                      >
                        {tokenName == "" &&
                          isSubmit &&
                          "Token name is required field"}
                      </FormHelperText>
                    </Box>
                  </Paper>
                </Box>
              )}

              {account ? (
                <Box mt={4} align="center">
                  {!tokenAllowanceTF ? (
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={() => {
                        if (!approveLoader && AppTF) {
                          approveToken();
                        }
                      }}
                      className={
                        !approveLoader && AppTF
                          ? classes.connetwallet
                          : classes.connetwallet13
                      }
                      // disabled={approveLoader || !AppTF}
                    >
                      Allow Protocal to use your {tokenName.tokenName}{" "}
                      {approveLoader && <ButtonCircularProgress />}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        if (!loader) {
                          AddAutoTradingArbitrage();
                        }
                      }}
                      // disabled={loader}
                      className={
                        !loader ? classes.connetwallet : classes.connetwallet12
                      }
                    >
                      SAVE {loader && <ButtonCircularProgress />}
                    </Button>
                  )}
                </Box>
              ) : (
                <Box mt={2} align="left">
                  <Button
                    variant="contained"
                    color="primary"
                    // fullWidth
                    className={classes.connetwallet}
                    // onClick={user.connectWallet}
                    // onClick={HandleWalletModal}
                  >
                    SAVE
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>{" "}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <Box className={classes.dialogbox}>
            <IconButton className={classes.icons} onClick={handleClose}>
              <BiChevronLeft />
            </IconButton>
            <DialogTitle>
              <Typography variant="h6" align="center">
                Select a token
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Box>
                  {/* <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      name="firstName"
                      size="small"
                      fullWidth="true"
                      placeholder="Search by name"
                      className={classes.textfield}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton style={{ fontSize: "17px" }}>
                              <BsSearch />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl> */}
                </Box>
                {/* <Box mt={2}>
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={3} sm={3} xs={6}>
                      <Box className={classes.imagebox}>
                        <img src="./images/image1.png" />
                        <Typography variant="body1">ETH</Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={6}>
                      <Box className={classes.imagebox}>
                        <img src="./images/image1.png" />
                        <Typography variant="body1">USDT</Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={6}>
                      <Box className={classes.imagebox}>
                        <img src="./images/image1.png" />
                        <Typography variant="body1">USD</Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={6}>
                      <Box className={classes.imagebox}>
                        <img src="./images/image1.png" />
                        <Typography variant="body1">DAI</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box> */}
                <Box mt={2}>
                  <Grid container spacing={1}>
                    {tokenList &&
                      tokenList?.map((data, i) => {
                        return (
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Grid container className={classes.selectHover}>
                              <Grid item lg={6} md={6} sm={6} xs={6}>
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  onClick={(e) => handleSelect(data)}
                                  // className={classes.selectHover}
                                >
                                  <img
                                    src={
                                      detailscard.filter(
                                        (data1) =>
                                          data1.heading == data.tokenName
                                      )[0]?.image
                                    }
                                    style={{ width: "30px" }}
                                  />

                                  <Box className={classes.heading}>
                                    <Typography variant="body2">
                                      {" "}
                                      {data.tokenName}
                                    </Typography>
                                    <Typography variant="body1">
                                      {
                                        detailscard.filter(
                                          (data1) =>
                                            data1.heading == data.tokenName
                                        )[0]?.discription
                                      }
                                    </Typography>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                lg={6}
                                md={6}
                                sm={6}
                                xs={6}
                                align="right"
                              >
                                <Typography
                                  variant="body1"
                                  style={{ paddingTop: "10px" }}
                                >
                                  {data.number}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      })}
                  </Grid>
                </Box>
              </DialogContentText>
            </DialogContent>
          </Box>
        </Dialog>
      </Paper>
    </Page>
  );
}

export default Index;
