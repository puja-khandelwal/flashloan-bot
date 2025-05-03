import React from "react";
import {
  Container,
  Box,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    paddingTop: "30px",
  },

  centering: {
    display: "flex",
    justifyContent: "center",
  },
  cardBox: {
    position: "relative",
    background: "#fff",

    boxShadow: "0 25px 70px rgba(0,0,0,.07)",
    borderRadius: "10px",
    cursor: "pointer",
    zIndex: "9",
    "&::before": {
      width: "100%",
      height: "100%",
      position: "absolute",
      background: "rgba(65, 22, 67, 1)",
      borderRadius: "10px",
      zIndex: "-1",
      content: "''",
      top: "0",
      left: "0",
      opacity: "0",
      transform: "skew(0deg, -3deg)",
      // transform: "rotate(20deg)",
    },
    "& .beforewhiteBox": {
      background: "#fff",
      padding: "30px 40px 30px",
      boxShadow: "0 25px 70px rgba(0,0,0,.07)",
      borderRadius: "10px",
      cursor: "pointer",
      zIndex: "9",
    },
    "& h3": {
      color: "rgba(243, 109, 54, 1)",
      marginLeft: "15px",
      fontSize: "25px",
    },
    "& p": {
      fontWeight: "400",
      color: "#14133b",
      // color: theme.palette.secondary.main,
    },
    "&:hover": {
      // background: "#1056cc",
      "&::before": {
        opacity: "1",
      },

      "& .trustIconBox": {},
    },
  },
  textBox: {
    position: "relative",
    marginBottom: "16px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0px",
    },
    "& h2": {
      color: "#154FB6",
      maxWidth: "1000px",
      textTransform: "capitalize",
    },
    "& h3": {
      // color: theme.palette.primary.main,
      color: "#154FB6",
    },
    "& .mainheadingBox": {
      marginTop: "6px",
      "& p": {
        textAlign: "center",
        maxWidth: "350px",
        color: "#14133b",
        // color: theme.palette.secondary.main,
      },
    },
  },
  leadingBox: {
    position: "relative",
    padding: "0px 0 80px",
    zIndex: "999",
    // background: theme.palette.background.section,
  },
}));
export default function Earn() {
  const classes = useStyles();

  return (
    <Box className={classes.leadingBox}>
      <img src="/images/bannerbottomshade.png" className="bannerBottomShade" />
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={12} sm={12} xs={12} align="left">
            <Box mt={5} className={classes.textBox}>
              <Typography variant="h2">
                Experiencing the{" "}
                <span style={{ color: "#07C954" }}>leading</span>{" "}
                cryptocurrency tradig bot
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={4} sm={6} xs={12} className={classes.centering}>
            <Box className={classes.cardBox} align="left">
              <Box className="beforewhiteBox">
                <Box className="displayStart" mb={1}>
                  <Box className="trustIconBox">
                    <img src="/images/trust.png" />
                  </Box>

                  <Typography variant="h3">Trust</Typography>
                </Box>

                <Box className="mainheadingBox">
                  <Typography variant="body1">
                  Our audited smart contracts ensure transparent, fair, and risk-free execution. With real-time trade tracking and no hidden fees, you have full control over every transaction.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item lg={4} sm={6} xs={12} className={classes.centering}>
            <Box className={classes.cardBox} align="left">
              <Box className="beforewhiteBox">
                <Box className="displayStart" mb={1}>
                  <img src="/images/security.png" />
                  <Typography variant="h3">Security</Typography>
                </Box>
                <Box className="mainheadingBox">
                  <Typography variant="body1">
                  We safeguard assets with end-to-end encryption, multi-layer authentication, and decentralized execution, ensuring every trade is protected from unauthorized access.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item lg={4} sm={6} xs={12} className={classes.centering}>
            <Box className={classes.cardBox} align="left">
              <Box className="beforewhiteBox">
                <Box className="displayStart" mb={1}>
                  <img src="/images/privacy.png" />
                  <Typography variant="h3">Privacy</Typography>
                </Box>
                <Box className="mainheadingBox">
                  <Typography variant="body1">
                  No KYC required! Your data remains anonymous and encrypted, ensuring complete confidentiality. We follow a non-custodial approach, giving you full control over your assets.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
