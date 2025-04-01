import {
  Box,
  Button,
  FormHelperText,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";

import SucessfullModal from "src/component/SucessfullModal";
import { patchAPIHandler } from "src/config/service";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Timer from "src/component/Timer";

const useStyles = makeStyles((theme) => ({
  verifySection: {
    "& .verifyMainBox": {
      height: "100dvh",
      zIndex: "999",
      position: "relative",
      overflowY: "auto",
      "& p": {
        fontWeight: "400",
        color: "rgba(61, 61, 61, 1)",
      },
      "& h2": {
        color: "rgba(61, 61, 61, 1)",
        fontSize: "40px",
        textAlign: "center",
      },
      "& .verifyBox": {
        height: "initail",
        margin: "0px auto",
        maxWidth: "95%",
        width: "550px",
        maxHeight: "100%",
      },

      "& h6": {
        color: "rgba(8, 5, 21, 1)",
        fontWeight: 500,
      },
      "& .descriptionText": {
        "& p": {
          color: "rgba(61, 61, 61, 1)",
        },
        "& span": {
          fontWeight: 600,
          color: " rgba(255, 85, 0, 1)",
        },
      },
      "& .logoBox": {
        "& img": {
          width: "auto",
          height: "50px",
          marginBottom: "24px",
        },
      },
      "& input": {
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        fontSize: "20px",
        height: "50px !important",
        width: "50px !important",
        marginRight: "20px",
        background: "#FFF",
        background: "rgba(0, 0, 0, 0.02)",
        "@media(max-width:460px)": {
          marginRight: "5px",
          height: "45px !important",
          width: "45px !important",
        },
      },
      "& .otpBox": {
        "& p": {
          color: "rgba(220, 4, 4, 1)",
          fontWeight: 300,
          marginTop: "8px",
          textAlign: "end",
          marginRight: "48px",
          "@media(max-width:460px)": {
            marginRight: "20px",
          },
          "@media(max-width:380px)": {
            marginRight: "-10px",
          },
        },
      },
      "& .otpBox1": {
        "& p": {
          color: "rgba(220, 4, 4, 1)",
          fontWeight: 300,
          marginTop: "8px",
          textAlign: "end",
          marginRight: "20px",
          "@media(max-width:460px)": {
            marginRight: "20px",
          },
          "@media(max-width:380px)": {
            marginRight: "-10px",
          },
        },
      },
      "& .resendBox": {
        color: "rgba(43, 145, 239, 1)",
        fontWeight: 300,
      },
    },
  },
}));

export default function VerifyOtp({ type, handleClose, withdrawData }) {
  const history = useHistory();
  const classes = useStyles();
  const [otp, setOtp] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const location = useLocation();
  const [isUpdating, setIsUpdating] = useState(false);
  const [openSucessfullModal, setOpenSucessfullModal] = useState(false);
  const handleFormSubmit = async (values) => {
    try {
      setIsUpdating(true);
      const response = await patchAPIHandler({
        endPoint: "verifyOTP",
        dataToSend: {
          email: location?.state?.email,
          otp: otp,
        },
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        location?.state?.type === "FORGOT"
          ? history.push({
              pathname: "/Reset",
              state: { token: response?.data?.result?.token },
            })
          : history.push("/login");
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsUpdating(false);
    } catch (error) {
      setIsUpdating(false);
    }
  };
  return (
    <Box className={classes.verifySection}>
      <Box className="verifyMainBox displayCenter">
        <Box className="verifyBox">
          <Paper elevation={2}>
            <Box className="displayColumn" align="center">
              <Box className="logoBox" align="center">
                <img src="/images/emaillogo.png" alt="Logo" />
              </Box>
              <Typography variant="h2">OTP Verification</Typography>
              <Box className="displayCenter descriptionText" align="center">
                <Typography variant="body1" mt={2} textAlign="center">
                  {`Please enter the 6 digit verification code that was sent to
                  ${
                    location?.state && location?.state?.email
                  } . The code is valid for 1 minute.`}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box className="displayCenter" mt={3}>
                <OtpInput
                  className="otpInput"
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  autoFocus={false}
                  inputType="number"
                  renderInput={(props) => <input {...props} />}
                  secure
                />
              </Box>
              <Box className="displaySpacebetween">
                <FormHelperText error>
                  {isSubmit && otp.length !== 6 && "Please enter valid otp."}
                </FormHelperText>
                <Box style={{ width: "100%" }}>
                  <Timer emailData={location?.state?.email} />
                </Box>
              </Box>
            </Box>
            <Box mb={2} mt={3} className="displayCenter">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  setIsSubmit(true);
                  if (otp.length === 6) {
                    handleFormSubmit();
                    setIsSubmit(true);
                  }
                }}
                disabled={isUpdating}
              >
                Submit
                {isUpdating && <ButtonCircularProgress />}
              </Button>
            </Box>
          </Paper>
        </Box>
        {openSucessfullModal && (
          <SucessfullModal
            open={openSucessfullModal}
            img={"/images/successfull.png"}
            heading="Registration Confirmation!"
            description={`Thank you for choosing to join us. We're almost there. We will reach out to you as soon as your details have been verified.`}
            handleClose={() => {
              setOpenSucessfullModal(false);
              history.push("/login");
            }}
          />
        )}
      </Box>
      {/* {isVerifying && <PageLoader />} */}
    </Box>
  );
}
