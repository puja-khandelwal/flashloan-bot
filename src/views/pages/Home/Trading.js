import React from "react";
import {
  Container,
  Box,
  Grid,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import WorksCard from "src/component/WorksCard";

const useStyles = makeStyles((theme) => ({
  tradingBox: {
    position: "relative",
    zIndex: "999",
  },
  automatedMainBox: {
    padding: "30px",
    marginTop: "90px",
    background: "#154FB6",

    borderRadius: "30px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px",
    },
  },
  box: {
    display: "flex",
    paddingTop: "30px",
  },
  centeringBox: {
    padding: "40px 0 0 !important",
  },
  centering: {},
  textBox: {
    position: "relative",
    "& .mainheadingBox": {
      marginTop: "6px",
    },
    "& h2": {
      color: "#154FB6",
      textAlign: "left",
      textTransform: "capitalize",
    },
    "& p": {
      textAlign: "left",

      color: "rgba(61, 61, 61, 1)",
    },
  },
  tradingmainBox: {
    position: "relative",
    padding: "60px 0",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 0 50px",
    },
  },
  head: {
    fontWeight: "400",
    fontSize: "25px",
    paddingTop: "6px",
    color: "#154FB6 !important",
  },
}));
const GameMap1 = [
  {
    image: "images/features_1.png",
    heading: "Feature-1",
    number: "01",
    name: "Instant Arbitrage Execution",
    description:
      "Our AI-driven bot detects profitable arbitrage opportunities across multiple DEXs and executes trades in milliseconds, ensuring you never miss a high-reward trade.",
  },
  {
    image: "images/features_2.png",
    heading: "Feature-2",
    number: "02",
    name: "Risk-Free Flash Loans",
    description:
      "Leverage flash loans without collateral! Borrow, trade, and repay within a single transaction, ensuring zero risk of liquidation while maximizing your profits",
  },
  {
    image: "images/features_3.png",
    heading: "Feature-3",
    number: "03",
    name: "Bank-Grade Security",
    description:
      "We implement end-to-end encryption, multi-signature authentication, and smart contract audits to protect your funds and prevent unauthorized access.",
  },
  {
    image: "images/features.png",
    heading: "Feature-4",
    number: "04",
    name: "Non-Custodial & Private",
    description:
      "Your assets remain in your control—no need to deposit funds with us. Enjoy complete anonymity with our decentralized, KYC-free trading model.",
  },
];
export default function Earn() {
  const classes = useStyles();

  return (
    <Box className={classes.tradingBox}>
      <Box className={classes.tradingmainBox}>
        <img src="/images/autolated_left.png" className="autolatedBox" />
        <Container>
          <Grid container spacing={3}>
            <Grid item lg={7} sm={6} xs={12} className={classes.centering}>
              <Box className={classes.textBox} align="center">
                <img src="images/laptop-img.svg" style={{ width: "100%" }} />
              </Box>
            </Grid>

            <Grid item lg={5} sm={6} xs={12}>
              <Box
                className={classes.textBox}
                style={{
                  borderLeft: "3px solid #154FB6",
                  paddingLeft: "23px",
                }}
              >
                <Typography variant="h2" style={{ paddingTop: "0px" }}>
                  Automate your <br />
                  <span style={{ color: "#07C954" }}>
                    Trading
                  </span>{" "}
                </Typography>
                <Box>
                  <Typography variant="body2" className={classes.head}>
                    Just seat back and trade
                  </Typography>

                  <Typography
                    variant="body1"
                    style={{ fontWeight: "400", marginTop: "10px" }}
                  >
                    Let our AI-driven bot analyze market conditions and execute arbitrage trades at lightning speed. With real-time analytics and smart contract integration, you stay ahead in the crypto game.
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ fontWeight: "400", marginTop: "10px" }}
                  >
                    Lorem ipsum dolor sit amet consectetur. Eget donec aliquam
                    et fermentum iaculis morbi.
                  </Typography>
                  <Box mt={3}>
                    <Button
                      variant="contained"
                      // color="primary"
                      style={{ minWidth: "130px",  backgroundColor: "#07C954" }}
                    >
                      Launch Demo
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container>
        <Box className={classes.automatedMainBox}>
          <Grid container spacing={2}>
            {GameMap1.map((data, i) => {
              return (
                <Grid item lg={3} md={6} sm={12} xs={12}>
                  <Box key={i}>
                    <WorksCard data={data} type="timing" index={i} />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
