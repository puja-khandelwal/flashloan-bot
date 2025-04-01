import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
  Paper,
  Divider,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { BsFillCalculatorFill } from "react-icons/bs";
import CrossExchangeModalComponent from "./CrossExchangeModalComponent";
import ArbitrageABI from "src/ABI/ArbitrageABI.json";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import axios from "axios";
import ApiConfig from "src/config/APICongig";
import {
  UniswapRouter,
  ShibaswapRouter,
  ShushiswapRouter,
  getWeb3Obj,
  getWeb3ContractObject,
  getContract,
  ZeroAddress,
  fromWeiDecimals,
  ArbitrageContract,
  UniswapFactory,
  ShibaswapFactory,
  ShushiswapFactory,
  SwapExchange,
  APITokenPriceHandler,
} from "src/utils";
import { TokenAddressToUsed } from "src/constants";
import { toast } from "react-toastify";
import FactoryABI from "src/ABI/FactoryABI.json";
import RegistrationABI from "src/ABI/RegistrationABI.json";
import Exchange from "../Home/Exchange";
import CrossExchangeModalComponentCalculator from "./CrossExchangeModalComponentCalculator";
// import { ShibaswapRouter } from "../../../utils/index";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "15px",
    position: "relative",
    zIndex: "9",
    overflow: "hidden",
    "& .MuiDialog-paper": {
      padding: "0px !important",
    },
    "& .sqaureimage": {
      width: "auto",
      height: "24px",
      maxWidth: "100%",
      top: "0",
      left: "0",
      position: "absolute",
    },
    "& .calenderBox": {
      border: "1px solid #EEEEEE",
      background: "transparent !important",
      color: "#A0A0A0",
      boxShadow: "none",
    },
  },
  coinBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& figure": {
      margin: "0px",
      height: "30px",
      width: "30px",
      borderRadius: "50%",
      "& img": {
        minWidth: "100%",
        maxWidth: "100%",
      },
    },
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "column",
    "& h6": {
      color: "#262626",
      fontSize: "16px",
      fontWeight: "400",
    },
    "& span": {
      color: "#262626",
      fontSize: "13px",
      fontWeight: "400",
    },
  },
  contentBox: {
    color: "#fff",
    width: "100%",
    padding: "4px 0px",
    background: "#A08AA1",
    borderRadius: "10px",
    margin: "10px 0",
    "& p": {
      color: "#fff !important",
      fontWeight: "500",
      fontSize: "14px",
    },
  },
  utctext: {
    background: "#eeeeee",
    borderRadius: "100px",
    padding: "10px",
    "& p": {
      fontSize: "14px",
      color: "#262626 !important",
      fontWeight: "500",
    },
  },
  arrowright: {
    color: "rgb(8, 86, 204)",
  },
  exchange: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const crossExchangeData = [
  {
    name: "From Factory (PanckakeSwap v2):",
    address: "0xcA143Ce32Fe78f1f7019d551a6402fc5350c73",
  },
  {
    name: "From Router (ApeSwap V2):",
    address: "0xcA143Ce32Fe78f1f7019d551a6402fc5350c73",
  },
  {
    name: "To Factory (ApeSwap V2):",
    address: "0xcA143Ce32Fe78f1f7019d551a6402fc5350c73",
  },

  {
    name: "Token A (WBNB):",
    address: "0xcA143Ce32Fe78f1f7019d551a6402fc5350c73",
  },
  {
    name: "Token B (NAUT):",
    address: "0xcA143Ce32Fe78f1f7019d551a6402fc5350c73",
  },
  // {
  //   name: "Amount Input (Input USD Value)",
  //   address: "10",
  // },
];

