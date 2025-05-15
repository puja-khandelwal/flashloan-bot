import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Container,
  makeStyles,
  Button,
  Grid,
  Menu,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  FormControl,
  Select,
  TextField,
  Avatar,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { CategoryButtons, exploreData, RankingButtons } from "src/constants";
import Page from "src/component/Page";
import { Link, useHistory, useLocation } from "react-router-dom";
import Scroll from "react-scroll";
import axios from "axios";
import ApiConfig from "src/config/APICongig";
import { useWeb3React } from "@web3-react/core";
import { UserContext } from "src/context/User";
import Pagination from "@material-ui/lab/Pagination";
import { sortAddress } from "src/utils";
import moment from "moment";
import * as XLSX from "xlsx";

const tabledata = [
  {
    transactionHash: "0x000000012",
    fromSwap: "Uniswap $1,100",
    exchangeSwap: "Sushiswap $1,250",
    price: "$43",
    createdAt: "29-Nov-2023, 09:23 PM",
    profit: "$45",
  },
  {
    transactionHash: "0x000000012",
    fromSwap: "Uniswap $1,100",
    exchangeSwap: "Sushiswap $1,250",
    price: "$43",
    createdAt: "29-Nov-2023, 09:23 PM",
    profit: "$45",
  },
  {
    transactionHash: "0x000000012",
    fromSwap: "Uniswap $1,100",
    exchangeSwap: "Sushiswap $1,250",
    price: "$43",
    createdAt: "29-Nov-2023, 09:23 PM",
    profit: "$45",
  },
  {
    transactionHash: "0x000000012",
    fromSwap: "Uniswap $1,100",
    exchangeSwap: "Sushiswap $1,250",
    price: "$43",
    createdAt: "29-Nov-2023, 09:23 PM",

    profit: "$45",
  },
  {
    transactionHash: "0x000000012",
    fromSwap: "Uniswap $1,100",
    exchangeSwap: "Sushiswap $1,250",
    price: "$43",
    createdAt: "29-Nov-2023, 09:23 PM",
    profit: "$45",
  },
  {
    transactionHash: "0x000000012",
    fromSwap: "Uniswap $1,100",
    exchangeSwap: "Sushiswap $1,250",
    price: "$43",
    createdAt: "29-Nov-2023, 09:23 PM",
    profit: "$45",
  },
  {
    transactionHash: "0x000000012",
    fromSwap: "Uniswap $1,100",
    exchangeSwap: "Sushiswap $1,250",
    price: "$43",
    createdAt: "29-Nov-2023, 09:23 PM",
    profit: "$45",
  },
];

const useStyles = makeStyles((theme) => ({
  mainBox: {
    "& .MuiTableCell-root": {
      height: "56px",
      padding: "0 10px",
      [theme.breakpoints.down("sm")]: {
        minWidth: "132px",
      },
    },
    "& .MuiFormControl-marginDense": {
      marginTop: "0px",
    },
    "& h2": {
      color: "rgb(12, 13, 49)",
      fontSize: "33px",
      fontWeight: "500",
      marginBottom: "20px",
    },
    "& .dFlex": {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      "& .padLR": { padding: "0px 5px" },
      "& .padLR1": { padding: "0px 0px 0px 10px" },

      "& .Alingend": {
        "& .MuiButton-containedPrimary": {
          padding: "10px 23px !important",
        },
      },
      "@media(min-width:1441px)": {
        "& .Alingend": {
          width: "100%",
          textAlign: "end",
          maxWidth: "147px",
          minWidth: "118px",
          paddingRight: "0px",
          paddingLeft: "18px",
        },
      },
      "& h2": { fontSize: "24px" },
    },

    "& .MuiTableCell-body": {
      height: "56px",
      padding: "0 10px",
    },
    "& .MuiOutlinedInput-adornedEnd": {
      height: "50px",
      padding: "19px 4px",
      background: "transparent",
      border: "1px solid #808080bf",
    },
    "& .MuiIconButton-root": {
      color: "#14133bbf !important",
    },
    "& .MuiInputAdornment-positionEnd": { margin: "0" },
    "& .MuiOutlinedInput-inputAdornedEnd": {
      // display: "none",
    },
  },
  width: {
    margin: "24px",
    paddingLeft: "9px",
  },
  buttonright: {
    marginTop: "25px",
    padding: "22px",
  },
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "#ffffff",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#ffffff",
    },
  },
  dialogbox: {
    position: "relative",
  },
  icon: {
    color: "white",
    position: "absolute",
    top: "5px",
    right: "10px",
    "&:hover": {
      cursor: "Pointer",
    },
  },
  action: {
    display: "flex",
    justifyContent: "center",
  },
  tableBaseContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#190a2c",
    borderRadius: "0px 0px 5px 5px",
  },
  filterBtn: {
    border: "1px solid #E7E7E7",
    margin: "4px 0px",
    fontSize: "14px",
    // background: "#213743",
    justifyContent: "space-between",
    height: "44px",
    color: "#14133b",
    backgroundColor: "#ffff",
    boxShadow: "none",
    boxSizing: "border-box",
    fontWeight: "500",
    lineHeight: "20px",
    borderRadius: "10px",
    "&:hover": {
      // color: theme.palette.primary.main
      color: "#14133b",
    },
  },
  headerCellcontent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "inherit",
    "& div": {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "& svg": {
        // position:"absolute",
        // top:"10px"
      },
    },
  },
  textBox: {
    "& h2": {
      color: theme.palette.primary.main,
      lineHeight: "140%",
      fontSize: "24px",
    },
  },
  datepicker: {
    color: theme.palette.primary.main,
  },
}));

