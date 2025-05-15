import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  makeStyles,
  Typography,
  Grid,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Menu,
  MenuItem,
  TableBody,
  Button,
  TableContainer,
  Paper,
  Avatar,
  FormControl,
  Select,
} from "@material-ui/core";
import Page from "src/component/Page";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
  CategoryButtons,
  exploreData,
  paginationLimit,
  TokenAddressToUsed,
} from "src/constants";
import { MdOutlineMore } from "react-icons/md";

import Profile from "../Profile/Profile";
import axios from "axios";
import ApiConfig, { socketURL } from "src/config/APICongig";
import { useWeb3React } from "@web3-react/core";
import { UserContext } from "src/context/User";
import moment from "moment";
import { useHistory } from "react-router-dom";
import DashboardnewCard from "./DashboardnewCard";
import LineChart from "./LineChart";
const useStyles = makeStyles((theme) => ({
  bannerBox: {
    "& .MuiTableCell-root": {
      height: "56px",
      padding: "0 10px",
      [theme.breakpoints.down("xs")]: {
        minWidth: "160px",
      },
    },

    "& .MuiTableCell-body": {
      height: "56px",
      padding: "0 10px",
    },
    // padding: "50px 0px",
    textAlign: "center",

    "& h2": {
      fontSize: "33px",
      fontWeight: "500",
      color: "rgba(61, 61, 61, 1) !important",
    },
    "& h3": {
      color: "rgba(61, 61, 61, 1) !important",
    },
    "& > *": {
      marginTop: theme.spacing(2),
    },
    "& .accountBox": {
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
    },
    "& .moreBox1": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      "& p": {
        color: "#14133b",
      },
      "& svg": {
        fontSize: "25px",
        marginLeft: "8px",
        color: "#14133b",
      },
    },
    "& .moreBox": {
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      cursor: "pointer",
      "& p": {
        color: "#14133b",
      },
      "& svg": {
        fontSize: "25px",
        marginLeft: "8px",
        color: "#14133b",
      },
    },
    "& .left": {
      "& h2": {
        color: "#14133b",
      },
    },
  },
  filterBtn: {
    margin: "10px 3px",
    fontSize: "14px",
    background: "rgb(8, 86, 204)",
    color: "#fff",
    boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
    boxSizing: "border-box",
    fontWeight: "500",
    lineHeight: "20px",
    borderRadius: "5px",
    "& .flexxWrap": {
      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
      },
    },
  },
  imgtextbox: {
    width: "600px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  tableBaseContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#190a2c",
    borderRadius: "0px 0px 5px 5px",
  },
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "#ffffff",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#ffffff",
    },
  },
  filterBtn: {
    margin: "10px 3px",
    fontSize: "14px",
    background: "rgb(8, 86, 204)",
    color: "#fff",
    boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
    boxSizing: "border-box",
    fontWeight: "500",
    lineHeight: "20px",
    borderRadius: "5px",
  },
  page: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",

    "@media (max-width: 375px)": {
      display: "block",
    },
  },
  ExecutionName: {
    marginTop: "24px !important",
    "& .headingBox": {
      "& h2": {
        color: "#14133b",
      },
    },
  },
  PriceCheckerBox: {
    "& .headingBox": {
      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
      },
      "& h2": {
        color: "#14133b",
      },
    },
  },
  AccountbalanceBox: {
    marginTop: "24px !important",
    "& h2": {
      color: "#14133b",
    },
    "& h6": {
      color: "#14133b",
    },
    "& .verProfit": {
      writingMode: "vertical-rl",
      textOrientation: "upright",
    },
    "& .d-Flx": {
      display: "flex",
    },
  },
}));
const tableData1 = [
  {
    srNon: "1",
    TxHash: "0x000000012",
    CoinName: "BTC",
    ExchangeA: "Uniswap$1,100",
    ExchangeB: "Sushiswap$1,250",
    DateTime: "04/07/22 11:32",
    PriceDifference: "Price Difference",
    Profit: "$123",
  },
  {
    srNon: "2",
    TxHash: "0x000000012",
    CoinName: "BTC",
    ExchangeA: "Uniswap$1,100",
    ExchangeB: "Sushiswap$1,250",
    DateTime: "04/07/22 11:32",
    PriceDifference: "Price Difference",
    Profit: "$123",
  },
  {
    srNon: "3",
    TxHash: "0x000000012",
    CoinName: "BTC",
    ExchangeA: "Uniswap$1,100",
    ExchangeB: "Sushiswap$1,250",
    DateTime: "04/07/22 11:32",
    PriceDifference: "Price Difference",
    Profit: "$123",
  },
  {
    srNon: "4",
    TxHash: "0x000000012",
    CoinName: "BTC",
    ExchangeA: "Uniswap$1,100",
    ExchangeB: "Sushiswap$1,250",
    DateTime: "04/07/22 11:32",
    PriceDifference: "Price Difference",
    Profit: "$123",
  },
  {
    srNon: "5",
    TxHash: "0x000000012",
    CoinName: "BTC",
    ExchangeA: "Uniswap$1,100",
    ExchangeB: "Sushiswap$1,250",
    DateTime: "04/07/22 11:32",
    PriceDifference: "Price Difference",
    Profit: "$123",
  },
  {
    srNon: "6",
    TxHash: "0x000000012",
    CoinName: "BTC",
    ExchangeA: "Uniswap$1,100",
    ExchangeB: "Sushiswap$1,250",
    DateTime: "04/07/22 11:32",
    PriceDifference: "Price Difference",
    Profit: "$123",
  },
  {
    srNon: "7",
    TxHash: "0x000000012",
    CoinName: "BTC",
    ExchangeA: "Uniswap$1,100",
    ExchangeB: "Sushiswap$1,250",
    DateTime: "04/07/22 11:32",
    PriceDifference: "Price Difference",
    Profit: "$123",
  },
  {
    srNon: "8",
    TxHash: "0x000000012",
    CoinName: "BTC",
    ExchangeA: "Uniswap$1,100",
    ExchangeB: "Sushiswap$1,250",
    DateTime: "04/07/22 11:32",
    PriceDifference: "Price Difference",
    Profit: "$123",
  },
];

