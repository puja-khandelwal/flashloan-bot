import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Grid,
  Box,
  Container,
  Dialog,
} from "@material-ui/core";
import { Twitter } from "@material-ui/icons";
import TelegramIcon from "@material-ui/icons/Telegram";
import { SiMedium } from "react-icons/si";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";
import Logo from "./../../component/Logo";
import Scroll from "react-scroll";
import ConnectWalletModal from "src/component/ConnectWalletModal";
import { FiSun } from "react-icons/fi";
import { BsFillMoonFill } from "react-icons/bs";
import SettingsContext from "src/context/SettingsContext";
import { useWeb3React } from "@web3-react/core";
import { UserContext } from "src/context/User";
import WalletConnectModal from "src/component/ConnectWallet/WalletConnectModal";
import { ACTIVE_NETWORK } from "src/constants";
import { swichNetworkHandler } from "src/utils";
const ScrollLink = Scroll.Link;

const useStyles = makeStyles((theme) => ({
  joinButton: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px",
    },
  },
  labeltext: {
    padding: "0em 0em 0.7em",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "27px",
    color: "#fff",
    display: "block",
    whiteSpace: "nowrap",
    verticalAlign: "baseline",
    borderRadius: "0.25em",
  },
  dialoginputbox: {
    width: "393px",
    height: "35px",
    border: "2px solid #fff",
    paddingLeft: "10px",
    color: "#fff",
    backgroundColor: "#141414",
    borderRadius: "8px",
    // boxShadow: "2px 5px 2px #888888ab",

    "@media (max-width: 900px)": {
      width: "291px",
    },
  },
  menuButton: {
    fontSize: "17px",
    fontWeight: "400",
    borderRadius: 0,
    minWidth: "auto",
    color: "rgba(65, 22, 67, 1)",
    padding: "0px 15px",
    margin: "0 5px",
    "&.active": {
      color: "rgba(243, 109, 54, 1)",
    },
    "&[tabIndex]:focus": {
      color: "rgba(243, 109, 54, 1)",
    },

    "&:hover": {
      color: "rgba(243, 109, 54, 1)",
    },

    "@media (max-width: 1280px)": {
      lineHeight: "24px",
      padding: "7px 15px !important",
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
  },
  toolbar: {
    display: "flex",
    padding: "10px 0",
    justifyContent: "space-between",
    "@media (max-width: 900px)": {
      paddingLeft: "75px",
      paddingRight: "20px",
    },
  },
  maindrawer: {
    height: "100%",
    background: "#0c0731",
    width: "260px",
  },
  logoDrawer: {
    paddingLeft: "10px",
    width: "200px",
    marginBottom: "15px",
  },
  drawerContainer: {
    padding: "6px 0px",
    height: "100%",
    // background: "#1a1a1a",
    width: "260px",
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  drawericon: {
    // color: "#000",
    // position: "absolute",
    // top: "-2px",
    // right: "-10px",
    // fontSize: "25px",
    marginRight: "-19px",
  },
  logoImg: {
    width: "75px",
    margin: " 14px 15px 11px 0px",
    objectFit: "contain",
    "@media (max-width: 500px)": {
      margin: " 11px 1px 3px 0px",
      width: "100px !important",
    },
  },
  containerHeight: {
    height: "100%",
  },
  mainHeader: {
    justifyContent: "space-between",
    padding: "0px",
    minHeight: "60px !important",
  },

  menuLeft: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  inerrMenu: {
    display: "flex",
    listStyle: "none",
    padding: "0",
    whiteSpace: "nowrap",
    paddingLeft: "25px",
    alignItems: "center",
    // justifyContent: "flex-end",
    justifyContent: "flex-start",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      display: "block",
      padding: "0",
    },
    "& li": {
      "&.active": {
        background: "red",
      },
    },
  },
  menuul: {
    display: "flex",
    listStyle: "none",
    padding: "0",
    alignItems: "center",
    margin: "0",
    height: "50px",
    justifyContent: "space-between",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      display: "block",
      "& .logoDesk": {
        display: "none",
      },
    },

    "& .buttonRound": {
      width: "41px",
      height: "41px",
      borderRadius: "50%",
      color: "#fff",
      marginLeft: "15px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "20px",
      cursor: "pointer",
      border: "2px solid #FFFFFF",
      [theme.breakpoints.down("md")]: {
        marginBottom: "20px",
      },
      [theme.breakpoints.down("xs")]: {
        marginBottom: "20px",
      },
      "&:hover": {
        background: "#fff",
        color: "#000",
        // border: "2px solid #000",
      },
    },
  },
  btnSection: {
    "@media(max-width:1279px)": {
      display: "flex",
      flexDirection: "column",
    },
  },
}));

