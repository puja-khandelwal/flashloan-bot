import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FAFAFA",
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    marginTop: 100,
    minHeight: "calc(100vh - 80px)",
    // padding: "10px",
    backgroundColor: theme.palette.background.darkgrey,
    // backgroundColor: "#1A2C38",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 220,
      paddingRight: " 26px",
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    background: theme.palette.primary.paper,
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    width: "100%",
    position: "relative",
    WebkitOverflowScrolling: "touch",
  },
}));

const DashboardLayout = ({ children }) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content} id="main-scroll">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
