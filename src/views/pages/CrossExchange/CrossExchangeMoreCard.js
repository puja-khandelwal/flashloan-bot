import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
  Paper,
} from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { BsFillCalculatorFill } from "react-icons/bs";
import StarIcon from "@material-ui/icons/Star";
// import CrossExchangeModalComponent from "./CrossExchangeModalComponent";
import CrossExchangeModalComponentTraingular1 from "src/views/pages/CrossExchange/CrossExchangeModalComponentTraingular1";
import ArbitrageABI from "src/ABI/ArbitrageABI.json";
import FactoryABI from "src/ABI/FactoryABI.json";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import axios from "axios";
import RegistrationABI from "src/ABI/RegistrationABI.json";
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
  ShibaswapFactory,
  UniswapFactory,
  ShushiswapFactory,
  SwapExchange,
  APITokenPriceHandler,
} from "src/utils";

// import {
//   APITokenPriceHandler,
//   getWeb3ContractObject,
//   mainnetRPCURL1,
//   GenerateEstimateGas,
// } from "src/utils";
import { TokenAddressToUsed } from "src/constants";
// import CrossExchangeModalComponentTraingular from "./CrossExchangeModalComponentTraingular";
import { toast } from "react-toastify";
// import axios from "axios";
import ApiConfig from "src/config/APICongig";
import { ClearIcon } from "@material-ui/icons/Clear";
import CrossExchangeModalComponentTraingularCalculator from "./CrossExchangeModalComponentTraingularCalculator";
// import CrossExchangeModalComponentTraingular1 from "./CrossExchangeModalComponentTraingular1";
// import {
// import { FactoryABI } from 'src/ABI/FactoryABI.json';
// UniswapFactory,
//   ShushiswapFactory,
//   ShibaswapRouter,
// } from "../utils/index";

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
  mainContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    "& svg": {
      color: theme.palette.primary.main,
    },
    "& h6": {
      color: theme.palette.primary.main,
      fontSize: "16px",
      fontFamily: '"Roboto Condensed",  sans-serif',
      fontWeight: "500",
    },
    "& p": {
      fontSize: "12px",
      color: theme.palette.primary.main,
      fontWeight: "300",
    },
  },
  contentBox: {
    background: "#811793",
    width: "100%",
    padding: "5px 0px",
  },
  startBox: {
    width: "100%",
    background: theme.palette.background.default,
    padding: "5px 0px",
    "& svg": {
      color: theme.palette.primary.main,
    },
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
  //   // name: "Amount Input (Input USD Value)",
  //   address: "10",
  // },________---------------------------------------------------------------------------Traingular---------------------------------
];

