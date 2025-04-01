import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  Button,
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
} from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import RegistrationABI from "src/ABI/RegistrationABI.json";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { useHistory } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { BiChevronDown } from "react-icons/bi";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { BsSearch } from "react-icons/bs";
import clsx from "clsx";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import ClearIcon from "@material-ui/icons/Clear";
import ExchangeModal from "./ExchangeModal";
import { UserContext } from "src/context/User";
import { ShibaSwapFun } from "./SwapExchange/ShibaSwapSDK";
import { UniSwapFun } from "./SwapExchange/UniSwapSDK";
import ERC20ABI from "src/ABI/IERC20ABI.json";
import RouterABI from "src/ABI/RouterABI.json";
import FactoryABI from "src/ABI/FactoryABI.json";
import Web3 from "web3";
import axios from "axios";
import {
  UniswapFactory,
  // ShibaswapRouter,
  ShushiswapFactory,
  UniswapRouter,
  ShibaswapRouter,
  ShushiswapRouter,
  getWeb3Obj,
  getWeb3ContractObject,
  getContract,
  ExchangeContract,
  mainnetRPCURL,
  fromWeiDecimals,
  ShibaswapFactory,
  ZeroAddress,
} from "src/utils";
import moment from "moment";
import { toast } from "react-toastify";
import WalletConnectModal from "src/component/ConnectWallet/WalletConnectModal";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
// import { ShushiSwapFun } from "./SwapExchange/ShushiSwapSDK";
import ExchangeABI from "src/ABI/ExchangeABI.json";
import EstimatedProfits from "./EstimatedProfits";
import { ACTIVE_NETWORK, TokenAddressToUsed } from "src/constants";
const useStyles = makeStyles((theme) => ({
  EstimatedP: {
    "& .MuiDialog-paper": {
      overflowY: "scroll",
    },
  },
  wrapper: {
    "& .MuiDialog-paper": {
      overflowY: "scroll",
    },
    padding: "158px 0px",
    [theme.breakpoints.down("xs")]: {
      padding: "105px 0px",
    },
  },
  text: {
    paddingLeft: "5px",
    paddingTop: "20px",
    paddingBottom: "20px",
    "& p": {
      letterSpaceing: "1px",
      fontSize: "17px",
      fontWeight: "400",
      color: "#14133b",
    },
  },
  text1: {
    marginLeft: "8px",
    "& p": {
      letterSpaceing: "1px",
      fontSize: "17px",
      fontWeight: "400",
      color: "#14133b",
    },
  },
  text2: {
    paddingBottom: "20px",
    "& p": {
      letterSpaceing: "1px",
      fontSize: "17px",
      fontWeight: "400",
      color: "#14133b",
    },
  },
  btn: {
    display: "flex",
    alignItems: "center",
    "& p": {
      "@media (max-width:375px)": {
        fontSize: "12px",
      },
    },
  },
  playicon: {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    backgroundColor: "#811793",
  },
  mainbox: {
    borderRadius: "10px",
    boxShadow: "0 0 40px 0 rgb(94 92 154 / 6%)",
    backgroundColor: "#fff",
    padding: "20px 20px",
  },
  selectbox: {
    display: "flex",
    alignItems: "center",
    paddingTop: "10px",
    "& img": {
      backgroundColor: theme.palette.background.paper,
    },
  },
  ethbox: {
    padding: "10px 15px",
    borderRadius: "10px",
    backgroundColor: "#Ffffff",
    border: "none",
    boxShadow: "0 0 40px 0 rgb(94 92 154 / 6%)",
    "& .tokenBalance": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& input": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ffffff",
      fontWeight: 500,
      textAlign: "right",
      width: "100%",
      fontSize: "18px",
      lineHeight: "30px",
      "&:focus-visible": {
        outline: "none !important",
      },
    },
    "& h6": {
      color: "rgba(20, 19, 59, 1)",
      fontWeight: "600",
      fontSize: "20px",
    },
    "& p": {
      color: "rgba(20, 19, 59, 1)",
    },
  },

  ethbox1: {
    padding: "20px 20px",
    borderRadius: "10px",
    backgroundColor: "#F7F7F7",
    border: "none",
    "& .tokenBalance": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& input": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ffffff",
      fontWeight: 500,
      textAlign: "right",
      width: "100%",
      fontSize: "18px",
      lineHeight: "30px",
      "&:focus-visible": {
        outline: "none !important",
      },
    },

      "& h6": {
        color: "rgb(8, 86, 204) !important",
        fontWeight: "600",
        fontSize: "20px",
      },
    
    "& p": {
      color: "rgba(20, 19, 59, 1)",
    },
  },
  formControl: {
    marginLeft: "10px",
    "& .MuiSelect-select.MuiSelect-select": {
      paddingRight: "40px",
    },
  },
  ethereum: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "5px",
    "& p": {
      color: "rgba(20, 19, 59, 1)",
      fontWeight: "400",
    },
  },
  swapbox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "1rem",
    // padding: "0px 10px 0px 45px",
    fontSize: "17px",
    fontWeight: "400",
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
    },
  },
  childbox: {
    cursor: "pointer",
    border: "0.1px solid #f3f2f3",
    borderRadius: "5px",
    padding: "5px 10px",
    background: "#f3f2f3",
    [theme.breakpoints.down("xs")]: {
      padding: "6px 8px",
      margin: "5px",
    },
  },
  childbox1: {
    // cursor: "pointer",
    border: "0.1px solid rgb(8, 86, 204)",
    padding: "5px 10px",
    borderRadius: "5px",
    background: "#f3f2f3",
    [theme.breakpoints.down("xs")]: {
      padding: "6px 8px",
      margin: "5px",
    },
  },
  childgrid: {
    marginTop: "3rem",
    "& p": {
      color: "#14133b",
    },
    "& .Mui-disabled": {
      color: "#ffffff82 !important",
      border: "none",
    },
  },
  connetwallet: {
    marginTop: "10px",
    fontWeight: 500,
  },
  connetwallet12: {
    marginTop: "10px",
    fontWeight: 500,
    cursor: "no-drop",
    background: "#3f4a51 !important",
    border: "1px solid #3f4a51 !important",
  },
  childgri88: {
    "& .MuiButton-contained.Mui-disabled": {
      cursor: "no-drop",
    },
  },
  dialogbox: {
    position: "relative",
    padding: "20px",
    maxHeight: "95%",
    [theme.breakpoints.down("sm")]: {
      overflowY: "scroll",
    },
  },
  favouritebtn: {
    "@media (max-width:390px)": {
      padding: "10px 14px !important",
    },
  },
  icons: {
    position: "absolute",
    left: "0px",
    top: "12px",
    color: theme.palette.primary.main,
  },
  imagebox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    borderRadius: "8px",
    justifyContent: "center",
    padding: "10px",
    "& p": {
      marginLeft: "8px",
      color: "#14133b",
    },
  },
  heading: {
    marginLeft: "25px",
  },
  root: {
    padding: "0px !important",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.table,
      borderLeft: "1px solid #A2A0A0",
      borderRight: "1px solid #A2A0A0",
      borderRadius: "8px",
    },
  },
  clearicons: {
    position: "absolute",
    top: "0px",
    right: "0px",
    color: "#fff",
    cursor: "pointer",
  },
  head: {
    fontWeight: "400",
    fontSize: "17px",
    color: "#14133b",
    [theme.breakpoints.down("xs")]: {
      fontSize: "16px",
    },
  },
  head12: {
    margin: "10px 0",
    padding: "5px",
    "& p": {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "12px",
      lineHeight: "14px",
    },
    // borderTop: "1px solid #cacaca36",
    // borderBottom: "1px solid #cacaca4a",
  },
  head1: {
    margin: "10px 0",
    padding: "5px",
    borderTop: "1px solid #cacaca36",
    borderBottom: "1px solid #cacaca4a",
  },
  cls: {
    color: "#FF5678 !important",
  },
  clsProfit: {
    color: "#2BAD1B !important",
  },
  clsLoss: {
    color: "red !important",
  },

  iconBox: {
    "& svg": {
      color: "rgba(20, 19, 59, 1)",
    },
  },
  EstimatedtextBix: {
    display: "flex",
    justifyContent: "end",
    cursor: "pointer",
    "& svg": {
      color: "#FFFFFF",
    },
  },

  btnColor: {
    background: "red !important",
    border: "red !important",
    "&:hover": {
      background: "red !important",
      //   "& svg": {import { FactoryABI } from 'src/ABI/FactoryABI.json';

      //     background: "red",
      //   },
    },
  },
}));

