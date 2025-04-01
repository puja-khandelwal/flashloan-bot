import React from "react";
import { styled } from "@material-ui/core";
import {
  Typography,
  Box,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Avatar,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  textheadBox: {
    paddingBottom: "9px",
    borderBottom: "1px solid #80808052",
    "& h2": {
      fontSize: "40px",
      color: "rgb(243, 109, 54)",
    },
  },
  walletcardBox: {
    "& .rowtablebox": {
      padding: "7px 0 !important",
      minWidth: "200px",
    },
    "& .MuiTableRow-root:first-child ": {
      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",
    },
    "& h6": {
      color: "rgba(61, 61, 61, 1)",
      lineHeight: "20px",
    },
    "& p": {
      color: "rgba(0, 0, 0, 0.6)",
    },
    "& .playerprofile": {
      borderRadius: "50px",

      background: "url(<path-to-image>), lightgray 50% / cover no-repeat",
    },
    "& .MuiTableRow-root": {
      borderBottom: "none",
    },
    "& .MuiTableRow-root:first-child ": {
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
    },
    "& .evenRow": {
      background: "rgba(65, 22, 67, 0.05)",
      borderRadius: "10px",
      padding: "10px",
    },

    "& .oddRow": {
      background: "#fff",
      borderRadius: "10px",
      padding: "10px",
    },
    position: "relative",
    zIndex: "999",
    "& .labelBox": {
      borderRadius: "100px",
      padding: "6px 10px",
      width: "max-content",
      marginTop: "10px",
    },
    // "& .lastRow": {
    //   borderBottom: "none",
    //   background:"red",
    // },
  },
}));

const tabledata = [
  {
    coinname: "BTC",
  },
  {
    coinname: "BTC",
  },
  {
    coinname: "BTC",
  },
  {
    coinname: "BTC",
  },
  {
    coinname: "BTC",
  },
  {
    coinname: "BTC",
  },
  {
    coinname: "BTC",
  },
  {
    coinname: "BTC",
  },
];

export default function WalletCrad() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box className={classes.walletcardBox}>
      <Box className={classes.textheadBox} mb={3}>
        <Box className="displayStart">
          <img
            onClick={() => history.goBack("/")}
            src="/images/arrowback.svg"
            width="35px"
            style={{ cursor: "pointer" }}
          />
          &nbsp;&nbsp;
          <Typography variant="h2" style={{ color: "rgba(243, 109, 54, 1)" }}>
            Wallet
          </Typography>
        </Box>
      </Box>
      <Box className="laderBoardlandingpage">
        <Box className="gradientborderbackground">
          <TableContainer>
            <Table style={{ borderSpacing: "0 15px" }}>
              <TableBody>
                {tabledata.map((value, index) => (
                  <TableRow
                    key={index}
                    className={`${
                      index === tabledata.length - 1 ? "lastRow" : ""
                    } ${index % 2 === 0 ? "evenRow" : "oddRow"} ${
                      index >= tabledata.length - 2 ? "lastTwoRows" : ""
                    }`}
                  >
                    <TableCell
                      style={{ textAlign: "center" }}
                      className="rowtablebox"
                    >
                      <Box className="displayStart" ml={2}>
                        <Box>
                          <Avatar
                            src="/images/btccoin.svg"
                            className="playerprofile"
                          />{" "}
                        </Box>

                        <Box ml={2} align="left">
                          <Typography
                            style={{ color: "#FF5500" }}
                            variant="body2"
                          >
                            {value.coinname}
                          </Typography>
                          <Typography variant="h6">Bitcoin</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left" }}
                      className="rowtablebox"
                    >
                      <Typography variant="body2">Locked Balance:</Typography>
                      <Typography variant="h6">Locked Balance:</Typography>
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left" }}
                      className="rowtablebox"
                    >
                      <Typography variant="body2">
                        Available Balance in BTC:
                      </Typography>
                      <Typography variant="h6">56,77677 BTC</Typography>
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left" }}
                      className="rowtablebox"
                    >
                      <Typography variant="body2">
                        Available Balance in USD:
                      </Typography>
                      <Typography variant="h6">87,6876658767</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