export default function Header({ buttonClick }) {
  const classes = useStyles();
  const { activate, account, chainId, library } = useWeb3React();
  const user = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    user.connectWallet();
    setOpen(true);
  };

  const disconnect = async () => {
    user.dicconectWalletFun();
    window.localStorage.removeItem("creatturAccessToken");
    window.sessionStorage.removeItem("token");
  };

  const CloseConnectWallet = () => {
    setOpen(false);
  };

  const {
    toolbar,
    menuul,
    drawerContainer,
    drawericon,
    menuLeft,
    logoDrawer,
    containerHeight,
    inerrMenu,
    mainHeader,
    menuButton,
    btnSection,
  } = useStyles();
  const history = useHistory();
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;
  const themeSeeting = useContext(SettingsContext);
  const changeTheme = (type) => {
    themeSeeting.saveSettings({
      theme: type,
    });
  };
  console.log(
    " --- themeSeeting --- DARK - LIGHT",
    themeSeeting.settings.theme
  );
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1280
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          style={{ paddingLeft: "0px" }}
        >
          <Grid item xs={12} align="center">
            {" "}
            {menuText}{" "}
          </Grid>
        </Grid>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar className={mainHeader}>
        <Drawer
          {...{
            anchor: "right",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>
            <img
              className={logoDrawer}
              src="images/logo.svg"
              alt=""
              style={{ width: "100px" }}
            />

            {menuText}
            <div style={{ padding: "16px" }}>{connectBtn}</div>

            <Box className="socialTopbar">
              <IconButton
                target="_blank"
                href="https://www.facebook.com/"
                className={classes.socialIcons}
              >
                <BsFacebook
                // className={classes.socialIcons}
                />
              </IconButton>

              <IconButton
                target="_blank"
                href="https://www.twitter.com/"
                className={classes.socialIcons}
              >
                <Twitter
                // className={classes.socialIcons}
                />
              </IconButton>

              <IconButton
                target="_blank"
                href="https://www.telegram.com/"
                className={classes.socialIcons}
              >
                <TelegramIcon
                // className={classes.socialIcons}
                />
              </IconButton>

              <IconButton
                target="_blank"
                href="https://www.telegram.com/"
                className={classes.socialIcons}
              >
                <BsDiscord
                // className={classes.socialIcons}
                />
              </IconButton>

              <IconButton
                target="_blank"
                href="https://www.telegram.com/"
                className={classes.socialIcons}
              >
                <AiFillYoutube
                // className={classes.socialIcons}
                />
              </IconButton>
            </Box>
          </div>
        </Drawer>

        <div>{productLogo}</div>

        <Grid container spacing={0} alignItems="center" justifyContent="center">
          <Grid item xs={10} align="right"></Grid>
          <Grid item xs={2} align="right">
            <IconButton
              className={drawericon}
              {...{
                edge: "start",
                color: "inherit",
                "aria-label": "menu",
                "aria-haspopup": "true",
                onClick: handleDrawerOpen,
              }}
            >
              <MenuIcon
                width="60px"
                height="60px"
                style={{ color: "rgba(243, 109, 54, 1)", fontSize: "30px" }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    );
  };

  const productLogo = (
    <Box>
      <Link to="/">
        <Logo className="logoImg" />
      </Link>
    </Box>
  );

  const connectBtn = <Box></Box>;

  const menuText = (
    <nav>
      <ul class={menuul}>
        <div className="logoDesk">{productLogo}</div>

        <li>
          <li className="activecolor">
            <ul className={inerrMenu}>
              {themeSeeting.settings.theme == "DARK" && (
                <Box className="themeButton">
                  <IconButton
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      changeTheme("LIGHT");
                    }}
                  >
                    <FiSun />
                  </IconButton>
                </Box>
              )}
              {themeSeeting.settings.theme != "DARK" && (
                <Box className="themeButton1">
                  <IconButton
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      changeTheme("DARK");
                    }}
                  >
                    <BsFillMoonFill />
                  </IconButton>
                </Box>
              )}
              <li>
                {" "}
                <ScrollLink
                  className={menuButton}
                  smooth={true}
                  duration={500}
                  to="home"
                  tabIndex="1"
                  onClick={() => history.push("/?id=home")}
                >
                  {" "}
                  Home{" "}
                </ScrollLink>{" "}
              </li>

              {/* <li>
                {" "}
                <ScrollLink
                  className={menuButton}
                  smooth={true}
                  duration={500}
                  to="plan"
                  tabIndex="2"
                  onClick={() => history.push("/?id=plan")}
                >
                  {" "}
                  Pricing{" "}
                </ScrollLink>{" "}
              </li> */}
              <li>
                {" "}
                <ScrollLink
                  className={menuButton}
                  smooth={true}
                  duration={500}
                  to="trading"
                  tabIndex="3"
                  onClick={() => history.push("/about")}
                >
                  {" "}
                  About{" "}
                </ScrollLink>{" "}
              </li>
              <li>
                {" "}
                <ScrollLink
                  className={menuButton}
                  smooth={true}
                  duration={500}
                  to="plan"
                  tabIndex="2"
                  onClick={() => history.push("/dashboard")}
                >
                  {" "}
                  Dashboard{" "}
                </ScrollLink>{" "}
              </li>
              {sessionStorage.getItem("token") && (
                <>
                  <li>
                    {" "}
                    <ScrollLink
                      className={menuButton}
                      smooth={true}
                      duration={500}
                      to="trading"
                      tabIndex="3"
                      onClick={() => history.push("/dashboard")}
                    >
                      {" "}
                      Dashboard{" "}
                    </ScrollLink>{" "}
                  </li>
                </>
              )}

              <li style={{ marginLeft: "15px" }}>
                {account ? (
                  <>
                    <Box className={btnSection}>
                      {chainId == ACTIVE_NETWORK ? (
                        <Button
                          variant="contained"
                          size="large"
                          color="primary"
                          onClick={disconnect}
                          className={classes.joinButton}
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          size="large"
                          color="primary"
                          onClick={swichNetworkHandler}
                          className={classes.joinButton}
                        >
                          Switch Network
                        </Button>
                      )}
                      &nbsp;
                      {sessionStorage.getItem("token") && (
                        <>
                          <li>
                            {" "}
                            <Button
                              onClick={() => history.push("/dashboard")}
                              variant="contained"
                              size="large"
                              color="primary"
                              // href="https://discord.com/"
                              className={classes.joinButton}
                            >
                              Dashboard
                            </Button>
                          </li>
                        </>
                      )}
                    </Box>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    target="_blank"
                    style={{ minWidth: "130px" }}
                    // href="https://discord.com/"
                    className={classes.joinButton}
                    // onClick={handleClickOpen}
                    onClick={() => history.push("/login")}
                  >
                    {" "}
                    Login
                  </Button>
                )}
              </li>
            </ul>
          </li>
        </li>
      </ul>
    </nav>
  );

  return (
    <>
      <AppBar
        className="headerNav"
        elevation={0}
        style={{ borderRadius: "0px" }}
      >
        <Container maxWidth="lg" className={containerHeight}>
          {mobileView ? displayMobile() : displayDesktop()}
        </Container>
      </AppBar>
      {/* <Dialog open={open} onClose={CloseConnectWallet} fullWidth maxWidth="sm">
        <WalletConnectModal CloseConnectWallet={CloseConnectWallet} />
      </Dialog> */}
      {open && (
        <WalletConnectModal open={open} handleClose={CloseConnectWallet} />
      )}
    </>
  );
}
