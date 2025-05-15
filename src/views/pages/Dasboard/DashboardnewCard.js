import React, { useEffect, useState } from "react";
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
import axios from "axios";
import ApiConfig from "src/config/APICongig";
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
        background: "#013FA7",
        top: "0",
        left: "0",
        borderRadius: "10px",
      },
    },
    "& .exchangeBox": {
      "&::before": {
        background: "#01CB54 !important",
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
  const [botStats, setBotStats] = useState({
    walletBalance: "0.00",
    transactionAmount: "0.00",
    highestProfile: "0",
  });
  const [loading, setLoading] = useState(true);


  const fetchBotStats = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET", // Adjust method if needed
        url: ApiConfig.botStats, // Make sure to define this endpoint in your ApiConfig
        headers: {
          token:
            sessionStorage.getItem("token") ||
            localStorage.getItem("creatturAccessToken"),
        },
      });
      
      if (res.data.responseCode === 200) {
        // Adjust this based on your actual API response structure
        const data = res.data.result;
        setBotStats({
          walletBalance: data.walletBalance || "0.00",
          transactionAmount: data.transactionAmount || "0.00",
          highestProfile: data.highestProfile || "0",
        });
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching bot stats:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBotStats();
  }, []);

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
