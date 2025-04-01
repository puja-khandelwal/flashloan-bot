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
import RegistrationABI from "src/ABI/RegistrationABI.json";
import axios from "axios";
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
import ApiConfig from "src/config/APICongig";

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

function CrossExchangeCard(props) {
  const classes = useStyles();
  const { data } = props;
  // console.log("----cross-exchange----- <<<--- Swap --->>>");
  const { activate, account, chainId, library, deactivate } = useWeb3React();
  const [exchangeModalOpen, setExchangeModalOpen] = useState(false);
  const [arbitrageLoader, setArbitrageLoader] = useState(false);
  const [transHash, settransHash] = useState(false);
  const exchangeModalClose = () => {
    setExchangeModalOpen(false);
  };

  const onTradeArbitrage = async (amount) => {
    try {
      const web3 = await getWeb3Obj();
      const amoutInWei = web3.utils.toWei(amount.toString());
      setArbitrageLoader(true);

      // console.log("data?.data--------swap------>>>", data?.data);
      // console.log("data?.data?.res1?.swap------>>>", data?.data?.res1?.swap);
      let RouterA;
      let FactoryA;
      let RouterB;
      let FactoryB;
      if (data?.data?.res1?.swap == "Uniswap") {
        RouterA = UniswapRouter;
        FactoryA = UniswapFactory;
      }
      if (data?.data?.res1?.swap == "Shibaswap") {
        RouterA = ShibaswapRouter;
        FactoryA = ShibaswapFactory;
      }
      if (data?.data?.res1?.swap == "Sushiswap") {
        RouterA = ShushiswapRouter;
        FactoryA = ShushiswapFactory;
      }

      if (data?.data?.res2?.swap == "Uniswap") {
        RouterB = UniswapRouter;
        FactoryB = UniswapFactory;
      }
      if (data?.data?.res2?.swap == "Shibaswap") {
        RouterB = ShibaswapRouter;
        FactoryB = ShibaswapFactory;
      }
      if (data?.data?.res2?.swap == "Sushiswap") {
        RouterB = ShushiswapRouter;
        FactoryB = ShushiswapFactory;
      }
      const aTokenAddress = TokenAddressToUsed.filter(
        (data12) => data12.heading == data?.data?.res1?.fromToken
      )[0];
      // console.log("aTokenAddress ---- ", aTokenAddress);
      const bTokenAddress = TokenAddressToUsed.filter(
        (data12) => data12.heading == data?.data?.res1?.toToken
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
        FactoryA,
        FactoryABI,
        library,
        account
      );

      const PairA = await getFactoryObjA.getPair(
        aTokenAddress?.token,
        bTokenAddress?.token
      );
      const PairB = await getFactoryObjB.getPair(
        bTokenAddress?.token,
        aTokenAddress?.token
      );

      // console.log("PairA------------------PairA", PairA);
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
        // // console.log("registrationObj---->>>", registrationObj);
        // const iSRegisterUser = await registrationObj.userInfo(account);
        // if (!iSRegisterUser.isRegistered) {
        //   const registerUser = await registrationObj.registerUser();
        //   await registerUser.wait();
        // }
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
        toast.success(`${aTokenAddress.heading} trade successfull `);
        // console.log("callSimpleArbitrage ----- ", callSimpleArbitrage);
        setArbitrageLoader(false);
        settransHash(callSimpleArbitrage.hash);
        buyTokenHandler(
          // aTokenAddress?.token,
          // bTokenAddress?.token,
          amount,
          data,
          callSimpleArbitrage.hash,
          true
          // "jdfghjksdhgk"
        );
        // } else {
        //   toast.warn("User not register");
        // }
      } else {
        if (PairA == ZeroAddress) {
          toast.warn(
            `liquidity not found for exchange ${data?.data?.res1?.swap} in between pair ${aTokenAddress.heading}-${bTokenAddress.heading}`
          );
          setArbitrageLoader(false);
        } else {
          toast.warn(
            `liquidity not found for exchange ${data?.data?.res2?.swap} in between pair ${bTokenAddress.heading}-${aTokenAddress.heading}`
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
      );
      // toast.error(error.message);
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
    // console.log("data?.data?.res1?.swap-------", data);
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
          fromToken: data?.data?.res1?.fromToken,
          toToken: data?.data?.res1?.toToken,
          fromSwap: data?.data?.res1?.swap,
          toSwap: data?.data?.res1?.swap,
          price: data?.data?.res3?.price.toString(),
          PLStatus: data?.data?.res3?.status,
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

  return (
    <>
      <Box className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Box className={classes.coinBox}>
              {/* <figure>
                <img src="images/CrossExchangeCoin01.png" alt="image" />
              </figure>
              <ArrowRightAltIcon className={classes.arrowright} />
              <figure>
                <img src="images/CrossExchangeCoin02.png" alt="image" />
              </figure> */}
              <Box className={classes.coinBox}>
                <figure>
                  {data?.data?.res1?.swap == "Uniswap" && (
                    <img src="images/uniswap.png" alt="image" />
                    // <img src="images/shibaswap.png" alt="image" />
                  )}
                  {data?.data?.res1?.swap == "Sushiswap" && (
                    <img src="images/sushi.png" alt="image" />
                  )}
                  {data?.data?.res1?.swap == "Shibaswap" && (
                    <img src="images/shibaswap.png" alt="image" />
                  )}
                </figure>
                <ArrowRightAltIcon className={classes.arrowright} />
                <figure>
                  {data?.data?.res2?.swap == "Uniswap" && (
                    <img src="images/uniswap.png" alt="image" />
                  )}
                  {data?.data?.res2?.swap == "Sushiswap" && (
                    <img src="images/sushi.png" alt="image" />
                  )}
                  {data?.data?.res2?.swap == "Shibaswap" && (
                    <img src="images/shibaswap.png" alt="image" />
                  )}
                </figure>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={7} align="center">
            <Box className={classes.utctext}>
              <Typography variant="body1">{data?.date}</Typography>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box mt={1} mb={1}>
              <Box className={classes.exchange}>
                <Typography variant="h6">
                  {data?.data?.res1?.swap ? data?.data?.res1?.swap : "N/A"}
                </Typography>
                {data?.data?.res3?.status != "LOSS" ? (
                  <Box className={classes.exchange}>
                    <Typography variant="h6">
                      {data?.data?.res3?.price}
                    </Typography>
                    &nbsp;
                    <Typography variant="h6">
                      <span>
                        {data?.data?.res3?.status
                          ? data?.data?.res3?.status
                          : "N/A"}
                      </span>
                    </Typography>
                  </Box>
                ) : (
                  <Box className={classes.exchange}>
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
            <Box className={classes.content}>
              <Typography variant="h6">
                {data?.data?.res1?.fromPrice
                  ? data?.data?.res1?.fromPrice
                  : "N/A"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.content}>
              <Typography variant="h6">
                {data?.data?.res1?.toPrice
                  ? parseFloat(data?.data?.res1?.toPrice).toFixed(5)
                  : "N/A"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.contentBox}>
              <Typography variant="body2">
                {data?.data?.res1?.fromToken
                  ? data?.data?.res1?.fromToken
                  : "N/A"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.contentBox}>
              <Typography variant="body2">
                {data?.data?.res1?.toToken ? data?.data?.res1?.toToken : "N/A"}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box mt={1} mb={1}>
              <Box className={classes.exchange}>
                <Typography variant="h6">
                  {data?.data?.res2?.swap ? data?.data?.res2?.swap : "N/A"}
                </Typography>
              </Box>

              <Divider />
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.content}>
              <Typography variant="h6">
                {data?.data?.res2?.fromPrice
                  ? parseFloat(data?.data?.res2?.fromPrice).toFixed(5)
                  : "N/A"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.content}>
              <Typography variant="h6">
                {data?.data?.res2?.toPrice
                  ? parseFloat(data?.data?.res2?.toPrice).toFixed(5)
                  : "N/A"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.contentBox}>
              <Typography variant="body2">
                {data?.data?.res2?.fromToken
                  ? data?.data?.res2?.fromToken
                  : "N/A"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} align="center">
            <Box className={classes.contentBox}>
              <Typography variant="body2">
                {data?.data?.res2?.toToken ? data?.data?.res2?.toToken : "N/A"}
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
          >
            <CrossExchangeModalComponent
              exchangeModalClose={exchangeModalClose}
              crossExchangeData={crossExchangeData}
              onTradeArbitrage={onTradeArbitrage}
              data={data}
              fromToken={data?.data?.res1?.fromToken}
              toToken={data?.data?.res1?.toToken}
              Swap1={data?.data?.res1?.swap}
              Swap2={data?.data?.res2?.swap}
              arbitrageLoader={arbitrageLoader}
              transHash={transHash}
            />
          </Dialog>
        )}
      </Box>
    </>
  );
}

export default CrossExchangeCard;
