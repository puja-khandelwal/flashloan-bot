import { Box, Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  arbiratgemainBox: {
    position: "relative",
    marginBottom: "80px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0px",
    },
    "& .arbiratgepaperBox": {
      padding: "20px",
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        height: "auto",
      },
    },
    "& h5": {
      color: "#3D3D3D !important",
      marginTop: "0px !important",
    },
    "& p": {
      color: "#3D3D3D",
    },
    "& .gridProper": {
      display: "grid",
      gridTemplateColumns: "auto auto",
      gap: "60px",
    },
  },
}));

const userdata = [
  {
    title: "Total Trade",
    name: "8",
  },
  {
    title: "Total Profit",
    name: "$ 7346",
  },
  {
    title: "Total Volume",
    name: "$ 7346",
  },
  {
    title: "Total Trade Limit",
    name: "$ 7346",
  },
  {
    title: "Trade Limit",
    name: "$ 7346",
  },
];
const networkdata = [
  {
    title: "Dex",
    name: "",
  },
  {
    title: "Swap Tokens",
    name: "",
  },
  {
    title: "Profit Percent(%)",
    name: "0%",
  },
  {
    title: "Profit Amount",
    name: "0.0000",
  },
  {
    title: "Payout Token",
    name: "",
  },
  {
    title: "Profit Amount(USD)",
    name: "0.0000",
  },
  {
    title: "Ascent Fee:",
    name: "0%",
  },
];
export default function Arbirage() {
  const classes = useStyles();
  return (
    <Box className={classes.arbiratgemainBox} mt={3}>
      <Grid container spacing={2}>
        <Grid item md={6} sm={12} xs={12}>
          <Paper elevation={2} className="arbiratgepaperBox">
            <Typography variant="h5">Arbitrage Details</Typography>

            <Box>
              {networkdata.map((value) => (
                <Box className="displaySpaceBetween" mb={1}>
                  <Typography variant="body2">{value.title}:</Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "rgba(65, 22, 67, 1)" }}
                  >
                    {value.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <Paper elevation={2} className="arbiratgepaperBox">
            <Typography variant="h5">User Stats</Typography>

            <Box>
              {userdata.map((value) => (
                <Box className="displaySpaceBetween" mb={1}>
                  <Typography variant="body2">{value.title}:</Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "rgba(65, 22, 67, 1)" }}
                  >
                    {value.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
