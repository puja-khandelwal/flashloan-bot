import React, { useState, useEffect, useContext } from "react";
import { Box, Grid, Paper } from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import { useWeb3React } from "@web3-react/core";
import { useHistory } from "react-router-dom";
import { UserContext } from "src/context/User";
import WalletCrad from "src/component/WalletCrad";

const useStyles = makeStyles((theme) => ({
  background: {
    padding: "20px",
  },
  qrcode: {
    padding: "10px",
    background: "#fff",
    borderRadius: "5px",
    "& img": {
      width: "100%",
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

const userNFTList = [
  {
    name: "NFT 1",
    description: "Description of NFT 1",
    imageUrl: "url_of_image_for_NFT_1",
    owner: "0x123abc...",
  },
  {
    name: "NFT 2",
    description: "Description of NFT 2",
    imageUrl: "url_of_image_for_NFT_2",
    owner: "0x456def...",
  },
  // Add more NFT objects as needed
];

function Wallet() {
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
      <Paper elevation={2} className={classes.background}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <WalletCrad />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
export default Wallet;
