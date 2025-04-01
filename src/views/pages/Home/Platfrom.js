import React from "react";
import {
  Container,
  Box,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  mainbox: {
    padding: "60px 0",
    position: "relative",

    [theme.breakpoints.only("xs")]: {
      padding: "40px 0",
    },

    "& h1": {
      fontSize: "50px",
      color: "#01FBB4",
      filter: "drop-shadow(0px 0px 10px #1EB808)",
      textAlign: "center",
      textShadow: "0px 0px 38px #1EB808",
      [theme.breakpoints.down("md")]: {
        fontSize: "17px",
      },
      [theme.breakpoints.only("xs")]: {
        fontSize: "17px",
      },
    },
    "& p": {
      maxWidth: "775px",
    },
  },
  box: {
    position: "relative",

    "& h2": {
      fontFamily: "'Sansita', sans-serif",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "24px",
      marginBottom: "8px",
      filter: "drop-shadow(0px 0px 10px #1EB808)",
      color: "#01FBB4",
      textShadow: "2px 2px #FF0000",
      textShadow: "0px 0px 38px #1EB808",
    },
  },
  Featuring: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .icon1": {
      height: "20px",
      paddingRight: "20px",
      [theme.breakpoints.only("xs")]: {
        width: "50px",
        height: "8px",
        paddingRight: "7px",
      },
    },
    "& .icon2": {
      height: "20px",
      paddingLeft: "20px",
      [theme.breakpoints.only("xs")]: {
        width: "50px",
        height: "8px",
        paddingLeft: "7px",
      },
    },
  },
  textbox: {
    padding: "50px 0",
  },
}));
export default function Bannner1() {
  const classes = useStyles();

  return (
    <Box className={classes.mainbox}>
      <Container>
        <Box className={classes.Featuring}>
          <img src="images/Vector 83.png" className="icon1" />
          <Typography variant="h1">MOONSTEP PLATFORM</Typography>
          <img src="images/Vector 80.png" className="icon2" />
        </Box>
        <Box align="center" mt={3}>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris
          </Typography>
        </Box>

        <Box className={classes.textbox}>
          <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item lg={3} md={4} sm={4} xs={12}>
              <Box className={classes.box}>
                <Typography variant="h2">NFT MONETIZATION</Typography>
                <Typography variant="body1" component="p">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt.
                </Typography>
              </Box>

              <Box className={classes.box} mt={6}>
                <Typography variant="h2">NFT MONETIZATION</Typography>
                <Typography variant="body1" component="p">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt.
                </Typography>
              </Box>

              <Box className={classes.box} mt={6}>
                <Typography variant="h2">NFT MONETIZATION</Typography>

                <Typography variant="body1" component="p">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt.
                </Typography>
              </Box>
            </Grid>

            <Grid item lg={6} md={4} sm={4} xs={12}>
              <img
                src="images/centerlogo.svg"
                width={"100%"}
                paddingTop={"30px"}
              />
            </Grid>

            <Grid item lg={3} md={4} sm={4} xs={12}>
              <Box className={classes.box}>
                <Typography variant="h2">NFT MONETIZATION</Typography>

                <Typography variant="body1" component="p">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt.
                </Typography>
              </Box>

              <Box className={classes.box} mt={6}>
                <Typography variant="h2">NFT MONETIZATION</Typography>

                <Typography variant="body1" component="p">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur
                  <br /> adipisicing elit, sed do eiusmod tempor incididunt.
                </Typography>
              </Box>

              <Box className={classes.box} mt={6}>
                <Typography variant="h2">NFT MONETIZATION</Typography>

                <Typography variant="body1" component="p">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur
                  <br /> adipisicing elit, sed do eiusmod tempor incididunt.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
