import React, { useState, useEffect, useContext } from "react";
import { Container, Box, makeStyles } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  loginlayoutmainBox: {
    padding: "0px 0",
    zIndex: "999",
    position: "fixed",
    width: "100%",
    boxShadow: "0 10px 90px 0 rgb(0 0 0 / 26%)",
    backgroundColor: "#fff",
    "& img": {
      width: "auto",
      cursor: "pointer",
      // marginLeft: "40px",
      maxWidth: "100px",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "100px",
      },
    },
  },
}));
export default function TopBar() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box>
      <Box className={classes.loginlayoutmainBox}>
        <Container>
          <img
            src="./images/logo.svg"
            alt="Logo"
            onClick={() => history.push("/")}
          />
        </Container>
      </Box>
    </Box>
  );
}
