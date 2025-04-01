import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  makeStyles,
  Typography,
  Paper,
  Switch,
  styled,
  Grid,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { postAPIHandler, putAPIHandler } from "src/config/service";
import { UserContext } from "src/context/User";
import TwoFAVerifyModal from "src/component/TwoFAVerifyModal";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  paperBox: {
    padding: "50px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px",
    },
  },
  twoFaAuth: {
    cursor: "pointer",
    "& h5": {
      color: "rgba(61, 61, 61, 1)",
      fontWeight: "500",
      lineHeight: "26px",
      fontSize: "20px",
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

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    color: "#f36d36 !important",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#0c4171" : "#0c4171",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "rgb(38 38 38 / 44%)",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function ChangePassword() {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const [checkGoogleActive, setCheckGoogleActive] = useState(false);
  const [checkEmailActive, setCheckEmailActive] = useState(false);
  const [enable2FAGoogleData, setEnable2FAGoogleDataData] = useState({});
  const [enable2FAEmailData, setEnable2FAEmailData] = useState({});
  console.log("enable2FAEmailData=>>", enable2FAEmailData?.emailotp2FA);
  const [isGoogleUpdating, setIsGoogleUpdating] = useState(false);
  const [isEmailUpdating, setIsEmailUpdating] = useState(false);
  const [openTwoFaModal, setOpenTwoFaModal] = useState(false);
  const [otp, setOtp] = useState("");
  console.log("otp==>>>", otp);
  const [isUpdating, setIsUpdating] = useState(false);

  const user = useContext(UserContext);

  const enable2FAGoogleApi = async (source) => {
    try {
      setEnable2FAGoogleDataData([]);
      setIsGoogleUpdating(true);

      const response = await postAPIHandler({
        endPoint: "enableEmail2FAGoogle",
        source: source,
      });

      if (response.data.responseCode === 200) {
        setEnable2FAGoogleDataData(response.data.result);

        history.push({
          pathname: "/google-authentication",
          state: { data: response.data.result },
        });
      } else {
        setEnable2FAGoogleDataData([]);
      }

      setIsGoogleUpdating(false);
    } catch (error) {
      setEnable2FAGoogleDataData([]);
      setIsGoogleUpdating(false);
    }
  };

  const enable2FAEmailApi = async (source) => {
    try {
      setIsEmailUpdating(true);

      const response = await postAPIHandler({
        endPoint: "editEmail2FA",
        source: source,
      });

      if (response.data.responseCode === 200) {
        setEnable2FAEmailData(response.data.result);
        setOpenTwoFaModal(true);
      } else {
        setEnable2FAEmailData([]);
      }

      setIsEmailUpdating(false);
    } catch (error) {
      setEnable2FAGoogleDataData([]);
      setIsEmailUpdating(false);
    }
  };

  const verifyTwoFactorEmailApi = async () => {
    try {
      setIsUpdating(true);
      const response = await putAPIHandler({
        endPoint: "verify2FAOTP",
        dataToSend: {
          otp: otp,
        },
      });
      console.log("response==>>", response);
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

  useEffect(() => {
    if (user.userData.google2FA) {
      setCheckGoogleActive(user.userData.google2FA ? true : false);
    }
    if (user.userData.email2FA) {
      setCheckEmailActive(user.userData.email2FA ? true : false);
    }
  }, [user]);
  console.log("google2FA==>>>", user.userData.google2FA);
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
            Two Factor Authentication
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} style={{ padding: "20px" }}>
            <Box className={classes.twoFaAuth}>
              <Box
                className={`${classes.googleAuthentication} ${classes.displaySpaceBetween}`}
                pb={2}
              >
                <Typography variant="h5">Google Authentication</Typography>
                <IOSSwitch
                  checked={checkGoogleActive}
                  onChange={() => enable2FAGoogleApi()}
                />
              </Box>
              <Box className={`displaySpaceBetween`}>
                <Typography variant="h5">Email Authentication</Typography>
                <IOSSwitch
                  checked={checkEmailActive}
                  onChange={() => enable2FAEmailApi()}
                />
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
          handleSubmit={() => {
            verifyTwoFactorEmailApi();
          }}
          otp={otp}
          setOtp={setOtp}
        />
      )}
    </Paper>
  );
}
