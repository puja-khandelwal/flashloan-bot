import React from "react";
import {
  Container,
  Box,
  makeStyles,
  Typography,
  Grid,
  Button,
  Card,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grid: {
    border: "1px solid #B2F3B0",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    maxWidth: "100%",
    boxShadow: "0px 0px 5px 1px #1eb808",
    borderRadius: "5px",

    "& .figure": {
      height: "97px",
      display: "flex",
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
    },
    "&:hover": {
      boxShadow:
        "0 0 1rem #1eb80873, 0 0 0rem #1eb80873, 0 0 1rem #1eb80880, 0 0 4rem #1eb80866",
    },
  },
}));

export default function Bannner1({ data }) {
  const classes = useStyles();
  return (
    <Box className={classes.grid}>
      <figure className="figure">
        <img src={data.image} alt="" />
      </figure>
    </Box>
  );
}
