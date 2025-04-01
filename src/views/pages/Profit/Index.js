import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import Flash from "./Flash";

const useStyles = makeStyles((theme) => ({
  mainprofitBox: {
    position: "relative",

    "& .profitpaper": {
      padding: "20px",
    },
    "& .avtarImg": {
      width: "70px",
      height: "70px",
    },
    "& h2": {
      color: "#3D3D3D",
      fontSize: "30px",
      fontWeight: "500",
      marginBottom: "20px",
    },

    "& h5": {
      color: "rgb(255, 85, 0)",
      fontWeight: "500",
      marginTop: "10px",
      fontSize: "18px",
    },
  },
}));

const swapData = [
  {
    name: "0 ",
  },
  {
    name: "0 ",
  },
  {
    name: "0 ",
  },
];

export default function Profit() {
  const classes = useStyles();
  const [isSwapped, setIsSwapped] = useState(false);

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
  };

  return (
    <Box className={classes.mainprofitBox}>
      <Paper elevation={2} className="profitpaper">
        <Typography variant="h2">Profit Opportunities</Typography>

        <Box className="profitgridBox">
          {swapData.map((value, index) => (
            <Box className="displaySpaceBetween" key={index}>
              <Box align="center">
                <Avatar
                  src={
                    isSwapped
                      ? "/images/profit_eth.svg"
                      : "/images/profit_eth.svg"
                  }
                  className={isSwapped ? "avtarImg" : "avtarImg"}
                />
                <Typography variant="h5">
                  {isSwapped ? "TRX" : "USDT"} - {value.name}
                </Typography>
              </Box>
              <IconButton onClick={handleSwap}>
                <img
                  src={
                    isSwapped
                      ? "/images/swap_icon.svg"
                      : "/images/swap_icon.svg"
                  }
                  width="45"
                  alt="Swap"
                  className={isSwapped ? "arrowIcon" : "arrowIcon1"}
                />
              </IconButton>
              <Box align="center">
                <Avatar
                  src={
                    isSwapped
                      ? "/images/profit_eth.svg"
                      : "/images/profit_eth.svg"
                  }
                  className="avtarImg"
                />
                <Typography variant="h5">
                  {isSwapped ? "USDT" : "TRX"} - {value.name}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
      <Flash />
    </Box>
  );
}