function Features() {
  const [value, setValue] = React.useState(2);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  const classes = useStyles();
  const [recentCol, setRecentCol] = React.useState(null);
  const [selectRankingDays, setSelectRankingDays] = useState();
  const [profit, setProfit] = useState("profit");
  const [executionsList, setexecutionsList] = useState();
  const [executionsList1, setexecutionsList1] = useState([]);
  const [graphData, setgraphData] = useState();
  const [dashboard, setdashboard] = useState();
  const { account } = useWeb3React();
  const user = useContext(UserContext);
  const history = useHistory();
  const [daiWeth, setdaiWeth] = useState([]);
  const [daiUsdc, setdaiUsdc] = useState([]);
  const [wethUsdc, setwethUsdc] = useState([]);
  const [uniWeth, setuniWeth] = useState([]);
  const [age, setAge] = React.useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const dashboardHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.dashboard,
        headers: {
          token:
            sessionStorage.getItem("token") ||
            localStorage.getItem("creatturAccessToken"),
        },
      });
      if (res.data.responseCode == 200) {
        // setgraphData(res.data.result);
        setdashboard(res.data.result);
        // console.log("total-----results:----", res.data.result.docs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const graphHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.graph,
        headers: {
          token:
            sessionStorage.getItem("token") ||
            localStorage.getItem("creatturAccessToken"),
        },
      });
      if (res.data.responseCode == 200) {
        // setdashboard(res.data.result);
        let list = res.data.result;
        setgraphData(list?.reverse());
        // console.log("total-----results:----", res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buyTokenHandler = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.buyTokenList,
        headers: {
          token:
            sessionStorage.getItem("token") ||
            localStorage.getItem("creatturAccessToken"),
        },
      });
      if (res.data.responseCode == 200) {
        setexecutionsList(res.data.result);
        setexecutionsList1(res.data.result.docs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (account && user.isLogin) {
      buyTokenHandler();
      graphHandler();
      dashboardHandler();
    }
  }, [account, user.isLogin]);
  useEffect(() => {
    try {
      const web = new WebSocket(socketURL);
      web.onopen = () => {
        const dataToSend = {
          option: "compareUniShibaGushiGivenTokenIn",
          fromToken: "DAI",
          toToken: "WETH",
          amounts: 0.001,
        };

        web.send(JSON.stringify(dataToSend));
        web.onmessage = async (event) => {
          // && event.data !== "null"
          if (event.data !== "[object Promise]") {
            let newObj = JSON.parse(event.data);
            console.log("newObj-socket--", newObj);
            setdaiWeth(newObj);
          }
        };

        const dataToSend1 = {
          option: "compareUniShibaGushiGivenTokenIn",
          fromToken: "DAI",
          toToken: "USDC",
          amounts: 0.001,
        };
        web.send(JSON.stringify(dataToSend1));
        web.onmessage = async (event) => {
          // && event.data !== "null"
          if (event.data !== "[object Promise]") {
            let newObj = JSON.parse(event.data);
            // console.log("newObj-socket-11-", newObj);

            setdaiUsdc(newObj);
          }
        };
        const dataToSend2 = {
          option: "compareUniShibaGushiGivenTokenIn",
          fromToken: "WETH",
          toToken: "USDC",
          amounts: 0.001,
        };

        web.send(JSON.stringify(dataToSend2));
        web.onmessage = async (event) => {
          // && event.data !== "null"
          if (event.data !== "[object Promise]") {
            let newObj = JSON.parse(event.data);
            // console.log("newObj-socket-22-", newObj);
            setwethUsdc(newObj);
          }
        };

        const dataToSend3 = {
          option: "compareUniShibaGushiGivenTokenIn",
          fromToken: "UNI",
          toToken: "WETH",
          amounts: 0.001,
        };

        web.send(JSON.stringify(dataToSend3));
        web.onmessage = async (event) => {
          // && event.data !== "null"
          if (event.data !== "[object Promise]") {
            let newObj = JSON.parse(event.data);
            // console.log("newObj-socket-33-", newObj);
            setuniWeth(newObj);
          }
        };
      };
      return () => {
        web.close();
      };
    } catch (err) {
      console.log("err", err);
    }
  });

  const menuProps = {
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    elevation: 0,
    PaperProps: {
      style: {
        top: "0px !important",
        maxHeight: 250,
      },
    },
  };
  return (
    <>
      {/* <Profile /> */}

      <Box className={classes.bannerBox} mt={2}>
        {/* <Paper elevation={2}>
            <Typography variant="h2" style={{ textAlign: "left" }}>
              Overview
            </Typography>
          </Paper> */}
        <DashboardnewCard />

        <Box mt={6} className={classes.ExecutionName}>
          <Paper elevation={2} style={{ padding: "20px" }}>
            <Box
              align="left"
              mb={2}
              className="headingBox displaySpaceBetween flexxWraptransaction"
            >
              <Typography variant="h3">Transaction History</Typography>
              <Box className="displayStart">
                <Typography variant="body2" style={{ color: "#000000" }}>
                  Sort by:
                </Typography>

                <Box className="transactionfilter" ml={2}>
                  <FormControl fullWidth className={classes.formControl}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      MenuProps={menuProps}
                    >
                      <MenuItem value={10}>Select</MenuItem>
                      <MenuItem value={20}>Blocked</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
            <TableContainer style={{ marginBottom: "20px" }}>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#013FA7" }}>
                    <TableCell>Serial No.</TableCell>
                    <TableCell>Tx Hash</TableCell>
                    <TableCell>Borrow Amount</TableCell>
                    <TableCell>Pairs</TableCell>
                    <TableCell style={{ minWidth: "90px" }}>
                      Profit Amount
                    </TableCell>

                    <TableCell style={{ textAlign: "center" }}>
                      Profit%
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      Profit Status
                    </TableCell>

                    <TableCell>Transaction Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData1 &&
                    tableData1?.map((data, index) => {
                      return (
                        <TableRow className={classes.root}>
                          <TableCell component="th" scope="row">
                            {data?.srNon}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {/* {sortAddress(data?.transactionHash)} */}
                            {data?.TxHash}
                          </TableCell>
                          <TableCell style={{ textTransform: "capitalize" }}>
                            {" "}
                            120
                          </TableCell>
                          <TableCell style={{ textTransform: "capitalize" }}>
                            {" "}
                            USDC.e-LINK
                          </TableCell>
                          <TableCell>
                            <Box className="displayStart">
                              <Avatar
                                src="/images/bnb_icon.svg"
                                width="30px"
                                height="30px"
                              />
                              &nbsp;
                              <Typography
                                variant="body2"
                                style={{ color: "rgba(61, 61, 61, 1)" }}
                              >
                                1.275
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell
                            style={{
                              color: "#309A47",
                              textAlign: "center",
                            }}
                          >
                            {" "}
                            1,409%
                          </TableCell>
                          <TableCell
                            style={{ textAlign: "center", color: "#309A47" }}
                          >
                            Profitable Trade
                          </TableCell>

                          <TableCell style={{ color: "#309A47" }}>
                            Successful
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {/* {executionsList1.length == 0 && (
                      <Box align="center" className="moreBox1">
                        <Typography variant="body2">
                          No Execution Founds
                        </Typography>
                      </Box>
                    )} */}
                </TableBody>
              </Table>
            </TableContainer>

            {/* <Box align="right" mt={3} className={classes.page}>
                <Pagination
                  count={1}
                  siblingCount={0}
                  // variant="outlined"
                  // shape="rounded"
                  showFirstButton
                  showLastButton
                />
                <Button
                  className={classes.filterBtn}
                  onClick={(event) => setRecentCol(event.currentTarget)}
                >
                  {selectRankingDays ? selectRankingDays.name.toString() : "10"}
                  <ArrowDropDownIcon />
                </Button>
              </Box> */}
            {executionsList?.docs.length > 5 && (
              <Box
                align="right"
                className="moreBox"
                mt={3}
                onClick={() => history.push("/transaction")}
              >
                <Typography variant="body2">More Executions</Typography>

                {/* <img src="images/info.svg" alt="image" /> */}
                <MdOutlineMore />
              </Box>
            )}
            {/* <hr
                style={{
                  width: "60px",
                  marginTop: "6px",
                  border: "1px solid rgb(8, 86, 204)",
                  float: "right",
                }}
              /> */}
            {/* <Box align="right">
              <hr />
            </Box> */}
          </Paper>
        </Box>

        <Box className={classes.AccountbalanceBox} mb={4}>
          <Paper elevation={2} style={{ padding: "20px" }}>
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12} sm={4} align="left">
                <Typography variant="h2">Profit Analysis</Typography>
              </Grid>
              <Grid item lg={6} xs={12} sm={8} align="right">
                <Box className="accountBox">
                  <Button
                    variant="contained"
                    size="large"
                    // color={profit == "profit" ? "primary" : "primary"}
                    style={{ marginRight: "15px", minWidth: "165px", backgroundColor: "#013FA7" }}
                    onClick={() => setProfit("profit")}
                  >
                    Profit / TX
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    style={{ whiteSpace: "pre", borderColor: "#013FA7", color: "#013FA7" }}
                    // color="secondary"
                    // color={profit != "profit" ? "primary" : "primary"}

                    onClick={() => setProfit("failed")}
                  >
                    Failed reverted
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="d-Flx">
                  <Box className="verProfit">
                    {" "}
                    <Typography variant="h6">
                      {" "}
                      {profit == "profit" ? "PROFIT" : "FAILED TX"}
                    </Typography>
                  </Box>
                  <Box mt={2} width="100%">
                    {/* <MetricsChart
                        graphData={graphData}
                        profit={profit == "profit"}
                      /> */}

                    {/* <MetricsChart
                        graphData={[4, 5, 3, 5, 4, 6, 5, 7, 6, 5]}
                        profit={true}
                      /> */}
                    {/* <LineChart /> */}
                    <LineChart profit={true} />
                  </Box>
                </Box>
              </Grid>
              {/* <Grid item lg={12} xs={12} sm={12} align="center">
                  <Typography variant="h6">Time</Typography>
                </Grid> */}
            </Grid>
          </Paper>
        </Box>
        <Menu
          id="simple-menu"
          anchorEl={recentCol}
          keepMounted
          className={classes.MenuSelector}
          open={Boolean(recentCol)}
          onClose={() => setRecentCol(null)}
        >
          <MenuItem
            onClick={() => {
              setRecentCol(null);
              setSelectRankingDays();
            }}
          >
            10
          </MenuItem>
          {paginationLimit?.map((data, i) => {
            return (
              <MenuItem
                onClick={() => {
                  setRecentCol(null);
                  setSelectRankingDays(data);
                }}
                key={i}
              >
                {data.name}
              </MenuItem>
            );
          })}
        </Menu>
      </Box>
    </>
  );
}

export default Features;
