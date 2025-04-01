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

function CrossExchangeCalculatorCard(props) {
  const classes = useStyles();
  const {
    data,
    index,
    setfromValue,
    fromValue,
    returnedValue,
    returnedValue1,
    returnedValue2,
  } = props;
  const { activate, account, chainId, library, deactivate } = useWeb3React();
  //   const [calculatorModalOpen, setcalculatorModalOpen] = useState(false);
  //   const [exchangeModalOpen, setExchangeModalOpen] = useState(false);
  //   const [arbitrageLoader, setArbitrageLoader] = useState(false);
  //   const [transHash, settransHash] = useState(false);
  //   const [flashLoan, setFlashLoan] = useState(false);
  const [tokens1, setTokens1] = useState(0);
  const [tokens2, setTokens2] = useState(0);
  const [tokens3, setTokens3] = useState(0);
  const [tokens4, setTokens4] = useState(0);
  const [tokens5, setTokens5] = useState(0);
  const [tokens6, setTokens6] = useState(0);

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
      const Swap3 = SwapExchange?.find((swap) => {
        return swap?.exchange == data?.resp3?.exchangeName;
      }).exchangeName;
      let SwapA;
      let SwapB;
      if (Swap1 == Swap2 && Swap1 != Swap3) {
        SwapA = Swap1;
        SwapB = Swap3;
        console.log(Swap1, "callTriangularArbitrage1 - 111", Swap3);
      }
      if (Swap1 != Swap2 && Swap1 == Swap3) {
        SwapA = Swap1;
        SwapB = Swap3;
        console.log(Swap1, "callTriangularArbitrage1 - 222", Swap3);
      }
      if (Swap1 != Swap2 && Swap2 == Swap3) {
        SwapA = Swap1;
        SwapB = Swap2;
        console.log(Swap1, "callTriangularArbitrage1 - 333", Swap2);
      }
      if (Swap1 == Swap2 && Swap1 == Swap3) {
        SwapA = Swap1;
        SwapB = Swap3;
        console.log(Swap1, "callTriangularArbitrage1 - 444", Swap2);
      }
      console.log(SwapA, "callTriangularArbitrage1 - EEEEE", SwapB);
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
      //   if (Swap1 == "Uniswap") {
      //     RouterA = UniswapRouter;
      //     FactoryA = UniswapFactory;
      //   }
      //   if (Swap1 == "Shibaswap") {
      //     RouterA = ShibaswapRouter;
      //     FactoryA = ShibaswapFactory;
      //   }
      //   if (Swap1 == "Sushiswap") {
      //     RouterA = ShushiswapRouter;
      //     FactoryA = ShushiswapFactory;
      //   }
      //   if (Swap2 == "Uniswap") {
      //     RouterB = UniswapRouter;
      //     FactoryB = UniswapFactory;
      //   }
      //   if (Swap2 == "Shibaswap") {
      //     RouterB = ShibaswapRouter;
      //     FactoryB = ShibaswapFactory;
      //   }
      //   if (Swap2 == "Sushiswap") {
      //     RouterB = ShushiswapRouter;
      //     FactoryB = ShushiswapFactory;
      //   }
      const aTokenAddress = data?.resp3?.profitAddress?.split("-> ")[0];

      let FactoryA1;
      let FactoryC1;
      if (Swap1 == "Uniswap") {
        FactoryA1 = UniswapFactory;
      }
      if (Swap1 == "Shibaswap") {
        FactoryA1 = ShibaswapFactory;
      }
      if (Swap1 == "Sushiswap") {
        FactoryA1 = ShushiswapFactory;
      }

      if (Swap3 == "Uniswap") {
        FactoryC1 = UniswapFactory;
      }
      if (Swap3 == "Shibaswap") {
        FactoryC1 = ShibaswapFactory;
      }
      if (Swap3 == "Sushiswap") {
        FactoryC1 = ShushiswapFactory;
      }

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
        data?.resp3?.profitAddress.split("-> ")[2],
        FactoryB
      );
      setTokens4(TokenD);
      const TokenE = await APITokenPriceHandler(
        data?.resp3?.profitAddress.split("-> ")[2],
        FactoryC1
      );
      setTokens5(TokenE);
      const TokenF = await APITokenPriceHandler(
        data?.resp3?.profitAddress.split("-> ")[2],
        FactoryC1
      );
      setTokens6(TokenF);
    } catch (error) {
      console.log("----cross-exchange----- 435 <<<<<<error>>>>>>", error);
    }
  };
  useEffect(() => {
    UpdatesModals();
  }, []);
  //   const exchangeModalClose = () => {
  //     setExchangeModalOpen(false);
  //   };
  //   const CalculatorModalClose = () => {
  //     setcalculatorModalOpen(false);
  //   };
  //   console.log("----cross-exchange----- <<<--- Swap --->>>");
  //   const onTradeArbitrage = async (amount) => {
  //     try {
  //       const web3 = await getWeb3Obj();
  //       const amoutInWei = web3.utils.toWei(amount.toString());
  //       // console.log("data--------swap------>>>", data);resp1
  //       setArbitrageLoader(true);
  //       let RouterA;
  //       let FactoryA;
  //       let RouterB;
  //       let FactoryB;
  //       let SwapA;
  //       let SwapB;
  //       if (
  //         SwapExchange?.find((swap) => {
  //           return swap?.exchange == data?.resp1?.exchangeName;
  //         }).exchangeName ==
  //           SwapExchange?.find((swap) => {
  //             return swap?.exchange == data?.resp2?.exchangeName;
  //           }).exchangeName &&
  //         SwapExchange?.find((swap) => {
  //           return swap?.exchange == data?.resp1?.exchangeName;
  //         }).exchangeName !=
  //           SwapExchange?.find((swap) => {
  //             return swap?.exchange == data?.resp3?.exchangeName;
  //           }).exchangeName
  //       ) {
  //         SwapA = SwapExchange?.find((swap) => {
  //           return swap?.exchange == data?.resp1?.exchangeName;
  //         }).exchangeName;
  //         SwapB = SwapExchange?.find((swap) => {
  //           return swap?.exchange == data?.resp3?.exchangeName;
  //         }).exchangeName;
  //       }
  //       if (
  //         SwapExchange?.find((swap) => {
  //           return swap?.exchange == data?.resp1?.exchangeName;
  //         }).exchangeName !=
  //           SwapExchange?.find((swap) => {
  //             return swap?.exchange == data?.resp2?.exchangeName;
  //           }).exchangeName &&
  //         SwapExchange?.find((swap) => {
  //           return swap?.exchange == data?.resp1?.exchangeName;
  //         }).exchangeName ==
  //           SwapExchange?.find((swap) => {
  //             return swap?.exchange == data?.resp3?.exchangeName;
  //           }).exchangeName
  //       ) {
  //         SwapA = SwapExchange?.find((swap) => {
  //           return swap?.exchange == data?.resp1?.exchangeName;
  //         }).exchangeName;
  //         SwapB = SwapExchange?.find((swap) => {
  //           return swap?.exchange == data?.resp3?.exchangeName;
  //         }).exchangeName;
  //       }
  //       if (
  //         SwapExchange?.find((swap) => {
  //           return swap?.exchange == data?.resp1?.exchangeName;
  //         }).exchangeName ==
  //           SwapExchange?.find((swap) => {
  //             return swap?.exchange == data?.resp2?.exchangeName;
  //           }).exchangeName &&
  //         SwapExchange?.find((swap) => {
  //           return swap?.exchange == data?.resp1?.exchangeName;
  //         }).exchangeName ==
  //           SwapExchange?.find((swap) => {
  //             return swap?.exchange == data?.resp3?.exchangeName;
  //           }).exchangeName
  //       ) {
  //         SwapA = SwapExchange?.find((swap) => {
  //           return swap?.exchange == data?.resp1?.exchangeName;
  //         }).exchangeName;
  //         SwapB = SwapExchange?.find((swap) => {
  //           return swap?.exchange == data?.resp3?.exchangeName;
  //         }).exchangeName;
  //       }
  //       if (
  //         SwapExchange?.find((swap) => {
  //           return swap?.exchange == data?.resp1?.exchangeName;
  //         }).exchangeName !=
  //           SwapExchange?.find((swap) => {
  //             return swap?.exchange == data?.resp2?.exchangeName;
  //           }).exchangeName &&
  //         SwapExchange?.find((swap) => {
  //           return swap?.exchange == data?.resp1?.exchangeName;
  //         }).exchangeName !=
  //           SwapExchange?.find((swap) => {
  //             return swap?.exchange == data?.resp3?.exchangeName;
  //           }).exchangeName
  //       ) {
  //         SwapA = SwapExchange?.find((swap) => {
  //           return swap?.exchange == data?.resp1?.exchangeName;
  //         }).exchangeName;
  //         SwapB = SwapExchange?.find((swap) => {
  //           return swap?.exchange == data?.resp3?.exchangeName;
  //         }).exchangeName;
  //       }

  //       if (SwapA == "Uniswap") {
  //         RouterA = UniswapRouter;
  //         FactoryA = UniswapFactory;
  //       }
  //       if (SwapA == "Shibaswap") {
  //         RouterA = ShibaswapRouter;
  //         FactoryA = ShibaswapFactory;
  //       }
  //       if (SwapA == "Sushiswap") {
  //         RouterA = ShushiswapRouter;
  //         FactoryA = ShushiswapFactory;
  //       }

  //       if (SwapB == "Uniswap") {
  //         RouterB = UniswapRouter;
  //         FactoryB = UniswapFactory;
  //       }
  //       if (SwapB == "Shibaswap") {
  //         RouterB = ShibaswapRouter;
  //         FactoryB = ShibaswapFactory;
  //       }
  //       if (SwapB == "Sushiswap") {
  //         RouterB = ShushiswapRouter;
  //         FactoryB = ShushiswapFactory;
  //       }
  //       const aTokenAddress = TokenAddressToUsed.filter(
  //         (data12) => data12.heading == data?.resp1?.fromToken
  //       )[0];
  //       // console.log("aTokenAddress ---- ", aTokenAddress);
  //       const bTokenAddress = TokenAddressToUsed.filter(
  //         (data12) => data12.heading == data?.resp1?.toToken
  //       )[0];
  //       // console.log("bTokenAddress ---- ", bTokenAddress);
  //       const cTokenAddress = TokenAddressToUsed.filter(
  //         (data12) => data12.heading == data?.resp2?.toToken
  //       )[0];
  //       // console.log("bTokenAddress ---- ", cTokenAddress);
  //       const arbitrageObj = getContract(
  //         ArbitrageContract,
  //         ArbitrageABI,
  //         library,
  //         account
  //       );
  //       console.log("arbitrageObj ---- ", arbitrageObj);
  //       const getFactoryObjA = getContract(
  //         FactoryA,
  //         FactoryABI,
  //         library,
  //         account
  //       );
  //       // console.log("getFactoryObj--AAAA--->>>", getFactoryObjA);
  //       const PairA = await getFactoryObjA.getPair(
  //         data?.resp4?.profitAddress.split("-> ")[0],
  //         data?.resp4?.profitAddress.split("-> ")[1]
  //       );
  //       const PairB = await getFactoryObjA.getPair(
  //         data?.resp4?.profitAddress.split("-> ")[1],
  //         data?.resp4?.profitAddress.split("-> ")[2]
  //       );

  //       // console.log(data, "PairA------------------PairA", PairA);
  //       // console.log("PairB------------------PairB", PairB);

  //       if (PairA != ZeroAddress && PairB != ZeroAddress) {
  //         // const registration = await arbitrageObj.registration();
  //         // console.log("registration---->>>", registration);
  //         // const registrationObj = getContract(
  //         //   registration,
  //         //   RegistrationABI,
  //         //   library,
  //         //   account
  //         // );
  //         // console.log("registrationObj---->>>", registrationObj);

  //         // const iSRegisterUser = await registrationObj.userInfo(account);
  //         // console.log("---iSRegisterUser-->>>", iSRegisterUser);
  //         // if (!iSRegisterUser.isRegistered) {
  //         //   const registerUser = await registrationObj.registerUser();
  //         //   await registerUser.wait();
  //         // }
  //         if (!flashLoan) {
  //           const callTriangularArbitrage1 =
  //             await arbitrageObj.callTriangularArbitrage(
  //               account,
  //               RouterA,
  //               RouterB,
  //               // RouterB,
  //               data?.resp4?.profitAddress.split("-> ")[0],
  //               data?.resp4?.profitAddress.split("-> ")[1],
  //               data?.resp4?.profitAddress.split("-> ")[2],
  //               amoutInWei
  //             );
  //           await callTriangularArbitrage1.wait();
  //           toast.success(
  //             <span
  //               style={{ color: "#fff" }}
  //             >{`${aTokenAddress.heading} trade successfull `}</span>
  //           );
  //           setArbitrageLoader(false);
  //           settransHash(callTriangularArbitrage1);
  //           buyTokenHandler(
  //             // aTokenAddress?.token,
  //             // bTokenAddress?.token,
  //             // cTokenAddress?.token,
  //             amount,
  //             data,
  //             callTriangularArbitrage1.hash,
  //             true
  //           );
  //           // console.log(
  //           //   "callTriangularArbitrage1 ----- ",
  //           //   callTriangularArbitrage1
  //           // );
  //           // console.log(
  //           //   "callTriangularArbitrage1 ----- ",
  //           //   callTriangularArbitrage1.hash
  //           // );
  //         } else {
  //           const callTriangularArbitrage1 =
  //             await arbitrageObj.callTriangularFlashLoan(
  //               account,
  //               RouterA,
  //               RouterB,
  //               data?.resp4?.profitAddress.split("-> ")[0],
  //               data?.resp4?.profitAddress.split("-> ")[1],
  //               data?.resp4?.profitAddress.split("-> ")[2],
  //               amoutInWei
  //             );
  //           await callTriangularArbitrage1.wait();
  //           toast.success(
  //             <span
  //               style={{ color: "#fff" }}
  //             >{`Flash Loan Trade successfull ${aTokenAddress.heading}-${bTokenAddress.heading}-${cTokenAddress.heading}`}</span>
  //           );
  //           setArbitrageLoader(false);
  //           settransHash(callTriangularArbitrage1.hash);
  //           // console.log(
  //           //   "callTriangularArbitrage1 ----- ",
  //           //   callTriangularArbitrage1
  //           // );
  //           // console.log(
  //           //   "callTriangularArbitrage1 ----- ",
  //           //   callTriangularArbitrage1.hash
  //           // );
  //         }
  //       } else {
  //         if (PairA == ZeroAddress) {
  //           toast.warn(
  //             <span style={{ color: "#fff" }}>
  //               {" "}
  //               liquidity not found in between pair {aTokenAddress.heading}-
  //               {bTokenAddress.heading}
  //             </span>
  //           );
  //           setArbitrageLoader(false);
  //         } else {
  //           toast.warn(
  //             <span style={{ color: "#fff" }}>
  //               {" "}
  //               {`liquidity not found in between pair ${bTokenAddress.heading}-${cTokenAddress.heading}`}
  //             </span>
  //           );
  //           setArbitrageLoader(false);
  //         }
  //       }
  //     } catch (error) {
  //       console.log("---error", error);
  //       setArbitrageLoader(false);
  //       buyTokenHandler(amount, data, "0", false);
  //       // toast.error(error.message);
  //       toast.error(<span style={{ color: "#fff" }}>{error.message}</span>);
  //     }
  //   };

  //   const buyTokenHandler = async (
  //     // aTokenAddress,
  //     // bTokenAddress,
  //     // cTokenAddress,
  //     amount,
  //     data,
  //     hash,
  //     transcationStatus
  //   ) => {
  //     try {
  //       const res = await axios({
  //         method: "POST",
  //         url: ApiConfig.buyToken,
  //         headers: {
  //           token:
  //             sessionStorage.getItem("token") ||
  //             localStorage.getItem("creatturAccessToken"),
  //         },
  //         data: {
  //           fromToken: data?.resp1?.fromToken,
  //           toToken: data?.resp1?.toToken,
  //           fromSwap: SwapExchange?.find((swap) => {
  //             return swap?.exchange == data?.resp1?.exchangeName;
  //           }).exchangeName,
  //           toSwap: SwapExchange?.find((swap) => {
  //             return swap?.exchange == data?.resp1?.exchangeName;
  //           }).exchangeName,
  //           price: data?.resp4?.price.toString(),
  //           PLStatus: data?.resp4?.status,
  //           arbitrageType: "TRIANGULAR",
  //           transactionHash: hash,
  //           transcationStatus: transcationStatus,
  //         },
  //       });
  //       if (res) {
  //         // setUserData(res.data.result);
  //         // console.log("total-----results:----", res);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const priceCheck = async () => {
  //     try {
  //       let Swap1 = SwapExchange?.find((swap) => {
  //         return swap?.exchange == data?.resp1?.exchangeName;
  //       }).exchangeName;
  //       let Swap2 = SwapExchange?.find((swap) => {
  //         return swap?.exchange == data?.resp2?.exchangeName;
  //       }).exchangeName;
  //       let Swap3 = SwapExchange?.find((swap) => {
  //         return swap?.exchange == data?.resp3?.exchangeName;
  //       }).exchangeName;

  //       let FactoryA;
  //       let FactoryB;
  //       let FactoryC;

  //       if (Swap1 == "Uniswap") {
  //         FactoryA = UniswapFactory;
  //       }
  //       if (Swap1 == "Shibaswap") {
  //         FactoryA = ShibaswapFactory;
  //       }
  //       if (Swap1 == "Sushiswap") {
  //         FactoryA = ShushiswapFactory;
  //       }
  //       if (Swap2 == "Uniswap") {
  //         FactoryB = UniswapFactory;
  //       }
  //       if (Swap2 == "Shibaswap") {
  //         FactoryB = ShibaswapFactory;
  //       }
  //       if (Swap2 == "Sushiswap") {
  //         FactoryB = ShushiswapFactory;
  //       }
  //       if (Swap3 == "Uniswap") {
  //         FactoryC = UniswapFactory;
  //       }
  //       if (Swap3 == "Shibaswap") {
  //         FactoryC = ShibaswapFactory;
  //       }
  //       if (Swap3 == "Sushiswap") {
  //         FactoryC = ShushiswapFactory;
  //       }
  //       let tokens = data?.resp4?.profitAddress.split("-> ");

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   useEffect(() => {
  //     priceCheck();
  //   }, []);

  return (
    <>
      <Box className={classes.root} key={index}>
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
              {/* <Typography variant="body1">
                {parseFloat(data?.resp1?.fromPrice).toFixed(5)}
              </Typography> */}{" "}
              <input
                value={fromValue}
                onChange={(e) => setfromValue(e.target.value)}
                type="number"
              />{" "}
              <Typography variant="body1">
                <span>${parseFloat(tokens1 * fromValue).toFixed(8)}</span>
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
                {/* ${tokens2 * data?.resp1?.toPrice} */}
                <span>${parseFloat(tokens2 * returnedValue).toFixed(8)}</span>
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
                {/* ${tokens3 * data?.resp2?.fromPrice} */}
                <span>${parseFloat(tokens3 * returnedValue).toFixed(8)}</span>
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
                {/* ${tokens4 * data?.resp2?.toPrice} */}
                <span>${parseFloat(tokens4 * returnedValue1).toFixed(8)}</span>
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
                {/* ${tokens5 * data?.resp3?.fromPrice} */}
                <span>${parseFloat(tokens5 * returnedValue1).toFixed(8)}</span>
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
                {/* ${tokens6 * data?.resp3?.toPrice} */}
                <span>${parseFloat(tokens6 * returnedValue2).toFixed(8)}</span>
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
          {/* <Grid item xs={6} align="center">
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
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
}

export default CrossExchangeCalculatorCard;
