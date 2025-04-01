import React, { useEffect, useState } from "react";
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
import ClearIcon from "@material-ui/icons/Clear";
import ERC20ABI from "src/ABI/IERC20ABI.json";
import RouterABI from "src/ABI/RouterABI.json";
import FactoryABI from "src/ABI/FactoryABI.json";
import Web3 from "web3";
import axios from "axios";
import {
  UniswapRouter,
  ShibaswapRouter,
  ShushiswapRouter,
  UniswapFactory,
  ShibaswapFactory,
  ShushiswapFactory,
  getWeb3Obj,
  getWeb3ContractObject,
  getContract,
  ZeroAddress,
  mainnetRPCURL,
  fromWeiDecimals,
} from "src/utils";
import moment from "moment";
import { array } from "yup";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { WETHToken } from "src/constants/index";
// import ExchangeABI from "src/ABI/ExchangeABI.json";

const useStyles = makeStyles((theme) => ({
  root1: {
    overflowY: "auto",
    scrollbarGutter: "stable",

    "&:-webkit-scrollbar": {
      width: "2px",
    },

    // /* Track */
    "&:-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 5px grey",
      borderRadius: "10px",
    },

    // /* Handle */
    "&:-webkit-scrollbar-thumb": {
      background: "red",
      borderRadius: "10px",
    },

    // /* Handle on hover */
    "&:-webkit-scrollbar-thumb:hover": {
      background: "#b30000",
    },
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
    top: "6px",
    right: "26px",
    color: "#fff",
    cursor: "pointer",
  },
}));
const EstimatedProfits = ({
  handleClose2,
  SolutionCard,
  inputValue,
  swapFrom,
}) => {
  const classes = useStyles();
  const [tokenPrice, setTokenPrice] = useState([]);
  const EstimateProfit = async () => {
    try {
      let fromToken;
      if (swapFrom.token == ZeroAddress) {
        fromToken = WETHToken;
      } else {
        fromToken = swapFrom.token;
      }
      const listData = SolutionCard.filter(
        (data) => data.heading != swapFrom.heading
      );
      const add = await Promise.all(
        listData.map(async (data, i) => {
          let ShibaSwap;
          let UniSwap;
          let ShushiSwap;
          const UniswapFactoryObj = await getWeb3ContractObject(
            FactoryABI,
            UniswapFactory,
            mainnetRPCURL
          );
          const web3 = await getWeb3Obj();
          const amoutInWei = web3.utils.toWei(inputValue.toString());
          const getUniSwapPair = await UniswapFactoryObj.methods
            .getPair(fromToken, data.token)
            .call();
          if (ZeroAddress != getUniSwapPair) {
            const UniswapRouterContract = await getWeb3ContractObject(
              RouterABI,
              UniswapRouter,
              mainnetRPCURL
            );
            const UniyouGetPrice = await UniswapRouterContract.methods
              .getAmountsOut(amoutInWei, [fromToken, data.token])
              .call();
            const returnedUniPrice = await UniswapRouterContract.methods
              .getAmountsOut(UniyouGetPrice[1], [data.token, fromToken])
              .call();
            //   const finaldata = web3.utils.fromWei(ShibayouGetPrice[1], "ether");
            let noOfProLos;
            let status;
            if (Number(returnedUniPrice[1]) > amoutInWei) {
              noOfProLos = Number(returnedUniPrice[1]) - amoutInWei;
              status = "Profit";
            } else {
              noOfProLos = amoutInWei - Number(returnedUniPrice[1]);
              status = "Loss";
            }
            let PerCentage = (noOfProLos / amoutInWei) * 100;
            let price = web3.utils.fromWei(noOfProLos.toString(), "ether");
            UniSwap = {
              price: price,
              status: status,
              PerCentage: PerCentage,
            };
          } else {
            UniSwap = 0;
          }

          const ShibaswapFactoryObj = await getWeb3ContractObject(
            FactoryABI,
            ShibaswapFactory,
            mainnetRPCURL
          );
          const getShibaSwapPair = await ShibaswapFactoryObj.methods
            .getPair(fromToken, data.token)
            .call();
          if (ZeroAddress != getShibaSwapPair) {
            const ShibaswapRouterContract = await getWeb3ContractObject(
              RouterABI,
              ShibaswapRouter,
              mainnetRPCURL
            );
            //   const web3 = await getWeb3Obj();
            //   const amoutInWei = web3.utils.toWei(inputValue.toString());
            const ShibayouGetPrice = await ShibaswapRouterContract.methods
              .getAmountsOut(amoutInWei, [fromToken, data.token])
              .call();
            const returnedShibaPrice = await ShibaswapRouterContract.methods
              .getAmountsOut(ShibayouGetPrice[1], [data.token, fromToken])
              .call();
            const finaldata = web3.utils.fromWei(ShibayouGetPrice[1], "ether");
            // ShibaSwap = web3.utils.fromWei(returnedShibaPrice[1], "ether");

            let noOfProLos;
            let status;
            if (Number(returnedShibaPrice[1]) > amoutInWei) {
              noOfProLos = Number(returnedShibaPrice[1]) - amoutInWei;
              status = "Profit";
            } else {
              noOfProLos = amoutInWei - Number(returnedShibaPrice[1]);
              status = "Loss";
            }

            let PerCentage = (noOfProLos / amoutInWei) * 100;
            let price = web3.utils.fromWei(noOfProLos.toString(), "ether");

            ShibaSwap = {
              price: price,
              status: status,
              PerCentage: PerCentage,
            };
          } else {
            ShibaSwap = 0;
          }
          const ShushiswapFactoryObj = await getWeb3ContractObject(
            FactoryABI,
            ShushiswapFactory,
            mainnetRPCURL
          );
          const getShushiSwapPair = await ShushiswapFactoryObj.methods
            .getPair(fromToken, data.token)
            .call();
          if (ZeroAddress != getShushiSwapPair) {
            const ShushiswapRouterContract = await getWeb3ContractObject(
              RouterABI,
              ShushiswapRouter,
              mainnetRPCURL
            );
            const ShushiyouGetPrice = await ShushiswapRouterContract.methods
              .getAmountsOut(amoutInWei, [fromToken, data.token])
              .call();
            const returnedShushiPrice = await ShushiswapRouterContract.methods
              .getAmountsOut(ShushiyouGetPrice[1], [data.token, fromToken])
              .call();
            let noOfProLos;
            let status;
            if (Number(returnedShushiPrice[1]) > amoutInWei) {
              noOfProLos = Number(returnedShushiPrice[1]) - amoutInWei;
              status = "Profit";
            } else {
              noOfProLos = amoutInWei - Number(returnedShushiPrice[1]);
              status = "Loss";
            }
            let PerCentage = (noOfProLos / amoutInWei) * 100;
            let price = web3.utils.fromWei(noOfProLos.toString(), "ether");
            ShushiSwap = {
              price: price,
              status: status,
              PerCentage: PerCentage,
            };
          } else {
            ShushiSwap = 0;
          }
          const obj = {
            ...data,
            uniSwap: UniSwap,
            shibaSwap: ShibaSwap,
            shushiSwap: ShushiSwap,
          };
          return obj;
        })
      );
      setTokenPrice(add);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (SolutionCard.length > 0) {
      EstimateProfit();
    }
  }, [SolutionCard]);
  return (
    <Box className={`${classes.root1} mostly-customized-scrollbar`}>
      <ClearIcon className={classes.clearicons} onClick={handleClose2} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography
                  variant="body2"
                  style={{ fontWeight: "500", fontSize: "20px" }}
                >
                  {" "}
                  Currency
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "500" }}>
                <img src="./images/uniswap1.svg" />
                <br />
                Uniswap
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "500" }}>
                <img src="./images/dholak.png" />
                <br />
                Shushiswap
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "500" }}>
                <img src="./images/cat.png" />
                <br />
                Shibaswap
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokenPrice &&
              tokenPrice.map((data) => {
                return (
                  <TableRow className={classes.root}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <img src={data.image} style={{ width: "30px" }} />
                        <Box ml={3}>
                          <Typography
                            variant="body2"
                            style={{ fontWeight: "600" }}
                          >
                            {data.heading}
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ fontWeight: "400", fontSize: "13px" }}
                          >
                            {data?.discription}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body2"
                        style={
                          data?.uniSwap.status == "Loss"
                            ? { color: "red", fontWeight: "500" }
                            : { color: "#fff", fontWeight: "500" }
                        }
                      >
                        {/* {data?.uniSwap} */}
                        {data?.uniSwap != 0
                          ? `${data?.uniSwap.PerCentage} %`
                          : "No Liquidity"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body2"
                        style={
                          data?.shushiSwap.status == "Loss"
                            ? { color: "red", fontWeight: "500" }
                            : { color: "#fff", fontWeight: "500" }
                        }
                      >
                        {/* {data?.shushiSwap} */}
                        {data?.shushiSwap != 0
                          ? `${data?.shushiSwap.PerCentage} %`
                          : "No Liquidity"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body2"
                        style={
                          data?.shibaSwap.status == "Loss"
                            ? { color: "red", fontWeight: "500" }
                            : { color: "#fff", fontWeight: "500" }
                        }
                      >
                        {data?.shibaSwap != 0
                          ? `${data?.shibaSwap.PerCentage} %`
                          : "No Liquidity"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>{" "}
      {tokenPrice && tokenPrice.length == 0 && (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "40px",
            width: "100%",
          }}
        >
          <ButtonCircularProgress />{" "}
          <Typography variant="body1">Loading...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default EstimatedProfits;
