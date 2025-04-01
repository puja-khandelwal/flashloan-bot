import React from "react";
import {
  Typography,
  Dialog,
  DialogContent,
  Box,
  IconButton,
  DialogActions,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const useStyles = makeStyles((theme) => ({
  suceesModalBox: {
    "& .payemntBox": {
      "& h2": {
        color: "rgba(61, 61, 61, 1)",
        fontSize: "34px",
        textAlign: "center",
        whiteSpace: "pre",
        lineHeight: "30px",
      },
      "& p": {
        color: "rgba(61, 61, 61, 1)",
        fontWeight: 400,
        textAlign: "center",
      },
      "& .logoBox": {
        "& img": {
          width: "100%",
          height: "50px",
          marginBottom: "24px",
        },
      },
    },
  },
}));
export default function SucessfullModal({
  open,
  handleClose,
  img,
  description,
  heading,
}) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
      }}
      fullWidth
      maxWidth="xs"
    >
      <IconButton
        onClick={handleClose}
        style={{
          height: "0px",
          position: "absolute",
          right: "10px",
          top: "17px",
          cursor: "pointer",
        }}
      >
        <IoClose color="primary" size="17px" />
      </IconButton>

      <DialogContent>
        <Box className={classes.suceesModalBox}>
          <Box className="payemntBox" align="center">
            <Box className="displayColumn">
              <Box my={3} align="center">
                <img
                  src={img}
                  alt="sucess"
                  style={{ width: "auto", maxWidth: "150px" }}
                />
              </Box>
              <Box mb={3}>
                <Typography variant="h2">{heading}</Typography>
              </Box>
              <Box mb={3}>
                <Typography variant="body1">{description}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginBottom: "16px" }}
          onClick={() => history.push("/auth/Login")}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
