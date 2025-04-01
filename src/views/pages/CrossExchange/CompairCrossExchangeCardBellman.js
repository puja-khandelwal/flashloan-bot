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
} from "src/utils";
import { TokenAddressToUsed } from "src/constants";
import { toast } from "react-toastify";
import FactoryABI from "src/ABI/FactoryABI.json";
import RegistrationABI from "src/ABI/RegistrationABI.json";
import Exchange from "../Home/Exchange";

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
    width: "100%",
    "& h6": {
      color: theme.palette.primary.main,
      fontSize: "16px",
      fontWeight: "400",
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

function CompairCrossExchangeCardBellman(props) {
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
      setArbitrageLoader(true);

      // console.log("data?.data--------swap------>>>", data?.data);
      // console.log("data?.data?.resp1?.swap------>>>", data?.data?.resp1?.swap);
      let priceData;
      //   if (data?.resp3?.status == "PROFIT") {
      priceData = data?.resp2?.price - data?.resp1?.price;
      //   }
      //   if (data?.resp3?.status == "LOSS") {
      //     priceData = data?.resp1?.fromPrice - data?.resp2?.toPrice;
      //   }
      console.log(data?.resp3?.status, "price-------->>>>>", priceData);
      let RouterA;
      let FactoryA;
      let RouterB;
      let FactoryB;
      if (data?.resp1?.swap == "Uniswap") {
        RouterA = UniswapRouter;
        FactoryA = UniswapFactory;
      }
      if (data?.resp1?.swap == "Shibaswap") {
        RouterA = UniswapRouter;
        FactoryA = ShibaswapFactory;
      }
      if (data?.resp1?.swap == "Sushiswap") {
        RouterA = ShushiswapRouter;
        FactoryA = ShushiswapFactory;
      }

      if (data?.resp2?.swap == "Uniswap") {
        RouterB = UniswapRouter;
        FactoryB = UniswapFactory;
      }
      if (data?.resp2?.swap == "Shibaswap") {
        RouterB = ShibaswapRouter;
        FactoryB = ShibaswapFactory;
      }
      if (data?.resp2?.swap == "Sushiswap") {
        RouterB = ShushiswapRouter;
        FactoryB = ShushiswapFactory;
      }
      const aTokenAddress = TokenAddressToUsed.filter(
        (data12) => data12.heading == data?.resp1?.fromToken
      )[0];
      console.log("aTokenAddress ---- ", aTokenAddress);
      const bTokenAddress = TokenAddressToUsed.filter(
        (data12) => data12.heading == data?.resp1?.toToken
      )[0];
      console.log("bTokenAddress ---- ", bTokenAddress);
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
      const PairA = await getFactoryObjA.getPair(
        aTokenAddress?.token,
        bTokenAddress?.token
      );
      const PairB = await getFactoryObjB.getPair(
        bTokenAddress?.token,
        aTokenAddress?.token
      );

      console.log(data, "PairA------------------PairA", PairA);
      console.log("PairB------------------PairB", PairB);
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
        // // console.log("---iSRegisterUser-->>>", iSRegisterUser);
        // if (!iSRegisterUser.isRegistered) {
        //   const registerUser = await registrationObj.registerUser();
        //   await registerUser.wait();
        // }
        if (!flashLoan) {
          const callSimpleArbitrage = await arbitrageObj.callSimpleArbitrage(
            account,
            RouterA,
            RouterB,
            aTokenAddress?.token,
            bTokenAddress?.token,
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
            aTokenAddress?.token,
            bTokenAddress?.token,
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
              {`liquidity not found for exchange ${data?.resp1?.swap} in between pair ${aTokenAddress.heading}-${bTokenAddress.heading}`}
            </span>
          );
          setArbitrageLoader(false);
        } else if (PairB == ZeroAddress) {
          toast.warn(
            <span
              style={{ color: "#fff" }}
            >{`liquidity not found for exchange ${data?.resp2?.swap} in between pair ${bTokenAddress.heading}-${aTokenAddress.heading}`}</span>
          );
          setArbitrageLoader(false);
        } else {
          toast.warn(
            <span
              style={{ color: "#fff" }}
            >{`liquidity not found for exchange ${data?.resp1?.swap} && ${data?.resp2?.swap} in between pair ${bTokenAddress.heading}-${aTokenAddress.heading}`}</span>
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
    // if (data?.resp3?.status == "PROFIT") {
    priceData = data?.resp2?.price - data?.resp1?.price;
    // }
    // if (data?.resp3?.status == "LOSS") {
    //   priceData = data?.resp1?.fromPrice - data?.resp2?.toPrice;
    // }
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
          PLStatus: "PROFIT",
          arbitrageType: "SIMPLE",
          transactionHash: hash,
          transcationStatus: transcationStatus,
        },
      });
      if (res) {
        // setUserData(res.data.result);
        //
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("total--data-----data:----", data);
  return (
    <>
      <Box className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
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
                {/* {data?.resp1?.swap == "Uniswap" && (
                <img src="images/CrossExchangeCoin01.png" alt="image" />
                )} */}
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
                  {data?.resp1?.swap ? data?.resp1?.swap : ""}
                </Typography>
                {/* {data?.resp3?.status != "LOSS" ? ( */}
                <Box className={classes.exchange}>
                  <Typography variant="h6">{data?.resp3?.gain}</Typography>
                  &nbsp;
                  <Typography variant="h6">
                    <span>{data?.resp3?.status ? "%" : ""}</span>
                  </Typography>
                </Box>
                {/* ) : (
                  <Box className={classes.exchange}>
                
                    <Typography variant="h6">
                      <span>No Arbitrage</span>
                    </Typography>
                  </Box>
                )} */}
              </Box>

              <Divider />
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.content}>
              <Typography variant="h6">
                {data?.resp1?.price ? data?.resp1?.price : "N/A"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.content}>
              <Typography variant="h6">
                {data?.resp1?.price
                  ? parseFloat(data?.resp1?.price).toFixed(6)
                  : "N/A"}
              </Typography>
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
                  {data?.resp2?.swap ? data?.resp2?.swap : "N/A"}
                </Typography>
              </Box>

              <Divider />
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.content}>
              <Typography variant="h6">
                {data?.resp2?.price
                  ? parseFloat(data?.resp2?.price).toFixed(6)
                  : "N/A"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.content}>
              <Typography variant="h6">
                {data?.resp2?.price
                  ? parseFloat(data?.resp2?.price).toFixed(6)
                  : "N/A"}
              </Typography>
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
        </Grid>
        {exchangeModalOpen && (
          <Dialog
            fullWidth
            maxWidth="sm"
            open={exchangeModalOpen}
            style={{ overflow: "auto" }}
            key={index}
          >
            <CrossExchangeModalComponent
              exchangeModalClose={exchangeModalClose}
              crossExchangeData={crossExchangeData}
              onTradeArbitrage={onTradeArbitrage}
              data={data}
              fromToken={data?.resp1?.fromToken}
              toToken={data?.resp1?.toToken}
              Swap1={data?.resp1?.swap}
              Swap2={data?.resp2?.swap}
              arbitrageLoader={arbitrageLoader}
              transHash={transHash}
              setFlashLoan={setFlashLoan}
              flashLoan={flashLoan}
              // key={1}
              key={index}
            />
          </Dialog>
        )}
      </Box>
    </>
  );
}

export default CompairCrossExchangeCardBellman;