function Exchange() {
  const classes = useStyles();
  const { activate, account, chainId, library, deactivate } = useWeb3React();
  const user = useContext(UserContext); // onClick={user.connectWallet}
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [openBuy, setOpenBuy] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [swapName, setSwapName] = React.useState("uniSwap");
  const [swapName2, setSwapName2] = React.useState("uniSwap");
  const [tokenBuy, setTokenBuy] = React.useState();
  const [tokenSell, setTokenSell] = React.useState();
  const [openWallect, setOpenWallect] = useState(false);
  const [fromBalance, setfromBalance] = useState(0);
  const [toBalance, settoBalance] = useState(0);
  const [buttonName, settoButtonName] = useState("Swap");

  const handleClickOpen = (name, type) => {
    if (type == "from") {
      setOpen(true);
    }
    if (type == "to") {
      setOpenBuy(true);
    }
    setSelectedToken(name);
    setSelectTokenType(type);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenBuy(false);
  };
  const HandleWalletModal = () => {
    setOpenWallect(true);
    user.connectWallet();
  };
  const CloseWalletModal = () => {
    setOpenWallect(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const [alignment, setAlignment] = React.useState();
  const [checked, setChecked] = React.useState(false);
  const [swapFrom, setSwapFrom] = useState(TokenAddressToUsed[0]);
  const [swapFromValue, setSwapFromValue] = useState(0);
  const [swapToValue, setSwapToValue] = useState(0);
  const [swapTo, setSwapTo] = useState();
  const [selectedToken, setSelectedToken] = useState();
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [selectTokenType, setSelectTokenType] = useState();
  const [inSufficientLiquidity, setInSufficientLiquidity] = useState();
  const [isTokenApproval, setisTokenApproval] = useState(false);
  const [tokenAllowance, settokenAllowance] = useState("");
  const [approveLoader, setApproveLoader] = useState(false);
  const [swapLoader, setSwapLoader] = useState(false);
  const [returenedValueS, setReturenedValueS] = useState("");
  const slippage = 12;
  const swapTokenData = () => {
    const tempFromData = { ...swapFrom };
    const tempToData = { ...swapTo };
    const tempFromValue = fromValue;
    const tempToValue = toValue;
    setSwapFrom(tempToData);
    setSwapTo(tempFromData);
    setFromValue(Number(tempToValue).toFixed(9).toString());
    setToValue(Number(tempFromValue).toFixed(9).toString());
  };

  const getdata = () => {
    const pancakeRouterContract = getContract(library, account);
  };

  const swapToken = async () => {
    try {
      setSwapLoader(true);
      let SwapRouterF;
      if (swapName == "ShibaSwap") {
        SwapRouterF = ShibaswapRouter;
      }
      if (swapName == "uniSwap") {
        SwapRouterF = UniswapRouter;
      }
      if (swapName == "shushiSwap") {
        SwapRouterF = ShushiswapRouter;
      }

      if (account) {
        let functionName;
        const web3 = await getWeb3Obj();
        const amoutInWei = web3.utils.toWei(fromValue);
        const pancakeRouterContract = getContract(
          SwapRouterF,
          RouterABI,
          library,
          account
        );

        const tenPercent = Number(toValue) - (Number(toValue) / 100) * slippage;
        const crtTime = moment(new Date()).add(20, "minutes").unix();

        // if (swapFrom.type === "noApprove" && swapTo.type === "approve") {
        const myContract = getContract(
          swapFrom.token,
          ERC20ABI,
          library,
          account
        );

        let allowance = await myContract.allowance(account, SwapRouterF);

        if (Number(allowance) > Number(web3.utils.toWei(fromValue, "gwei"))) {
          const amountsOutMin = await pancakeRouterContract.getAmountsOut(
            amoutInWei,
            [swapFrom?.token, swapTo?.token]
          );
          let FunName;
          if (swapFrom.typeToken == "Token" && swapTo.typeToken == "Token") {
            FunName = "swapExactTokensForTokens";
          }
          if (swapFrom.typeToken == "Coin" && swapTo.typeToken == "Token") {
            FunName = "swapExactETHForTokens";
          }
          if (swapFrom.typeToken == "Token" && swapTo.typeToken == "Coin") {
            FunName = "swapTokensForExactETH";
          }
          functionName = FunName;

          let swapFun;
          if (swapFrom.typeToken == "Token" && swapTo.typeToken == "Token") {
            swapFun = await pancakeRouterContract.swapExactTokensForTokens(
              amountsOutMin[0].toString(),
              amountsOutMin[1].toString(),
              [swapFrom.token, swapTo?.token],
              account,
              crtTime,
              {
                from: account,
                value: 0,
                gasPrice: "10000000000",
                gasLimit: web3.utils.toHex("4500000"),
              }
            );

            await swapFun.wait();
            setSwapLoader(false);
            toast.success(
              `${swapFrom.heading} exchange successfully with ${swapTo.heading}`
            );
          }
          if (swapFrom.typeToken == "Token" && swapTo.typeToken == "Coin") {
            swapFun = await pancakeRouterContract.swapExactTokensForETH(
              amountsOutMin[0].toString(),
              amountsOutMin[1].toString(),
              // web3.utils.toWei(tenPercent.toFixed(9).toString(), "gwei"),
              // web3.utils.toWei(tenPercent.toFixed(9).toString(), "gwei"),
              [swapFrom.token, swapTo?.token],
              account,
              crtTime,
              {
                from: account,
                value: 0,
                gasPrice: "10000000000",
                gasLimit: web3.utils.toHex("4500000"),
              }
            );
            await swapFun.wait();
            setSwapLoader(false);
            toast.success(
              `${swapFrom.heading} exchange successfully with ${swapTo.heading}`
            );
          }
          if (swapFrom.typeToken == "Coin" && swapTo.typeToken == "Token") {
            swapFun = await pancakeRouterContract.swapExactETHForTokens(
              web3.utils.toWei(tenPercent.toFixed(9).toString(), "gwei"),
              [swapFrom.token, swapTo?.token],
              account,
              crtTime,
              {
                from: account,
                value: web3.utils.toWei(fromValue),
                gasPrice: "10000000000",
                gasLimit: web3.utils.toHex("4500000"),
              }
            );
            await swapFun.wait();
            setSwapLoader(false);
            toast.success(
              `${swapFrom.heading} exchange successfully with ${swapTo.heading}`
            );
          }
        } else if (swapFrom.type === "approve" && swapTo.type === "approve") {
          functionName =
            "swapExactTokensForTokensSupportingFeeOnTransferTokens";
          approveToken();
          setSwapLoader(false);
        } else {
          functionName = "swapExactTokensForETHSupportingFeeOnTransferTokens";
          approveToken();
          setSwapLoader(false);
        }
      }
    } catch (err) {
      setSwapLoader(false);
      console.log(err);

      toast.error(
        <span className={classes.toastStyl}>
          {err.message.split(":")[err.message.split(":").length - 1]}
        </span>
      );
    }
  };
  const swapTokenNew = async () => {
    try {
      const web3 = await getWeb3Obj();
      const ExchangeContractObj = getContract(
        ExchangeContract,
        ExchangeABI,
        library,
        account
      );
      setSwapLoader(true);
      let SwapRouterF;
      if (swapName == "ShibaSwap") {
        SwapRouterF = ShibaswapRouter;
      }
      if (swapName == "uniSwap") {
        SwapRouterF = UniswapRouter;
      }
      if (swapName == "shushiSwap") {
        SwapRouterF = ShushiswapRouter;
      }
      const AmountIn = web3.utils.toWei(fromValue);

      const registration = await ExchangeContractObj.registration();

      const registrationObj = getContract(
        registration,
        RegistrationABI,
        library,
        account
      );

      const userInfo = await registrationObj.userInfo(account); ///

      if (!userInfo.isRegistered) {
        const registerUser = await registrationObj.registerUser();
        await registerUser.wait();
      }
      if (swapFrom?.type != "nonApprove" && swapTo?.type != "nonApprove") {
        const exchangeTokens = await ExchangeContractObj.exchangeTokens(
          SwapRouterF,
          swapFrom.token,
          swapTo.token,
          AmountIn
        );
        await exchangeTokens.wait();
      }
      if (swapFrom?.type != "nonApprove" && swapTo?.type == "nonApprove") {
        const exchangeTokens = await ExchangeContractObj.exchangeTokens(
          SwapRouterF,
          swapFrom.token,
          swapTo.token,
          AmountIn
        );
        toast.success(`${swapFrom.heading} swap with ${swapTo.heading}`);
        await exchangeTokens.wait();
      }

      if (swapFrom?.type == "nonApprove" && swapTo?.type != "nonApprove") {
        const exchangeTokens = await ExchangeContractObj.exchangeTokens(
          SwapRouterF,
          swapFrom.token,
          swapTo.token,
          0,
          { value: AmountIn }
        );
        await exchangeTokens.wait();
      }

      setSwapLoader(false);
    } catch (err) {
      console.log("error", err);
      toast.error(
        <span className={classes.toastStyl}>
          {err.message.split(":")[err.message.split(":").length - 1]}
        </span>
      );
      setSwapLoader(false);
    }
  };
  const approveToken = async () => {
    try {
      setApproveLoader(true);
      const web3 = await getWeb3Obj();
      let SwapRouterF;
      if (swapName == "ShibaSwap") {
        SwapRouterF = ShibaswapRouter;
      }
      if (swapName == "uniSwap") {
        SwapRouterF = UniswapRouter;
      }
      if (swapName == "shushiSwap") {
        SwapRouterF = ShushiswapRouter;
      }

      const myContract = getContract(
        swapFrom.token,
        ERC20ABI,
        library,
        account
      );

      let allowance = await myContract.allowance(account, ExchangeContract);

      if (Number(allowance) < Number(web3.utils.toWei(fromValue, "gwei"))) {
        const allowance = await myContract.approve(
          ExchangeContract,
          "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          {
            from: account,
            gasPrice: "50000000000",
            gasLimit: web3.utils.toHex("300000"),
          }
        );
        await allowance.wait();
        checkMaxAllowance();
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
      console.log(err.message);
    }
  };

  const estimateGas = async (functionName, tenPercent, crtTime) => {
    let SwapRouterF;
    if (swapName == "ShibaSwap") {
      SwapRouterF = ShibaswapRouter;
    }
    if (swapName == "uniSwap") {
      SwapRouterF = UniswapRouter;
    }
    if (swapName == "shushiSwap") {
      SwapRouterF = ShushiswapRouter;
    }

    const pancakeRouterContract = await getWeb3ContractObject(
      RouterABI,
      SwapRouterF,
      mainnetRPCURL
    );
    const web3 = await getWeb3Obj();

    const amoutInWei = web3.utils.toWei(fromValue);

    let gasEstimate;
    if (swapFrom.type != "nonApprove") {
      const tokensForETHTransfer = await getWeb3ContractObject(
        ERC20ABI,
        swapFrom?.token,
        mainnetRPCURL
      );

      // gasEstimate =  tokensForETHTransfer.methods.myMethod(123).estimateGas({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})

      // .then(function(gasAmount){
      //     ...
      // })
      // .catch(function(error){
      //     ...
      // });
      //

      const amountsOutMin = await pancakeRouterContract.methods
        .getAmountsOut(amoutInWei, [swapFrom?.token, swapTo?.token])
        .call();
      // gasEstimate = await pancakeRouterContract.methods[functionName](
      //   // web3.utils.toWei(tenPercent.toFixed(9).toString(), "gwei"),
      //   amountsOutMin[0],
      //   amountsOutMin[1],
      //   [swapFrom.token, swapTo?.token],
      //   account,
      //   crtTime
      // ).estimateGas({
      //   from: account,
      //   value: web3.utils.toWei(fromValue),
      // });
      //  gasEstimate = async (fromAddress, toAddress, amount) => {

      gasEstimate = await web3.eth.estimateGas({
        to: SwapRouterF,
        from: swapFrom.token,
        value: web3.utils.toWei(`${fromValue}`, "ether"),
      });
    }
    if (swapFrom.type == "nonApprove") {
      gasEstimate = await pancakeRouterContract.methods[functionName](
        web3.utils.toWei(tenPercent.toFixed(9).toString(), "gwei"),

        [swapFrom.token, swapTo?.token],
        account,
        crtTime
      ).estimateGas({
        from: account,
        value: web3.utils.toWei(fromValue),
      });
    }
    return gasEstimate;
  };

  const SwapToValuesFunction = async () => {
    try {
      axios({
        method: "GET",
        // url: `https://api.pancakeswap.info/api/v2/tokens/${swapTo?.token}`,
        url: `https://api.coingecko.com/api/v3/coins/ethereum/contract/${"0xdAC17F958D2ee523a2206206994597C13D831ec7"}`,
      }).then(async (res) => {
        if (res.status === 200) {
          setSwapToValue(res.data.market_data?.current_price?.usd);
          // setState(1);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    SwapToValuesFunction();
  }, [swapTo?.token]);

  // useEffect(async () => {
  const SwapFromValuesFunction = async () => {
    try {
      axios({
        method: "GET",
        // url: `https://api.pancakeswap.info/api/v2/tokens/${swapFrom.token}`,
        url: `https://api.coingecko.com/api/v3/coins/ethereum/contract/${"0xdAC17F958D2ee523a2206206994597C13D831ec7"}`,
      }).then(async (res) => {
        if (res.status === 200) {
          setSwapFromValue(res.data.market_data?.current_price?.usd);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    SwapFromValuesFunction();
  }, [swapFrom.token]);

  const changeTokenName = async (data) => {
    if (selectTokenType === "from") {
      setSwapFrom(data);
      try {
        axios({
          method: "GET",
          // url: `https://api.pancakeswap.info/api/v2/tokens/${data.token}`,
          url: `https://api.coingecko.com/api/v3/coins/ethereum/contract/${"0xdAC17F958D2ee523a2206206994597C13D831ec7"}`,
        }).then(async (res) => {
          if (res.status === 200) {
            // setrewardTokenPrice(res.data.data.price);
            // setState(1);
          }
        });
      } catch (error) {
        console.log(error);
      }
      if (fromValue != 0) {
        const price = await recivePrice(
          swapFrom.token,
          swapFrom.type,
          swapTo?.token,
          swapTo?.type,
          fromValue,
          swapName
        );
        setToValue(Number(price).toFixed(9).toString());
      }
    } else {
      setSwapTo(data);
      if (toValue != 0) {
        const price = await recivePrice(
          swapTo?.token,
          swapTo?.type,
          swapFrom.token,
          swapFrom.type,
          toValue,
          swapName
        );
        setFromValue(Number(price).toFixed(9).toString());
      }
    }
    handleClose();
    setAlignment();
  };
  const FromTokenBalance = async () => {
    try {
      if (account && swapFrom?.type != "nonApprove") {
        const fromTokenContract = await getWeb3ContractObject(
          ERC20ABI,
          swapFrom?.token,
          mainnetRPCURL
        );

        const fromTokenBalance = await fromTokenContract.methods
          .balanceOf(account)
          .call();
        const fromDecimal = await fromTokenContract.methods.decimals().call();
        setfromBalance(fromWeiDecimals(fromTokenBalance, fromDecimal));
      }
      if (account && swapFrom?.type == "nonApprove") {
        // const fromTokenBalance = await fromTokenContract.methods
        //   .balanceOf(account)
        //   .call();
        // const fromDecimal = await fromTokenContract.methods.decimals().call();

        var web3 = new Web3(library.provider);
        const balance = await web3.eth.getBalance(account);
        const balanceImETH = await web3.utils.fromWei(balance);
        setfromBalance(balanceImETH);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    FromTokenBalance();
  }, [swapFrom?.token, account]);

  const ToTokenBalance = async () => {
    try {
      if (account) {
        const toTokenContract = await getWeb3ContractObject(
          ERC20ABI,
          swapTo?.token,
          mainnetRPCURL
        );

        const toTokenBalance = await toTokenContract.methods
          .balanceOf(account)
          .call();
        const toDecimal = await toTokenContract.methods.decimals().call();
        settoBalance(fromWeiDecimals(toTokenBalance, toDecimal));
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (swapTo?.token) {
      ToTokenBalance();
    }
  }, [swapTo?.token, account]);
  const changeTokenValue = async (value, type) => {
    if (type === "from") {
      setFromValue(value);

      if (value > 0) {
        const price = await recivePrice(
          swapFrom.token,
          swapFrom.type,
          swapTo?.token,
          swapTo?.type,
          value,
          swapName
        );

        setToValue(Number(price).toFixed(9).toString());
      } else {
        // setFromValue("");
        // setToValue("");
      }
    } else {
      setToValue(value);
      if (value > 0) {
        const price = await recivePrice(
          swapTo?.token,
          swapTo?.type,
          swapFrom.token,
          swapFrom.type,
          value,
          swapName
        );
        setFromValue(Number(price).toFixed(9).toString());
      } else {
        // setFromValue("");
        // setToValue("");
      }
    }
  };

  const recivePrice = async (
    fromToken,
    fromType,
    toToken,
    toType,
    inputValue,
    SwapTypes
  ) => {
    try {
      let SwapRouterF;
      let SwapFactoryF;
      if (SwapTypes == "ShibaSwap") {
        SwapRouterF = ShibaswapRouter;
        SwapFactoryF = ShibaswapFactory;
      }
      if (SwapTypes == "uniSwap") {
        SwapRouterF = UniswapRouter;
        SwapFactoryF = UniswapFactory;
      }
      if (SwapTypes == "shushiSwap") {
        SwapRouterF = ShushiswapRouter;
        SwapFactoryF = ShushiswapFactory;
      }
      const pancakeRouterContract = await getWeb3ContractObject(
        RouterABI,
        SwapRouterF,
        mainnetRPCURL
      );
      const pancakeFactoryContract = await getWeb3ContractObject(
        FactoryABI,
        SwapFactoryF,
        mainnetRPCURL
      );
      let TokenA;
      let TokenB;

      if (fromType == "nonApprove") {
        const tokens = await pancakeRouterContract.methods.WETH().call();
        TokenA = tokens;
      } else {
        TokenA = fromToken;
      }
      if (toType == "nonApprove") {
        const tokens = await pancakeRouterContract.methods.WETH().call();
        TokenB = tokens;
      } else {
        TokenB = toToken;
      }

      const web3 = await getWeb3Obj();
      const amoutInWei = web3.utils.toWei(inputValue);

      const GetPair = await pancakeFactoryContract.methods
        .getPair(TokenA, TokenB)
        .call();
      if (GetPair != ZeroAddress) {
        setInSufficientLiquidity(false);
        const youGetPrice = await pancakeRouterContract.methods
          .getAmountsOut(amoutInWei, [TokenA, TokenB])
          .call();
        const finaldata = web3.utils.fromWei(youGetPrice[1], "ether");
        return finaldata;
      } else {
        setInSufficientLiquidity(true);
      }
    } catch (error) {
      console.log("error----", error);
    }
  };
  const ReturnedValuesInProfit = async () => {
    if (toValue > 0) {
      const price = await recivePrice(
        swapTo?.token,
        swapTo?.type,
        swapFrom?.token,
        swapFrom?.type,
        toValue,
        swapName
      );
      setReturenedValueS(Number(price).toFixed(9).toString());
    }
  };
  useEffect(() => {
    ReturnedValuesInProfit();
  }, [toValue, swapName2, swapName]);

  useEffect(() => {
    if (swapTo?.token) {
      changeTokenValue(fromValue, "from");
    }
  }, [account, swapTo?.token, swapFrom?.token]);
  //isTokenApproval
  const checkMaxAllowance = async () => {
    const web3 = await getWeb3Obj();

    const myContract = getContract(swapFrom.token, ERC20ABI, library, account);

    let allowance = await myContract.allowance(account, ExchangeContract);

    settokenAllowance(Number(allowance));
    try {
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (swapFrom.type == "approve") {
      setisTokenApproval(true);
      checkMaxAllowance();
    } else {
      setisTokenApproval(false);
    }
  }, [swapFrom.type, swapFrom.token, account]);

  return (
    <Box className={classes.wrapper}>
      <Container maxWidth="md">
        {openWallect && (
          <WalletConnectModal
            open={openWallect}
            handleClose={CloseWalletModal}
          />
        )}
        <Grid
          container
          spacing={3}
          alignItems="flex-start"
          justifyContent="center"
        >
          <Grid
            item
            lg={7}
            md={6}
            sm={12}
            xs={12}
            // style={{ alignItems: "flex-start" }}
          >
            <Container className="p-0">
              <Box style={{ maxWidth: "120px" }}>
                <img src="./images/logo.svg" alt="logo" />
              </Box>
              <Box className={classes.text}>
                <Typography variant="body2">
                  Velit integer eget lobortis est netus. Eget risus ullamcorper
                  orci pharetra risus. Tellus augue in nibh blandit. Eu tortor
                  adipiscing rhoncus habitant nec. Elit dui bibendum nibh
                  sapien.
                </Typography>
              </Box>
              <Box className={classes.text2}>
                <Typography variant="body2">
                  Velit integer eget lobortis est netus. Eget risus ullamcorper
                  orci pharetra risus. Tellus augue in nibh blandit. Eu tortor
                  adipiscing rhoncus habitant nec. Elit dui bibendum nibh
                  sapien.
                </Typography>
              </Box>
              <Box className={classes.btn}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.favouritebtn}
                  onClick={() => {
                    history.push({
                      pathname: "/cross-exchange",
                    });
                  }}
                >
                  favourite
                </Button>
                <Box display="flex" ml={4} alignItems="center">
                  <Box className={classes.playicon}>
                    <PlayArrowIcon style={{ color: "#fff" }} />
                  </Box>

                  <Box className={classes.text1}>
                    <Typography variant="body2">
                      Step by Step Tutorial
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Container>
          </Grid>
          <Grid item lg={5} md={6} sm={12} xs={12}>
            <Paper className={classes.mainbox}>
              <Box className={`numberTextField ${classes.ethbox1}`}>
                <Box className="tokenBalance">
                  <Typography variant="body1">You Sell</Typography>
                  {account && (
                    <Typography variant="body1">
                      Balance : &nbsp; {parseFloat(fromBalance).toFixed(4)}
                    </Typography>
                  )}
                </Box>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box className={classes.selectbox}>
                    <img
                      src={swapFrom.image}
                      alt="token"
                      // style={{ width: "20px" }}
                      style={{
                        cursor: "pointer",
                        width: "20px",
                      }}
                      onClick={() => handleClickOpen(swapFrom?.heading, "from")}
                    />
                    <Box ml={2}>
                      <Typography
                        variant="h6"
                        style={{ cursor: "pointer", whiteSpace: "pre" }}
                        onClick={() =>
                          handleClickOpen(swapFrom?.heading, "from")
                        }
                      >
                        {swapFrom.heading}
                        <BiChevronDown />
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    {/* <Typography variant="h6">0.998833</Typography> */}{" "}
                    <input
                      type="number"
                      // min={0}
                      placeholder="0.0"
                      value={fromValue}
                      onChange={(e) => changeTokenValue(e.target.value, "from")}
                    />
                  </Box>
                </Box>
                <Box className={classes.ethereum}>
                  <Typography variant="body1">
                    {swapFrom.discription}
                  </Typography>
                  <Typography variant="body1">
                    ~${(parseFloat(swapFromValue) * fromValue).toFixed(4)}
                  </Typography>
                </Box>
              </Box>

              <Box mt={2} className={`numberTextField ${classes.ethbox}`}>
                <Box className="tokenBalance">
                  <Typography variant="body1">You Buy</Typography>
                  {account && swapTo && (
                    <Typography variant="body1">
                      Balance : &nbsp; {parseFloat(toBalance).toFixed(4)}
                    </Typography>
                  )}
                </Box>
                {!swapTo ? (
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      // }}
                      // // style={{
                      //   width: "30px",
                      //   height: "30px",
                      cursor: "pointer",
                    }}
                    // onClick={handleClickOpenBuy}
                    onClick={() => handleClickOpen(swapTo?.heading, "to")}
                  >
                    <Box
                      className={classes.selectbox}
                      style={{ paddingTop: "0px" }}
                    >
                      {/* <img src="./images/ETH.png" /> */}
                      <Box>
                        <Typography variant="h6">Select token</Typography>
                      </Box>
                    </Box>
                    <Box className={classes.iconBox}>
                      <BiChevronDown
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                        // onClick={handleClickOpenBuy}
                        // onClick={() => handleClickOpen(swapTo?.heading, "to")}
                      />
                    </Box>
                  </Box>
                ) : (
                  <>
                    {/* ______--------------------------- */}
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box className={classes.selectbox}>
                        <img
                          src={swapTo?.image}
                          alt=""
                          style={{ width: "20px" }}
                        />
                        <Box ml={2}>
                          <Typography
                            variant="h6"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleClickOpen(swapTo?.heading, "to")
                            }
                          >
                            {swapTo?.heading}
                            <BiChevronDown />
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        {/* <Typography variant="h6">0.998833</Typography> */}{" "}
                        <input
                          type="number"
                          min={0}
                          placeholder="0.0"
                          value={toValue}
                          onChange={(e) =>
                            changeTokenValue(e.target.value, "to")
                          }
                        />
                      </Box>
                    </Box>
                    <Box className={classes.ethereum}>
                      <Typography variant="body1">
                        {swapTo?.discription}
                      </Typography>
                      <Typography variant="body1">
                        ~${(parseFloat(swapToValue) * toValue).toFixed(4)}
                      </Typography>
                    </Box>
                  </>
                )}
                {/* ______--------------------------- */}
              </Box>
              <Box className={classes.swapbox}>
                <Box
                  className={
                    swapName == "uniSwap" ? classes.childbox1 : classes.childbox
                  }
                  onClick={() => setSwapName("uniSwap")}
                >
                  <Typography variant="body2" className={classes.head}>
                    Uniswap
                  </Typography>
                </Box>
                <Box
                  className={
                    swapName == "ShibaSwap"
                      ? classes.childbox1
                      : classes.childbox
                  }
                  onClick={() => setSwapName("ShibaSwap")}
                >
                  <Typography variant="body2" className={classes.head}>
                    Shibaswap
                  </Typography>
                </Box>
                <Box
                  className={
                    swapName == "shushiSwap"
                      ? classes.childbox1
                      : classes.childbox
                  }
                  onClick={() => setSwapName("shushiSwap")}
                >
                  <Typography variant="body2" className={classes.head}>
                    Shushiswap
                  </Typography>
                </Box>
              </Box>
              {/* ---------------------------AUTOMATICA-------------------------- */}

              {account &&
                swapTo &&
                fromValue < fromBalance &&
                fromValue != "" &&
                toValue > 0 &&
                fromValue > 0 && (
                  // returenedValueS > fromValue &&
                  // (fromValue == "NaN" ||
                  //   fromValue == "" ||
                  //   toValue == "NaN" ||
                  //   toValue == NaN ||
                  //   toValue == "" ||
                  //   toValue == 0 ||
                  //   fromValue == 0) &&
                  <Box pt={2}>
                    <Box className={`numberTextField ${classes.ethbox}`}>
                      <Box className="tokenBalance">
                        <Typography variant="body1">You Sell</Typography>
                        {/* {account && (<Typography variant="body1">Balance : &nbsp; {parseFloat(fromBalance).toFixed(4)}</Typography>)} */}
                      </Box>
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box className={classes.selectbox}>
                          <img
                            src={swapTo?.image}
                            alt="token"
                            style={{ width: "20px" }}
                          />
                          <Box ml={2}>
                            <Typography
                              variant="h6"
                              style={{ cursor: "pointer" }}
                              // onClick={() => handleClickOpen(swapTo?.heading, "from")}
                            >
                              {swapTo?.heading}
                              <BiChevronDown />
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          {/* <Typography variant="h6">0.998833</Typography> */}{" "}
                          <input
                            type="number"
                            // min={0}
                            placeholder="0.0"
                            value={toValue}
                            // onChange={(e) => changeTokenValue(e.target.value, "from")}
                          />
                        </Box>
                      </Box>
                      <Box className={classes.ethereum}>
                        <Typography variant="body1">
                          {swapTo?.discription}
                        </Typography>
                        <Typography variant="body1">
                          {/* ~${(parseFloat(swapFromValue) * fromValue).toFixed(4)} */}
                        </Typography>
                      </Box>
                    </Box>

                    <Box mt={2} className={`numberTextField ${classes.ethbox}`}>
                      <Box className="tokenBalance">
                        <Typography variant="body1">You Buy</Typography>
                        {/* {account && swapTo && (<Typography variant="body1">Balance : &nbsp; {parseFloat(toBalance).toFixed(4)}</Typography>)} */}
                      </Box>

                      {/* ______--------------------------- */}
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box className={classes.selectbox} mt={0}>
                          <img
                            src={swapFrom?.image}
                            alt=""
                            style={{ width: "20px" }}
                          />
                          <Box ml={2}>
                            <Typography
                              variant="h6"
                              style={{ cursor: "pointer" }}
                              // onClick={() => handleClickOpen(swapFrom?.heading, "to")}
                            >
                              {swapFrom?.heading}
                              <BiChevronDown />
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          {/* <Typography variant="h6">0.998833</Typography> */}{" "}
                          <input
                            type="number"
                            min={0}
                            placeholder="0.0"
                            value={returenedValueS} //new profit found
                            // onChange={(e) => changeTokenValue(e.target.value, "to")}
                          />
                        </Box>
                      </Box>
                      <Box className={classes.ethereum}>
                        <Typography variant="body1">
                          {swapFrom?.discription}
                        </Typography>
                        <Typography variant="body1">
                          {/* ~${(parseFloat(swapToValue) * toValue).toFixed(4)} */}
                        </Typography>
                      </Box>
                      {/* </>)} */}
                      {/* ______--------------------------- */}
                    </Box>
                  </Box>
                )}
              {/* ------------------------AUTOMATICA------------------------- */}
              <Box className={classes.childgri88}>
                <Grid container className={classes.head12}>
                  <Grid item lg={6} md={6} sm={6} xs={6} mt={2}>
                    <Typography variant="body2">Transfer Fee</Typography>
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={6}
                    mt={3}
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                    }}
                  >
                    <Box className={classes.EstimatedtextBix}>
                      <Typography variant="body1" style={{ color: "#FF5678" }}>
                        2.8%
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                {account &&
                  swapTo &&
                  fromValue < fromBalance &&
                  fromValue != "" && (
                    <Grid container className={classes.head12}>
                      <Grid item lg={6} md={6} sm={6} xs={6} mt={2}>
                        <Typography variant="body2">Profit</Typography>
                      </Grid>
                      <Grid
                        item
                        lg={6}
                        md={6}
                        sm={6}
                        xs={6}
                        mt={3}
                        style={{
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                        }}
                      >
                        {/* <Grid item lg={6} md={6} sm={6} xs={6} align="right"> */}
                        {parseFloat(returenedValueS) >
                          parseFloat(fromValue) && (
                          <Typography
                            variant="body1"
                            className={classes.clsProfit}
                          >
                            {((parseFloat(fromValue) -
                              parseFloat(returenedValueS)) /
                              parseFloat(returenedValueS)) *
                              100}{" "}
                            %
                          </Typography>
                        )}
                        {parseFloat(returenedValueS) <
                          parseFloat(fromValue) && (
                          <Typography
                            variant="body1"
                            className={classes.clsLoss}
                          >
                            {((parseFloat(fromValue) -
                              parseFloat(returenedValueS)) /
                              parseFloat(returenedValueS)) *
                              100}{" "}
                            %
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  )}
                {/* <Box className={classes.childgrid}>
                      <Grid container spacing={1}>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          <Typography variant="body2">Profit</Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6} align="right">
                          {parseFloat(returenedValueS) >
                            parseFloat(fromValue) && (
                            <Typography
                              variant="body1"
                              className={classes.clsProfit}
                            >
                              {((parseFloat(fromValue) -
                                parseFloat(returenedValueS)) /
                                parseFloat(returenedValueS)) *
                                100}{" "}
                              %
                            </Typography>
                          )}
                          {parseFloat(returenedValueS) <
                            parseFloat(fromValue) && (
                            <Typography
                              variant="body1"
                              className={classes.clsLoss}
                            >
                              {((parseFloat(fromValue) -
                                parseFloat(returenedValueS)) /
                                parseFloat(returenedValueS)) *
                                100}{" "}
                              %
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Box> */}

                <Grid container className={classes.head1}>
                  <Grid item lg={6} md={6} sm={6} xs={6} mt={2}>
                    <Typography
                      variant="body2"
                      style={{ color: "#14133b", fontWeight: "400" }}
                    >
                      Profitpath
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={6}
                    mt={3}
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                    }}
                  >
                    <Box className={classes.EstimatedtextBix}>
                      <Typography
                        variant="body1"
                        onClick={handleClickOpen2}
                        style={{ color: "#14133b", fontWeight: "400" }}
                      >
                        Estimated profits
                      </Typography>
                      <BiChevronRight onClick={handleClickOpen2} />
                    </Box>
                  </Grid>
                </Grid>
                {account ? (
                  <>
                    {chainId == ACTIVE_NETWORK ? (
                      <>
                        {swapTo ? (
                          <>
                            {fromValue != 0 ? (
                              <>
                                {fromValue < fromBalance ? (
                                  <>
                                    {/* {returenedValueS > fromValue ? ( */}
                                    <>
                                      {isTokenApproval && (
                                        <>
                                          {tokenAllowance == 0 ? (
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              fullWidth
                                              className={classes.connetwallet}
                                              // onClick={SwapExchange}
                                              onClick={approveToken}
                                              disabled={approveLoader}
                                            >
                                              Allow Protocal to use your{" "}
                                              {swapFrom?.heading}
                                              {approveLoader && (
                                                <ButtonCircularProgress />
                                              )}
                                            </Button>
                                          ) : (
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              fullWidth
                                              className={classes.connetwallet}
                                              disabled
                                            >
                                              You can now trade{" "}
                                              {swapFrom?.heading}
                                            </Button>
                                          )}
                                        </>
                                      )}
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        className={classes.connetwallet}
                                        // onClick={SwapExchange}
                                        onClick={swapTokenNew}
                                        disabled={
                                          approveLoader ||
                                          swapLoader ||
                                          (isTokenApproval &&
                                            tokenAllowance == 0) ||
                                          inSufficientLiquidity
                                        }
                                      >
                                        {inSufficientLiquidity
                                          ? "Insufficient liquidity for this trade."
                                          : buttonName}
                                        {swapLoader && (
                                          <ButtonCircularProgress />
                                        )}
                                      </Button>
                                    </>
                                    {/* ) : (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    className={classes.connetwallet}
                                    disabled
                                  >
                                    No profit path for {swapFrom?.heading} to{" "}
                                    {swapTo?.heading}
                                  </Button>
                                )} */}
                                  </>
                                ) : (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    className={classes.connetwallet12}
                                    // disabled
                                  >
                                    Insufficient {swapFrom?.heading} balance
                                  </Button>
                                )}
                              </>
                            ) : (
                              <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                className={classes.connetwallet12}
                                // disabled
                              >
                                Enter an amount
                              </Button>
                            )}
                          </>
                        ) : (
                          <>
                            {/* {chainId == ACTIVE_NETWORK ? ( */}
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              className={classes.connetwallet12}
                              // disabled
                            >
                              Select Token
                            </Button>
                          </>
                        )}
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.btnColor}
                        // disabled
                        onClick={() => setOpenWallect(true)}
                      >
                        You are on wrong network
                      </Button>
                    )}
                  </>
                ) : (
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
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <ExchangeModal
          handleClose={handleClose}
          detailscard={TokenAddressToUsed}
          setTokenSelect={changeTokenName}
          tokensToDisabled={swapTo}
          SelectedTokens={swapFrom}
        />
      </Dialog>

      <Dialog open={openBuy} onClose={handleClose} fullWidth maxWidth="sm">
        <ExchangeModal
          handleClose={handleClose}
          detailscard={TokenAddressToUsed}
          setTokenSelect={changeTokenName}
          SelectedTokens={swapTo}
          tokensToDisabled={swapFrom}
        />
      </Dialog>
      {/* <--Estimated Profits--> */}
      <Dialog open={open2} onClose={handleClose2} fullWidth maxWidth="lg">
        <EstimatedProfits
          handleClose2={handleClose2}
          SolutionCard={TokenAddressToUsed}
          swapFrom={swapFrom}
          SwapTypes={swapName}
          inputValue={fromValue ? fromValue : 1}
        />
      </Dialog>
    </Box>
  );
}
export default Exchange;
