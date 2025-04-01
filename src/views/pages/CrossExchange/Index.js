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
import CrossExchangeCard from "src/component/CrossExchangeCard";
import { socketURL } from "src/config/APICongig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import CompairCrossExchangeCard1 from "src/views/pages/CrossExchange/CompairCrossExchangeCard1";
import CrossExchangeMoreCard from "src/views/pages/CrossExchange/CrossExchangeMoreCard";
import ThreeDotLoader from "src/component/ThreeDotLoader";
import CompairCrossExchangeCardBellman from "./CompairCrossExchangeCardBellman";
import CrossExchangeMoreCardBellman from "./CrossExchangeMoreCardBellman";

import { AuthContext } from "src/context/Auth";
import { UserContext } from "src/context/User";

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
      background: "transparent",
      border: "1px solid #E7E7E7",
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
    top: "5px !important",
    transform: "translate3d(23px, 211px, 0px)",
    left: "0px !important",
    width: "213px",
    position: "absolute",
    background: "#ffffff",
    borderBottom: "1px solid #CECECE",
    willChange: "transform",
    paddingLeft: "15px",
    zIndex: "999",
    "& .MuiIconButton-root": {
      color: "rgba(65, 22, 67, 1) !important",
    },
    "& .muiFormGroup": {
      "& .FormGroupRadioSelector": {
        width: "228px !important",
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
        <Paper elevation={2} style={{ padding: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} sm={6} lg={3} align="left">
              <Button
                aria-describedby={id1}
                type="button"
                // onClick={handleClick1}
                // disabled={loaderOnOff}
                // variant="contained"
                onClick={(e) => {
                  // if (!loaderOnOff) {
                  handleClick1(e);
                  // }
                }}
                className={
                  loaderOnOff ? "buttonNotAllowPopper" : classes.topButton
                }
                // className={classes.topButton}
                style={{ marginRight: "8px" }}
              >
                Cross Exchange
                <ArrowDropDownIcon />
              </Button>
              <Popper
                id={id1}
                open={open1}
                anchorEl={anchorEl1}
                className={classes.popperCard}
              >
                <FormGroup col className="muiFormGroup">
                  <RadioGroup
                    value={permissions}
                    onChange={handleChange1}
                    disabled={loaderOnOff}
                  >
                    <FormControlLabel
                      disabled={loaderOnOff}
                      className="FormGroupRadioSelector"
                      control={<Radio name="UNISwap" value="UNISwap" />}
                      label="Single Exchange"
                    />
                    {/* <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={<Radio name="SHUSHISwap" value="SHUSHISwap" />}
                        label="Sushiswap"
                      />
                      <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={<Radio name="SHIBASwap" value="SHIBASwap" />}
                        label="Shibaswap"
                      /> */}
                    <FormControlLabel
                      disabled={loaderOnOff}
                      className="FormGroupRadioSelector"
                      control={<Radio name="UNISHIBA" value="UNISHIBA" />}
                      label="Double Exchange"
                    />
                    {/* <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={<Radio name="UNISHUSHI" value="UNISHUSHI" />}
                        label="UNI-SHUSHI"
                      />
                      <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={
                          <Radio name="SHIBASHUSHI" value="SHIBASHUSHI" />
                        }
                        label="SHIBA-SHUSHI"
                      /> */}
                    {/* <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={
                          <Radio
                            // onChange={handleChange1}
                            name="compareSushiShibaIn"
                            value="compareSushiShibaIn"
                          />
                        }
                        label="Dual Exchange"
                      />

                      <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={
                          <Radio
                            // onChange={handleChange1}
                            name="compareUniShibaIn"
                            value="compareUniShibaIn"
                          />
                        }
                        label="Compare Uni Shib"
                      />
                      <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={
                          <Radio
                            onChange={handleChange1}
                            name="compareUniSushiShibaIn"
                            value="compareUniSushiShibaIn"
                          />
                        }
                        label="Compare Uni Sushi Shiba"
                      />
                      <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={
                          <Radio
                            // onChange={handleChange1}
                            name="compareUniSushiSimpleIn"
                            value="compareUniSushiSimpleIn"
                          />
                        }
                        label="Compare Uni Sushi Simple"
                      />
                      <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={
                          <Radio
                            // onChange={handleChange1}
                            name="compareUniShibaSushiIn"
                            value="compareUniShibaSushiIn"
                          />
                        }
                        label="Compare Uni Shiba Sushi In"
                      /> */}
                  </RadioGroup>
                </FormGroup>
              </Popper>
            </Grid>
            <Grid item xs={12} md={4} sm={6} lg={3} align="left">
              <Button
                aria-describedby={id2}
                type="button"
                onClick={(e) => {
                  // if (!loaderOnOff) {
                  handleClick2(e);
                  // }
                }}
                className={
                  loaderOnOff ? "buttonNotAllowPopper" : classes.topButton
                }
                // disabled={loaderOnOff}
                // variant="contained"

                // className={classes.topButton}
                style={{ marginRight: "8px" }}
              >
                Traingular Arbitrage&nbsp;&nbsp;
                <ArrowDropDownIcon />
              </Button>

              <Popper
                id={id2}
                open={open2}
                anchorEl={anchorEl2}
                className={classes.popperCard}
              >
                <FormGroup col className="muiFormGroup">
                  <RadioGroup
                    value={permissions}
                    onChange={handleChange2}
                    disabled={loaderOnOff}
                    className={loaderOnOff ? "buttonNotAllow" : ""}
                  >
                    <FormControlLabel
                      disabled={loaderOnOff}
                      className="FormGroupRadioSelector"
                      control={
                        <Radio
                          //onChange={handleChange1}
                          value="UNISwapThree"
                          name="UNISwapThree"
                        />
                      }
                      label="Single Exchange"
                    />
                    {/* <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={
                          <Radio
                            //onChange={handleChange1}
                            value="SHUSHISwapThree"
                            name="SHUSHISwapThree"
                          />
                        }
                        label="Shushiswap"
                      />
                      <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={
                          <Radio
                            //onChange={handleChange1}
                            value="SHIBASwapThree"
                            name="SHIBASwapThree"
                          />
                        }
                        label="Shibaswap"
                      /> */}

                    <FormControlLabel
                      disabled={loaderOnOff}
                      className="FormGroupRadioSelector"
                      control={
                        <Radio name="UNISHIBAThree" value="UNISHIBAThree" />
                      }
                      label="Double Exchange"
                    />
                    {/* <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={
                          <Radio name="UNISHUSHIThree" value="UNISHUSHIThree" />
                        }
                        label="UNI-SHUSHI"
                      />
                      <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={
                          <Radio
                            name="SHIBASHUSHIThree"
                            value="SHIBASHUSHIThree"
                          />
                        }
                        label="SHIBA-SHUSHI"
                      /> */}
                    {/* <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={
                          <Radio
                            //onChange={handleChange1}
                            value="compareDualdexIn"
                            name="compareDualdexIn"
                          />
                        }
                        label="Single Exchange"
                      />
                      <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={
                          <Radio
                            //onChange={handleChange1}
                            value="bellmanFordTestIn"
                            name="bellmanFordTestIn"
                          />
                        }
                        label="Dual Exchange"
                      /> */}
                    {/* <FormControlLabel
                      className="FormGroupRadioSelector"
                      control={
                        <Radio onChange={handleChange1} name="ApeSwap" />
                      }
                      label="ApeSwapt"
                    />
                    <FormControlLabel
                      className="FormGroupRadioSelector"
                      control={
                        <Radio onChange={handleChange1} name="ShibaSwap" />
                      }
                      label="ShibaSwap"
                    />
                    <FormControlLabel
                      className="FormGroupRadioSelector"
                      control={
                        <Radio onChange={handleChange1} name="Uniswap" />
                      }
                      label="Uniswap"
                    /> */}
                  </RadioGroup>
                </FormGroup>
              </Popper>
            </Grid>
            <Grid item xs={12} md={4} sm={6} lg={3} align="left">
              <Button
                aria-describedby={id2}
                type="button"
                onClick={(e) => {
                  // if (!loaderOnOff) {
                  handleClick2(e);
                  // }
                }}
                className={
                  loaderOnOff ? "buttonNotAllowPopper" : classes.topButton
                }
                // disabled={loaderOnOff}
                // variant="contained"

                // className={classes.topButton}
                style={{ marginRight: "8px" }}
              >
                Buy
                <ArrowDropDownIcon />
              </Button>

              <Popper
                id={id2}
                open={open2}
                anchorEl={anchorEl2}
                className={classes.popperCard}
              >
                <FormGroup col className="muiFormGroup">
                  <RadioGroup
                    value={permissions}
                    onChange={handleChange2}
                    disabled={loaderOnOff}
                    className={loaderOnOff ? "buttonNotAllow" : ""}
                  >
                    <FormControlLabel
                      disabled={loaderOnOff}
                      className="FormGroupRadioSelector"
                      control={
                        <Radio
                          //onChange={handleChange1}
                          value="UNISwapThree"
                          name="UNISwapThree"
                        />
                      }
                      label="Single Exchange"
                    />
                    {/* <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={
                          <Radio
                            //onChange={handleChange1}
                            value="SHUSHISwapThree"
                            name="SHUSHISwapThree"
                          />
                        }
                        label="Shushiswap"
                      />
                      <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={
                          <Radio
                            //onChange={handleChange1}
                            value="SHIBASwapThree"
                            name="SHIBASwapThree"
                          />
                        }
                        label="Shibaswap"
                      /> */}

                    <FormControlLabel
                      disabled={loaderOnOff}
                      className="FormGroupRadioSelector"
                      control={
                        <Radio name="UNISHIBAThree" value="UNISHIBAThree" />
                      }
                      label="Double Exchange"
                    />
                    {/* <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={
                          <Radio name="UNISHUSHIThree" value="UNISHUSHIThree" />
                        }
                        label="UNI-SHUSHI"
                      />
                      <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={
                          <Radio
                            name="SHIBASHUSHIThree"
                            value="SHIBASHUSHIThree"
                          />
                        }
                        label="SHIBA-SHUSHI"
                      /> */}
                    {/* <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={
                          <Radio
                            //onChange={handleChange1}
                            value="compareDualdexIn"
                            name="compareDualdexIn"
                          />
                        }
                        label="Single Exchange"
                      />
                      <FormControlLabel
                        className="FormGroupRadioSelector"
                        control={
                          <Radio
                            //onChange={handleChange1}
                            value="bellmanFordTestIn"
                            name="bellmanFordTestIn"
                          />
                        }
                        label="Dual Exchange"
                      /> */}
                    {/* <FormControlLabel
                      className="FormGroupRadioSelector"
                      control={
                        <Radio onChange={handleChange1} name="ApeSwap" />
                      }
                      label="ApeSwapt"
                    />
                    <FormControlLabel
                      className="FormGroupRadioSelector"
                      control={
                        <Radio onChange={handleChange1} name="ShibaSwap" />
                      }
                      label="ShibaSwap"
                    />
                    <FormControlLabel
                      className="FormGroupRadioSelector"
                      control={
                        <Radio onChange={handleChange1} name="Uniswap" />
                      }
                      label="Uniswap"
                    /> */}
                  </RadioGroup>
                </FormGroup>
              </Popper>
            </Grid>
            <Grid item xs={12} md={4} sm={6} lg={3} align="left">
              <Button
                aria-describedby={id2}
                type="button"
                onClick={(e) => {
                  // if (!loaderOnOff) {
                  handleClick2(e);
                  // }
                }}
                className={
                  loaderOnOff ? "buttonNotAllowPopper" : classes.topButton
                }
                // disabled={loaderOnOff}
                // variant="contained"

                // className={classes.topButton}
                style={{ marginRight: "8px" }}
              >
                Sell
                <ArrowDropDownIcon />
              </Button>

              <Popper
                id={id2}
                open={open2}
                anchorEl={anchorEl2}
                className={classes.popperCard}
              >
                <FormGroup col className="muiFormGroup">
                  <RadioGroup
                    value={permissions}
                    onChange={handleChange2}
                    disabled={loaderOnOff}
                    className={loaderOnOff ? "buttonNotAllow" : ""}
                  >
                    <FormControlLabel
                      disabled={loaderOnOff}
                      className="FormGroupRadioSelector"
                      control={
                        <Radio
                          //onChange={handleChange1}
                          value="UNISwapThree"
                          name="UNISwapThree"
                        />
                      }
                      label="Single Exchange"
                    />

                    <FormControlLabel
                      disabled={loaderOnOff}
                      className="FormGroupRadioSelector"
                      control={
                        <Radio name="UNISHIBAThree" value="UNISHIBAThree" />
                      }
                      label="Double Exchange"
                    />
                  </RadioGroup>
                </FormGroup>
              </Popper>
            </Grid>
          </Grid>
        </Paper>
        <Box mt={2}>
          {loaderOnOff && traingularArbitrage.length == 0 ? (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                // textAlign: "center",
              }}
            >
              <ButtonCircularProgress />
              {/* <ThreeDotLoader /> */}

              <Typography variant="h6">
                Please wait ! Keep patience !
              </Typography>
              <Typography variant="h6">
                Comparing Sushiswap, Uniswap and Shibaswap for best profit
                paths.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {!isTraingular ? (
                <>
                  {traingularArbitrage &&
                    traingularArbitrage.map((data, index) => {
                      // console.log(
                      //   "----cross-exchange----- <<<--- Swap --->>>",
                      //   traingularArbitrage
                      // );
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                          <CompairCrossExchangeCard1
                            data={data}
                            type="card"
                            index={index}
                            key={index}
                          />
                        </Grid>
                      );
                    })}
                </>
              ) : (
                <>
                  {!isBelmunFord ? (
                    <>
                      {traingularArbitrage &&
                        traingularArbitrage.map((data, index) => {
                          return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                              <CrossExchangeMoreCard
                                data={data}
                                type="card"
                                index={index}
                                key={index}
                              />
                            </Grid>
                          );
                        })}
                    </>
                  ) : (
                    <>
                      {traingularArbitrage &&
                        traingularArbitrage.map((data, index) => {
                          if (!data) {
                            return;
                          }
                          if (data?.arbi?.arbi != 2) {
                            return;
                          }
                          return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                              <CompairCrossExchangeCardBellman
                                data={data}
                                type="card"
                                index={index}
                                key={index}
                              />
                            </Grid>
                          );
                        })}

                      {traingularArbitrage &&
                        traingularArbitrage.map((data, index) => {
                          // console.log("belman", data);
                          // console.log("belman---arbi", data?.arbi);
                          if (!data) {
                            return;
                          }
                          if (data?.arbi?.arbi != 3) {
                            return;
                          }
                          return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                              <CrossExchangeMoreCardBellman
                                data={data}
                                type="card"
                                index={index}
                                key={index}
                              />
                            </Grid>
                          );
                        })}
                    </>
                  )}
                </>
              )}

              {!loaderOnOff &&
                traingularArbitrage &&
                traingularArbitrage.length == 0 && (
                  <Box
                    style={{
                      display: "flex",
                      // textAling: "center",
                      justifyContent: "center",
                      width: "100%",
                      paddingTop: "35px",
                    }}
                  >
                    <Typography variant="h6">No Profit Path Found</Typography>
                  </Box>
                )}
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Index;
