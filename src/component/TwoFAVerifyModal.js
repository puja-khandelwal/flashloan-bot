import React, { useState } from "react";
import {
  Typography,
  Dialog,
  DialogContent,
  Button,
  Box,
  IconButton,
  makeStyles,
  FormHelperText,
} from "@material-ui/core";
import { AiOutlineClose } from "react-icons/ai";
import OtpInput from "react-otp-input";
import Timer from "./Timer";
import ButtonCircularProgress from "./ButtonCircularProgress";
import { useLocation, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  verifySection: {
    "& .verifyMainBox": {
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
        height: "45px !important",
        width: "45px !important",
        marginRight: "20px",
        background: "#FFF",
        background: "rgba(0, 0, 0, 0.02)",
        "@media(max-width:460px)": {
          marginRight: "5px",
          height: "36px !important",
          width: "36px !important",
        },
      },
      "& .resedButton": {
        marginLeft: "10px",
        "@media(max-width:460px)": {
          marginLeft: "20px",
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

export default function TwoFAVerifyModal({
  title,
  desc,
  isLoading,
  open,
  handleClose,
  handleSubmit,
  otp,
  setOtp,
}) {
  const classes = useStyles();
  const [isSubmit, setIsSubmit] = useState(false);
  const location = useLocation();
  const history = useHistory();
  console.log(">>>>>>>>>>>>>>>>>otp>>>", otp);
  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!isLoading) {
          handleClose();
        }
      }}
      fullWidth
      maxWidth="xs"
    >
      <DialogContent>
        <Box style={{ position: "absolute", top: "0px", right: "0px" }}>
          <IconButton onClick={handleClose}>
            <AiOutlineClose color="rgba(0, 0, 0, 0.3)" />
          </IconButton>
        </Box>

        <Box className={classes.verifySection}>
          <Box className="verifyMainBox displayCenter">
            <Box className="verifyBox">
              <Box className="displayColumn" align="center">
                <Box className="logoBox" align="center">
                  <img src="/images/lock.png" alt="Logo" />
                </Box>
                <Typography variant="h2">{title}</Typography>
                <Box className="displayCenter descriptionText" align="center">
                  <Typography variant="body1" mt={2} textAlign="center">
                    {desc}
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
                  <Box style={{ width: "100%" }} className="resedButton">
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
                      handleSubmit();
                      setIsSubmit(true);
                    }
                  }}
                  disabled={isLoading}
                >
                  Submit
                  {isLoading && <ButtonCircularProgress />}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
