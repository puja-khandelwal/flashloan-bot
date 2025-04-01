import React, { useContext } from "react";
import {
  makeStyles,
  Button,
  Grid,
  Box,
  Typography,
  TextField,
  FormControl,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { UserContext } from "src/context/User";
import { useWeb3React } from "@web3-react/core";

const useStyles = makeStyles((theme) => ({
  dialogbox: {
    position: "relative",
    padding: "30px",
    "& svg": {
      position: "absolute",
      top: "5px",
      right: "5px",
      cursor: "pointer",
      color: "#14133b",
    },
  },
}));

function ConnectWalletModal(props) {
  const user = useContext(UserContext);
  const { activate, account, chainId, library } = useWeb3React();

  // console.log("user----", user);
  const classes = useStyles();
  const { CloseConnectWallet } = props;
  return (
    <>
      <Box className={classes.dialogbox}>
        <ClearIcon onClick={CloseConnectWallet} />
        <Grid container spacing={2} direction={"column"}>
          <Grid xs={12} align="center">
            <Box mb={2}>
              <Typography variant="h6" style={{color:"#14133b"}}>Request for Wallet</Typography>
            </Box>
          </Grid>
          <Grid xs={12} align="center">
            <Box my={2}>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  placeholder="0xdE41BD279c6AB6f81bafd87550dCBDCB39e0BeA3"
                  name="walletAddress"
                  // value={values.walletAddress}
                  fullWidth="true"
                  size="small"
                  // onBlur={handleBlur}
                  // onChange={handleChange}
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid xs={12} align="center">
            <Box mt={2}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => {
                  user.connectWallet();
                  if (account) {
                    CloseConnectWallet();
                  }
                }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ConnectWalletModal;