function Transaction(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [recentCol, setRecentCol] = React.useState(null);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState();
  const [swapExchange, setswapExchange] = useState();
  const [timeFilter, setTimeFilter] = useState();
  const [toTimeFilter, setToTimeFilter] = useState();
  const [executionsList, setexecutionsList] = useState();
  const [page, setPage] = useState(1);
  const [executionsList1, setexecutionsList1] = useState([]);
  const { activate, account, chainId, library, deactivate } = useWeb3React();
  const user = useContext(UserContext);
  const [selectRankingDays, setSelectRankingDays] = useState();
  useEffect(() => {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("id")) {
      let param = searchParams.get("id");
      const getdiv = document.getElementById(param);
      const ofsetTop = getdiv.offsetTop - 30;
      console.log(ofsetTop);
      var scroll = Scroll.animateScroll;
      scroll.scrollTo(ofsetTop, param);
    }
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const buyTokenHandler = async () => {
    console.log("<<<<<<<<<<<<<-------------->>>>>>>>>>>>>>>>>>");
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.buyTokenList,
        headers: {
          token:
            sessionStorage.getItem("token") ||
            localStorage.getItem("creatturAccessToken"),
        },
        data: {
          search: selectedCategoryNames && selectedCategoryNames.name,
          fromDate: timeFilter,
          toDate: toTimeFilter,
          swap: swapExchange,
          page: page.toString(),
          limit: "10",
        },
      });
      if (res.data.responseCode == 200) {
        setexecutionsList(res.data.result);
        setexecutionsList1(res.data.result.docs);
        // console.log("total-----results:----", res.data.result.docs);
      }
    } catch (error) {
      console.log(error);
      setexecutionsList1([]);
    }
  };
  useEffect(() => {
    if (account && user.isLogin) {
      buyTokenHandler();
    }
  }, [account, user.isLogin, page]);

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(executionsList1);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "userList");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Transaction_History.xlsx");
  };
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [age, setAge] = React.useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
    <Box className={classes.mainBox}>
      {/* <Filterswap /> */}
      <Paper elevation={2} style={{ padding: "20px" }}>
        <Box mb={2}>
          <Typography variant="h2" style={{ color: "#0c0d31" }}>
            Transactions History
          </Typography>{" "}
        </Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={3} lg={3} sm={6} align="left">
            <Typography
              variant="boay2"
              style={{ color: "rgba(61, 61, 61, 1)" }}
            >
              {" "}
              Search
            </Typography>
            <Box className="transactionfilter" mt={1}>
              <FormControl fullWidth className={classes.formControl}>
                <TextField
                  name="name"
                  placeholder="Search by Transaction Hash..."
                  variant="outlined"
                  type="search"
                />
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} md={3} lg={2} sm={6} align="left">
            <Typography
              variant="boay2"
              style={{ color: "rgba(61, 61, 61, 1)" }}
            >
              From Date:
            </Typography>
            <Box mt={1}>
              <FormControl fullWidth className={classes.formControl}>
                <KeyboardDatePicker
                  value={timeFilter}
                  onChange={(date) => {
                    setTimeFilter(new Date(date));
                  }}
                  format="DD/MM/YYYY"
                  inputVariant="outlined"
                  disableFuture={true}
                  margin="dense"
                  variant="outlined"
                  helperText=""
                  name="dob"
                  fullWidth
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} lg={2} sm={6} align="left">
            <Typography
              variant="boay2"
              style={{ color: "rgba(61, 61, 61, 1)" }}
            >
              To Date:
            </Typography>
            <Box mt={1}>
              <KeyboardDatePicker
                variant="outlined"
                value={toTimeFilter}
                onChange={(date) => {
                  setToTimeFilter(new Date(date));
                }}
                minDate={timeFilter}
                format="DD/MM/YYYY"
                inputVariant="outlined"
                disableFuture={true}
                margin="dense"
                helperText=""
                name="dob"
                fullWidth
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3} lg={2} sm={6} align="left">
            <Typography
              variant="boay2"
              style={{ color: "rgba(61, 61, 61, 1)" }}
            >
              {" "}
              Select Pair
            </Typography>
            <Box className="transactionfilter" mt={1}>
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
                  <MenuItem value={10}> Select Pair</MenuItem>
                  <MenuItem value={20}>BTC</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} md={3} lg={3} sm={6}>
            <Typography variant="boay2" style={{ color: "#fff" }}>
              To Date:
            </Typography>
            <Box className="displayEnd" mt={1}>
              <Button
                variant="contained"
                // color="primary"
                style={{ minWidth: "115px", backgroundColor: "#01CB54" }}
                onClick={buyTokenHandler}
              >
                Apply
              </Button>{" "}
              &nbsp;
              <Button
                variant="contained"
                // color="secondary"
                className="clearbutton"
                style={{ minWidth: "115px", whiteSpace: "pre", backgroundColor: "#013FA7" }}
                onClick={downloadExcel}
              >
                Download CSV
              </Button>{" "}
            </Box>
          </Grid>
          {/* <Grid item xs={12} md={4} lg={4} sm={6} align="left">
              <Typography variant="boay2" style={{ color: "#fff" }}>
                {" "}
                Select Coin
              </Typography>
              <Box mt={1}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={buyTokenHandler}
                >
                  Search
                </Button>{" "}
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  // onClick={downloadExcel}
                  style={{
                    background: "#179366",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Reset
                </Button>{" "}
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={downloadExcel}
                  style={{
                    background: "#FD985F",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Export
                </Button>
              </Box>
            </Grid> */}
        </Grid>

        {/* <Grid container spacing={1}>
              <Grid item xs={6} align="left">
                <Box className={classes.textBox}>
                  <Typography variant="h2">Transactions History</Typography>{" "}
                </Box>
              </Grid>
              <Grid item xs={6} align="right">
              <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={downloadExcel}
                  >
                    Export
                  </Button>
                </Box> 
              </Grid>
            </Grid> */}
      </Paper>

      <Box mt={3}>
        <Paper elevation={2} style={{ padding: "20px" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#013FA7" }}>
                  <TableCell align="left">
                    <Typography
                      variant="body2"
                      className={classes.headerCellcontent}
                    >
                      Tx Hash
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body2"
                      className={classes.headerCellcontent}
                    >
                      Coin Name
                    </Typography>
                  </TableCell>
                  <TableCell>Exchange A</TableCell>
                  <TableCell>Exchange B</TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body2"
                      className={classes.headerCellcontent}
                    >
                      Price Difference
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body2"
                      className={classes.headerCellcontent}
                    >
                      Date/Time
                    </Typography>{" "}
                  </TableCell>

                  <TableCell align="left">
                    <Typography
                      variant="body2"
                      className={classes.headerCellcontent}
                    >
                      Profit
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tabledata &&
                  tabledata?.map((data, index) => {
                    return (
                      <TableRow className={classes.root}>
                        <TableCell component="th" scope="row">
                          {data.transactionHash}
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
                              variant="h6"
                              style={{ color: "rgba(61, 61, 61, 1)" }}
                            >
                              BTC
                            </Typography>
                            &nbsp; Bitcoin
                          </Box>
                        </TableCell>
                        <TableCell>{data?.fromSwap}</TableCell>
                        <TableCell>{data?.exchangeSwap}</TableCell>

                        <TableCell style={{ color: "rgba(243, 109, 54, 1)" }}>
                          {data?.price}
                        </TableCell>
                        <TableCell>{data?.createdAt}</TableCell>
                        <TableCell style={{ color: "rgba(243, 109, 54, 1)" }}>
                          {" "}
                          {data?.profit}
                        </TableCell>
                      </TableRow>
                    );
                  })}

                {/* {executionsList1.length == 0 && (
                  <Box align="center" className="moreBox1">
                    <Typography variant="body2">No Execution Founds</Typography>
                  </Box>
                )} */}
              </TableBody>
            </Table>
          </TableContainer>
          {executionsList?.pages > 1 && (
            <Box align="right" mt={3} className={classes.page}>
              <Pagination
                count={executionsList?.pages}
                siblingCount={0}
                showFirstButton
                showLastButton
                page={page}
                onChange={(e, v) => setPage(v)}
              />
              {/* <Button
              className={classes.filterBtn}
              onClick={(event) => setRecentCol(event.currentTarget)}
            >
              {swapExchange ? swapExchange.name.toString() : "10"}
              <ArrowDropDownIcon />
            </Button> */}
            </Box>
          )}

          <Box align="right" mt={3} className={classes.page}>
            <Pagination count={5} size="small" />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Transaction;
