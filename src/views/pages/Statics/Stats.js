import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import Platform from "./Platform";

const useStyles = makeStyles((theme) => ({
  arbiratgemainBox: {
    position: "relative",
    marginBottom: "80px",
  },
}));

export default function Stats() {
  const classes = useStyles();

  return (
    <Box className={classes.arbiratgemainBox}>
      <Platform />
    </Box>
  );
}
