import React, { useState, useEffect, useContext } from "react";
import {
  makeStyles,
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  Paper,
  FormHelperText,
} from "@material-ui/core";
import { FaCopy } from "react-icons/fa";
import CopyToCLipBoard from "copy-to-clipboard-react";
import ArbitrageABI from "src/ABI/ArbitrageABI.json";
import ERC20ABI from "src/ABI/IERC20ABI.json";
import Web3 from "web3";
import axios from "axios";
import { ClearIcon } from "@material-ui/icons/Clear";
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
  ShushiswapFactory,
  UniswapFactory,
} from "src/utils";
import { useWeb3React } from "@web3-react/core";
import { TokenAddressToUsed } from "src/constants";
import { toast } from "react-toastify";
import ButtonCircularProgress from "./ButtonCircularProgress";
import WalletConnectModal from "./ConnectWallet/WalletConnectModal";
import { UserContext } from "src/context/User";
import ExchangeABI from "src/ABI/ExchangeABI.json";
import { ExchangeContract } from "../utils/index";
import FactoryABI from "src/ABI/FactoryABI.json";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "15px",
    [theme.breakpoints.down("md")]: {
      overflowY: "scroll",
    },
    "& .headingBox": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& h6": {
        fontSize: "16px !important",
        lineHeight: "40px !important",
        fontWeight: "600",
      },
    },
    "& .mainBox": {
      "& .topBox": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "& h6": {
          fontSize: "16px !important",
          lineHeight: "40px !important",
        },
        "& p": {
          fontSize: "12px",
          wordBreak: "break-all",
          color: "#fff",
        },
      },
    },
  },
  mainTextBox: {
    "& h6": {
      fontSize: "14px !important",
      lineHeight: "25px !important",
      padding: "5px 0px 4px",
      fontWeight: "600",
    },
    "& p": {
      background: theme.palette.background.default,
      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "5px",
      fontSize: "12px",
      padding: "4px",
      marginBottom: "5px",
      color: theme.palette.primary.main,
      wordBreak: "break-all",
      // height: "19px",
    },

    "& input": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ffffff",
      fontWeight: 300,
      textAlign: "start",
      width: "100%",
      fontSize: "12px",
      lineHeight: "19px",
      "&:focus-visible": {
        outline: "none !important",
      },
    },
  },
  basebox: {
    "& p": {
      fontSize: "12px",
    },
  },
  text: {
    color: "#E59446 !important",
  },

  contentBox: {
    width: "50px",
    height: "15px",
    backgroundColor: "#A8C2AD",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    borderRadius: "5px",
    "& p": {
      color: theme.palette.primary.main,
    },
  },
}));

