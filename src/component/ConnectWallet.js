import { Box, Typography, Button, List, IconButton } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import React, { useContext, useEffect } from "react";
import { SUPPORTED_WALLETS } from "src/connectors";
import { UserContext } from "src/context/User";
import { useWeb3React } from "@web3-react/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  mintBoxmodal: {
    top: "0px",
    color: "rgb(255, 255, 255)",
    right: "1px",
    zIndex: "999",
    position: "absolute",
    height: "50px",
    width: "50px",
    overflow: "hidden",
    borderBottomRightRadius: "0px",
    borderRadius: "0px",
    "&::before": {
      content: "' '",
      background: "rgba(255, 255, 255, 0.1)",
      height: "150%",
      width: "150%",
      position: "absolute",
      right: "-36px",
      top: "-41px",
      transform: "rotate(45deg)",
    },
    "&:hover": {
      backgroundColor: "transparent",
      background: "transparent !important",
    },
    "& svg": {
      position: "absolute",
      bottom: 23,
      right: 5,
      color: "#ffffff",
      fontSize: 18,
    },
  },
  metamaskhead: {
    width: "100%",
    cursor: "pointer",
    display: "flex",
    padding: "8px",
    background: "#000",
    marginTop: "24px !important",
    alignItems: "center",
    borderRadius: "14px",
    justifyContent: "center",
    marginLeft: "4px !important",
    border: "1px solid rgb(30, 184, 8)",
    "& h5": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "20px",
      textTransform: "capitalize",
      color: "#ffffff",
      marginLeft: "35px",
    },
    "&:hover": {
      background: "tranparent",
    },
  },
  border: {
    border: "1px solid #BEF71E",
    // width: "500px",
    background:
      "linear-gradient(158.52deg, rgba(255, 255, 255, 0.2) 16.41%, rgba(255, 255, 255, 0) 100%)",
    boxShadow: "0px 0px 53px rgb(0 0 0 / 25%)",
    backdropFilter: "blur(42px)",
    borderRadius: "5px",
  },
}));
const ConnectWallet = ({ onClose, open }) => {
  const classes = useStyles();
  const user = useContext(UserContext);
  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      onClose();
    }
  }, [account]);

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="xs"

      // disableBackdropClick={isUpdate}
      // disableEscapeKeyDown={isUpdate}
    >
      {/* <Dialog
      open={open}
      className="walletdailog"
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
    > */}

      <DialogTitle id="alert-dialog-title">
        <IconButton
          className={classes.mintBoxmodal}
          style={{}}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Box className={classes.border}>
          <Box align="center" mt={2}>
            <Typography variant="h2" style={{ color: "#fff" }}>
              Select a Wallet
            </Typography>
          </Box>

          <Box
            className="walletlist"
            align="center"
            style={{ padding: "20px" }}
          >
            {SUPPORTED_WALLETS.map((item, i) => {
              return (
                <Button
                  key={i}
                  className={classes.metamaskhead}
                  // className="ak"
                  onClick={() => {
                    localStorage.removeItem("walletName");
                    localStorage.setItem("walletName", item.name);
                    user.connectWallet(item.data);
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* <img
                  src="images/Metamask.png"
                  style={{ width: "31px", marginRight: "11px" }}
                /> */}
                    <Typography variant="h5"> {item.data.name}</Typography>
                  </Box>
                  <Box width="50px">
                    <img src={item.data.iconName} alt="" width="70%" />
                  </Box>
                </Button>
              );
            })}
          </Box>
        </Box>

        {/* <Box align="center" display="flex" style={{ justifyContent: "center" }}>
          <Button
            onClick={onClose}
            // className={classes.buttonbox}
            variant="contained"
            size="small"
            color="secondary"
            className={classes.button1}
          >
            Cancel
          </Button>
        </Box> */}
      </DialogTitle>
    </Dialog>
  );
};

export default ConnectWallet;
