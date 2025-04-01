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
import FactoryABI from "src/ABI/FactoryABI.json";
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
  GenerateEstimateGas,
  ArbitrageByteCode,
  ExtimatedGasLimit,
  amountGetout,
} from "src/utils";
import { useWeb3React } from "@web3-react/core";
import { TokenAddressToUsed } from "src/constants";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import WalletConnectModal from "src/component/ConnectWallet/WalletConnectModal";
import { UserContext } from "src/context/User";
import { getBalanceOf } from "src/utils/index";
import { ExchangeContract } from "src/utils/index";
import ExchangeABI from "src/ABI/ExchangeABI.json";
import { MdTry } from "react-icons/md";
import CrossExchangeCalculatorCard from "./CrossExchangeCalculatorCard";
export const walletAddress = "0x84FEb55614F3f4849B58Cb019f0E10cde1139Ced";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "15px",
    overflowY: "auto",
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
    "& .headingBox1": {
      width: "100%",
      display: "flex",
      alignItems: "start",
      justifyContent: "center",
      "& h6": {
        fontSize: "14px !important",
        lineHeight: "35px !important",
        fontWeight: "400",
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

function CrossExchangeModalComponentTraingularCalculator(props) {
  const {
    exchangeModalClose,
    crossExchangeData,
    onTradeArbitrage,
    data,
    fromToken,
    toToken,
    toToken1,
    Swap1,
    Swap2,
    Swap3,
    arbitrageLoader,
    transHash,
    setFlashLoan,
    flashLoan,
    index,
  } = props;
  const classes = useStyles();
  const { activate, account, chainId, library, deactivate } = useWeb3React();
  const user = useContext(UserContext); // onClick={user.connectWallet}
  const [approveLoader, setApproveLoader] = useState(false);
  const [tokenAllowance, settokenAllowance] = useState("");
  const [ttokenAllowanceTF, settokenAllowanceTF] = useState(true);
  const [fromValue, setfromValue] = useState(data?.resp1?.fromPrice);
  const [openWallect, setOpenWallect] = useState(false);
  const [myBalance, setmyBalance] = useState(0);
  const [objectsToShow, setObjectsToShow] = useState({});
  const [checkLoader, setCheckLoader] = useState(false);
  const [tokens1, setTokens1] = useState(0);
  const [tokens2, setTokens2] = useState(0);
  const [ExtimatedGasFee, setExtimatedGasFee] = useState(0);
  const [returnedValue, setreturnedValue] = useState(0);
  const [returnedValue1, setreturnedValue1] = useState(0);
  const [returnedValue2, setreturnedValue2] = useState(0);
  const [checkData, setCheckData] = useState({});
  // console.log("callTriangularArbitrage1 -------", data);
  const CheckTradeArbitrage = async () => {
    try {
      setCheckLoader(true);
      const web3 = await getWeb3Obj();
      const amoutInWei = web3.utils.toWei(fromValue.toString());

      // console.log("data?.--------swap------>>>", Swap2);
      // console.log("data?.resp1?.swap------>>>", data);
      let RouterA;
      let FactoryA;
      let RouterB;
      let FactoryB;

      let SwapA;
      let SwapB;
      if (Swap1 == Swap2 && Swap1 != Swap3) {
        SwapA = Swap1;
        SwapB = Swap3;
      }
      if (Swap1 != Swap2 && Swap1 == Swap3) {
        SwapA = Swap1;
        SwapB = Swap3;
      }
      if (Swap1 == Swap2 && Swap1 == Swap3) {
        SwapA = Swap1;
        SwapB = Swap3;
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

      if (SwapA == "Uniswap") {
        RouterB = UniswapRouter;
        FactoryB = UniswapFactory;
      }
      if (SwapA == "Shibaswap") {
        RouterB = ShibaswapRouter;
        FactoryB = ShibaswapFactory;
      }
      if (SwapA == "Sushiswap") {
        RouterB = ShushiswapRouter;
        FactoryB = ShushiswapFactory;
      }

      const arbitrageObj = getContract(
        ExchangeContract,
        ExchangeABI,
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
      console.log(
        getFactoryObjA,
        " callTriangularArbitrage1 --????--->>>",
        getFactoryObjB
      );
      const PairA = await getFactoryObjA.getPair(
        data?.resp4?.profitAddress.split("-> ")[0],
        data?.resp4?.profitAddress.split("-> ")[1]
      );
      const PairB = await getFactoryObjB.getPair(
        data?.resp4?.profitAddress.split("-> ")[1],
        data?.resp4?.profitAddress.split("-> ")[0]
      );
      console.log(
        PairA,
        "PairA---  callTriangularArbitrage1 -------------- PairB",
        PairB
      );
      // if (PairA != ZeroAddress && PairB != ZeroAddress) {
      const getPriceTriangular = await arbitrageObj.getPriceTriangular(
        RouterA,
        RouterB,
        data?.resp4?.profitAddress.split("-> ")[0],
        data?.resp4?.profitAddress.split("-> ")[1],
        data?.resp4?.profitAddress.split("-> ")[2],
        amoutInWei
      );
      // console.log("comparePriceData ----- ", getPriceTriangular);
      let obj = {
        status: getPriceTriangular[0],
        price: web3.utils.fromWei(getPriceTriangular[1].toString()),
      };
      console.log("comparePriceData ----- obj", obj);
      setCheckData(obj);
      setCheckLoader(false);
    } catch (error) {
      setCheckLoader(false);
      console.log("---error", error);
      let Splic1 = error.message.split(":");
      let Splic = error.message.split(":")[0];
      console.log(Splic1);
      toast.error(<span style={{ color: "#fff" }}>{Splic}</span>);
    }
  };
  const CheckmaxApproval = async () => {
    try {
      // setApproveLoader(true);
      const web3 = await getWeb3Obj();
      const aTokenAddress = TokenAddressToUsed.filter(
        (data12) => data12.heading == data?.resp1?.fromToken
      )[0];
      // console.log("aTokenAddress===>>", aTokenAddress);
      const myContract = getContract(
        data?.resp4?.profitAddress.split("-> ")[0],
        ERC20ABI,
        library,
        account
      );

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
      } else {
        settokenAllowance(Number(allowance));
        settokenAllowanceTF(true);
        console.log("284", Number(allowance));
      }
    } catch (err) {
      setApproveLoader(false);
      // console.log(err.message);
    }
  };
  const maxApproval = async () => {
    try {
      setApproveLoader(true);
      const web3 = await getWeb3Obj();
      const myContract = getContract(
        data?.resp4?.profitAddress.split("-> ")[0],
        ERC20ABI,
        library,
        account
      );
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

  const UpdatesModals = async () => {
    try {
      const web3 = await getWeb3Obj();
      let RouterA;
      let FactoryA;
      let RouterB;
      let FactoryB;

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

      // exchangeName  Insufficient

      let obj = {
        exchangeName: SwapA,
        exchangeNameB: SwapB,
        routerAddress: RouterA,
        factoryAddress: FactoryA,
        routerAddressB: RouterB,
        factoryAddressB: FactoryB,
        // TokenA: TokenA,
        // TokenB: TokenB,
      };
      setObjectsToShow(obj);

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
        data?.resp4?.profitAddress.split("-> ")[0],
        FactoryA1
      );
      setTokens1(TokenA);
      const TokenB = await APITokenPriceHandler(
        data?.resp4?.profitAddress.split("-> ")[0],
        FactoryC1
      );
      setTokens2(TokenB);

      console.log(
        data,
        TokenA,
        " callTriangularArbitrage1 --------- TokenA ---- TokenB --- obj",
        TokenB
      );
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
      // const arbitrageObjByteCode = await getWeb3ContractObject(
      //   ArbitrageABI,
      //   ArbitrageByteCode
      //   // mainnetRPCURL1
      // );
      // const contract = await new web3.eth.Contract(
      //   ArbitrageABI,
      //   ArbitrageByteCode
      // );
      // console.log(
      //   "callTriangularArbitrage1  ------ arbitrageObjByteCode",
      //   contract
      // );
      const myContractERC = await getWeb3ContractObject(
        ERC20ABI,
        data?.resp4?.profitAddress.split("-> ")[0]
      );
      console.log("myContract", myContractERC);

      // let allowance = await myContract.allowance(account, ArbitrageContract);
      // const aTokenAddress = TokenAddressToUsed.filter(
      //   (data12) => data12.heading == data?.resp1?.fromToken
      // )[0];
      // const bTokenAddress = TokenAddressToUsed.filter(
      //   (data12) => data12.heading == data?.resp2?.fromToken
      // )[0];
      // const cTokenAddress = TokenAddressToUsed.filter(
      //   (data12) => data12.heading == data?.resp3?.fromToken
      // )[0];
      const amoutInWei = web3.utils.toWei(fromValue.toString());
      const PriceAPI = await APITokenPriceHandler(
        data?.resp4?.profitAddress.split("-> ")[0],
        FactoryA
      ); // price in usd

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

      //   let DATAEncode = arbitrageObj.methods
      //     .callTriangularArbitrage(
      //       walletAddress,
      //       RouterA,
      //       RouterB,
      //       // RouterB,
      //       data?.resp4?.profitAddress.split("-> ")[0],
      //       data?.resp4?.profitAddress.split("-> ")[1],
      //       data?.resp4?.profitAddress.split("-> ")[2],
      //       amoutInWei
      //     )
      //     .encodeABI();
      //   console.log(
      //     gasprice,
      //     EstimatePriceAPI,
      //     "  callTriangularArbitrage1 ----- DATAEncode  ",
      //     DATAEncode
      //   );
      //   let DATAEncode1 = await myContractERC.methods
      //     .approve(ArbitrageContract, amoutInWei)
      //     .encodeABI();
      //   let CallArbitrageGasLimitsApprove = await myContractERC.methods
      //     .approve(ArbitrageContract, amoutInWei)
      //     .estimateGas({
      //       from: walletAddress, //* **************** account **************** */
      //       to: ArbitrageContract,
      //       value: 0,
      //       data: DATAEncode1,
      //       // gas_price: gasprice,
      //     });
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
      //   console.log("  callTriangularArbitrage1 ----- 12344", GesFeeFunctions);

      let Price =
        Number(
          getWethPriceInDollor?.data?.market_data?.current_price?.usd
            ? getWethPriceInDollor?.data?.market_data?.current_price?.usd
            : 1
        ) * Number(GesFeeFunctions);

      setExtimatedGasFee(Price);

      // let CallArbitrageGasLimitsEstimate =
      //   await arbitrageObj12.estimateGas.callTriangularArbitrage(
      //     walletAddress, //* **************** account **************** */
      //     RouterA,
      //     RouterB,
      //     // RouterB,
      //     data?.resp4?.profitAddress.split("-> ")[0],
      //     data?.resp4?.profitAddress.split("-> ")[1],
      //     data?.resp4?.profitAddress.split("-> ")[2],
      //     amoutInWei
      //   );
      // .estimateGas({
      //   from: walletAddress, //* **************** account **************** */
      //   to: ArbitrageContract,
      //   value: 0,
      //   data: DATAEncode,
      //   gas_price: gasprice,
      // });
      // console.log(
      //   "  callTriangularArbitrage1 ----- CallArbitrageGasLimitsEstimate 583 584  ",
      //   CallArbitrageGasLimitsEstimate.toString()
      // );
      //   let CallArbitrageGasLimits = await arbitrageObj.methods
      //     .callTriangularArbitrage(
      //       walletAddress, //* **************** account **************** */
      //       RouterA,
      //       RouterB,
      //       // RouterB,
      //       data?.resp4?.profitAddress.split("-> ")[0],
      //       data?.resp4?.profitAddress.split("-> ")[1],
      //       data?.resp4?.profitAddress.split("-> ")[2],
      //       amoutInWei
      //     )
      //     .estimateGas({
      //       from: walletAddress, //* **************** account **************** */
      //       to: ArbitrageContract,
      //       value: 0,
      //       data: DATAEncode,
      //       gas_price: gasprice,
      //     });
      //   console.log(
      //     "  callTriangularArbitrage1 ----- CallArbitrageGasLimits  ",
      //     CallArbitrageGasLimits.toString()
      //   );
      // var buyItem = contractInstances.methods.method1(objId)
      //   console.log(
      //     "callTriangularArbitrage1 --- gasprice pow",
      //     (CallArbitrageGasLimits * Number(EstimatePriceAPI)) / Math.pow(10, 9)
      //   );
    } catch (err) {
      console.log(
        "----cross-callTriangularArbitrage1 ----- err466 <<<<<< err >>>>>>",
        err
      );
    }
  };
  useEffect(() => {
    UpdatesModals();
  }, [account]);
  useEffect(() => {
    if (account) {
      CheckmaxApproval();
      // CheckmaxApproval();
    }
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

      let SwapA;
      let SwapB;
      if (Swap1 == Swap2 && Swap1 != Swap3) {
        SwapA = Swap1;
        SwapB = Swap3;
      }
      if (Swap1 != Swap2 && Swap1 == Swap3) {
        SwapA = Swap1;
        SwapB = Swap3;
      }
      if (Swap1 == Swap2 && Swap1 == Swap3) {
        SwapA = Swap1;
        SwapB = Swap3;
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

      const myContractERCTokenA = await getWeb3ContractObject(
        ERC20ABI,
        data?.resp4?.profitAddress.split("-> ")[0]
      );
      const decimalsTokenA = await myContractERCTokenA.methods
        .decimals()
        .call();

      const myContractERCTokenB = await getWeb3ContractObject(
        ERC20ABI,
        data?.resp4?.profitAddress.split("-> ")[1]
      );
      const decimalsTokenB = await myContractERCTokenB.methods
        .decimals()
        .call();

      const myContractERCTokenC = await getWeb3ContractObject(
        ERC20ABI,
        data?.resp4?.profitAddress.split("-> ")[2]
      );
      const decimalsTokenC = await myContractERCTokenC.methods
        .decimals()
        .call();

      const web3 = await getWeb3Obj();
      const amoutInWei = web3.utils.toWei(fromValue.toString());
      let amountGetoutFunAB = await amountGetout(
        RouterA,
        FactoryA,
        amoutInWei,
        data?.resp4?.profitAddress.split("-> ")[0],
        data?.resp4?.profitAddress.split("-> ")[1]
      );

      let amountGetoutFunBC = await amountGetout(
        RouterB,
        FactoryB,
        amountGetoutFunAB,
        data?.resp4?.profitAddress.split("-> ")[1],
        data?.resp4?.profitAddress.split("-> ")[2]
      );

      let amountGetoutFunCA = await amountGetout(
        RouterB,
        FactoryB,
        amountGetoutFunBC,
        data?.resp4?.profitAddress.split("-> ")[2],
        data?.resp4?.profitAddress.split("-> ")[0]
      );
      setreturnedValue(fromWeiDecimals(amountGetoutFunAB, decimalsTokenB));
      setreturnedValue1(fromWeiDecimals(amountGetoutFunBC, decimalsTokenC));
      setreturnedValue2(fromWeiDecimals(amountGetoutFunCA, decimalsTokenA));
      console.log(
        "F amountGetout ---------- amountGetoutFunABC ---- amountGetout ---------- ",
        amountGetoutFunCA
      );
      // console.log(
      //   "----cross-exchange----- 529 <<<<<< amoutInWei >>>>>>",
      //   amoutInWei
      // );
      // const estimateGas = await myContract.methods
      //   .callTriangularArbitrage(
      //     account,
      //     RouterA,
      //     RouterB,
      //     data?.resp4?.profitAddress.split("-> ")[0],
      //     // aTokenAddress?.token,
      //     data?.resp4?.profitAddress.split("-> ")[1],
      //     data?.resp4?.profitAddress.split("-> ")[2],
      //     amoutInWei
      //   )
      //   .estimateGas({ from: account })
      //   .then(function (gasAmount) {
      //     console.log("Functions----------gasAmount------", gasAmount);
      //   })
      //   .catch(function (error) {
      //     console.log("----cross-exchange----- ---------- error ------", error);
      //   });

      // console.log(
      //   "----cross-exchange----- ----------estimateGas------",
      //   estimateGas
      // );
    } catch (error) {
      console.log(" amountGetout ---------- error------", error);
    }
  };
  useEffect(() => {
    // if (account) {
    SafeGasPriceEstimate();
    // }
  }, [account, fromValue]);

  const HandleWalletModal = () => {
    setOpenWallect(true);
    user.connectWallet();
  };
  const CloseWalletModal = () => {
    setOpenWallect(false);
  };
  return (
    <Paper className={classes.root} key={index}>
      {/* <ClearIcon
        onClick={exchangeModalClose}
        disabled={arbitrageLoader || approveLoader}
      /> */}
      {openWallect && (
        <WalletConnectModal open={openWallect} handleClose={CloseWalletModal} />
      )}
      <Box className="headingBox">
        <Typography variant="h6">
          Cross Exchange Traingular Calculator{" "}
        </Typography>
      </Box>
      <CrossExchangeCalculatorCard
        data={data}
        type="card"
        index={index}
        key={index}
        setfromValue={setfromValue}
        fromValue={fromValue}
        returnedValue={returnedValue}
        returnedValue1={returnedValue1}
        returnedValue2={returnedValue2}
        // tokens1={tokens1}
        // tokens2={tokens2}
        // tokens3={tokens3}
      />

      {/* <Grid container spacing={0} direction={"column"}>
     
        <Grid item xs={12} key={1}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              {" "}
              Factory A ({objectsToShow?.exchangeName} v2) :{" "}
            </Typography>
            <Typography variant="body1">
              {" "}
              {objectsToShow?.factoryAddress}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} key={2}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              Router A ({objectsToShow?.exchangeName} v2) :{" "}
            </Typography>
            <Typography variant="body1">
              {objectsToShow?.routerAddress}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} key={1}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              {" "}
              Factory B ({objectsToShow?.exchangeNameB} v2) :{" "}
            </Typography>
            <Typography variant="body1">
              {" "}
              {objectsToShow?.factoryAddressB}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} key={2}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              Router B ({objectsToShow?.exchangeNameB} v2) :{" "}
            </Typography>
            <Typography variant="body1">
              {objectsToShow?.routerAddressB}
            </Typography>
          </Box>
        </Grid>
      
        <Grid item xs={12} key={2}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              Token A ({data?.resp1?.fromToken}):
            </Typography>
            <Typography variant="body1">
              {data?.resp4?.profitAddress.split("-> ")[0]}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} key={2}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              Token B ({data?.resp2?.fromToken}) :{" "}
            </Typography>
            <Typography variant="body1">
              {data?.resp4?.profitAddress.split("-> ")[1]}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} key={2}>
          <Box className={classes.mainTextBox}>
            <Typography variant="h6">
              Token C ({data?.resp3?.fromToken}) :{" "}
            </Typography>
            <Typography variant="body1">
              {data?.resp4?.profitAddress.split("-> ")[2]}
            </Typography>
          </Box>
        </Grid>
        {data?.resp4?.status == "LOSS" && (
          <Grid item xs={12} key={2}>
            <Box className={classes.mainTextBox}>
              <Typography variant="h6">
                Arbitrage (
                <span style={{ color: "#e59446" }}>
                  {" "}
                  {`${objectsToShow?.tokenNameA}-${objectsToShow?.tokenNameB}-${objectsToShow?.tokenNameC}`}{" "}
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
              myBalance < fromValue &&
              data?.resp4?.status != "LOSS" && (
                <FormHelperText error>
                  {`Insufficient ${data?.resp1?.fromToken} balance : ${myBalance} ${data?.resp1?.fromToken}`}
                </FormHelperText>
              )}
          </Box>
        </Grid>
      </Grid> */}
      <Box mt={2} mb={1}>
        <Box className={`numberTextField ${classes.mainTextBox}`}>
          <FormHelperText success>
            {`Investment : ${data?.resp1?.fromToken} $ ${
              tokens1 * fromValue
            } Recieve : ${data?.resp1?.fromToken} $ ${tokens2 * returnedValue}`}
          </FormHelperText>
          = $ {tokens2 * returnedValue - tokens1 * fromValue}
        </Box>
        <Divider />
        <Typography variant="h6">Gas Fee = $ {ExtimatedGasFee}</Typography>
        <Typography variant="h6">
          Profit = ${" "}
          <span style={{ color: "red" }}>
            {Number(tokens2 * returnedValue - tokens1 * fromValue) -
              Number(ExtimatedGasFee)}{" "}
          </span>
        </Typography>
        <Divider />
      </Box>

      {/* {!checkLoader && checkData?.price && (
        <Box className="mainBox">
          <Box className="topBox">
            <Typography variant="h6">Check Your Status</Typography>
            
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
      )} */}
      {account ? (
        <Grid container spacing={2}>
          {!flashLoan && (
            <Grid item xs={12} sm={12} align="center">
              {data?.resp4?.status != "LOSS" ? (
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#E59446", color: "#FFF" }}
                  onClick={() => maxApproval()}
                  fullWidth
                  disabled={ttokenAllowanceTF || approveLoader}
                >
                  {ttokenAllowanceTF
                    ? `You can now trade ${data?.resp1?.fromToken}`
                    : `Allow Protocal to use your ${data?.resp1?.fromToken}`}
                  {approveLoader && <ButtonCircularProgress />}
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
                  data?.resp4?.status == "LOSS" ||
                  !ttokenAllowanceTF ||
                  myBalance < fromValue ||
                  arbitrageLoader
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
              onClick={CheckTradeArbitrage}
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
          {data?.resp4?.status != "LOSS" ? (
            <Grid item xs={4} sm={3} align="center">
              <Box className={classes.contentBox}>
                <Typography variant="body2">{data?.resp4?.price}%</Typography>
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
            {/* <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.connetwallet}
              // onClick={user.connectWallet}
              onClick={HandleWalletModal}
            >
              Connect Wallet
            </Button> */}
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

export default CrossExchangeModalComponentTraingularCalculator;