function CrossExchangeModalComponent(props) {
  const {
    exchangeModalClose,
    crossExchangeData,
    onTradeArbitrage,
    data,
    fromToken,
    toToken,
    Swap1,
    Swap2,
    arbitrageLoader,
    transHash,
  } = props;
  const classes = useStyles();
  const { activate, account, chainId, library, deactivate } = useWeb3React();
  const user = useContext(UserContext); // onClick={user.connectWallet}
  const [approveLoader, setApproveLoader] = useState(false);
  const [tokenAllowance, settokenAllowance] = useState("");
  const [ttokenAllowanceTF, settokenAllowanceTF] = useState(false);
  const [fromValue, setfromValue] = useState(10);
  const [openWallect, setOpenWallect] = useState(false);
  const [checkLoader, setCheckLoader] = useState(false);
  const [checkData, setCheckData] = useState({});
  const [myBalance, setmyBalance] = useState("");

  const [objectsToShow, setObjectsToShow] = useState({});

  const CheckTradeArbitrage = async (amount) => {
    try {
      setCheckLoader(true);
      const web3 = await getWeb3Obj();
      const amoutInWei = web3.utils.toWei(amount.toString());
      let RouterA;
      let FactoryA;
      let RouterB;
      let FactoryB;
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
        FactoryA = ShibaswapFactory;
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
        FactoryB = ShibaswapFactory;
      }
      const aTokenAddress = TokenAddressToUsed.filter(
        (data12) => data12.heading == fromToken
      )[0];
      const bTokenAddress = TokenAddressToUsed.filter(
        (data12) => data12.heading == toToken
      )[0];
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

      // const PairA = await getFactoryObjA.getPair(
      //   aTokenAddress?.token,
      //   bTokenAddress?.token
      // );
      // const PairB = await getFactoryObjB.getPair(
      //   bTokenAddress?.token,
      //   aTokenAddress?.token
      // );
      // console.log(
      //   RouterA,
      //   RouterB,
      //   aTokenAddress.token,
      //   bTokenAddress.token,
      //   amoutInWei
      // );
      // if (PairA != ZeroAddress && PairB != ZeroAddress) {
      const arbitrageObj = getContract(
        ExchangeContract,
        ExchangeABI,
        library,
        account
      );
      const comparePriceData = await arbitrageObj.getPriceSimple(
        RouterA,
        RouterB,
        aTokenAddress?.token,
        bTokenAddress?.token,
        amoutInWei
      );
      let obj = {
        status: comparePriceData[0],
        price: web3.utils.fromWei(comparePriceData[1].toString()),
      };
      // console.log("comparePriceData ----- obj", obj);
      setCheckLoader(false);
      setCheckData(obj);
      // } else {
      //   setCheckLoader(false);
      //   if (PairA == ZeroAddress && PairB == ZeroAddress) {
      //     toast.error(
      //       <span style={{ color: "#fff" }}>
      //         {`${aTokenAddress.heading} and ${
      //           bTokenAddress.heading
      //         } pair not found on ${
      //           Swap1 == Swap2 ? Swap1 : `${Swap1} and ${Swap2}`
      //         }exchanges`}
      //       </span>
      //     );
      //   } else {
      //     if (PairA != ZeroAddress && PairB == ZeroAddress) {
      //       toast.error(
      //         <span style={{ color: "#fff" }}>
      //           {`${aTokenAddress.heading} and ${bTokenAddress.heading} pair not found on ${Swap2} exchanges`}{" "}
      //         </span>
      //       );
      //     } else {
      //       toast.error(
      //         <span style={{ color: "#fff" }}>
      //           {`${aTokenAddress.heading} and ${bTokenAddress.heading} pair not found on ${Swap1} exchanges`}{" "}
      //         </span>
      //       );
      //     }
      //   }
      // }
    } catch (error) {
      setCheckLoader(false);
      console.log("---error", error);
      let Splic = error.message.split(":")[1].split('"')[1];
      toast.error(<span style={{ color: "#fff" }}>{Splic}</span>);
    }
  };
  const CheckmaxApproval = async () => {
    try {
      // setApproveLoader(true);
      // console.log("--------data-------", data);
      const web3 = await getWeb3Obj();
      const aTokenAddress = TokenAddressToUsed.filter(
        (data12) => data12.heading == fromToken
      )[0];
      // console.log("aTokenAddress===>>", aTokenAddress.token);
      const myContract = getContract(
        aTokenAddress.token,
        ERC20ABI,
        library,
        account
      );
      // console.log(
      //   ArbitrageContract,
      //   "<----arbitrage---myContract-->",
      //   myContract
      // );

      let allowance = await myContract.allowance(account, ArbitrageContract);
      // console.log("allowance", allowance);
      let getBalanceOf = await myContract.balanceOf(account);
      let deciamls = await myContract.decimals();

      setmyBalance(fromWeiDecimals(getBalanceOf.toString(), deciamls));

      if (
        Number(allowance) <
        Number(web3.utils.toWei(fromValue.toString(), "gwei"))
      ) {
        settokenAllowance(Number(allowance));
        settokenAllowanceTF(false);
        // console.log("284", Number(allowance));
      } else {
        settokenAllowance(Number(allowance));
        settokenAllowanceTF(true);
        // console.log("284", Number(allowance));
      }
    } catch (err) {
      setApproveLoader(false);
      console.log(err.message);
    }
  };
  const maxApproval = async () => {
    try {
      setApproveLoader(true);
      const web3 = await getWeb3Obj();
      const aTokenAddress = TokenAddressToUsed.filter(
        (data12) => data12.heading == fromToken
      )[0];
      const myContract = getContract(
        aTokenAddress.token,
        ERC20ABI,
        library,
        account
      );
      // console.log("myContract", myContract);

      let allowance = await myContract.allowance(account, ArbitrageContract);
      // console.log("allowance", allowance);

      if (
        Number(allowance) <
        Number(web3.utils.toWei(fromValue.toString(), "gwei"))
      ) {
        const allowance = await myContract.approve(
          ArbitrageContract,
          "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          {
            from: account,
            gasPrice: "50000000000",
            gasLimit: web3.utils.toHex("300000"),
          }
        );
        await allowance.wait();
        CheckmaxApproval();
        setApproveLoader(false);
      } else {
        settokenAllowance(Number(allowance));
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
  useEffect(() => {
    if (account) {
      CheckmaxApproval();
    }
  }, [account]);
  const UpdatesModals = () => {
    let RouterA;
    let FactoryA;
    let RouterB;
    let FactoryB;

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
    const aTokenAddress = TokenAddressToUsed.filter(
      (data12) => data12.heading == fromToken
    )[0];
    const bTokenAddress = TokenAddressToUsed.filter(
      (data12) => data12.heading == toToken
    )[0];
    let obj = {
      tokenA: aTokenAddress.token,
      tokenB: bTokenAddress.token,
      tokenNameA: aTokenAddress.heading,
      tokenNameB: bTokenAddress.heading,
      routerAddressA: RouterA,
      factoryAddressA: FactoryA,
      routerAddressB: RouterB,
      factoryAddressA: FactoryB,
      exchangeA: data?.data?.res1?.swap,
      exchangeB: data?.data?.res2?.swap,
    };
    // console.log("-----==obj--===>>", obj);
    setObjectsToShow(obj);
  };
  useEffect(() => {
    UpdatesModals();
  }, []);
  const HandleWalletModal = () => {
    setOpenWallect(true);
    user.connectWallet();
  };
  const CloseWalletModal = () => {
    setOpenWallect(false);
  };

  return (
    <Paper className={classes.root}>
      {/* <ClearIcon
        onClick={exchangeModalClose}
        disabled={arbitrageLoader || approveLoader}
      /> */}
      {openWallect && (
        <WalletConnectModal open={openWallect} handleClose={CloseWalletModal} />
      )}
      <Box className="headingBox">
        <Typography variant="h6">Cross Exchange Flash Loan Swap</Typography>
      </Box>
      <Grid container spacing={0} direction={"column"}>
        {/* {crossExchangeData &&
          crossExchangeData.map((data, index) => {
            return (
              <Grid item xs={12} key={index}>
                <Box className={classes.mainTextBox}>
                  <Typography variant="h6">{data?.name}</Typography>
                  <Typography variant="body1">
                    {data?.address}
                   
                  </Typography>
                </Box>
              </Grid>
            );
          })} */}
        <Grid item xs={12} key={1}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              {" "}
              From Factory ({objectsToShow?.exchangeA} v2) :{" "}
            </Typography>
            <Typography variant="body1">
              {" "}
              {objectsToShow?.factoryAddressA}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} key={2}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              From Router ({objectsToShow?.exchangeB} v2) :{" "}
            </Typography>
            <Typography variant="body1">
              {objectsToShow?.routerAddressA}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} key={1}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              To Factory ({objectsToShow?.exchangeB} v2) :{" "}
            </Typography>
            <Typography variant="body1">
              {" "}
              {objectsToShow?.factoryAddressA}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} key={2}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              To Router ({objectsToShow?.exchangeB} v2) :{" "}
            </Typography>
            <Typography variant="body1">
              {" "}
              {objectsToShow?.routerAddressB}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} key={2}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              Token A ({objectsToShow?.tokenNameA}):
            </Typography>
            <Typography variant="body1">{objectsToShow?.tokenA}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} key={2}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              Token B ({objectsToShow?.tokenNameB}) :{" "}
            </Typography>
            <Typography variant="body1">{objectsToShow?.tokenB}</Typography>
          </Box>
        </Grid>
        {/* <Grid item xs={12} key={2}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              Token C ({objectsToShow?.tokenNameC}) :{" "}
            </Typography>
            <Typography variant="body1">{objectsToShow?.tokenC}</Typography>
          </Box>
        </Grid> */}
        {data?.data?.res3?.status == "LOSS" && (
          <Grid item xs={12} key={2}>
            <Box className={classes.mainTextBox}>
              <Typography variant="h6">
                Arbitrage (
                <span style={{ color: "#e59446" }}>
                  {" "}
                  {`${objectsToShow?.tokenNameA}-${objectsToShow?.tokenNameB}`}{" "}
                </span>
                ) :{" "}
              </Typography>
              <Typography variant="body1" style={{ color: "#e59446" }}>
                No Arbitrage
              </Typography>
            </Box>
          </Grid>
        )}
        <Grid item xs={12} key={11}>
          <Box className={`numberTextField ${classes.mainTextBox}`}>
            <Typography variant="h6">
              Input Token A ({objectsToShow?.tokenNameA}) values{" "}
            </Typography>
            <Typography variant="body1">
              {" "}
              <input
                value={fromValue}
                onChange={(e) => setfromValue(e.target.value)}
                type="number"
              />{" "}
            </Typography>
            {myBalance < fromValue && data?.data?.res3?.status != "LOSS" && (
              <FormHelperText error>
                {`Insufficient ${objectsToShow?.tokenNameA} balance : ${myBalance} ${objectsToShow?.tokenNameA}`}
              </FormHelperText>
            )}
          </Box>
        </Grid>
      </Grid>
      <Box mt={2} mb={1}>
        <Divider />
      </Box>
      {/* {transHash && (
        <Box className="mainBox">
          <Box className="topBox">
            <Typography variant="h6">
              Check Your Transaction on EtherScan
            </Typography>
            <Typography variant="body1">
              0xfb0635a475ce37b6bf4d478e7c93360e631abed741544057051fa9a60ec.
            </Typography>
          </Box>
          <Box mb={1}>
            <Grid container spacing={0}>
              <Grid item xs={12} align="left">
                <Typography variant="body2">Test Results</Typography>
              </Grid>
              <Grid item xs={6} align="left">
                <Box className={classes.basebox}>
                  <Typography variant="body2">
                    Amount input of USDT in local:
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} align="right">
                <Box className={classes.basebox}>
                  <Typography variant="body2">9.991258566993</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} align="left">
                <Box className={classes.basebox}>
                  <Typography variant="body2">
                    Amount input of USDT in USD:
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} align="right">
                <Box className={classes.basebox}>
                  <Typography variant="body2">10.000</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} align="left">
                <Box className={classes.basebox}>
                  <Typography variant="body2">
                    Excess gained of USDT in local:
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} align="right">
                <Box className={classes.basebox}>
                  <Typography variant="body2">0.037070268352</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} align="left">
                <Box className={classes.basebox}>
                  <Typography variant="body2">
                    Excess gained of USDT in USD:
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} align="right">
                <Box className={classes.basebox}>
                  <Typography variant="body2" className={classes.text}>
                    0.037
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )} */}
      {!checkLoader && checkData?.price && (
        <Box className="mainBox">
          <Box className="topBox">
            <Typography variant="h6">Check Your Status</Typography>
            {/* <Typography variant="body1">
              0xfb0635a475ce37b6bf4d478e7c93360e631abed741544057051fa9a60ec.
            </Typography> */}
          </Box>
          <Box mb={1}>
            <Grid container spacing={0}>
              <Grid item xs={12} align="left">
                <Typography variant="body2">Test Results</Typography>
              </Grid>
              <Grid item xs={6} align="left">
                <Box className={classes.basebox}>
                  <Typography variant="body2">
                    Amount input of {fromToken} in {Swap1} exchenge :
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} align="right">
                <Box className={classes.basebox}>
                  <Typography variant="body2">{fromValue}</Typography>
                </Box>
              </Grid>

              <Grid item xs={6} align="left">
                <Box className={classes.basebox}>
                  <Typography variant="body2">
                    Amount out of {fromToken} in {Swap2} exchenge :
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} align="right">
                <Box className={classes.basebox}>
                  <Typography variant="body2">
                    {checkData?.price == 0
                      ? 0
                      : Number(checkData?.price) + Number(fromValue)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} align="left">
                <Box className={classes.basebox}>
                  <Typography variant="body2">
                    Excess gained of {fromToken} in (%) :
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} align="right">
                <Box className={classes.basebox}>
                  <Typography variant="body2" className={classes.text}>
                    {checkData?.price == 0
                      ? 0
                      : (checkData?.price / checkData?.price) * 100}{" "}
                    %
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
      {account ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} align="center">
            {/* {data?.resp4?.status != "LOSS" ? ( */}
            <Button
              variant="contained"
              style={{ backgroundColor: "#E59446", color: "#FFF" }}
              onClick={() => maxApproval()}
              fullWidth
              disabled={ttokenAllowanceTF || approveLoader}
            >
              {ttokenAllowanceTF
                ? `You can now trade ${objectsToShow?.tokenNameA}`
                : `Allow Protocal to use your ${objectsToShow?.tokenNameA}`}{" "}
              {approveLoader && <ButtonCircularProgress />}
            </Button>
            {/* ) : (
              <Button
                variant="contained"
                style={{ backgroundColor: "#E59446", color: "#e59446" }}
                fullWidth
                disabled
              >
                <span style={{ color: "#e59446" }}>Arbitrage Not Found</span>
              </Button>
            )} */}
          </Grid>
          <Grid item xs={4} sm={3} align="center">
            <Button
              variant="contained"
              style={{ backgroundColor: "#E59446", color: "#FFF" }}
              onClick={() => onTradeArbitrage(fromValue)}
              disabled={
                !ttokenAllowanceTF ||
                //  myBalance < fromValue ||
                arbitrageLoader
                // || data?.data?.res3?.status == "LOSS"
              }
            >
              Trade
              {arbitrageLoader && <ButtonCircularProgress />}
            </Button>
          </Grid>
          <Grid item xs={4} sm={3} align="center">
            <Button
              variant="contained"
              style={{ backgroundColor: "#811793", color: "#FFF" }}
              onClick={() => CheckTradeArbitrage(fromValue)}
              disabled={checkLoader}
            >
              Check {checkLoader && <ButtonCircularProgress />}
            </Button>
          </Grid>
          <Grid item xs={4} sm={3} align="center">
            <Button
              variant="contained"
              style={{ backgroundColor: "#213743", color: "#FFF" }}
              onClick={exchangeModalClose}
              disabled={arbitrageLoader || approveLoader}
            >
              close
            </Button>
          </Grid>
          {data?.data?.res3?.status != "LOSS" ? (
            <Grid item xs={4} sm={3} align="center">
              <Box className={classes.contentBox}>
                <Typography variant="body2">
                  {data?.data?.res3?.price}%
                </Typography>
              </Box>
            </Grid>
          ) : (
            <Grid item xs={4} sm={3} align="center">
              <Box className={classes.contentBox}>
                <Typography variant="body2">0</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={8} sm={8} align="center">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.connetwallet}
              // onClick={user.connectWallet}
              onClick={HandleWalletModal}
            >
              Connect Wallet
            </Button>
          </Grid>

          <Grid
            item
            xs={4}
            sm={4}
            align="center"
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              variant="contaiwned"
              style={{ backgroundColor: "#213743", color: "#FFF" }}
              onClick={exchangeModalClose}
              disabled={arbitrageLoader || approveLoader}
            >
              close
            </Button>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}

export default CrossExchangeModalComponent;
