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
  Switch,
} from "@material-ui/core";
import { FaCopy } from "react-icons/fa";
import CopyToCLipBoard from "copy-to-clipboard-react";
import ArbitrageABI from "src/ABI/ArbitrageABI.json";
import ERC20ABI from "src/ABI/IERC20ABI.json";
import Web3 from "web3";
import axios from "axios";
import { ClearIcon } from "@material-ui/icons/Clear";
// import ArbitrageABI from "src/ABI/ArbitrageABI.json";
import {
  UniswapRouter,
  ShibaswapRouter,
  ShushiswapRouter,
  getWeb3Obj,
  getWeb3ContractObject,
  getContract,
  ZeroAddress,
  fromWeiDecimals,
  toWeiDecimals,
  ArbitrageContract,
  ShibaswapFactory,
  ShushiswapFactory,
  UniswapFactory,
  APITokenPriceHandler,
  APIGasHandler,
  EstimateGasHandler,
  ExtimatedGasLimit,
  amountGetout,
} from "src/utils";
import { useWeb3React } from "@web3-react/core";
import { TokenAddressToUsed } from "src/constants";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import WalletConnectModal from "src/component/ConnectWallet/WalletConnectModal";
import { UserContext } from "src/context/User";
import ExchangeABI from "src/ABI/ExchangeABI.json";
import { ExchangeContract } from "src/utils/index";
import ThreeDotLoader from "src/component/ThreeDotLoader";
import FactoryABI from "src/ABI/FactoryABI.json";
import CalculatorCards from "./CalculatorCards";

