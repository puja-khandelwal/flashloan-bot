import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  makeStyles,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  MenuItem,
  TableBody,
  TableContainer,
  Avatar,
  FormControl,
  Select,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
const useStyles = makeStyles((theme) => ({
  bannerBox: {
    "& .MuiTableCell-root": {
      height: "56px",
      padding: "0 10px",
      [theme.breakpoints.down("xs")]: {
        minWidth: "160px",
      },
    },
    "& .MuiInputBase-input": {
      fontWeight: "400",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      top: "0px !important",
    },
    "& .MuiTableCell-body": {
      height: "56px",
      padding: "0 10px",
    },
    textAlign: "center",
    [theme.breakpoints.only("xs")]: {
      padding: "10px 0px",
    },
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

    "& .left": {
      "& h2": {
        color: "#14133b",
      },
    },
  },

  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "#ffffff",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#ffffff",
    },
  },

  ExecutionName: {
    marginTop: "24px !important",
    "& .headingBox": {
      "& h2": {
        color: "#14133b",
      },
      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
      },
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

function Transactiontable() {
  const classes = useStyles();

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
    <>
      <Box className={classes.bannerBox} mt={2}>
        <Box mt={6} className={classes.ExecutionName}>
          <Box mt={2}>
            <Box align="left" mb={2} className="headingBox displaySpaceBetween">
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

                    <TableCell>Pairs</TableCell>
                    <TableCell style={{ minWidth: "90px" }}>
                      Profit Amount
                    </TableCell>

                    <TableCell style={{ textAlign: "center" }}>
                      Profit Amount (USD)
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      Result
                    </TableCell>
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
                            10 USD
                          </TableCell>
                          <TableCell
                            style={{ textAlign: "center", color: "#309A47" }}
                          >
                            Profit 1,409%
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box align="center" mt={3} className={classes.page}>
            <Pagination count={5} size="small" />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Transactiontable;
