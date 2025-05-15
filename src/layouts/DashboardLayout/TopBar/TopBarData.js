import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import Modal from "@material-ui/core/Modal";
import { AuthContext } from "src/context/Auth";

import SearchField from "src/component/SearchField";
import { FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Toolbar,
  makeStyles,
  IconButton,
  Badge,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Grid,
  Avatar,
  Divider,
  Popper,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { FaSignOutAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Logo from "src/component/Logo";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import SyncIcon from "@material-ui/icons/Sync";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import SearchIcon from "@material-ui/icons/Search";
import { BiMoon, BiRupee, BiSearchAlt2, BiSun } from "react-icons/bi";
import moment from "moment";
import SettingsContext from "src/context/SettingsContext";
import { UserContext } from "src/context/User";
import { useWeb3React } from "@web3-react/core";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "0px !important",
    backgroundColor: "#fff",
    boxShadow: "0 0 40px 0 rgb(94 92 154 / 6%) !important",
  },
  notificationBox: {
    "&:hover": {
      background: "rgb(8, 86, 204) !important",
    },
  },
  toolbar: {
    height: 80,
    "& .MuiIconButton-root": {
      padding: "0px",
    },
  },
  logo: {
    width: "134px",
    cursor: "pointer",
    height: "auto",
    paddingTop: "21px",
    paddingLeft: "20px",
  },
  logo1: {
    cursor: "pointer",
    paddingLeft: "16px",
    maxWidth: "100px",
    padding: "20px",
    marginTop: "76px",
    marginBottom: "21px",
    paddingBottom: "63px",

    "@media (max-width: 1279px)": {
      display: "none",
    },
  },

  handleDialog: {
    "@media (max-width:500px)": {
      minwidth: "200px",
    },
    "& .MuiDialog-paperScrollPaper": { maxHeight: "78vh" },
    "& .walletheading": {
      width: " 500px",
      margin: 0,
      display: "flex",
      alignItems: " center",
      justifyContent: "space-between",
      borderBottom: " 1px solid #cecece",
      padding: " 5px",
      paddingBottom: "20px",
      fontSize: "14px",
      color: "#000",
      position: "relative",
      [theme.breakpoints.down("md")]: {
        width: " 100%  ",
      },
      "& span": {
        position: "absolute",
        bottom: 3,
        right: 5,
        fontSize: "12px",
        color: "#9e9e9e",
      },
    },
    "& .notificationexpand": {
      textAlign: "center",
    },
    "& .MuiDialogContent-root": {
      "@media (max-width:500px)": {
        width: "307px",
      },
      "@media (max-width:380px)": {
        width: "250px",
      },

      "@media (max-width:350px)": {
        width: "210px",
      },
    },
    "& .MuiDialogActions-root": {
      display: "flex",
      justifyContent: "center",
    },
    "& .MuiDialog-container": {
      position: "absolute",
      right: 1,
      top: "6%",
    },
    "& .MuiDialog-scrollPaper": {
      display: "flex",
      alignItems: "start",
      justifyContent: "center",
    },
  },
  namePlace: {
    "& .MuiDialog-container": {
      maxHeight: "78%",
      minWidth: "214",
    },
  },
  handleShow: {
    display: "block",
  },
  divide: {
    height: "45px",
    margin: "0 32px",
    [theme.breakpoints.down("xs")]: {
      margin: "0px 10px",
    },
  },
  btn: {
    "& .MuiIconButton-root": {
      padding: "12px",
      [theme.breakpoints.down("xs")]: {
        padding: "4px",
      },
    },
  },
  text: {
    fontSize: "15px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "13px",
    },
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} color="default" {...rest}>
      <Toolbar className={classes.toolbar}>
        <TopBarData />
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;

export function TopBarData(props) {
  const classes = useStyles();
  const [openSearch, setopenSearch] = useState(false);

  const { activate, account, chainId, library, deactivate } = useWeb3React();
  const user = useContext(UserContext);

  const themeSeeting = useContext(SettingsContext);

  const changeTheme = (type) => {
    themeSeeting.saveSettings({
      theme: type,
    });
  };
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseSearch = () => {
    setopenSearch(false);
  };

  const history = useHistory();

  const descriptionElementRef = React.useRef(null);
  console.log(
    "descriptionElementRef----------------------",
    descriptionElementRef
  );
  React.useEffect(() => {
    if (open1) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]); //eslint-disable-line

  // const logOut = () => {
  //   // auth.userLogIn(false, null);
  //   if (!account) {
  //     history.push("/");
  //     window.localStorage.removeItem("token");
  //   }
  // };
  // useEffect(() => {
  //   logOut();
  // });

  const HiddenShow = async () => {
    var get = document.getElementById("showNotification");
    get.style.display = "none";
    var get1 = document.getElementById("showNotification1");
    get1.style.display = "none";
    var set = document.getElementById("hideNotification");
    set.style.display = "block";
  };

  return (
    <>
      <img
        src="images/logo.png"
        alt="sfsdg"
        className={classes.logo1}
        onClick={() => history.push("/")}
      />
      <Box className="profilename">
        <Typography variant="h6" style={{ color: "rgb(0 0 0 / 70%)" }}>
          <span style={{ fontWeight: "500", fontSize: "21px" }}>Dashboard</span>{" "}
          {`Welcome back, ${user?.userData && user?.userData?.fullName}!`}
        </Typography>
      </Box>

      <Box flexGrow={1} />

      <Badge className={classes.namePlace} color="secondary">
        <Box mr={2}>
          {/* {themeSeeting.settings.theme == "DARK" && (
            <IconButton
              variant="contained"
              color="primary"
              onClick={() => {
                changeTheme("LIGHT");
              }}
            >
              <FiSun />
            </IconButton>
          )} */}
          {/* {themeSeeting.settings.theme != "DARK" && (
            <IconButton
              variant="contained"
              color="primary"
              onClick={() => {
                changeTheme("DARK");
              }}
            >
              <FaRegMoon />
            </IconButton>
          )} */}
          {/* <IconButton type="button" onClick={() => setopenSearch(true)}>
            <SearchIcon />
          </IconButton> */}
          {openSearch && (
            <Dialog
              open={openSearch}
              onClose={() => setopenSearch(false)}
              fullWidth
              maxWidth="sm"
            >
              <SearchField handleCloseSearch={handleCloseSearch} />
            </Dialog>
          )}
          {/* <NotificationsIcon
            onClick={() => history.push("/notification")}
            style={{ color: "rgba(38, 38, 38, 1)", cursor: "pointer" }}
          /> */}
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          className={classes.handleDialog}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            <p className="headingtext" style={{ color: "#0F212E0F212E" }}>
              Notifications{" "}
            </p>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            ></DialogContentText>
          </DialogContent>
          <DialogActions id="scroll-dialog-title">
            <Box id="showNotification1" className={classes.handleShow}>
              <button onClick={() => HiddenShow()} className="headingtext">
                Expand List{" "}
              </button>
            </Box>
          </DialogActions>
        </Dialog>
      </Badge>

      <Typography
        variant="body1"
        style={{ color: "#14133b", fontWeight: "400" }}
      >
        {user?.userData?.name}
      </Typography>

      <Badge
        className={classes.namePlace}
        color="secondary"
        onClick={() => history.push("/profile")}
        style={{ cursor: "pointer" }}
      >
        <Avatar
          src={
            user?.userData?.profilePic
              ? user?.userData?.profilePic
              : "/images/photo.png"
          }
          style={{ color: "white" }}
        />
      </Badge>
    </>
  );
}