function CrossExchangeMoreCard(props) {
  const classes = useStyles();
  const { data, index } = props;
  const { activate, account, chainId, library, deactivate } = useWeb3React();
  const [calculatorModalOpen, setcalculatorModalOpen] = useState(false);
  const [exchangeModalOpen, setExchangeModalOpen] = useState(false);
  const [arbitrageLoader, setArbitrageLoader] = useState(false);
  const [transHash, settransHash] = useState(false);
  const [flashLoan, setFlashLoan] = useState(false);
  const [tokens1, setTokens1] = useState(0);
  const [tokens2, setTokens2] = useState(0);
  const [tokens3, setTokens3] = useState(0);
  const [tokens4, setTokens4] = useState(0);
  const [tokens5, setTokens5] = useState(0);
  const [tokens6, setTokens6] = useState(0);
  const exchangeModalClose = () => {
    setExchangeModalOpen(false);
  };
  const CalculatorModalClose = () => {
    setcalculatorModalOpen(false);
  };
  console.log("----cross-exchange----- <<<--- Swap --->>>");
  const onTradeArbitrage = async (amount) => {
    try {
      const web3 = await getWeb3Obj();
      const amoutInWei = web3.utils.toWei(amount.toString());
      // console.log("data--------swap------>>>", data);resp1
      setArbitrageLoader(true);
      let RouterA;
      let FactoryA;
      let RouterB;
      let FactoryB;
      let SwapA;
      let SwapB;
      if (
        SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp1?.exchangeName;
        }).exchangeName ==
          SwapExchange?.find((swap) => {
            return swap?.exchange == data?.resp2?.exchangeName;
          }).exchangeName &&
        SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp1?.exchangeName;
        }).exchangeName !=
          SwapExchange?.find((swap) => {
            return swap?.exchange == data?.resp3?.exchangeName;
          }).exchangeName
      ) {
        SwapA = SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp1?.exchangeName;
        }).exchangeName;
        SwapB = SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp3?.exchangeName;
        }).exchangeName;
      }
      if (
        SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp1?.exchangeName;
        }).exchangeName !=
          SwapExchange?.find((swap) => {
            return swap?.exchange == data?.resp2?.exchangeName;
          }).exchangeName &&
        SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp1?.exchangeName;
        }).exchangeName ==
          SwapExchange?.find((swap) => {
            return swap?.exchange == data?.resp3?.exchangeName;
          }).exchangeName
      ) {
        SwapA = SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp1?.exchangeName;
        }).exchangeName;
        SwapB = SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp3?.exchangeName;
        }).exchangeName;
      }
      if (
        SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp1?.exchangeName;
        }).exchangeName ==
          SwapExchange?.find((swap) => {
            return swap?.exchange == data?.resp2?.exchangeName;
          }).exchangeName &&
        SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp1?.exchangeName;
        }).exchangeName ==
          SwapExchange?.find((swap) => {
            return swap?.exchange == data?.resp3?.exchangeName;
          }).exchangeName
      ) {
        SwapA = SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp1?.exchangeName;
        }).exchangeName;
        SwapB = SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp3?.exchangeName;
        }).exchangeName;
      }
      if (
        SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp1?.exchangeName;
        }).exchangeName !=
          SwapExchange?.find((swap) => {
            return swap?.exchange == data?.resp2?.exchangeName;
          }).exchangeName &&
        SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp1?.exchangeName;
        }).exchangeName !=
          SwapExchange?.find((swap) => {
            return swap?.exchange == data?.resp3?.exchangeName;
          }).exchangeName
      ) {
        SwapA = SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp1?.exchangeName;
        }).exchangeName;
        SwapB = SwapExchange?.find((swap) => {
          return swap?.exchange == data?.resp3?.exchangeName;
        }).exchangeName;
      }

      if (SwapA == "Uniswap") {
        RouterA = UniswapRouter;
        FactoryA = UniswapFactory;
      }
      if (SwapA == "Shibaswap") {
        RouterA = ShibaswapRouter;
        FactoryA = ShibaswapFactory;
      }
      if (SwapA == "Sushiswap") {
        RouterA = ShushiswapRouter;
        FactoryA = ShushiswapFactory;
      }

      if (SwapB == "Uniswap") {
        RouterB = UniswapRouter;
        FactoryB = UniswapFactory;
      }
      if (SwapB == "Shibaswap") {
        RouterB = ShibaswapRouter;
        FactoryB = ShibaswapFactory;
      }
      if (SwapB == "Sushiswap") {
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
      const cTokenAddress = TokenAddressToUsed.filter(
        (data12) => data12.heading == data?.resp2?.toToken
      )[0];
      // console.log("bTokenAddress ---- ", cTokenAddress);
      const arbitrageObj = getContract(
        ArbitrageContract,
        ArbitrageABI,
        library,
        account
      );
      console.log("arbitrageObj ---- ", arbitrageObj);
      const getFactoryObjA = getContract(
        FactoryA,
        FactoryABI,
        library,
        account
      );
      // console.log("getFactoryObj--AAAA--->>>", getFactoryObjA);
      const PairA = await getFactoryObjA.getPair(
        data?.resp4?.profitAddress.split("-> ")[0],
        data?.resp4?.profitAddress.split("-> ")[1]
      );
      const PairB = await getFactoryObjA.getPair(
        data?.resp4?.profitAddress.split("-> ")[1],
        data?.resp4?.profitAddress.split("-> ")[2]
      );

      // console.log(data, "PairA------------------PairA", PairA);
      // console.log("PairB------------------PairB", PairB);

      if (PairA != ZeroAddress && PairB != ZeroAddress) {
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
          const callTriangularArbitrage1 =
            await arbitrageObj.callTriangularArbitrage(
              account,
              RouterA,
              RouterB,
              // RouterB,
              data?.resp4?.profitAddress.split("-> ")[0],
              data?.resp4?.profitAddress.split("-> ")[1],
              data?.resp4?.profitAddress.split("-> ")[2],
              amoutInWei
            );
          await callTriangularArbitrage1.wait();
          toast.success(
            <span
              style={{ color: "#fff" }}
            >{`${aTokenAddress.heading} trade successfull `}</span>
          );
          setArbitrageLoader(false);
          settransHash(callTriangularArbitrage1);
          buyTokenHandler(
            // aTokenAddress?.token,
            // bTokenAddress?.token,
            // cTokenAddress?.token,
            amount,
            data,
            callTriangularArbitrage1.hash,
            true
          );
          // console.log(
          //   "callTriangularArbitrage1 ----- ",
          //   callTriangularArbitrage1
          // );
          // console.log(
          //   "callTriangularArbitrage1 ----- ",
          //   callTriangularArbitrage1.hash
          // );
        } else {
          const callTriangularArbitrage1 =
            await arbitrageObj.callTriangularFlashLoan(
              account,
              RouterA,
              RouterB,
              data?.resp4?.profitAddress.split("-> ")[0],
              data?.resp4?.profitAddress.split("-> ")[1],
              data?.resp4?.profitAddress.split("-> ")[2],
              amoutInWei
            );
          await callTriangularArbitrage1.wait();
          toast.success(
            <span
              style={{ color: "#fff" }}
            >{`Flash Loan Trade successfull ${aTokenAddress.heading}-${bTokenAddress.heading}-${cTokenAddress.heading}`}</span>
          );
          setArbitrageLoader(false);
          settransHash(callTriangularArbitrage1.hash);
          // console.log(
          //   "callTriangularArbitrage1 ----- ",
          //   callTriangularArbitrage1
          // );
          // console.log(
          //   "callTriangularArbitrage1 ----- ",
          //   callTriangularArbitrage1.hash
          // );
        }
      } else {
        if (PairA == ZeroAddress) {
          toast.warn(
            <span style={{ color: "#fff" }}>
              {" "}
              liquidity not found in between pair {aTokenAddress.heading}-
              {bTokenAddress.heading}
            </span>
          );
          setArbitrageLoader(false);
        } else {
          toast.warn(
            <span style={{ color: "#fff" }}>
              {" "}
              {`liquidity not found in between pair ${bTokenAddress.heading}-${cTokenAddress.heading}`}
            </span>
          );
          setArbitrageLoader(false);
        }
      }
    } catch (error) {
      console.log("---error", error);
      setArbitrageLoader(false);
      buyTokenHandler(amount, data, "0", false);
      // toast.error(error.message);
      toast.error(<span style={{ color: "#fff" }}>{error.message}</span>);
    }
  };

  const buyTokenHandler = async (
    // aTokenAddress,
    // bTokenAddress,
    // cTokenAddress,
    amount,
    data,
    hash,
    transcationStatus
  ) => {
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
          fromSwap: SwapExchange?.find((swap) => {
            return swap?.exchange == data?.resp1?.exchangeName;
          }).exchangeName,
          toSwap: SwapExchange?.find((swap) => {
            return swap?.exchange == data?.resp1?.exchangeName;
          }).exchangeName,
          price: data?.resp4?.price.toString(),
          PLStatus: data?.resp4?.status,
          arbitrageType: "TRIANGULAR",
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

  const priceCheck = async () => {
    try {
      let Swap1 = SwapExchange?.find((swap) => {
        return swap?.exchange == data?.resp1?.exchangeName;
      }).exchangeName;
      let Swap2 = SwapExchange?.find((swap) => {
        return swap?.exchange == data?.resp2?.exchangeName;
      }).exchangeName;
      let Swap3 = SwapExchange?.find((swap) => {
        return swap?.exchange == data?.resp3?.exchangeName;
      }).exchangeName;

      let FactoryA;
      let FactoryB;
      let FactoryC;

      if (Swap1 == "Uniswap") {
        FactoryA = UniswapFactory;
      }
      if (Swap1 == "Shibaswap") {
        FactoryA = ShibaswapFactory;
      }
      if (Swap1 == "Sushiswap") {
        FactoryA = ShushiswapFactory;
      }
      if (Swap2 == "Uniswap") {
        FactoryB = UniswapFactory;
      }
      if (Swap2 == "Shibaswap") {
        FactoryB = ShibaswapFactory;
      }
      if (Swap2 == "Sushiswap") {
        FactoryB = ShushiswapFactory;
      }
      if (Swap3 == "Uniswap") {
        FactoryC = UniswapFactory;
      }
      if (Swap3 == "Shibaswap") {
        FactoryC = ShibaswapFactory;
      }
      if (Swap3 == "Sushiswap") {
        FactoryC = ShushiswapFactory;
      }
      let tokens = data?.resp4?.profitAddress.split("-> ");

      // const TokenA = await APITokenPriceHandler(tokens[0], FactoryA);
      // setTokens1(TokenA);
      // const TokenB = await APITokenPriceHandler(tokens[1], FactoryA);
      // setTokens2(TokenB);
      // const TokenC = await APITokenPriceHandler(tokens[1], FactoryB);
      // setTokens3(TokenC);
      // const TokenD = await APITokenPriceHandler(tokens[2], FactoryB);
      // setTokens4(TokenD);
      // const TokenE = await APITokenPriceHandler(tokens[2], FactoryC);
      // setTokens5(TokenE);
      // const TokenF = await APITokenPriceHandler(tokens[0], FactoryC);
      // setTokens6(TokenF);

      // console.log("PriceAPI ---- TokenB ", TokenB);
      // console.log("PriceAPI ---- TokenC", TokenC);
      // console.log("PriceAPI ---- TokenD", TokenD);
      // console.log("PriceAPI ---- TokenE", TokenE);
      // console.log("PriceAPI ---- TokenF", TokenF);
      // let obj = {
      //   TokenA: TokenA,
      //   TokenB: TokenB,
      //   TokenC: TokenC,
      //   TokenD: TokenD,
      //   TokenE: TokenE,
      //   TokenF: TokenF,
      // };
      // console.log("PriceAPI ---- obj ", obj);
      // console.log("PriceAPIShushiSwap -----", PriceAPIShushiSwap);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    priceCheck();
  }, []);

  return (
    <>
      <Box className={classes.root} key={index}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            {/* <Box className={classes.coinBox}>
              <figure>
                <img src="images/CrossExchangeCoin01.png" alt="image" />
              </figure>
              <Box className={classes.mainContent}>
                <ArrowRightAltIcon />
              </Box>
              <figure>
                <img src="images/CrossExchangeCoin02.png" alt="image" />
              </figure>
            </Box> */}
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
              <ArrowRightAltIcon className={classes.arrowright} />
              <figure>
                {SwapExchange?.find((swap) => {
                  return swap?.exchange == data?.resp3?.exchangeName;
                })?.exchangeName == "Uniswap" && (
                  <img src="images/uniswap.png" alt="image" />
                )}
                {SwapExchange?.find((swap) => {
                  return swap?.exchange == data?.resp3?.exchangeName;
                })?.exchangeName == "Sushiswap" && (
                  <img src="images/sushi.png" alt="image" />
                )}
                {SwapExchange?.find((swap) => {
                  return swap?.exchange == data?.resp3?.exchangeName;
                })?.exchangeName == "Shibaswap" && (
                  <img src="images/shibaswap.png" alt="image" />
                )}
              </figure>
            </Box>
          </Grid>
          <Grid item xs={7} align="center">
            <Box className={classes.mainContent}>
              {data?.date ? (
                <Typography variant="body1">{data?.date}</Typography>
              ) : (
                ""
              )}
            </Box>
          </Grid>{" "}
          <Grid item xs={12} align="center">
            <Box className={classes.mainContent}>
              <Typography variant="body1">
                {data?.resp4?.status != "LOSS" ? (
                  data?.resp4?.price
                ) : (
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "16px",
                    }}
                  >
                    No Arbitrage
                  </span>
                )}
              </Typography>

              {/* <Typography variant="h6">{data?.resp4?.status}</Typography> */}
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.mainContent}>
              <Typography variant="h6">{data?.resp1?.fromToken}</Typography>
              <Typography variant="body1">
                {parseFloat(data?.resp1?.fromPrice).toFixed(5)}
              </Typography>
              <Typography variant="body1">
                ${tokens1 * data?.resp1?.fromPrice}
              </Typography>
            </Box>
          </Grid>{" "}
          <Grid item xs={6} align="center">
            <Box className={classes.mainContent}>
              <Typography variant="h6">{data?.resp1?.toToken}</Typography>
              <Typography variant="body1">
                {parseFloat(data?.resp1?.toPrice).toFixed(5)}
              </Typography>
              <Typography variant="body1">
                ${tokens2 * data?.resp1?.toPrice}
              </Typography>
            </Box>
          </Grid>{" "}
          <Grid item xs={6} align="center">
            <Box className={classes.mainContent}>
              <Typography variant="h6">{data?.resp2?.fromToken}</Typography>
              <Typography variant="body1">
                {parseFloat(data?.resp2?.fromPrice).toFixed(5)}
              </Typography>
              <Typography variant="body1">
                ${tokens3 * data?.resp2?.fromPrice}
              </Typography>
            </Box>
          </Grid>{" "}
          <Grid item xs={6} align="center">
            <Box className={classes.mainContent}>
              <Typography variant="h6">{data?.resp2?.toToken}</Typography>
              <Typography variant="body1">
                {parseFloat(data?.resp2?.toPrice).toFixed(5)}
              </Typography>
              <Typography variant="body1">
                ${tokens4 * data?.resp2?.toPrice}
              </Typography>
            </Box>
          </Grid>{" "}
          <Grid item xs={6} align="center">
            <Box className={classes.mainContent}>
              <Typography variant="h6">{data?.resp3?.fromToken}</Typography>
              <Typography variant="body1">
                {parseFloat(data?.resp3?.fromPrice).toFixed(5)}
              </Typography>
              <Typography variant="body1">
                ${tokens5 * data?.resp3?.fromPrice}
              </Typography>
            </Box>
          </Grid>{" "}
          <Grid item xs={6} align="center">
            <Box className={classes.mainContent}>
              <Typography variant="h6">{data?.resp3?.toToken}</Typography>
              <Typography variant="body1">
                {parseFloat(data?.resp3?.toPrice).toFixed(5)}
              </Typography>
              <Typography variant="body1">
                ${tokens6 * data?.resp3?.toPrice}
              </Typography>
            </Box>
          </Grid>{" "}
          <Grid item xs={6} align="center">
            <Box className={classes.mainContent}>
              <Typography variant="h6" style={{ fontSize: "20px" }}>
                {data?.resp1?.fromToken}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.mainContent}>
              <Typography variant="h6" style={{ fontSize: "20px" }}>
                {data?.resp3?.fromToken}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.contentBox}>
              <Typography variant="body2">{data?.resp1?.fromToken}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.contentBox}>
              <Typography variant="body2">{data?.resp3?.fromToken}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setcalculatorModalOpen(true)}
            >
              <BsFillCalculatorFill />
            </Button>
          </Grid>
          <Grid item xs={6} align="center">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setExchangeModalOpen(true)}
            >
              Execute
            </Button>
          </Grid>
          <Grid item xs={12} align="center">
            <Box className={classes.startBox}>
              <StarIcon />
            </Box>
          </Grid>
        </Grid>
        {exchangeModalOpen && (
          <Dialog fullWidth maxWidth="sm" open={exchangeModalOpen} key={index}>
            {/* <ClearIcon
              onClick={exchangeModalClose}
              disabled={arbitrageLoader}
            /> */}
            <CrossExchangeModalComponentTraingular1
              exchangeModalClose={exchangeModalClose}
              crossExchangeData={crossExchangeData}
              onTradeArbitrage={onTradeArbitrage}
              data={data}
              fromToken={data.resp1.fromToken}
              toToken={data.resp1.toToken}
              toToken1={data.resp2.toToken}
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
              Swap3={
                SwapExchange?.find((swap) => {
                  return swap?.exchange == data?.resp3?.exchangeName;
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
            key={index}
          >
            {/* <ClearIcon
              onClick={exchangeModalClose}
              disabled={arbitrageLoader}
            /> */}
            <CrossExchangeModalComponentTraingularCalculator
              exchangeModalClose={CalculatorModalClose}
              crossExchangeData={crossExchangeData}
              onTradeArbitrage={onTradeArbitrage}
              data={data}
              fromToken={data.resp1.fromToken}
              toToken={data.resp1.toToken}
              toToken1={data.resp2.toToken}
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
              Swap3={
                SwapExchange?.find((swap) => {
                  return swap?.exchange == data?.resp3?.exchangeName;
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
      </Box>
    </>
  );
}

export default CrossExchangeMoreCard;
