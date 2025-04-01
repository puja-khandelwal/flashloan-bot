import React, { useEffect, useState } from "react";
import {
  Box,
  makeStyles,
  Typography,
  Paper,
  Button,
  Grid,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { getAPIHandler, postAPIHandler } from "src/config/service";
import axios from "axios";
import TwoFAVerifyModal from "src/component/TwoFAVerifyModal";
import PageLoading from "src/component/PageLoading";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  paperBox: {
    padding: "50px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px",
    },
  },
  googleAuth: {
    "& h5": {
      color: "rgba(61, 61, 61, 1)",
      fontWeight: "500",
      lineHeight: "26px",
      fontSize: "20px",
    },
    "& img": {
      width: "250px",
    },
  },
  googleAuthentication: {
    borderBottom: "1px solid #80808052",
    marginBottom: "16px",
  },
  textheadBox: {
    paddingBottom: "9px",
    borderBottom: "1px solid #80808052",
    "& h2": {
      fontSize: "40px",
      color: "rgb(243, 109, 54)",
    },
  },
  displaySpaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export default function GoogleAuthentication() {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  console.log("location==>>", location);
  const [openTwoFaModal, setOpenTwoFaModal] = useState(false);
  const [qrData, setQrData] = useState({});
  console.log("qrDataqrData==>>", qrData);
  const [isUpdating, setIsUpdating] = useState(false);
  const [otp, setOtp] = useState("");

  const verifyTwoFactorGoogleApi = async (values) => {
    try {
      setIsUpdating(true);
      const response = await postAPIHandler({
        endPoint: "verifyTwoFactorGoogle",
        dataToSend: {
          otp: otp,
        },
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        setOpenTwoFaModal(false);
        history.push("/two-factor-authentication");
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsUpdating(false);
    } catch (error) {
      setIsUpdating(false);
    }
  };

  return (
    <Paper elevation={2} className={classes.paperBox}>
      <Box className={classes.textheadBox} mb={3}>
        <Box className="displayStart">
          <img
            onClick={() => history.goBack()}
            src="/images/arrowback.svg"
            width="35px"
            style={{ cursor: "pointer" }}
            alt="Go Back"
          />
          &nbsp;&nbsp;
          <Typography variant="h2" style={{ color: "rgba(243, 109, 54, 1)" }}>
            Google Authentication
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} style={{ padding: "20px" }}>
            <Box className={classes.googleAuth}>
              <Typography variant="h5">
                Scan the QR code to enable Google Authentication.
              </Typography>
              <Box mt={2}>
                <img src={location?.state?.data?.url} />
              </Box>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setOpenTwoFaModal(true);
                  }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {openTwoFaModal && (
        <TwoFAVerifyModal
          open={openTwoFaModal}
          isLoading={isUpdating}
          handleClose={() => {
            setOpenTwoFaModal(false);
          }}
          title={"Authenticate"}
          desc={
            "Set up two-factor Authentication to be able to authorize with your email and enter verification code below to change your password ."
          }
          handleSubmit={(value) => {
            verifyTwoFactorGoogleApi(value);
          }}
          otp={otp}
          setOtp={setOtp}
        />
      )}
    </Paper>
  );
}