export const walletAddress = "0x84FEb55614F3f4849B58Cb019f0E10cde1139Ced";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "15px",
    [theme.breakpoints.down("md")]: {
      overflowY: "auto",
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
      color: theme.palette.primary.main,
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      borderBottom: "1px solid black",
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

function CrossExchangeModalComponentCalculator(props) {
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
    flashLoan,
    setFlashLoan,
    index,
  } = props;
  const classes = useStyles();
  const { activate, account, chainId, library, deactivate } = useWeb3React();
  const user = useContext(UserContext); // onClick={user.connectWallet}
  const [approveLoader, setApproveLoader] = useState(false);
  const [tokenAllowance, settokenAllowance] = useState("");
  const [ttokenAllowanceTF, settokenAllowanceTF] = useState(false);
  const [fromValue, setfromValue] = useState(data?.resp1?.fromPrice);
  const [openWallect, setOpenWallect] = useState(false);
  const [startLoader, setStartLoader] = useState(true);
  const [myBalance, setmyBalance] = useState(0);
  const [ExtimatedGasFee, setExtimatedGasFee] = useState(0);
  const [tokens2, setTokens2] = useState(0);
  const [tokens1, setTokens1] = useState(0);
  const [returnedValue, setreturnedValue] = useState(0);
  const [returnedValue1, setreturnedValue1] = useState(0);

  // console.log("callTriangularArbitrage1 -------", data);
  // console.log("callTriangularArbitrage1 -------", data);
  const Tokens = data?.resp3?.profitAddress?.split("-> ");
  //  data?.resp3?.profitAddress.split("-> ");
  const [objectsToShow, setObjectsToShow] = useState({});
  // console.log("props-----", props);
  const [checkLoader, setCheckLoader] = useState(false);
  const [checkData, setCheckData] = useState({});

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

      const PairA = await getFactoryObjA.getPair(Tokens[0], Tokens[1]);
      const PairB = await getFactoryObjB.getPair(Tokens[1], Tokens[0]);

      const arbitrageObj = getContract(
        ExchangeContract,
        ExchangeABI,
        library,
        account
      );

      const comparePriceData = await arbitrageObj.getPriceSimple(
        RouterA,
        RouterB,
        Tokens[0],
        Tokens[1],
        amoutInWei
      );

      let obj = {
        status: comparePriceData[0],
        price: web3.utils.fromWei(comparePriceData[1].toString()),
      };
      setCheckLoader(false);
      setCheckData(obj);
    } catch (error) {
      setCheckLoader(false);
      let Splic = error.message?.split(":");
      // console.log("--- ----cross-exchange----- Splic ", Splic);
      toast.error(<span style={{ color: "#fff" }}>{Splic[0]}</span>);
    }
  };
  const CheckmaxApproval = async () => {
    try {
      //
      setStartLoader(true);
      // console.log("--------data-------", data);
      const web3 = await getWeb3Obj();

      // let Tokens = data?.resp3?.profitAddress.split("-> ");
      // console.log("----cross-exchange----- ---- data?.toTokenId", Tokens);
      const myContract = getContract(Tokens[0], ERC20ABI, library, account);
      // console.log(
      //   ArbitrageContract,
      //   "<----arbitrage---myContract-->",
      //   myContract
      // );

      let allowance = await myContract.allowance(account, ArbitrageContract);
      console.log("allowance", allowance);
      let getBalanceOf = await myContract.balanceOf(account);
      let deciamls = await myContract.decimals();

      setmyBalance(fromWeiDecimals(getBalanceOf.toString(), deciamls));

      if (
        Number(allowance) <
        Number(web3.utils.toWei(fromValue.toString(), "gwei"))
      ) {
        settokenAllowance(Number(allowance));
        settokenAllowanceTF(false);
        console.log("284", Number(allowance));
        setStartLoader(false);
      } else {
        settokenAllowance(Number(allowance));
        settokenAllowanceTF(true);
        console.log("284", Number(allowance));
        setStartLoader(false);
      }
    } catch (err) {
      setApproveLoader(false);
      console.log(err.message);
      setStartLoader(false);
    }
  };
  const maxApproval = async () => {
    try {
      setApproveLoader(true);
      const web3 = await getWeb3Obj();
      const aTokenAddress = TokenAddressToUsed.filter(
        (data12) => data12.heading == fromToken
      )[0];

      // let Tokens = data?.resp3?.profitAddress.split("-> ");
      const myContract = getContract(Tokens[0], ERC20ABI, library, account);
      console.log("myContract", myContract);

      let allowance = await myContract.allowance(account, ArbitrageContract);
      console.log("allowance", allowance);

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
        <span style={{ color: "#fff" }}>
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
  const UpdatesModals = async () => {
    try {
      const web3 = await getWeb3Obj();
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

      let obj = {
        tokenA: Tokens[0],
        tokenB: Tokens[1],
        tokenNameA: aTokenAddress?.heading,
        tokenNameB: bTokenAddress?.heading,
        routerAddressA: RouterA,
        factoryAddressA: FactoryA,
        routerAddressB: RouterB,
        factoryAddressA: FactoryB,
        exchangeA: data?.data?.resp1?.swap,
        exchangeB: data?.data?.resp2?.swap,
      };
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
      const TokenB = await APITokenPriceHandler(
        data?.resp3?.profitAddress.split("-> ")[0],
        FactoryB
      );

      setTokens2(TokenB);
      setTokens1(TokenA);

      setObjectsToShow(obj);

      const arbitrageObj12 = getContract(
        ArbitrageContract,
        ArbitrageABI,
        library,
        account
      );
      console.log(
        "callTriangularArbitrage1 --------arbitrageObj12",
        arbitrageObj12
      );
      const arbitrageObj = await getWeb3ContractObject(
        ArbitrageABI,
        ArbitrageContract
      );
      const myContractERC = await getWeb3ContractObject(
        ERC20ABI,
        data?.resp3?.profitAddress.split("-> ")[0]
        // library,
        // account
      );
      //   console.log("myContract", myContractERC);
      //   const decimals12 = myContractERC.methods.deciamls();
      //   console.log("decimals -----", decimals12);

      const amoutInWei = web3.utils.toWei(fromValue.toString());
      // const PriceAPI = await APITokenPriceHandler(
      //   data?.resp3?.profitAddress.split("-> ")[0],
      //   FactoryA
      // ); // price in usd

      var gasprice = await web3.eth.getGasPrice();
      //https://api.coingecko.com/api/v3/coins/ethereum/contract/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
      const EstimatePriceAPI = await APIGasHandler();
      const getWethPriceInDollor = await axios.get(
        `https://api.coingecko.com/api/v3/coins/ethereum/contract/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`,
        {
          // params: {
          //   module: "gastracker", //
          //   action: "gasoracle", //
          //   apikey: "D6BJ2PSTWXGWNGT86SIPDBFTRZPBK5P35H", //
          // },
        }
      );
      console.log(
        "  callTriangularArbitrage1 ----- getWethPriceInDollor ",
        getWethPriceInDollor?.data?.market_data?.current_price?.usd
      );
      console.log(
        gasprice,
        EstimatePriceAPI,
        "  callTriangularArbitrage1 ----- DATAEncode  "
      );
      let GesFeeFunctions =
        (ExtimatedGasLimit * Number(EstimatePriceAPI)) / Math.pow(10, 9);
      console.log("  callTriangularArbitrage1 ----- 12344", GesFeeFunctions);

      let Price =
        Number(
          getWethPriceInDollor?.data?.market_data?.current_price?.usd
            ? getWethPriceInDollor?.data?.market_data?.current_price?.usd
            : 1
        ) * Number(GesFeeFunctions);
      console.log(
        "  callTriangularArbitrage1 ----- getWethPriceInDollor ",
        Price
      );
      setExtimatedGasFee(Price);
    } catch (error) {
      console.log("----cross-exchange----- 435 <<<<<<error>>>>>>", error);
    }
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

  const EstimateGasHandler = async (ABI, ContractAddress, Address) => {
    try {
      const web3 = await getWeb3Obj();
      const amoutInWei = web3.utils.toWei(fromValue.toString());
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

      const myContract = await getWeb3ContractObject(
        ArbitrageABI,
        ArbitrageContract
      );
      console.log("Functions----------gasAmount------", myContract);
      const estimateGas1 = await myContract.methods
        .callSimpleArbitrage(
          account,
          RouterA,
          RouterB,
          Tokens[0],
          Tokens[1],
          amoutInWei
        )
        .call((err, result) => {
          console.log(result);
          console.log(err);
        });
      // .estimateGas(
      //   { from: account, value: amoutInWei, gas: 5000000 },
      //   function (error, gasAmount) {
      //     if (gasAmount == 5000000) {
      //       console.log("Method ran out of gas");
      //     } else {
      //       console.log("Functions----------gasAmount------", myContract);
      //       console.log("Functions----------gasAmount------", error);
      //     }
      //     console.log("Functions----------gasAmount------", myContract);
      //     console.log("Functions----------gasAmount------", error);
      //   }
      // );
      // .estimateGas({ from: account })
      // .then(function (gasAmount) {
      //   console.log("Functions----------gasAmount------", myContract);
      // })

      // .catch(function (error) {
      //   console.log("Functions----------error------", error);
      // });

      console.log("Functions----------estimateGas------", estimateGas1);
    } catch (error) {
      console.log("Functions----------error------", error);
    }
  };
  useEffect(() => {
    EstimateGasHandler();
  }, [account]);

  const SafeGasPriceEstimate = async () => {
    try {
      const myContract = await getWeb3ContractObject(
        ArbitrageABI,
        ArbitrageContract
      );

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

      const web3 = await getWeb3Obj();

      const myContractERCTokenA = await getWeb3ContractObject(
        ERC20ABI,
        data?.resp3?.profitAddress.split("-> ")[0]
      );
      const decimalsTokenA = await myContractERCTokenA.methods
        .decimals()
        .call();
      console.log("decimals -----", decimalsTokenA);
      const myContractERCTokenB = await getWeb3ContractObject(
        ERC20ABI,
        data?.resp3?.profitAddress.split("-> ")[1]
      );
      const decimalsTokenB = await myContractERCTokenB.methods
        .decimals()
        .call();
      console.log("decimals ----- TokenB", decimalsTokenB);

      const amoutInWei = toWeiDecimals(fromValue.toString(), decimalsTokenA);
      let amountGetoutFunAB = await amountGetout(
        RouterA,
        FactoryA,
        amoutInWei,
        data?.resp3?.profitAddress.split("-> ")[0],
        data?.resp3?.profitAddress.split("-> ")[1]
      );

      let amountGetoutFunBC = await amountGetout(
        RouterB,
        FactoryB,
        amountGetoutFunAB,
        data?.resp3?.profitAddress.split("-> ")[1],
        data?.resp3?.profitAddress.split("-> ")[0]
      );

      console.log(
        "F amountGetout ---------- amountGetoutFunBC ---- amountGetout ---------- ",
        amountGetoutFunBC
      );
      setreturnedValue(fromWeiDecimals(amountGetoutFunBC, decimalsTokenA));
      setreturnedValue1(fromWeiDecimals(amountGetoutFunAB, decimalsTokenB));
    } catch (error) {
      console.log(" amountGetout ---------- error------", error);
    }
  };
  useEffect(() => {
    // if (account) {
    SafeGasPriceEstimate();
    // }
  }, [account, fromValue]);

  return (
    <Paper className={classes.root} key={index}>
      {openWallect && (
        <WalletConnectModal open={openWallect} handleClose={CloseWalletModal} />
      )}
      <Box className="headingBox">
        <Typography variant="h6">Cross Exchange Calculator</Typography>
      </Box>

      <CalculatorCards
        data={data}
        type="card"
        index={index}
        key={index}
        setfromValue={setfromValue}
        fromValue={fromValue}
        returnedValue={returnedValue}
        returnedValue1={returnedValue1}
        tokens1={tokens1}
        tokens2={tokens2}
      />

      {/* <Grid container spacing={0} direction={"column"}>
        <Grid item xs={12} key={1}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              {" "}
              From Factory ({objectsToShow?.exchangeA} v2) :{" "}
            </Typography>
            <Typography variant="body1">
              {" "}
              {data?.resp1?.exchangeName}
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
        <Grid item xs={12} key={2}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              Token A ({data?.resp1?.fromToken}):
            </Typography>
            <Typography variant="body1">
              {data?.resp3?.profitAddress?.split("-> ")[0]}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} key={2}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              Token B ({data?.resp1?.toToken}) :{" "}
            </Typography>
            <Typography variant="body1">
              {data?.resp3?.profitAddress?.split("-> ")[1]}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} key={11}>
          <Box className={`numberTextField ${classes.mainTextBox}`}>
            <Typography variant="h6">
              Input Token A ({data?.resp1?.fromToken}) values{" "}
            </Typography>
            <Typography variant="body1">
              {" "}
              <input
                value={fromValue}
                onChange={(e) => setfromValue(e.target.value)}
                type="number"
              />{" "}
            </Typography>
            {!flashLoan &&
              !startLoader &&
              myBalance < fromValue &&
              data?.resp3?.status != "LOSS" && (
                <FormHelperText error>
                  {`Insufficient ${objectsToShow?.tokenNameA} balance : ${myBalance} ${objectsToShow?.tokenNameA}`}
                </FormHelperText>
              )}
          </Box>
        </Grid>
      </Grid> */}
      <Box mt={2} mb={1}>
        {/* <Box className={`numberTextField ${classes.mainTextBox}`}>
          <FormHelperText success>
            {`Investment : ${data?.resp1?.fromToken} $ ${
              tokens1 * fromValue
            } Recieve : ${data?.resp1?.fromToken} $ ${tokens2 * returnedValue}`}
          </FormHelperText>
          = $ {tokens2 * returnedValue - tokens1 * fromValue}
        </Box> */}
        <Divider />
        <Typography variant="h6">Gas Fee = $ {ExtimatedGasFee}</Typography>
        <Typography variant="h6">
          Effective P&L = ${" "}
          {Number(tokens2 * returnedValue - tokens1 * fromValue) -
            Number(ExtimatedGasFee) <
          0 ? (
            <span style={{ color: "red" }}>
              {Number(tokens2 * returnedValue - tokens1 * fromValue) -
                Number(ExtimatedGasFee)}{" "}
            </span>
          ) : (
            <span style={{ color: "green" }}>
              {Number(tokens2 * returnedValue - tokens1 * fromValue) -
                Number(ExtimatedGasFee)}{" "}
            </span>
          )}
        </Typography>
        <Divider />
      </Box>

      {account ? (
        <Grid container spacing={2}>
          {!flashLoan && (
            <Grid item xs={12} sm={12} align="center">
              {data?.resp3?.status != "LOSS" ? (
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#E59446", color: "#FFF" }}
                  onClick={() => maxApproval()}
                  fullWidth
                  disabled={ttokenAllowanceTF || approveLoader || startLoader}
                >
                  {ttokenAllowanceTF
                    ? `You can now trade ${objectsToShow?.tokenNameA}`
                    : `Allow Protocal to use your ${objectsToShow?.tokenNameA}`}{" "}
                  {approveLoader && <ButtonCircularProgress />}
                  {/* {startLoader && <ThreeDotLoader />} */}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#E59446", color: "#e59446" }}
                  fullWidth
                  disabled
                >
                  <span style={{ color: "#e59446" }}>Arbitrage Not Found</span>
                </Button>
              )}
            </Grid>
          )}
          <Grid item xs={4} sm={3} align="center">
            {!flashLoan ? (
              <Button
                variant="contained"
                style={{ backgroundColor: "#E59446", color: "#FFF" }}
                onClick={() => onTradeArbitrage(fromValue)}
                disabled={
                  data?.resp3?.status == "LOSS" ||
                  !ttokenAllowanceTF ||
                  myBalance < fromValue ||
                  arbitrageLoader ||
                  startLoader
                }
              >
                Trade
                {arbitrageLoader && <ButtonCircularProgress />}
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{ backgroundColor: "#E59446", color: "#FFF" }}
                onClick={() => onTradeArbitrage(fromValue)}
                disabled={arbitrageLoader}
              >
                Trade
                {arbitrageLoader && <ButtonCircularProgress />}
              </Button>
            )}
          </Grid>
          <Grid item xs={4} sm={3} align="center">
            <Button
              variant="contained"
              style={{ backgroundColor: "#811793", color: "#FFF" }}
              onClick={() => CheckTradeArbitrage(fromValue)}
            >
              Check
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
          {data?.resp3?.status != "LOSS" ? (
            <Grid item xs={4} sm={3} align="center">
              <Box className={classes.contentBox}>
                <Typography variant="body2">{data?.resp3?.price}%</Typography>
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
              variant="contained"
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

export default CrossExchangeModalComponentCalculator;
