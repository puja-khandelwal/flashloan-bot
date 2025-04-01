import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Box,
  makeStyles,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import WalletConnectModal from "src/component/ConnectWallet/WalletConnectModal";
import { useWeb3React } from "@web3-react/core";
import { UserContext } from "src/context/User";
const useStyles = makeStyles((theme) => ({
  mainbox: {
    position: "relative",
    padding: "130px 0 50px",
    zIndex: "999",
    overflow: "hidden",
    backgroundSize: "cover",
    // backgroundColor: "#000",
    backgroundImage: "url(./images/landing_banner.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",

    [theme.breakpoints.only("xs")]: {
      // backgroundSize: "auto",
      padding: "100px 0",
      backgroundImage: "none",
      backgroundColor: "#f36d361a",
    },
    "& .textBox": {
      position: "relative",
      zIndex: "999",
      [theme.breakpoints.only("xs")]: {
        padding: "50px 0",
      },
      "& h1": {
        color: "rgba(65, 22, 67, 1)",
        fontSize: "65px",
        textAlign: "left",
        lineHeight: "62px",
        textTransform: "capitalize",
        [theme.breakpoints.only("xs")]: {
          fontSize: "40px",
          lineHeight: "42px",
        },
      },
    },
    "& .bannerImg": {
      width: "auto",
      maxWidth: "100%",
      [theme.breakpoints.only("xs")]: {
        // display: "none",
      },
    },
  },
  iconBox: {
    position: "fixed",
    bottom: "66px",
    right: "3px",
    zIndex: "999",
  },
  head: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "60px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "38px",
    },
  },
}));
export default function Bannner1() {
  const classes = useStyles();
  const history = useHistory();

  const { activate, account, chainId, library } = useWeb3React();
  const user = useContext(UserContext);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    user.connectWallet();
    setOpen(true);
  };

  const CloseConnectWallet = () => {
    setOpen(false);
  };

  const handleClose = () => {};
  const [ShowTopBtn, setShowTopBtn] = useState();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const handleclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Box>
      <Box className={classes.mainbox}>
        {open && (
          <WalletConnectModal open={open} handleClose={CloseConnectWallet} />
        )}

        <Box align="center">
          <Container>
            <Grid container spacing={2} alignItems="center">
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Box className="textBox">
                  <Typography variant="h1" className={classes.head}>
                    All-in-one platform for running{" "}
                    <span style={{ color: "rgba(243, 109, 54, 1)" }}>
                      business
                    </span>
                  </Typography>

                  <Typography
                    variant="body2"
                    style={{
                      fontWeight: "400",
                      marginTop: "10px",
                      color: "rgba(61, 61, 61, 1)",
                      textAlign: "left",
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur. Ac sit sit id orci.
                    Dictum aliquet habitant adipiscing placerat. Parturient
                    morbi pellentesq aliquet habitant adipiscing placerat.
                    Parturient morbi pellentesq
                  </Typography>
                </Box>
                {/* <Box mt={2} mb={3} align="left">
                  {account ? (
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      style={{ minWidth: "130px" }}
                      onClick={() => history.push("/dashboard")}
                    >
                      Start Now
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      target="_blank"
                      // href="https://discord.com/"
                      className={classes.joinButton}
                      // onClick={handleClickOpen}
                      style={{ minWidth: "130px" }}
                      onClick={() => history.push("/signup")}
                    >
                      {" "}
                      Sign up
                    </Button>
                  )}
                </Box> */}
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Box>
                  {/* <img
                    src="images/banner.png"
                    alt="image"
                    width="100%"
                    className="bannerImg"
                  /> */}
                  <img
                    src="images/banner_right.svg"
                    alt="image"
                    className="bannerImg"
                  />
                </Box>
              </Grid>
            </Grid>

            {/* <Box mt={4}>
              <Button variant="contained" size="large" color="primary">
                Explore
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/mint"
                style={{ padding: "10px 49px", marginLeft: "20px" }}
              >
                Mint
              </Button>
            </Box> */}
          </Container>

          {/* <Box display="flex" justifyContent="flex-end">
            {ShowTopBtn && (
              <Box
                className={classes.iconBox}
                style={{
                  width: "100%",
                  maxWidth: "60px",
                  borderRadius: "4px",
                }}
              >
                <Button onClick={handleclick}>
                  <ExitToAppIcon
                    style={{
                      color: "rgb(8, 86, 204)",
                      transform: "rotate(-90deg)",
                      fontSize: "50px",
                    }}
                  />
                </Button>
              </Box>
            )}
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
}
