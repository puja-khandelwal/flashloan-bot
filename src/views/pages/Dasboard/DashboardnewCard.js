import React from "react";
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  Paper,
  Avatar,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Profile from "./Profile";
const useStyles = makeStyles((theme) => ({
  dashboardcardBox: {
    position: "relative",
    "& h6": {
      color: "#00000080",
    },
    "& .displaySpaceBetween": {
      alignItems: "flex-start",
      position: "relative",
      zIndex: "9",
      "&::before": {
        width: "5px",
        height: "90%",
        content: "''",
        zIndex: "1",
        position: "absolute",
        background: "rgba(65, 22, 67, 1)",
        top: "0",
        left: "0",
        borderRadius: "10px",
      },
    },
    "& .exchangeBox": {
      "&::before": {
        background: "rgb(255, 85, 0) !important",
      },
    },

    "& .iconbox": {
      borderRadius: "0px",
      width: "50px",
      height: "50px",
    },
    "& .dashboardinner": {
      padding: "20px",
    },
  },
}));

export default function DashboardnewCard() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box className={classes.dashboardcardBox}>
      <Grid
        container
        spacing={2}
        style={{ alignItems: "center", marginTop: "-25px" }}
      >
        <Grid item md={4} sm={6} xs={12}>
          <Paper elevation={2} className="dashboardinner">
            <Box className="displaySpaceBetween">
              <Box ml={2} align="left">
                <Typography variant="h6">Wallet Balance</Typography>
                <Typography variant="h2">$67.67</Typography>
              </Box>
              <Avatar
                src="/images/Dashboard/wallet_icon.svg"
                className="iconbox"
              />
            </Box>
          </Paper>
        </Grid>
        {/* <Grid item lg={3} md={4} sm={6} xs={12}>
          <Paper elevation={2} className="dashboardinner">
            <Box className="displaySpaceBetween exchangeBox">
              <Box ml={2} align="left">
                <Typography variant="h6">Exchange</Typography>
                <Typography variant="h2">$12</Typography>
              </Box>
              <Avatar
                src="/images/Dashboard/exchange.svg"
                className="iconbox"
              />
            </Box>
          </Paper>
        </Grid> */}
        <Grid item md={4} sm={6} xs={12}>
          <Paper elevation={2} className="dashboardinner transactionBox">
            <Box className="displaySpaceBetween">
              <Box ml={2} align="left">
                <Typography variant="h6">Transactions</Typography>
                <Typography variant="h2">$67.67</Typography>
              </Box>
              <Avatar
                src="/images/Dashboard/transaction.svg"
                className="iconbox"
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Paper elevation={2} className="dashboardinner">
            <Box className="displaySpaceBetween exchangeBox">
              <Box ml={2} align="left">
                <Typography variant="h6">Highest Profile</Typography>
                <Typography variant="h2">4677</Typography>
              </Box>
              <Avatar src="/images/highest.svg" className="iconbox" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Profile />
    </Box>
  );
}
