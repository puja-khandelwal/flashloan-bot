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

export const walletAddress = "0x84FEb55614F3f4849B58Cb019f0E10cde1139Ced";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: "15px",
    marginTop: "70px",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      overflowY: "scroll",
    },
    "& .checkButton": {
      background: "rgba(65, 22, 67, 1) !important",
    },
    "& .percentbuton": {
      fontSize: "21px !important",
    },
    "& .headingBox1": {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
    },
    "& .MuiSwitch-track": {
      background: "#E9E9E9 !important",
    },
    "& .headingBox": {
      display: "flex",
      alignItems: "center",
      position: "absolute",
      justifyContent: "center",
      top: "0",
      background: "rgba(243, 109, 54, 1)",
      width: "100%",
      left: "0",
      padding: "10px 0",
      "& h6": {
        fontSize: "16px !important",
        lineHeight: "40px !important",
        fontWeight: "600",
        color: "#0856cc",
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
      padding: "5px 0px 4px",
      fontSize: "17px !important",
      fontWeight: "500",
      lineHeight: "25px !important",
      color: "rgba(61, 61, 61, 1)",
    },
    "& p": {
      color: "rgba(61, 61, 61, 1)",
      padding: "10px 15px",
      fontSize: "14px",
      background: "#fff",
      boxShadow: "none",
      wordBreak: "break-all",
      borderRadius: "9px",
      marginBottom: "5px",
      border: "1px solid rgb(61 61 61 / 54%)",
    },

    "& input": {
      backgroundColor: "transparent",
      border: "none",
      color: "#888888",
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

      // console.log(PairA, "----cross-exchange----- ", PairB);
      const arbitrageObj = getContract(
        ExchangeContract,
        ExchangeABI,
        library,
        account
      );
      // console.log(
      //   Tokens,
      //   "----cross-exchange----- arbitrageObj------>",
      //   arbitrageObj,
      //   RouterA,
      //   RouterB
      // );
      const comparePriceData = await arbitrageObj.getPriceSimple(
        RouterA,
        RouterB,
        Tokens[0],
        Tokens[1],
        amoutInWei
      );
      // console.log(
      //   "----cross-exchange----- comparePriceData ----- obj",
      //   comparePriceData
      // );
      let obj = {
        status: comparePriceData[0],
        price: web3.utils.fromWei(comparePriceData[1].toString()),
      };
      // console.log("----cross-exchange----- comparePriceData ----- obj", obj);
      setCheckLoader(false);
      setCheckData(obj);
    } catch (error) {
      setCheckLoader(false);
      // console.log("--- ----cross-exchange----- error", error);
      // console.log("---error", error.message);
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
      // console.log(
      //   "----cross-exchange----- 446 <<<<<<PriceAPI>>>>>>",
      //   data?.resp3?.profitAddress.split("-> ")
      // );

      // let Tokens = data?.resp3?.profitAddress.split("-> ");
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
      // console.log(TokenA, "TokenA ----cross-exchange----- TokenB", TokenB);
      setTokens2(TokenB);
      setTokens1(TokenA);
      // setTokens2(Tokens[1]);
      // console.log("----cross-exchange----- 463 <<<<<< obj >>>>>>", data);
      // console.log("-----==obj--===>>", obj);
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
        // mainnetRPCURL1
      );
      const myContractERC = await getWeb3ContractObject(
        ERC20ABI,
        data?.resp3?.profitAddress.split("-> ")[0]
        // library,
        // account
      );
      console.log("myContract", myContractERC);

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
      let DATAEncode = arbitrageObj.methods
        .callTriangularArbitrage(
          walletAddress,
          RouterA,
          RouterB,
          // RouterB,
          data?.resp3?.profitAddress.split("-> ")[0],
          data?.resp3?.profitAddress.split("-> ")[1],
          data?.resp3?.profitAddress.split("-> ")[2],
          amoutInWei
        )
        .encodeABI();
      console.log(
        gasprice,
        EstimatePriceAPI,
        "  callTriangularArbitrage1 ----- DATAEncode  ",
        DATAEncode
      );
      let DATAEncode1 = await myContractERC.methods
        .approve(ArbitrageContract, amoutInWei)
        .encodeABI();
      // let CallArbitrageGasLimitsApprove = await myContractERC.methods
      //   .approve(ArbitrageContract, amoutInWei)
      //   .estimateGas({
      //     from: walletAddress, //* **************** account **************** */
      //     to: ArbitrageContract,
      //     value: 0,
      //     data: DATAEncode1,
      //     // gas_price: gasprice,
      //   });
      // console.log(
      //   Math.pow(10, 9),
      //   "  callTriangularArbitrage1 ----- CallArbitrageGasLimitsApprove  ",
      //   CallArbitrageGasLimitsApprove.toString()
      // );
      // // var buyItem = contractInstances.methods.method1(objId)
      // console.log(
      //   "callTriangularArbitrage1 --- gasprice pow",
      //   (CallArbitrageGasLimitsApprove * Number(EstimatePriceAPI)) /
      //     Math.pow(10, 9)
      // );
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

      // let CallArbitrageGasLimits = await arbitrageObj.methods
      //   .callTriangularArbitrage(
      //     walletAddress, //* **************** account **************** */
      //     RouterA,
      //     RouterB,
      //     // RouterB,
      //     data?.resp3?.profitAddress.split("-> ")[0],
      //     data?.resp3?.profitAddress.split("-> ")[1],
      //     // data?.resp3?.profitAddress.split("-> ")[2],
      //     amoutInWei
      //   )
      //   .estimateGas({
      //     from: walletAddress, //* **************** account **************** */
      //     to: ArbitrageContract,
      //     value: 0,
      //     data: DATAEncode,
      //     gas_price: gasprice,
      //   });
      // console.log(
      //   "  callTriangularArbitrage1 ----- CallArbitrageGasLimits  ",
      //   CallArbitrageGasLimits.toString()
      // );
      // var buyItem = contractInstances.methods.method1(objId)
      // console.log(
      //   "callTriangularArbitrage1 --- gasprice pow",
      //   (CallArbitrageGasLimits * Number(EstimatePriceAPI)) / Math.pow(10, 9)
      // );
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
      // SafeGasPrice
      // const EstimatePriceAPI = await APIGasHandler();
      const myContract = await getWeb3ContractObject(
        ArbitrageABI,
        ArbitrageContract
      );
      // console.log(
      //   "----cross-exchange----- 467 <<<<<< myContract >>>>>>",
      //   myContract
      // );
      let RouterA;
      let FactoryA;
      let RouterB;
      let FactoryB;

      // const web3 = await getWeb3Obj();
      // const amoutInWei = web3.utils.toWei(fromValue.toString());
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
        (data12) => data12.heading == data?.resp1?.fromToken
      )[0];
      const bTokenAddress = TokenAddressToUsed.filter(
        (data12) => data12.heading == data?.resp2?.fromToken
      )[0];
      const cTokenAddress = TokenAddressToUsed.filter(
        (data12) => data12.heading == data?.resp3?.fromToken
      )[0];

      const web3 = await getWeb3Obj();
      const amoutInWei = web3.utils.toWei(fromValue.toString());
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

      // let amountGetoutFunCA = await amountGetout(
      //   RouterB,
      //   FactoryB,
      //   amountGetoutFunBC,
      //   data?.resp3?.profitAddress.split("-> ")[2],
      //   data?.resp3?.profitAddress.split("-> ")[0]
      // );

      console.log(
        "F amountGetout ---------- amountGetoutFunBC ---- amountGetout ---------- ",
        amountGetoutFunBC
      );
      setreturnedValue(fromWeiDecimals(amountGetoutFunBC, 18));
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
    <Box className={classes.root} key={index}>
      {/* <ClearIcon
        onClick={exchangeModalClose}
        disabled={arbitrageLoader || approveLoader}
      /> */}
      {openWallect && (
        <WalletConnectModal open={openWallect} handleClose={CloseWalletModal} />
      )}

      {/* {data?.resp3?.status != "LOSS" && ( */}
      {/* <Box className="headingBox1">
        <Switch
          check={flashLoan}
          onChange={(e) => setFlashLoan(e)}
          inputProps={{
            "aria-label": "primary checkbox",
          }}
        />
        <Typography variant="h6" style={{ color: "#000000" }}>
          Flash loan{" "}
        </Typography>
      </Box> */}
      {/* )} */}

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
        {/* <Grid item xs={12} key={1}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              {" "}
              From Factory ({objectsToShow?.exchangeA} v2) :{" "}
            </Typography>
            <Typography variant="body1">
              {" "}
              {data?.resp1?.exchangeName}2
            </Typography>
          </Box>
        </Grid> */}
        <Grid item xs={12} key={2}>
          <Paper elevation={2} style={{ padding: "10px" }}>
            <Box className={classes.mainTextBox}>
              <Typography variant="h6">
                Cross Exchange Flas Loan Swap
                {/* ({objectsToShow?.exchangeB} v2) :{" "} */}
              </Typography>
              <Typography variant="body1">
                {/* {objectsToShow?.routerAddressA} */}
                0*55666YTYTYYY67657556T787Y67876778787
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} key={1}>
          <Paper elevation={2} style={{ padding: "10px" }}>
            <Box className={classes.mainTextBox}>
              <Typography variant="h6">
                To Factory (ApeSwap V2)
                {/* ({objectsToShow?.exchangeB} */}
              </Typography>
              <Typography variant="body1">
                {" "}
                {data?.resp2?.exchangeName}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} key={2}>
          <Paper elevation={2} style={{ padding: "10px" }}>
            <Box className={classes.mainTextBox}>
              <Typography variant="h6">
                From Router (ApeSwap V2)
                {/* ({objectsToShow?.exchangeB} ) :{" "} */}
              </Typography>
              <Typography variant="body1">
                {" "}
                3{/* {objectsToShow?.routerAddressB} */}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} key={2}>
          <Paper elevation={2} style={{ padding: "10px" }}>
            <Box className={classes.mainTextBox}>
              <Typography variant="h6">
                To Router (ApeSwap V2)
                {/* ({data?.resp1?.fromToken}): */}
              </Typography>
              <Typography variant="body1">
                {/* {data?.resp3?.profitAddress?.split("-> ")[0]}
                 */}
                0*55666YTYTYYY67657556T787Y67876778787
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} key={2}>
          <Paper elevation={2} style={{ padding: "10px" }}>
            <Box className={classes.mainTextBox}>
              <Typography variant="h6">
                Token A (WBNB)
                {/* ({data?.resp1?.toToken}) :{" "} */}
              </Typography>
              <Typography variant="body1">
                {/* {data?.resp3?.profitAddress?.split("-> ")[1]} */}5
              </Typography>
            </Box>
          </Paper>
        </Grid>
        {/* <Grid item xs={12} key={2}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              Token C ({objectsToShow?.tokenNameC}) :{" "}
            </Typography>
            <Typography variant="body1">{objectsToShow?.tokenC}</Typography>
          </Box>
        </Grid> */}

        <Grid item xs={12} key={11}>
          <Box className={`numberTextField ${classes.mainTextBox}`}>
            <Typography variant="h6">
              Token B (NAUT)
              {/* ({data?.resp1?.fromToken}) values{" "} */}
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

        <Grid item xs={12} key={11}>
          <Box className={`numberTextField ${classes.mainTextBox}`}>
            <Typography variant="h6">
              Amount Input (Input USD Value)
              {/* ({data?.resp1?.fromToken}) values{" "} */}
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
      </Grid>

      <Box className="transactionscanBox">
        <Box align="center">
          <Typography variant="h6">
            Check Your Transaction on BSC Scan
          </Typography>
          <Typography variant="h6">
            0xfb0635a475ce37b6bf4d478e7c93360e631ab
          </Typography>
        </Box>
        <Box align="left" mt={2} mb={1}>
          <Typography variant="h4">Test Result</Typography>
        </Box>

        <Box className="displaySpaceBetween">
          <Typography variant="h6">Amount input of USDT in local:</Typography>
          <Typography variant="h6">9.99100000</Typography>
        </Box>
        <Box className="displaySpaceBetween">
          <Typography variant="h6">Amount input of USDT in local:</Typography>
          <Typography variant="h6">10.98</Typography>
        </Box>
        <Box className="displaySpaceBetween">
          <Typography variant="h6">Amount input of USDT in local:</Typography>
          <Typography variant="h6">0.9656</Typography>
        </Box>
        <Box className="displaySpaceBetween">
          <Typography variant="h6">Amount input of USDT in local:</Typography>
          <Typography variant="h6">0.6777</Typography>
        </Box>
      </Box>
      {/* <Box mt={2} mb={1}>
        <Box className={`numberTextField ${classes.mainTextBox}`}>
          <FormHelperText success>
            {`Investment : ${data?.resp1?.fromToken} $ ${tokens1 * fromValue}`}
          </FormHelperText>
          <FormHelperText success>
            {` Recieve : ${data?.resp1?.fromToken} $ ${
              tokens2 * returnedValue
            }`}
          </FormHelperText>
          <Typography variant="body1" style={{ color: "#000000" }}>
            P&L = $ {tokens2 * returnedValue - tokens1 * fromValue}
          </Typography>
        </Box>
        <Divider />
        <Typography variant="h6" style={{ color: "#000000" }}>
          Gas Fee = $ {ExtimatedGasFee}
        </Typography>
        <Typography variant="h6" style={{ color: "#000000" }}>
          Excepted P&L = ${" "}
          <span style={{ color: "red" }}>
            {Number(tokens2 * returnedValue - tokens1 * fromValue) -
              Number(ExtimatedGasFee)}{" "}
          </span>
        </Typography>
        <Divider style={{ backgroundColor: "#E9E9E9" }} />
      </Box> */}

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
                    Amount input of {fromToken} in {Swap1} exchange :
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
                    Amount output of {fromToken} in {Swap2} exchange :
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} align="right">
                <Box className={classes.basebox}>
                  <Typography variant="body2">
                    {Number(checkData?.price) + Number(fromValue)}
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
                      : (Number(checkData?.price) /
                          (Number(checkData?.price) + Number(fromValue))) *
                        100}{" "}
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

          <Grid item xs={4} sm={3} align="left">
            {!flashLoan ? (
              <Button
                variant="contained"
                color="primary"
                fullWidth
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
                fullWidth
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
              color="primary"
              fullWidth
              style={{ backgroundColor: "#179366", color: "#FFF" }}
              onClick={() => CheckTradeArbitrage(fromValue)}
            >
              Check
            </Button>
          </Grid>
          <Grid item xs={4} sm={3} align="center">
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              style={{ background: "#787878", color: "#FFF", border: "none" }}
              onClick={exchangeModalClose}
              disabled={arbitrageLoader || approveLoader}
            >
              close
            </Button>
          </Grid>
          {data?.resp3?.status != "LOSS" ? (
            <Grid item xs={4} sm={3} align="center">
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                style={{ background: "#FD985F", color: "#000", border: "none" }}
              >
                {data?.resp3?.price}%
              </Button>
            </Grid>
          ) : (
            <Grid item xs={4} sm={3} align="center">
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                style={{ background: "#FD985F", color: "#000", border: "none" }}
              >
                0
              </Button>
            </Grid>
          )}
        </Grid>
      ) : (
        <>
          <Box className="displayStart flexWrap" mt={2}>
            <Button
              variant="contained"
              color="primary"
              className="walletButton"
              // onClick={user.connectWallet}
              // onClick={HandleWalletModal}
            >
              Trade
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="contained"
              color="primary"
              className="walletButton checkButton"
              // onClick={user.connectWallet}
              // onClick={HandleWalletModal}
            >
              Check
            </Button>{" "}
            &nbsp;&nbsp;
            <Button
              variant="contained"
              className="walletButton closeButtonicon"
              color="secondary"
              onClick={exchangeModalClose}
              disabled={arbitrageLoader || approveLoader}
            >
              close
            </Button>{" "}
            &nbsp;&nbsp;
            <Button
              variant="outlined"
              color="primary"
              className="walletButton percentbuton"
              // onClick={user.connectWallet}
              // onClick={HandleWalletModal}
            >
              %
            </Button>{" "}
          </Box>
        </>
      )}
    </Box>
  );
}

export default CrossExchangeModalComponent;
