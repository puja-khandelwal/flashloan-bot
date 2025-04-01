import React from "react";
import {
  Container,
  Box,
  Grid,
  makeStyles,
  Typography,
  Button,
  withStyles,
} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  bannerbox: {
    position: "relative",
    "& img": {
      width: "90%",
      [theme.breakpoints.down("md")]: {
        width: "auto",
        margin: "0 auto",
      },
      [theme.breakpoints.only("xs")]: {
        width: "auto",
        margin: "0 auto",
      },
    },
  },
}));
export default function SliderCard({ data }) {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.bannerbox}>
        <Box className={classes.Box}>
          <img src={data.image} alt="" style={{}} />
        </Box>
      </Box>
    </>
  );
}
