import React, { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  TextField,
  IconButton,
  Paper,
} from "@material-ui/core";
import {} from "react-feather";
import { Twitter } from "@material-ui/icons";
import TelegramIcon from "@material-ui/icons/Telegram";
import { SiMedium } from "react-icons/si";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import Scroll from "react-scroll";
import { useHistroy } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ApiConfig from "src/config/APICongig";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const ScrollLink = Scroll.Link;
const useStyles = makeStyles((theme) => ({
  textFeild: {
    backgroundColor: "#2F2F2F",
    fontFamily: "'Ubuntu', sans-serif",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "10px",
    lineHeight: "11px",
    "& hover": {
      borderRadius: "50px",
    },

    // paddingRight:'0px',
    // padding:"5px 15px 10px 15px",
    borderRadius: "50px",
    // 1borderRadius:"25px",
    "& input": {
      color: "white",
      // backgroundColor:"#2F2F2F"
      padding: "10px 0px 10px 15px",
    },
  },
  footerSection: {
    padding: "40px 0",
    position: "relative",
    zIndex: "999",
    backgroundColor: "rgba(65, 22, 67, 1)",
    "& p": {
      [theme.breakpoints.down("sm")]: {
        fontSize: "15px !important",
        maxWidth: "100% !important",
      },
    },
    "& h2": {
      color: "#fff",
      fontSize: "25px !important",
      fontWeight: "500",
      [theme.breakpoints.down("sm")]: {
        fontSize: "18px !important",
      },
    },
  },

  menuButton: {
    fontSize: "17px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "300",
    display: "block",
    marginTop: "18px",
    lineHeight: "16px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px !important",
      lineHeight: "15px",
      marginTop: "14px",
    },
    "&.active": {
      color: "rgba(243, 109, 54, 1)",
    },
    "&:hover": {
      color: "rgba(243, 109, 54, 1)",
    },
    "&[tabIndex]:focus": {
      color: "rgba(243, 109, 54, 1)",
    },
  },
  icons: {
    maxWidth: "250px",
    [theme.breakpoints.only("xs")]: {
      maxWidth: "430px",
    },
    "& svg": {
      fill: "currentColor",
      width: "1em",
      height: "1em",
      display: "inline-block",
      fontSize: "1.5rem",

      "&:hover": {
        color: "#E59446",
      },
    },
  },
  socialIcons: {
    padding: "0px",
    "& svg": {
      paddingRight: "10px",
      color: "#fff",
      "&:hover": {
        color: "#fff",
      },
    },
  },

  bottomText: {
    paddingTop: "20px",
    [theme.breakpoints.only("xs")]: {
      justifyContent: "start",
    },
  },
  subscribetext: {
    "& p": {
      color: "#FFF",
      margin: "29px 0",
      maxWidth: "239px",
      lineHeight: "22px",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "100%",
        margin: "20px 0 0px",
      },
    },
  },
}));

export default function Liquidity() {
  const history = useHistory();
  const classes = useStyles();

  const [email, setemail] = useState();
  const [Loader, setLoader] = useState();

  return (
    <>
      <Paper className={classes.footerSection}>
        <Container>
          <Grid container spacing={2} style={{ alignItem: "center" }}>
            <Grid item lg={3} md={4} sm={4} xs={12}>
              <Box className={classes.subscribetext}>
                <img
                  src="./images/footer_logo.svg"
                  alt="Logo"
                  width="100%"
                  style={{ maxWidth: "100px" }}
                />

                <Typography
                  variant="body2"
                  style={{
                    color: "#fff",
                    textAlign: "left",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur. Ac sit sit id orci.
                  Dictum aliquet habitant
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={3} md={4} sm={4} xs={6}>
              <Box>
                <Typography variant="h2">Features</Typography>
              </Box>

              <ScrollLink
                className={classes.menuButton}
                smooth={true}
                duration={500}
                to="about"
                onClick={() => {
                  history.push({
                    pathname: "/cross-exchange-more",
                  });
                }}
              >
                Instant Fund Transfer
              </ScrollLink>
              <ScrollLink
                className={classes.menuButton}
                smooth={true}
                duration={500}
                to="about"
                onClick={() => {
                  history.push({
                    pathname: "/",
                  });
                }}
              >
                Real-Time Exchange Rates
              </ScrollLink>
              <ScrollLink
                className={classes.menuButton}
                smooth={true}
                duration={500}
                to="about"
                onClick={() => {
                  history.push({
                    pathname: "/market",
                  });
                }}
              >
                Multi-Currency Support
              </ScrollLink>
              <ScrollLink
                className={classes.menuButton}
                smooth={true}
                duration={500}
                to="about"
                onClick={() => {
                  history.push({
                    pathname: "/",
                  });
                }}
              >
                Automated Arbitrage
              </ScrollLink>
              <ScrollLink
                className={classes.menuButton}
                smooth={true}
                duration={500}
                to="about"
                onClick={() => {
                  history.push({
                    pathname: "/",
                  });
                }}
              >
                Customizable bot
              </ScrollLink>
            </Grid>

            <Grid item lg={3} md={4} sm={4} xs={6}>
              <Typography variant="h2">Company</Typography>
              <ScrollLink
                className={classes.menuButton}
                smooth={true}
                duration={500}
                tabIndex="3"
                to="policy"
                onClick={() => history.push("/about")}
              >
                About Us
              </ScrollLink>

              <ScrollLink
                className={classes.menuButton}
                smooth={true}
                duration={500}
                to="policy"
                onClick={() => {
                  history.push({
                    pathname: "/contact-us",
                  });
                }}
              >
                Contact Us
              </ScrollLink>
              {/* <ScrollLink
                className={classes.menuButton}
                smooth={true}
                duration={500}
                to="policy"
                onClick={() => {
                  history.push({
                    pathname: "/terms",
                  });
                }}
              >
                Terms & Conditions
              </ScrollLink> */}
            </Grid>

            <Grid item lg={3} md={4} sm={4} xs={12}>
              <Typography variant="h2">Follow us on social media</Typography>
              <Box className={classes.icons} mt={2}>
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
                {/* <IconButton
                    target="_blank"
                    href="https://www.telegram.com/"
                    className={classes.socialIcons}
                  >
                    <AiFillInstagram
                    // className={classes.socialIcons}
                    />
                  </IconButton>
                  <IconButton
                    target="_blank"
                    href="https://medium.com/log-in/"
                    className={classes.socialIcons}
                  >
                    <SiMedium
                    // className={classes.socialIcons}
                    />
                  </IconButton> */}

                {/* <IconButton target="_blank" href="https://www.instagram.com/">
                    <Instagram className={classes.socialIcons} />
                  </IconButton> */}
              </Box>
              {/* <ScrollLink
                className={classes.menuButton}
                smooth={true}
                duration={500}
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/?id=plan")}
              >
                Pricing
              </ScrollLink> */}
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
}
