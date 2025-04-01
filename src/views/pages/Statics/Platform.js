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
import Transactiontable from "./Transactiontable";
const useStyles = makeStyles((theme) => ({
  platformmainBox: {
    position: "relative",
    marginTop: "20px",
    "& h6": {
      color: "#000000",
    },
    "& h5": {
      color: "#000000",
      fontWeight: "500",
      lineHeight: "30px",
      fontSize: "30px",
    },
    "& .borderleft": {
      marginLeft: "40px",
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
        left: "-23px",
        borderRadius: "10px",
      },
    },
    "& .exchangeBox": {
      "&::before": {
        background: "rgb(255, 85, 0) !important",
      },
    },

    "& .iconbox": {
      borderRadius: "10px",
      width: "70px",
      height: "70px",
    },
    "& .dashboardinner": {
      padding: "20px",
    },
  },
}));

export default function Platform() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box className={classes.platformmainBox}>
      <Grid
        container
        spacing={2}
        style={{ alignItems: "center", marginTop: "-25px" }}
      >
        <Grid item md={4} sm={6} xs={12}>
          <Paper elevation={2} className="dashboardinner">
            <Box className="displayStart">
              <Avatar src="/images/Statis/Trade.svg" className="iconbox" />
              <Box ml={2} align="left" className="borderleft">
                <Typography variant="h6">Total Trade</Typography>
                <Typography variant="h5">0</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item md={4} sm={6} xs={12}>
          <Paper elevation={2} className="dashboardinner">
            <Box className="displayStart">
              <Avatar src="/images/Statis/volume.svg" className="iconbox" />
              <Box ml={2} align="left" className="borderleft">
                <Typography variant="h6">Total Volume</Typography>
                <Typography variant="h5">$0.0000</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Paper elevation={2} className="dashboardinner">
            <Box className="displayStart">
              <Avatar src="/images/Statis/profile.svg" className="iconbox" />
              <Box ml={2} align="left" className="borderleft">
                <Typography variant="h6">Total Profile</Typography>
                <Typography variant="h5">$0.0000</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Transactiontable />
    </Box>
  );
}