function CompairCrossExchangeCard1(props) {
  const classes = useStyles();
  const { data, index } = props;
  // console.log("----cross-exchange----- <<<--- Swap --->>>");
  console.log("----cross-exchange----- <<<--- Swap --->>> 123", data);
  const { activate, account, chainId, library, deactivate } = useWeb3React();
  const [exchangeModalOpen, setExchangeModalOpen] = useState(false);
  const [calculatorModalOpen, setcalculatorModalOpen] = useState(false);
  const [arbitrageLoader, setArbitrageLoader] = useState(false);
  const [transHash, settransHash] = useState(false);
  const [flashLoan, setFlashLoan] = useState(false);

  const [tokens1, setTokens1] = useState(0);
  const [tokens2, setTokens2] = useState(0);
  const [tokens3, setTokens3] = useState(0);
  const [tokens4, setTokens4] = useState(0);
  const exchangeModalClose = () => {
    setExchangeModalOpen(false);
  };
  const calculatorModalClose = () => {
    setcalculatorModalOpen(false);
  };

  // console.log("data?.data--------swap------>>>", data);
  const onTradeArbitrage = async (amount) => {
    try {
      const web3 = await getWeb3Obj();
      const amoutInWei = web3.utils.toWei(amount.toString());
      setArbitrageLoader(true);

      // console.log("data?.data?.resp1?.swap------>>>", data?.data?.resp1?.swap);
      let priceData;
      if (data?.resp3?.status == "PROFIT") {
        priceData = data?.resp2?.toPrice - data?.resp1?.fromPrice;
      }
      if (data?.resp3?.status == "LOSS") {
        priceData = data?.resp1?.fromPrice - data?.resp2?.toPrice;
      }
      console.log(data?.resp3?.status, "price-------->>>>>", priceData);
      let RouterA;
      let FactoryA;
      let RouterB;
      let FactoryB;
      if (
        SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp1?.exchangeName;
        })?.exchangeName == "Uniswap"
      ) {
        RouterA = UniswapRouter;
        FactoryA = UniswapFactory;
      }
      if (
        SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp1?.exchangeName;
        })?.exchangeName == "Shibaswap"
      ) {
        RouterA = ShibaswapRouter;
        FactoryA = ShibaswapFactory;
      }
      if (
        SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp1?.exchangeName;
        }).exchangeName == "Sushiswap"
      ) {
        RouterA = ShushiswapRouter;
        FactoryA = ShushiswapFactory;
      }

      if (
        SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp1?.exchangeName;
        }).exchangeName == "Uniswap"
      ) {
        RouterB = UniswapRouter;
        FactoryB = UniswapFactory;
      }
      if (
        SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp1?.exchangeName;
        }).exchangeName == "Shibaswap"
      ) {
        RouterB = ShibaswapRouter;
        FactoryB = ShibaswapFactory;
      }
      if (
        SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp1?.exchangeName;
        }).exchangeName == "Sushiswap"
      ) {
        RouterB = ShushiswapRouter;
        FactoryB = ShushiswapFactory;
      }
      const aTokenAddress = TokenAddressToUsed.filter(
        (data12) => data12.heading == data?.resp1?.fromToken
      )[0];
      // console.log("aTokenAddress ---- ", aTokenAddress);
      const bTokenAddress = TokenAddressToUsed.filter(
        (data12) => data12.heading == data?.resp1?.toToken
      )[0];
      // console.log("bTokenAddress ---- ", bTokenAddress);
      const arbitrageObj = getContract(
        ArbitrageContract,
        ArbitrageABI,
        library,
        account
      );
      const getFactoryObjA = getContract(
        FactoryA,
        FactoryABI,
        library,
        account
      );
      const getFactoryObjB = getContract(
        FactoryB,
        FactoryABI,
        library,
        account
      );

      console.log("arbitrageObj ---- ", arbitrageObj);
      console.log("arbitrageObj ---- data?.fromTokenId", data);
      let Tokens = data?.resp3?.profitAddress.split("-> ");
      // console.log("----cross-exchange----- ---- data?.toTokenId", Tokens);

      const PairA = await getFactoryObjA.getPair(Tokens[0], Tokens[1]);
      const PairB = await getFactoryObjB.getPair(Tokens[1], Tokens[0]);

      console.log(Tokens, "PairA------------------PairA", PairA);
      console.log("PairA------------------PairA", data);
      console.log(
        FactoryA,
        FactoryB,
        RouterA,
        RouterB,
        "PairB------------------PairB",
        PairB
      );
      if (PairA != ZeroAddress || PairB != ZeroAddress) {
        // const registration = await arbitrageObj.registration();
        // console.log("registration---->>>", registration);
        // const registrationObj = getContract(
        //   registration,
        //   RegistrationABI,
        //   library,
        //   account
        // );
        // console.log("registrationObj---->>>", registrationObj);

        // const iSRegisterUser = await registrationObj.userInfo(account);
        // console.log("---iSRegisterUser-->>>", iSRegisterUser);
        // if (!iSRegisterUser.isRegistered) {
        //   const registerUser = await registrationObj.registerUser();
        //   await registerUser.wait();
        // }
        if (!flashLoan) {
          const callSimpleArbitrage = await arbitrageObj.callSimpleArbitrage(
            account,
            RouterA,
            RouterB,
            Tokens[0],
            Tokens[1],
            amoutInWei
            // account
          );
          await callSimpleArbitrage.wait();
          toast.success(
            <span
              style={{ color: "#fff" }}
            >{` ${aTokenAddress.heading} trade successfull`}</span>
          );
          setArbitrageLoader(false);
          settransHash(callSimpleArbitrage);
          buyTokenHandler(
            // aTokenAddress?.token,
            // bTokenAddress?.token,
            amount,
            data,
            callSimpleArbitrage.hash,
            true
            // "jdfghjksdhgk"
          );
        } else {
          const callSimpleArbitrage1 = await arbitrageObj.callSimpleFlashLoan(
            account,
            RouterA,
            RouterB,
            Tokens[0],
            Tokens[1],
            amoutInWei
            // account
          );
          await callSimpleArbitrage1.wait();
          toast.success(
            <span style={{ color: "#fff" }}>
              {`${aTokenAddress.heading} trade successfull `}
            </span>
          );
          setArbitrageLoader(false);
          settransHash(callSimpleArbitrage1);
          buyTokenHandler(
            // aTokenAddress?.token,
            // bTokenAddress?.token,
            amount,
            data,
            callSimpleArbitrage1.hash,
            true
            // "jdfghjksdhgk"
          );
        }
      } else {
        if (PairA == ZeroAddress) {
          toast.warn(
            <span style={{ color: "#fff" }}>
              {`liquidity not found for exchange ${data?.resp1?.exchange} in between pair ${data?.resp1?.fromToken}-${data?.resp1?.toToken}`}
            </span>
          );
          setArbitrageLoader(false);
        } else if (PairB == ZeroAddress) {
          toast.warn(
            <span
              style={{ color: "#fff" }}
            >{`liquidity not found for exchange ${data?.resp2?.exchange} in between pair ${data?.resp1?.fromToken}-${data?.resp1?.toToken}`}</span>
          );
          setArbitrageLoader(false);
        } else {
          toast.warn(
            <span
              style={{ color: "#fff" }}
            >{`liquidity not found for exchange ${data?.resp1?.exchange} && ${data?.resp2?.exchange} in between pair ${data?.resp1?.fromToken}-${data?.resp1?.toToken}`}</span>
          );
          setArbitrageLoader(false);
        }
      }
    } catch (error) {
      console.log("---error", error);
      setArbitrageLoader(false);
      buyTokenHandler(
        // aTokenAddress?.token,
        // bTokenAddress?.token,
        amount,
        data,
        "0",
        false
        // "jdfghjksdhgk"
      );
      let messages = error.message.split(":");
      console.log(messages);
      toast.error(<span style={{ color: "#fff" }}>{error.message}</span>);
    }
  };

  const buyTokenHandler = async (
    // aTokenAddress,
    // bTokenAddress,
    amount,
    data,
    hash,
    transcationStatus
  ) => {
    console.log("data?.data?.resp1?.swap-------", data);
    let priceData;
    if (data?.resp3?.status == "PROFIT") {
      priceData = data?.resp2?.toPrice - data?.resp1?.fromPrice;
    }
    if (data?.resp3?.status == "LOSS") {
      priceData = data?.resp1?.fromPrice - data?.resp2?.toPrice;
    }
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.buyToken,
        headers: {
          token:
            sessionStorage.getItem("token") ||
            localStorage.getItem("creatturAccessToken"),
        },
        data: {
          fromToken: data?.resp1?.fromToken,
          toToken: data?.resp1?.toToken,
          fromSwap: data?.resp1?.exchange,
          toSwap: data?.resp2?.exchange,
          price: priceData.toString(),
          PLStatus: data?.resp3?.status,
          arbitrageType: "SIMPLE",
          transactionHash: hash,
          transcationStatus: transcationStatus,
        },
      });
      if (res) {
        // setUserData(res.data.result);
        // console.log("total-----results:----", res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const Swap = SwapExchange?.find((data1) => {
      return data1?.exchange == data?.resp2?.exchangeName;
    });
    // console.log("----cross-exchange----- <<<--- Swap --->>>", SwapExchange);
  }, []);

  const UpdatesModals = async () => {
    try {
      const web3 = await getWeb3Obj();
      let RouterA;
      let FactoryA;
      let RouterB;
      let FactoryB;
      const Swap1 = SwapExchange?.find((swap) => {
        return swap?.exchange == data?.resp1?.exchangeName;
      }).exchangeName;
      const Swap2 = SwapExchange?.find((swap) => {
        return swap?.exchange == data?.resp2?.exchangeName;
      }).exchangeName;

      if (Swap1 == "Uniswap") {
        RouterA = UniswapRouter;
        FactoryA = UniswapFactory;
      }
      if (Swap1 == "Shibaswap") {
        RouterA = ShibaswapRouter;
        FactoryA = ShibaswapFactory;
      }
      if (Swap1 == "Sushiswap") {
        RouterA = ShushiswapRouter;
        FactoryA = ShushiswapFactory;
      }
      if (Swap2 == "Uniswap") {
        RouterB = UniswapRouter;
        FactoryB = UniswapFactory;
      }
      if (Swap2 == "Shibaswap") {
        RouterB = ShibaswapRouter;
        FactoryB = ShibaswapFactory;
      }
      if (Swap2 == "Sushiswap") {
        RouterB = ShushiswapRouter;
        FactoryB = ShushiswapFactory;
      }
      const aTokenAddress = data?.resp3?.profitAddress?.split("-> ")[0];
      const bTokenAddress = data?.resp3?.profitAddress?.split("-> ")[1];
      const PriceAPI = await APITokenPriceHandler(aTokenAddress, Swap1);
      // const EstimatePriceAPI = await EstimateGasHandler(
      //   ArbitrageABI,
      //   ArbitrageContract,
      //   account
      // );

      console.log(
        // EstimatePriceAPI,
        "----cross-exchange----- 435 <<<<<<PriceAPI>>>>>>",
        PriceAPI
      );
      // console.log(
      //   "----cross-exchange----- 446 <<<<<<PriceAPI>>>>>>",
      //   data?.resp3?.profitAddress.split("-> ")
      // );

      // let Tokens = data?.resp3?.profitAddress.split("-> ");
      let Tokens = data?.resp3?.profitAddress.split("-> ");

      console.log(
        data?.resp3?.profitAddress.split("-> ")[0],
        "TokenA ----cross-exchange----- TokenB",
        FactoryA,
        FactoryB
      );
      const TokenA = await APITokenPriceHandler(
        data?.resp3?.profitAddress.split("-> ")[0],
        FactoryA
      );
      setTokens1(TokenA);
      const TokenB = await APITokenPriceHandler(
        data?.resp3?.profitAddress.split("-> ")[1],
        FactoryA
      );
      setTokens2(TokenB);
      const TokenC = await APITokenPriceHandler(
        data?.resp3?.profitAddress.split("-> ")[1],
        FactoryB
      );
      setTokens3(TokenC);
      const TokenD = await APITokenPriceHandler(
        data?.resp3?.profitAddress.split("-> ")[0],
        FactoryB
      );
      // console.log(TokenA, "TokenA ----cross-exchange----- TokenB", TokenB);
      setTokens4(TokenD);
    } catch (error) {
      console.log("----cross-exchange----- 435 <<<<<<error>>>>>>", error);
    }
  };
  useEffect(() => {
    UpdatesModals();
  }, []);
  return (
    <>
      <Paper className={classes.root} elevation={2}>
        <img
          src="/images/market/square.png"
          alt="Images"
          className="sqaureimage"
        />
        <Box align="center" mt={3} mb={2}>
          <Typography
            variant="h3"
            style={{
              color: "rgb(65, 22, 67)",
              fontSize: "25px",
              fontWeight: "500",
            }}
          >
            Arbitrage
          </Typography>
        </Box>

        <Box>
          <Box className="wnbBox">
            <Grid container spacing={2}>
              <Grid item xs={6} align="center">
                <Box className={classes.content}>
                  <Typography
                    variant="h1"
                    style={{
                      color: "rgba(243, 109, 54, 1)",
                      fontSize: "25px",
                      lineHeight: "30px",
                    }}
                  >
                    {data?.resp1?.fromPrice ? data?.resp1?.fromPrice : "N/A"}
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{ color: "rgba(61, 61, 61, 1)" }}
                  >
                    {/* ${parseFloat(tokens1 * data?.resp1?.fromPrice).toFixed(8)} */}
                    $567 to 456 www.c{" "}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} align="center">
                <Box className={classes.content}>
                  <Typography
                    variant="h1"
                    style={{
                      color: "rgba(243, 109, 54, 1)",
                      fontSize: "25px",
                      lineHeight: "30px",
                    }}
                  >
                    USDT
                    {/* {data?.resp1?.toPrice
                  ? parseFloat(data?.resp1?.toPrice).toFixed(8)
                  : "N/A"}{" "} */}
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{ color: "rgba(61, 61, 61, 1)" }}
                  >
                    {/* ${parseFloat(tokens2 * data?.resp1?.toPrice).toFixed(8)} */}
                    $567 to 456 www.c{" "}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box className="wnbBox">
            <Grid container spacing={2}>
              <Grid item xs={6} align="center">
                <Box className={classes.content}>
                  <Typography
                    variant="h1"
                    style={{
                      color: "rgba(243, 109, 54, 1)",
                      fontSize: "25px",
                      lineHeight: "30px",
                    }}
                  >
                    USDT
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{ color: "rgba(61, 61, 61, 1)" }}
                  >
                    {/* ${parseFloat(tokens1 * data?.resp1?.fromPrice).toFixed(8)} */}
                    $567 to 456 www.c{" "}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} align="center">
                <Box className={classes.content}>
                  <Typography
                    variant="h1"
                    style={{
                      color: "rgba(243, 109, 54, 1)",
                      fontSize: "25px",
                      lineHeight: "30px",
                    }}
                  >
                    WBNB
                    {/* {data?.resp1?.toPrice
                  ? parseFloat(data?.resp1?.toPrice).toFixed(8)
                  : "N/A"}{" "} */}
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{ color: "rgba(61, 61, 61, 1)" }}
                  >
                    {/* ${parseFloat(tokens2 * data?.resp1?.toPrice).toFixed(8)} */}
                    $567 to 456 www.c{" "}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6} align="center">
              <Box className={classes.content}>
                <Typography
                  variant="h1"
                  style={{
                    color: "rgba(243, 109, 54, 1)",
                    fontSize: "25px",
                    lineHeight: "30px",
                  }}
                >
                  WBNB
                </Typography>
                <Typography
                  variant="h6"
                  style={{ color: "rgba(61, 61, 61, 1)" }}
                >
                  {/* ${parseFloat(tokens1 * data?.resp1?.fromPrice).toFixed(8)} */}
                  $567 to 456 www.c{" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} align="center">
              <Box className={classes.content}>
                <Typography
                  variant="h1"
                  style={{
                    color: "rgba(243, 109, 54, 1)",
                    fontSize: "25px",
                    lineHeight: "30px",
                  }}
                >
                  FGD
                  {/* {data?.resp1?.toPrice
                  ? parseFloat(data?.resp1?.toPrice).toFixed(8)
                  : "N/A"}{" "} */}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ color: "rgba(61, 61, 61, 1)" }}
                >
                  {/* ${parseFloat(tokens2 * data?.resp1?.toPrice).toFixed(8)} */}
                  $567 to 456 www.c{" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} align="center">
              <Box className="ethBoxinner" mt={2}>
                <Typography
                  variant="h1"
                  style={{
                    color: "#fff",
                    fontSize: "25px",
                    lineHeight: "30px",
                  }}
                >
                  WBNB
                </Typography>
                <Box className={classes.contentBox}>
                  <Typography variant="body2">
                    {/* {data?.resp1?.fromToken ? data?.resp1?.fromToken : "N/A"} */}
                    0.087 USD
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} align="center">
              <Box className="ethBoxinner" mt={2}>
                <Typography
                  variant="h1"
                  style={{
                    color: "#fff",
                    fontSize: "25px",
                    lineHeight: "30px",
                  }}
                >
                  WBNB
                </Typography>
                <Box className={classes.contentBox}>
                  <Typography variant="body2">
                    {/* {data?.resp1?.fromToken ? data?.resp1?.fromToken : "N/A"} */}
                    0.087 USD
                  </Typography>
                </Box>
              </Box>
              {/* <Box className={classes.contentBox}>
                <Typography variant="body2">
                  {data?.resp1?.toToken ? data?.resp1?.toToken : "N/A"}
                </Typography>
              </Box> */}
            </Grid>

            {/* <Grid item xs={6} align="center">
              <Button
                variant="contained"
                color="primary"
                className="calenderBox"
                fullWidth
                onClick={() => setcalculatorModalOpen(true)}
              >
                <BsFillCalculatorFill />
              </Button>
            </Grid> */}
            <Grid item xs={12} align="center">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setExchangeModalOpen(true)}
              >
                Execute
              </Button>
            </Grid>
          </Grid>
        </Box>

        {exchangeModalOpen && (
          <Dialog
            fullWidth
            maxWidth="sm"
            open={exchangeModalOpen}
            style={{ overflow: "auto" }}
            key={index}
          >
            <DialogTitle className="dialogtitlebox">
              <Typography variant="h6" style={{ color: "#fff" }}>
                Cross Exchange Flash Loan Swap
              </Typography>
            </DialogTitle>
            <CrossExchangeModalComponent
              exchangeModalClose={exchangeModalClose}
              crossExchangeData={crossExchangeData}
              onTradeArbitrage={onTradeArbitrage}
              data={data}
              fromToken={data?.resp1?.fromToken}
              toToken={data?.resp1?.toToken}
              Swap1={
                SwapExchange?.find((swap) => {
                  return swap?.exchange == data?.resp1?.exchangeName;
                })?.exchangeName
              }
              Swap2={
                SwapExchange?.find((swap) => {
                  return swap?.exchange == data?.resp2?.exchangeName;
                })?.exchangeName
              }
              arbitrageLoader={arbitrageLoader}
              transHash={transHash}
              setFlashLoan={setFlashLoan}
              flashLoan={flashLoan}
              key={index}
              index={index}
            />
          </Dialog>
        )}
        {calculatorModalOpen && (
          <Dialog
            fullWidth
            maxWidth="sm"
            open={calculatorModalOpen}
            style={{ overflow: "auto", padding: "0px" }}
            key={index}
          >
            <CrossExchangeModalComponentCalculator
              exchangeModalClose={calculatorModalClose}
              crossExchangeData={crossExchangeData}
              onTradeArbitrage={onTradeArbitrage}
              data={data}
              fromToken={data?.resp1?.fromToken}
              toToken={data?.resp1?.toToken}
              Swap1={
                SwapExchange?.find((swap) => {
                  return swap?.exchange == data?.resp1?.exchangeName;
                })?.exchangeName
              }
              Swap2={
                SwapExchange?.find((swap) => {
                  return swap?.exchange == data?.resp2?.exchangeName;
                })?.exchangeName
              }
              arbitrageLoader={arbitrageLoader}
              transHash={transHash}
              setFlashLoan={setFlashLoan}
              flashLoan={flashLoan}
              key={index}
              index={index}
            />
          </Dialog>
        )}
      </Paper>
    </>
  );
}

export default CompairCrossExchangeCard1;
