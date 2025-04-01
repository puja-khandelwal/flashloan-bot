import React, { useState, useEffect, useContext } from "react";
import {
  makeStyles,
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Popper,
  FormGroup,
  Radio,
  FormControlLabel,
  RadioGroup,
  TextField,
  Paper,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import { socketURL } from "src/config/APICongig";

import { AuthContext } from "src/context/Auth";
import { UserContext } from "src/context/User";
import CrossExchaneNewCrad from "./CrossExchaneNewCrad";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .buttonNotAllow": {
      cursor: "not-allowed",
      background: "#0856cc !important",
      border: "#0856cc",
    },
    "& .MuiFormControlLabel-label.Mui-disabled": {
      color: "#262626",
      fontSize: "14px",
      fontWeight: "400",
    },
    "& .buttonNotAllowPopper": {
      cursor: "not-allowed",
      color: "#0F212E",
      width: "100%",
      padding: "8px 15px",
      backgroundColor: "#FFFFFF",
      border: "1px solid #E7E7E7",
      borderRadius: "10px",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "10px",
      },
      "& .MuiButton-label": {
        justifyContent: "space-between",
      },
    },
    "& .buttonNotAllowText": {
      cursor: "not-allowed",
      background: "#0856cc !important",
      border: "#0856cc",
      borderRadius: "10px",
      padding: "13px 15px",
    },

    "& .MuiOutlinedInput-root": {
      height: "43px",
    },
    "& h6": {
      color: "#14133b",
    },
  },
  topButton: {
    color: "#0F212E",
    padding: "8px 15px",
    borderradius: "5px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E7E7E7",
    borderRadius: "10px",
    [theme.breakpoints.only("xs")]: {
      padding: "8px 6px",
      fontSize: "12px",
    },
  },
  popperCard: {
    position: "absolute",
    willChange: "transform",
    width: "150px",
    paddingLeft: "15px",
    top: "5px !important",
    left: "0px",
    transform: "translate3d(23px, 211px, 0px)",
    background: "#ffffff",
    borderTop: "1px solid #CECECE",
    "& .MuiIconButton-root": {
      color: "rgba(65, 22, 67, 1) !important",
    },
    "& .muiFormGroup": {
      "& .FormGroupRadioSelector": {
        width: "165px !important",
        background: "#ffffff",
      },
    },
  },
  popperForBuynSell: {
    position: "absolute",
    willChange: "transform",
    width: "75px !important",
    paddingLeft: "15px",
    top: "0px",
    left: "0px",
    transform: "translate3d(23px, 211px, 0px)",
    "& .muiFormGroup": {
      position: "absolute",
      left: "3px",
      "& .FormGroupRadioSelector": {
        width: "85px !important",
        position: "absolute",
        left: "15px",
      },
    },
  },
}));
const traingularArbitrage = [
  {
    exchange: "Uniswap",
    resp1: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
    resp2: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
    resp3: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
  },
  {
    exchange: "Uniswap",
    resp1: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
    resp2: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
    resp3: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
  },
  {
    exchange: "Uniswap",
    resp1: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
    resp2: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
    resp3: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
  },
  {
    exchange: "Sushiswap",
    resp1: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "LOSS",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
    resp2: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
    resp3: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
  },
  {
    exchange: "Sushiswap",
    resp1: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "LOSS",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
    resp2: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
    resp3: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
  },
  {
    exchange: "Shibaswap",
    resp1: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
    resp1: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
    resp2: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "12",
      toPrice: "12.3",
    },
    resp3: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "12",
      toPrice: "12.3",
    },
  },
  {
    exchange: "Shibaswap",
    resp1: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
    resp1: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
    resp2: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "12",
      toPrice: "12.3",
    },
    resp3: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "12",
      toPrice: "12.3",
    },
  },
  {
    exchange: "Shibaswap",
    resp1: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
    resp1: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "FGD",
      toPrice: "12.3",
    },
    resp2: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "12",
      toPrice: "12.3",
    },
    resp3: {
      exchange: "Uniswap",
      exchangeName: "Uniswap",
      status: "PROFIT",
      fromPrice: "12",
      toPrice: "12.3",
    },
  },
];
function Index() {
  const classes = useStyles();
  // console.log("socket ", socket);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  // const [anchorEl3, setAnchorEl3] = useState(null);
  // const [anchorEl4, setAnchorEl4] = useState(null);
  const [amount, setAmount] = useState(0.001);
  const [isLoading, setIsLoading] = useState(true);
  const [isTraingular, setisTraingular] = useState(false);
  const [isTraingular1, setIsTraingular1] = useState(false);
  const [loaderOnOff, setloaderOnOff] = useState(true);
  const auth = useContext(UserContext);

  const [permissions, setpermissions] = useState("UNISwap");

  const handleChange1 = (event) => {
    setpermissions(event.target.name);
    setIsLoading(true);
    setIsTraingular1(false);
    handleClick1();
    // console.log(" --- open --- 2", open2);
    if (open2) {
      handleClick2();
    }
  };

  const handleChange2 = (event) => {
    setpermissions(event.target.name);
    setIsLoading(true);
    setIsTraingular1(true);
    handleClick2();
    // console.log(" --- open --- 1", open1);
    if (open1) {
      handleClick1();
    }
  };

  const handleClick1 = (event) => {
    setAnchorEl1(anchorEl1 ? null : event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(anchorEl2 ? null : event.currentTarget);
  };

  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? "simple-popper" : undefined;
  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popper" : undefined;

  const [traingularArbitrage1, setTraingularArbitrage] = useState([]);
  const [isBelmunFord, setisBelmunFord] = useState(false);

  const [socketS, setSocketS] = useState(false);
  const HandleSockets1 = () => {
    setisTraingular(isTraingular1);
    if (socketS) {
      setSocketS(false);
    } else {
      setSocketS(true);
    }
  };

  useEffect(() => {
    const web = new WebSocket(socketURL);
    const accessToken = localStorage.getItem("token");
    try {
      setloaderOnOff(true);
      setTraingularArbitrage([]);
      setIsLoading(true);
      let socketData;
      let socketData1;
      let socketData2;
      let socketDataR;
      let socketData1R;
      let socketData2R;
      let socketDataV2;
      if (!isTraingular) {
        if (permissions == "UNISwap") {
          socketData = {
            option: "singleDexTwoToken",
            pairA: "UNI",
            userId: auth.userData._id,
            amount: Number(amount),
          };
          socketData1 = {
            option: "singleDexTwoToken",
            pairA: "SUSHI",
            userId: auth.userData._id,
            amount: Number(amount),
          };
          socketData2 = {
            option: "singleDexTwoToken",
            pairA: "SHIBA",
            userId: auth.userData._id,
            amount: Number(amount),
          };
          socketDataV2 = {
            option: "singleDexTwoTokenV2",
            // pairA: "SUSHI",
            userId: auth.userData._id,
            amount: Number(amount),
          };
        }

        if (permissions == "UNISHIBA") {
          socketData = {
            option: "dualDexTwoToken",
            pairA: "UNI",
            pairB: "SHIBA",
            userId: auth.userData._id,
            amount: Number(amount),
          };
          socketData1 = {
            option: "dualDexTwoToken",
            pairA: "UNI",
            pairB: "SUSHI",
            userId: auth.userData._id,
            amount: Number(amount),
          };
          socketData2 = {
            option: "dualDexTwoToken",
            pairA: "SHIBA",
            pairB: "SUSHI",
            userId: auth.userData._id,
            amount: Number(amount),
          };
          socketDataR = {
            option: "dualDexTwoToken",
            pairB: "UNI",
            pairA: "SHIBA",
            userId: auth.userData._id,
            amount: Number(amount),
          };
          socketData1R = {
            option: "dualDexTwoToken",
            pairB: "UNI",
            pairA: "SUSHI",
            userId: auth.userData._id,
            amount: Number(amount),
          };
          socketData2R = {
            option: "dualDexTwoToken",
            pairB: "SHIBA",
            pairA: "SUSHI",
            userId: auth.userData._id,
            amount: Number(amount),
          };

          socketDataV2 = {
            option: "dualDexTwoTokenV2",
            // pairA: "UNI",
            // pairB: "SHIBA",
            userId: auth.userData._id,
            amount: Number(amount),
          };
        }
      } else {
        if (permissions == "UNISwapThree") {
          socketData = {
            option: "singleDexThreeToken",
            pairA: "UNI",
            userId: auth.userData._id,
            amount: Number(amount),
          };
          socketData1 = {
            option: "singleDexThreeToken",
            pairA: "SUSHI",
            userId: auth.userData._id,
            amount: Number(amount),
          };
          socketData2 = {
            option: "singleDexThreeToken",
            pairA: "SHIBA",
            userId: auth.userData._id,
            amount: Number(amount),
          };
          socketDataV2 = {
            option: "singleDexThreeTokenV2",
            // pairA: "UNI",
            userId: auth.userData._id,
            amount: Number(amount),
          };
        }
        if (permissions == "UNISHIBAThree") {
          socketData = {
            option: "dualDexThreeToken",
            pairA: "UNI",
            pairB: "SHIBA",
            userId: auth.userData._id,
            amount: Number(amount),
          };
          socketData1 = {
            option: "dualDexThreeToken",
            pairA: "UNI",
            pairB: "SUSHI",
            userId: auth.userData._id,
            amount: Number(amount),
          };
          socketData2 = {
            option: "dualDexThreeToken",
            pairA: "SHIBA",
            pairB: "SUSHI",
            userId: auth.userData._id,
            amount: Number(amount),
          };
          socketDataR = {
            option: "dualDexThreeToken",
            pairB: "UNI",
            pairA: "SHIBA",
            userId: auth.userData._id,
            amount: Number(amount),
          };
          socketData1R = {
            option: "dualDexThreeToken",
            pairB: "UNI",
            pairA: "SUSHI",
            userId: auth.userData._id,
            amount: Number(amount),
          };
          socketData2R = {
            option: "dualDexThreeToken",
            pairB: "SHIBA",
            pairA: "SUSHI",
            userId: auth.userData._id,
            amount: Number(amount),
          };

          socketDataV2 = {
            option: "dualDexThreeTokenV2",
            // pairA: "UNI",
            // pairB: "SHIBA",
            userId: auth.userData._id,
            amount: Number(amount),
          };
        }
      }
      console.log("isTraingular ", `${isTraingular}`, socketData);
      console.log("isTraingular ", `${isTraingular}`, socketData1);
      console.log("isTraingular ", `${isTraingular}`, socketData2);
      // console.log("isTraingular ", `${isTraingular}`, socketDataR);
      // console.log("isTraingular ", `${isTraingular}`, socketData1R);
      // console.log("isTraingular ", `${isTraingular}`, socketData2R);
      console.log(
        "isTraingular  socketDataV2 ",
        `${isTraingular}`,
        socketDataV2
      );

      web.onopen = () => {
        web.send(JSON.stringify(socketData));
        web.send(JSON.stringify(socketData1));
        web.send(JSON.stringify(socketData2));
        // if (socketDataR) web.send(JSON.stringify(socketDataR));
        // if (socketData1R) web.send(JSON.stringify(socketData1R));
        // if (socketData2R) web.send(JSON.stringify(socketData2R));

        web.send(JSON.stringify(socketDataV2));
        web.onmessage = async (event) => {
          console.log("event <<<--->>>", event);
          if (event.data !== "[object Promise]" && event.data !== "null") {
            let obj = JSON.parse(event.data);
            setloaderOnOff(!obj?.isComplete);
            console.log("event <<<--->>> obj ", obj);
            if (obj && obj.data?.length > 0) {
              if (permissions == "bellmanFordTestIn") {
                setisBelmunFord(true);
              }
              setTraingularArbitrage(obj?.data);
              setIsLoading(false);
            }
          } else {
            setTraingularArbitrage([]);
          }
        };
      };
    } catch (err) {
      setloaderOnOff(false);
      // setIsLoading(false)
      console.log("err <<<<<<<<<<<<<<<--------------------", err);
    }
    return () => {
      web.close();
      setloaderOnOff(false);
      console.log("err <<<<<<<<<<<<<<<-------------------- 368", web);
    };
  }, [socketS]);

  return (
    <>
      <Box className={`numberTextField ${classes.root}`}>
        <CrossExchaneNewCrad />
      </Box>
    </>
  );
}

export default Index;
