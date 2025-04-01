import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import TopBar from "./TopBar";

const useStyles = makeStyles((theme) => ({
  loginlayouttopBox: {
    height: "100vh",
    overflow: "hidden",
    position: "relative",
    "& .loginLayoutBox": {
      background: "#FFFAFA",
      width: "100%",

      "& .MainLayout": {
        height: "100vh",
        position: "relative",
      },
    },
  },
}));

export default function LoginLayout({ children }) {
  const classes = useStyles();
  return (
    <Box className={classes.loginlayouttopBox}>
      <TopBar />
      <Box className="loginLayoutBox">
        <Box className="MainLayout">{children}</Box>
      </Box>
    </Box>
  );
}
