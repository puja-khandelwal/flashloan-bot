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
    border: "0.2px solid #a2a0a02e",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    padding: "15px",
    background: theme.palette.background.section,
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
    flexDirection: "column",
    width: "100%",
    "& h6": {
      color: theme.palette.primary.main,
      fontSize: "16px",
      fontWeight: "400",
    },
    "& input": {
      backgroundColor: "transparent",
      //   border: "none",
      //   color: "#ffffff",
      color: theme.palette.primary.main,
      borderBottom: `1px solid ${theme.palette.primary.main}`,
      fontWeight: 300,
      textAlign: "center",
      width: "100%",
      fontSize: "14px",
      lineHeight: "26px",
      "&:focus-visible": {
        outline: "none !important",
      },
    },
    "& span": {
      color: theme.palette.primary.main,
      fontSize: "13px",
      fontWeight: "300",
    },
  },
  contentBox: {
    background: "#811793",
    width: "100%",
    padding: "8px 0px",
  },
  utctext: {
    "& p": {
      fontSize: "14px",
      color: theme.palette.primary.main,
    },
  },
  arrowright: {
    color: theme.palette.primary.main,
  },
  exchange: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

function CalculatorCards(props) {
  const classes = useStyles();
  const {
    data,
    index,
    setfromValue,
    fromValue,
    returnedValue,
    returnedValue1,
    // tokens1,
    // tokens2,
  } = props;
  //   const { activate, account, chainId, library, deactivate } = useWeb3React();
  //   const [exchangeModalOpen, setExchangeModalOpen] = useState(false);
  //   const [calculatorModalOpen, setcalculatorModalOpen] = useState(false);
  //   const [arbitrageLoader, setArbitrageLoader] = useState(false);
  //   const [transHash, settransHash] = useState(false);
  //   const [flashLoan, setFlashLoan] = useState(false);

  const [tokens1, setTokens1] = useState(0);
  const [tokens2, setTokens2] = useState(0);
  const [tokens3, setTokens3] = useState(0);
  const [tokens4, setTokens4] = useState(0);

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
      <Box className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Box className={classes.coinBox}>
              <figure>
                {SwapExchange?.find((swap) => {
                  return swap?.exchange == data?.resp1?.exchangeName;
                })?.exchangeName == "Uniswap" && (
                  <img src="images/uniswap.png" alt="image" />
                )}
                {SwapExchange?.find((swap) => {
                  return swap?.exchange == data?.resp1?.exchangeName;
                })?.exchangeName == "Sushiswap" && (
                  <img src="images/sushi.png" alt="image" />
                )}
                {SwapExchange?.find((swap) => {
                  return swap?.exchange == data?.resp1?.exchangeName;
                })?.exchangeName == "Shibaswap" && (
                  <img src="images/shibaswap.png" alt="image" />
                )}
                {/* {data?.resp1?.exchange == "Uniswap" && (
                <img src="images/CrossExchangeCoin01.png" alt="image" />
                )} */}
              </figure>
              <ArrowRightAltIcon className={classes.arrowright} />
              <figure>
                {SwapExchange?.find((swap) => {
                  return swap?.exchange == data?.resp2?.exchangeName;
                })?.exchangeName == "Uniswap" && (
                  <img src="images/uniswap.png" alt="image" />
                )}
                {SwapExchange?.find((swap) => {
                  return swap?.exchange == data?.resp2?.exchangeName;
                })?.exchangeName == "Sushiswap" && (
                  <img src="images/sushi.png" alt="image" />
                )}
                {SwapExchange?.find((swap) => {
                  return swap?.exchange == data?.resp2?.exchangeName;
                })?.exchangeName == "Shibaswap" && (
                  <img src="images/shibaswap.png" alt="image" />
                )}
              </figure>
            </Box>
          </Grid>
          <Grid item xs={7} align="center">
            <Box className={classes.utctext}>
              {/* <Typography variant="body1">{data?.date}</Typography> */}
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box mt={1} mb={1}>
              <Box className={classes.exchange}>
                <Typography variant="h6">
                  {data?.resp1?.exchange ? data?.resp1?.exchange : ""}
                </Typography>
                {data?.resp3?.status != "LOSS" ? (
                  <Box className={classes.exchange}>
                    <Typography variant="h6">{data?.resp3?.price}</Typography>
                    &nbsp;
                    <Typography variant="h6">
                      <span>{data?.resp3?.status ? "%" : ""}</span>
                    </Typography>
                  </Box>
                ) : (
                  <Box className={classes.exchange}>
                    {/* <Typography variant="h6">{data?.resp3?.price}</Typography>
                    &nbsp; */}
                    <Typography variant="h6">
                      <span>No Arbitrage</span>
                    </Typography>
                  </Box>
                )}
              </Box>

              <Divider />
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box
              className={`numberTextField ${classes.content}`}
              // className={classes.content}
            >
              {/* <Typography variant="h6">
                {data?.resp1?.fromPrice ? data?.resp1?.fromPrice : "N/A"}
              </Typography> */}
              <input
                value={fromValue}
                onChange={(e) => setfromValue(e.target.value)}
                type="number"
              />{" "}
              <span>${parseFloat(tokens1 * fromValue).toFixed(8)}</span>
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.content}>
              <Typography variant="h6">
                {returnedValue1 ? parseFloat(returnedValue1).toFixed(6) : "N/A"}
                {/* {data?.resp1?.toPrice
                  ? parseFloat(data?.resp1?.toPrice).toFixed(6)
                  : "N/A"} */}
              </Typography>
              <span>${parseFloat(tokens2 * returnedValue1).toFixed(8)}</span>
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.contentBox}>
              <Typography variant="body2">
                {data?.resp1?.fromToken ? data?.resp1?.fromToken : "N/A"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.contentBox}>
              <Typography variant="body2">
                {data?.resp1?.toToken ? data?.resp1?.toToken : "N/A"}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box mt={1} mb={1}>
              <Box className={classes.exchange}>
                <Typography variant="h6">
                  {data?.resp2?.exchangeName
                    ? SwapExchange?.find((swap) => {
                        return swap?.exchange == data?.resp2?.exchangeName;
                      }).exchangeName
                    : "N/A"}
                </Typography>
              </Box>

              <Divider />
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.content}>
              <Typography variant="h6">
                {returnedValue1 ? parseFloat(returnedValue1).toFixed(6) : ""}
              </Typography>
              <span>${parseFloat(tokens3 * returnedValue1).toFixed(8)}</span>
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.content}>
              <Typography variant="h6">
                {returnedValue ? parseFloat(returnedValue).toFixed(6) : "N/A"}
              </Typography>
              <span>${parseFloat(tokens4 * returnedValue).toFixed(8)}</span>
              {/* <span>$0</span> */}
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.contentBox}>
              <Typography variant="body2">
                {data?.resp2?.fromToken ? data?.resp2?.fromToken : "N/A"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.contentBox}>
              <Typography variant="body2">
                {data?.resp2?.toToken ? data?.resp2?.toToken : "N/A"}
              </Typography>
            </Box>
          </Grid>
          {/* <Grid item xs={6} align="center">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setcalculatorModalOpen(true)}
            >
              <BsFillCalculatorFill />
            </Button>
          </Grid> */}
          {/* <Grid item xs={6} align="center">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setExchangeModalOpen(true)}
            >
              Execute
            </Button>
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
}

export default CalculatorCards;
