import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  Button,
  TextField,
} from "@material-ui/core";
import QrcodeCard from "src/component/QrcodeCard";
import { makeStyles } from "@material-ui/styles";
import { BiCopy } from "react-icons/bi";
import { useWeb3React } from "@web3-react/core";
import { useHistory } from "react-router-dom";
import { UserContext } from "src/context/User";
import { sortAddress } from "src/utils";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: "black",
    background:
      "radial-gradient(46.99% 29.57% at 7.14% 81.61%, rgba(19, 114, 145, 0.5) 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(57.29% 31.76% at 91.96% 86.28%, rgba(30, 184, 8, 0.5) 0%, rgba(92, 45, 153, 0) 100%) , radial-gradient(33.82% 43.36% at 5.24% 52.09%, rgba(30, 94, 140, 0.5) 0%, rgba(0, 0, 0, 0) 100%) , radial-gradient(30.5% 34.87% at 88.84% 50.53%, rgba(30, 184, 8, 0.5) 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(22.52% 28.87% at 1.01% 18.2%, rgba(30, 94, 140, 0.5) 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(34.4% 22.43% at 89.46% 19.8%, rgba(30, 184, 8, 0.5) 0%, rgba(0, 0, 0, 0) 100%)",
    width: "100%",
    height: "auto",
    paddingBottom: "100px",
    position: "relative",
    padding: "130px 0",
  },
  qrcode: {
    padding: "10px",
    background: "#fff",
    borderRadius: "5px",
    "& img": {
      width: "100%",
    },
  },
  txt2: {
    borderRadius: "11px",
    display: "inline-block",
    backgroundColor: "#1EB808",
    border: "1px solid #1EB808",
    marginBottom: "30px",
    padding: "7px",
    "& .copyiconBox": {
      display: "flex",
      alignItems: "center",
      "& svg": {
        color: "#fff",
        cursor: "pointer",
      },
    },
    "& p": {
      fontWeight: "500",
    },
    "& svg": {
      marginLeft: "13px",
    },
  },
  butt: {
    fontSize: "24px",
  },
  claimed: {
    width: "250px",
    fontFamily: "'Saira Semi Condensed', sans-serif",
    fontSize: "24px",
  },
  txt: {
    paddingBottom: "30px",
    paddingTop: "20px",
    "& h5": {
      fontFamily: "'Saira Semi Condensed', sans-serif",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "30px",
      lineHeight: "47px",
      color: "#FFFFFF",
      textAlign: "center",
      [theme.breakpoints.only("xs")]: {
        fontSize: "20px",
        lineHeight: "30px",
      },
    },
  },
  ownedBox: {
    border: "1px solid #1eb808 !important",
    display: "flex",
    padding: "13px",
    borderRadius: "5px",
    justifyContent: "space-between",
    cursor: "pointer",
    "& h5": {
      fontFamily: "'Saira Semi Condensed', sans-serif",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "20px",
      color: "#FFFFFF",
    },
  },
}));

function Qrcode() {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);
  const { account } = useWeb3React();

  useEffect(() => {
    if (!account) {
      history.push();
    }
  }, [account]);

  return (
    <>
      <Box className={classes.background}>
        <Container>
          <Grid container spacing={4}>
            <Grid item lg={3} md={3} sm={3} xs={12}>
              <Box className={classes.qrcode}>
                <img
                  src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${account}&choe=UTF-8`}
                  alt=""
                />
              </Box>
            </Grid>

            <Grid item lg={9} md={9} sm={9} xs={12}>
              <Box className={classes.txt2}>
                <Box className="copyiconBox">
                  <Typography variant="body1">
                    {" "}
                    {sortAddress(account)}
                  </Typography>{" "}
                  <BiCopy />
                </Box>
              </Box>
              <Grid container spacing={4}>
                <Grid item lg={3} md={6} sm={6} xs={12}>
                  <Box className={classes.ownedBox}>
                    <Typography variant="h5">Owned NFTs</Typography>
                    <Typography variant="h5">{user?.balanceOfValue}</Typography>
                  </Box>
                </Grid>
                {/* <Grid item lg={3} md={6} sm={6} xs={12}>
                  <Box className={classes.ownedBox}>
                    <Typography variant='h5'>Claimed NFTs</Typography>
                    <Typography variant='h5'>1</Typography>
                  </Box>
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
          <Box className={classes.txt} mt={2}>
            <Typography variant="h5">
              All NFTs will be displayed once the admin stores their METADATA
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {user?.userNFTList.map((data, i) => {
              return (
                <Grid item lg={3} md={3} sm={6} xs={12} key={i}>
                  <Box key={i}>
                    <QrcodeCard data={data} type="timing" index={i} />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
export default Qrcode;
