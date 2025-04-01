import React, { useContext, useEffect } from "react";
import {
  makeStyles,
  Button,
  Grid,
  Box,
  Typography,
  TextField,
  FormControl,
  Dialog,
  DialogContent,
  Paper,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { toast } from "react-toastify";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "../ButtonCircularProgress";
import { useWeb3React } from "@web3-react/core";
import { ACTIVE_NETWORK } from "src/constants";
import { sortAddress, swichNetworkHandler } from "src/utils";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import CopyToClipboard from "react-copy-to-clipboard";
import { IoCopyOutline } from "react-icons/io5";
const useStyles = makeStyles((theme) => ({
  dialogbox: {
    position: "relative",
    padding: "30px",
    "& .svg12": {
      position: "absolute",
      //   top: "5px",
      right: "5px",
      cursor: "copy",
      color: "#0c0d31",
    },
    "& .MuiOutlinedInput-root": {
      border: "1px solid rgba(8, 86, 204, 1)",
      height: "52px",
      justifyContent:"center",
    },
    "& .MuiInputBase-input": {
      width: "fit-content",
    },
    "& svg": {
      position: "absolute",
      //   top: "5px",
      right: "5px",
      cursor: "pointer",
      color: "#0c0d31",
    },
  },
  btnColor: {
    background: "red !important",
    border: "red !important",
    "&:hover": {
      background: "red !important",
      //   "& svg": {
      //     background: "red",
      //   },
    },
  },
}));

function WalletConnectModal(props) {
  const classes = useStyles();
  const { open, handleClose } = props;
  const user = useContext(UserContext); // onClick={user.connectWallet}
  const { activate, account, chainId, library } = useWeb3React();
  // useEffect(() => {
  //     if (!user.walletErr) {
  //         user.connectWallet()
  //     }
  // }, [])
  useEffect(() => {
    if (account) {
      //   handleClose();
    }
  }, [account]);
  console.log(
    chainId,
    "chainId----------- account---------------------account",
    account
  );
  return (
    <>
      <Dialog open={open} fullWidth maxWidth="sm">
        <Box className={classes.dialogbox}>
          <ClearIcon
            onClick={handleClose}
            style={{ right: "7px", top: "7px" }}
          />
          <DialogContent>
            <Grid
              container
              spacing={2}
              direction={"column"}
              //   style={{ border: "1px solid #fff" }}
            >
              {!user.walletErr && (
                <Grid xs={12} align="center">
                  <Box mb={2}>
                    <Typography variant="h3" style={{ color: "rgba(0, 0, 0, 1)" }}>
                    Request for  Wallet
                    </Typography>
                  </Box>
                </Grid>
              )}
              {!account && !user.isMetaMask && (
                <Grid xs={12} align="center">
                  <Box mb={2}>
                    <CircularProgress />
                  </Box>
                </Grid>
              )}
              {!account && user.isMetaMask && (
                <Grid xs={12} align="center">
                  <Box mb={2}>
                    You Don't have wallet.{" "}
                    <a
                      href="https://metamask.io/"
                      style={{ color: "#d3d6d899" }}
                      target="_blank"
                    >
                      Learn More
                    </a>
                  </Box>
                </Grid>
              )}
              <Box>
                {account && (
                  <Grid xs={12} align="center">
                    <Box my={2}>
                      <FormControl fullWidth>
                        <TextField
                          variant="outlined"
                          placeholder="0xdE41BD279c6AB6f81bafd87550dCBDCB39e0BeA3"
                          name="walletAddress"
                          value={account}
                          fullWidth="true"
                          size="small"
                          disabled
                          // onBlur={handleBlur}
                          // onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <CopyToClipboard text={account}>
                                  <IconButton
                                    onClick={() =>
                                      toast.info(`Wallet address copied`)
                                    }
                                  >
                                    <IoCopyOutline className="svg12" />
                                  </IconButton>
                                </CopyToClipboard>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                )}
                {user.wallectLoader && (
                  <>
                    <Grid xs={12} align="center">
                      <Box
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <ButtonCircularProgress />
                      </Box>
                    </Grid>
                    <Grid xs={12} align="center">
                      <Typography variant="body1">Connecting...</Typography>
                    </Grid>
                  </>
                )}
                {user.walletErr && (
                  <Grid xs={12} align="center">
                    <Box mb={2}>
                      <Typography variant="h6">Error connecting</Typography>
                    </Box>
                    <Typography variant="body1">
                      The connection attempt failed. Please click try again and
                      follow the steps to connect in your wallet.
                    </Typography>
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={user.connectWallet}
                      >
                        Try Again
                      </Button>
                    </Box>
                  </Grid>
                )}
                {account && chainId != ACTIVE_NETWORK && (
                  <Grid xs={12} align="center">
                    <Box
                      style={{
                        // textAlign: "start",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="body1"
                        aling="start"
                        style={{ color: "#0c0d31" }}
                      >
                        You are on wrong network
                      </Typography>
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        style={{ maxHeight: "31px" }}
                        className={classes.btnColor}
                        onClick={swichNetworkHandler}
                      >
                        <ReportProblemIcon /> Switch Network
                      </Button>
                      {/* <Typography variant="h3">{sortAddress(account)}</Typography> */}
                    </Box>
                  </Grid>
                )}
              </Box>
              <Grid xs={12} align="center">
                {/* <Box mt={2}>
                                <Button variant="contained" size="large" color="primary">
                                    Submit
                                </Button>
                            </Box> */}
              </Grid>
            </Grid>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
}

export default WalletConnectModal;
