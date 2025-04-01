import React from "react";
import {
  Container,
  Box,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import WorksCard from "src/component/WorksCard";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    position: "relative",
    padding: "100px 0",

    [theme.breakpoints.only("xs")]: {
      padding: "40px 0",
    },
    "& h1": {
      fontSize: "50px",
      lineHeight: "56px",
      color: "#01FBB4",
      textShadow: "0px 0px 8px #1EB808",
      [theme.breakpoints.down("md")]: {
        fontSize: "17px",
      },
      [theme.breakpoints.only("xs")]: {
        fontSize: "17px",
      },
    },
  },
  box: {
    padding: "15px",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    boxShadow: "0px 0px 53px rgba(0, 0, 0, 0.25)",
    backdropFilter: "blur(42px)",
    border: "1px solid #01FBB4",
    borderRadius: "5px",
  },
  Featuring: {
    display: "flex",
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
  top: {
    paddingTop: "20px",
    paddingBottom: "20px",
    [theme.breakpoints.only("xs")]: {
      paddingTop: "0px",
    },
    "& p": {
      maxWidth: "600px",
    },
  },
}));

const GameMap1 = [
  {
    image: "images/image 70.png",
    description:
      " Staked sNFT/$SHOE Holders - Earn profit-sharing from a Portion of transaction Fees +  NFT Minting Fees",
  },
  {
    image: "images/image 71.png",
    description:
      " Staked sNFT/$SHOE Holders - Earn profit-sharing from a Portion of transaction Fees +  NFT Minting Fees",
  },
  {
    image: "images/image 72.png",
    description:
      " Staked sNFT/$SHOE Holders - Earn profit-sharing from a Portion of transaction Fees +  NFT Minting Fees",
  },
  {
    image: "images/image 73.png",
    description:
      " Staked sNFT/$SHOE Holders - Earn profit-sharing from a Portion of transaction Fees +  NFT Minting Fees",
  },
  {
    image: "images/image 73.png",
    description:
      " Staked sNFT/$SHOE Holders - Earn profit-sharing from a Portion of transaction Fees +  NFT Minting Fees",
  },
  {
    image: "images/image 75.png",
    description:
      " Staked sNFT/$SHOE Holders - Earn profit-sharing from a Portion of transaction Fees +  NFT Minting Fees",
  },
];
export default function WORKS() {
  const classes = useStyles();

  return (
    <Box className={classes.mainbox}>
      <Container>
        <Box>
          <Box className={classes.Featuring}>
            <img src="images/Vector 83.png" className="icon1" />
            <Typography variant="h1">HOW ITS WORKS</Typography>
            <img src="images/Vector 80.png" className="icon2" />
          </Box>

          <Box className={classes.top} mt={2} mb={2} align="left">
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={7}>
          {GameMap1.map((data, i) => {
            return (
              <Grid item lg={4} sm={6} xs={12}>
                <Box key={i}>
                  <WorksCard data={data} type="timing" index={i} />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
