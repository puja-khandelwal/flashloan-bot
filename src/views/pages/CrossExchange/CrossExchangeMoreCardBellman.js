import React, { useState } from "react";
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
} from "src/utils";
import { TokenAddressToUsed } from "src/constants";
// import CrossExchangeModalComponentTraingular from "./CrossExchangeModalComponentTraingular";
import { toast } from "react-toastify";
// import axios from "axios";
import ApiConfig from "src/config/APICongig";
import { ClearIcon } from "@material-ui/icons/Clear";
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

function CrossExchangeMoreCardBellman(props) {
  const classes = useStyles();
  const { data, index } = props;
  const { activate, account, chainId, library, deactivate } = useWeb3React();
  const [exchangeModalOpen, setExchangeModalOpen] = useState(false);
  const [arbitrageLoader, setArbitrageLoader] = useState(false);
  const [transHash, settransHash] = useState(false);
  const [flashLoan, setFlashLoan] = useState(false);
  const exchangeModalClose = () => {
    setExchangeModalOpen(false);
  };

  const onTradeArbitrage = async (amount) => {
    try {
      const web3 = await getWeb3Obj();
      const amoutInWei = web3.utils.toWei(amount.toString());
      // console.log("data--------swap------>>>", data);
      setArbitrageLoader(true);
      let RouterA;
      let FactoryA;
      let RouterB;
      let FactoryB;
      let SwapA;
      let SwapB;
      if (
        data?.resp1?.swap == data?.resp2?.swap &&
        data?.resp1?.swap != data?.resp3?.swap
      ) {
        SwapA = data?.resp1?.swap;
        SwapB = data?.resp3?.swap;
      }
      if (
        data?.resp1?.swap != data?.resp2?.swap &&
        data?.resp1?.swap == data?.resp3?.swap
      ) {
        SwapA = data?.resp1?.swap;
        SwapB = data?.resp3?.swap;
      }
      if (
        data?.resp1?.swap == data?.resp2?.swap &&
        data?.resp1?.swap == data?.resp3?.swap
      ) {
        SwapA = data?.resp1?.swap;
        SwapB = data?.resp3?.swap;
      }
      if (
        data?.resp1?.swap != data?.resp2?.swap &&
        data?.resp1?.swap != data?.resp3?.swap
      ) {
        SwapA = data?.resp1?.swap;
        SwapB = data?.resp3?.swap;
      }
      console.log("data===========>>>>data", data);
      console.log("SwapB===========>>>>SwapA", SwapB);
      console.log("SwapA===========>>>>SwapA", SwapA);
      console.log("SwapB===========>>>>SwapA", SwapB);

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
      console.log("getFactoryObj--AAAA--->>>", getFactoryObjA);
      const PairA = await getFactoryObjA.getPair(
        aTokenAddress?.token,
        bTokenAddress?.token
      );
      const PairB = await getFactoryObjA.getPair(
        bTokenAddress?.token,
        cTokenAddress?.token
      );

      console.log(data, "PairA------------------PairA", PairA);
      console.log("PairB------------------PairB", PairB);

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
              aTokenAddress?.token,
              bTokenAddress?.token,
              cTokenAddress?.token,
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
          console.log(
            "callTriangularArbitrage1 ----- ",
            callTriangularArbitrage1.hash
          );
        } else {
          const callTriangularArbitrage1 =
            await arbitrageObj.callTriangularFlashLoan(
              account,
              RouterA,
              RouterB,
              aTokenAddress?.token,
              bTokenAddress?.token,
              cTokenAddress?.token,
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
          console.log(
            "callTriangularArbitrage1 ----- ",
            callTriangularArbitrage1.hash
          );
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
          fromSwap: data?.resp1?.swap,
          toSwap: data?.resp1?.swap,
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

  return (
    <>
      <Box className={classes.root}>
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
                {data?.resp1?.swap == "Uniswap" && (
                  <img src="images/uniswap.png" alt="image" />
                )}
                {data?.resp1?.swap == "Sushiswap" && (
                  <img src="images/sushi.png" alt="image" />
                )}
                {data?.resp1?.swap == "Shibaswap" && (
                  <img src="images/shibaswap.png" alt="image" />
                )}
              </figure>
              <ArrowRightAltIcon className={classes.arrowright} />
              <figure>
                {data?.resp2?.swap == "Uniswap" && (
                  <img src="images/uniswap.png" alt="image" />
                )}
                {data?.resp2?.swap == "Sushiswap" && (
                  <img src="images/sushi.png" alt="image" />
                )}
                {data?.resp2?.swap == "Shibaswap" && (
                  <img src="images/shibaswap.png" alt="image" />
                )}
              </figure>
              <ArrowRightAltIcon className={classes.arrowright} />
              <figure>
                {data?.resp3?.swap == "Uniswap" && (
                  <img src="images/uniswap.png" alt="image" />
                )}
                {data?.resp3?.swap == "Sushiswap" && (
                  <img src="images/sushi.png" alt="image" />
                )}
                {data?.resp3?.swap == "Shibaswap" && (
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
                {parseFloat(data?.resp1?.price).toFixed(5)}
              </Typography>
            </Box>
          </Grid>{" "}
          <Grid item xs={6} align="center">
            <Box className={classes.mainContent}>
              <Typography variant="h6">{data?.resp1?.toToken}</Typography>
              <Typography variant="body1">
                {parseFloat(data?.resp1?.price).toFixed(5)}
              </Typography>
            </Box>
          </Grid>{" "}
          <Grid item xs={6} align="center">
            <Box className={classes.mainContent}>
              <Typography variant="h6">{data?.resp2?.fromToken}</Typography>
              <Typography variant="body1">
                {parseFloat(data?.resp2?.price).toFixed(5)}
              </Typography>
            </Box>
          </Grid>{" "}
          <Grid item xs={6} align="center">
            <Box className={classes.mainContent}>
              <Typography variant="h6">{data?.resp2?.toToken}</Typography>
              <Typography variant="body1">
                {parseFloat(data?.resp2?.price).toFixed(5)}
              </Typography>
            </Box>
          </Grid>{" "}
          <Grid item xs={6} align="center">
            <Box className={classes.mainContent}>
              <Typography variant="h6">{data?.resp3?.fromToken}</Typography>
              <Typography variant="body1">
                {parseFloat(data?.resp3?.price).toFixed(5)}
              </Typography>
            </Box>
          </Grid>{" "}
          <Grid item xs={6} align="center">
            <Box className={classes.mainContent}>
              <Typography variant="h6">{data?.resp3?.toToken}</Typography>
              <Typography variant="body1">
                {parseFloat(data?.resp3?.price).toFixed(5)}
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
            <Button variant="contained" color="primary" fullWidth>
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
              Swap1={data?.resp1?.swap}
              Swap2={data?.resp2?.swap}
              Swap3={data?.resp3?.swap}
              arbitrageLoader={arbitrageLoader}
              transHash={transHash}
              setFlashLoan={setFlashLoan}
              flashLoan={flashLoan}
              key={index}
            />
          </Dialog>
        )}
      </Box>
    </>
  );
}

export default CrossExchangeMoreCardBellman;
