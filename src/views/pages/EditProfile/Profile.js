import React, { useContext, useState } from "react";
import {
  Grid,
  Box,
  Button,
  FormControl,
  makeStyles,
  Paper,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { UserContext } from "src/context/User";
import { IoSettingsSharp } from "react-icons/io5";

const useStyles = makeStyles((theme) => ({
  uploadProfile: {
    width: "150px",
    border: "1px solid rgb(8, 86, 204)",
    height: "150px",
    position: "relative",
    background: "rgb(8, 86, 204)",
    borderRadius: "100px",
    marginTop: "-91px",
    [theme.breakpoints.down("xs")]: {
      width: "100px",
      height: "100px",
    },
    "& .camerChooseButton": {
      position: "absolute",
      bottom: "0px",
      right: "-10px",
    },
  },

  mainprofileBox: {
    padding: "0px 0",
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      padding: "5px 0",
    },
    "& .formInnerBox": {
      marginTop: "40px",
    },
    "& .coverbackgroundImage": {
      top: "0px",
      width: "100%",
      height: "250px",
      position: "relative",
      objectFit: "cover !important",
      borderRadius: "10px",
      backgroundSize: "cover !important",
      backgroundRepeat: "no-repeat !important",
      background: "#fff",
      [theme.breakpoints.down("xs")]: {
        height: "130px",
      },
    },

    "& label": {
      color: "rgba(61, 61, 61, 1)",
    },
    "& .changepasswordbutton": {
      marginTop: "-50px",
      [theme.breakpoints.down("xs")]: {
        marginTop: "40px",
      },
      "& .changeBtn": {
        background: "rgba(65, 22, 67, 1)",
        color: "#fff",
        borderRadius: "30px",
        padding: "10px 20px 10px 20px",
        fontSize: "18px",
      },
    },
  },
  PageHeading: {
    paddingBottom: "20px",
    lineHeight: "140%",
    fontSize: "24px",
  },
  editsection: {
    marginTop: "10px",
    "& h2": {
      color: "#14133b",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "33px",
      lineHeight: "130%",
      fontFamily: "'Mulish', sans-serif",
    },
    "& p": {
      color: "#14133b",
      fontWeight: "400",
    },
    "& h3": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#14133b",
    },
  },
  inputfield: {
    "& label": {
      color: "#14133b",
      marginTop: "22px",
      fontSize: "14px",
    },
  },
  imagefiled: {
    marginTop: "-82px",
    position: "relative",
    zIndex: "9",
    "& label": {
      color: "#14133b",
    },
    "& small": {},
  },
  inputsection: {
    color: "#52565c",
    cursor: "text",
    position: "relative",
    fontSize: "1rem",
    boxSizing: "border-box",
    fontWeight: "400",
    lineHeight: "1.1876em",
    paddingTop: "10px",
    "& label": {
      color: "rgba(61, 61, 61, 1)",
    },
    "& .formClass": {
      marginTop: "40px",
    },
  },
  message: { color: "#14133b" },
  colorbox: {
    boxShadow: "0 0 40px 0 rgb(94 92 154 / 6%)",
    position: "relative",
    backgroundColor: "#fff",

    borderRadius: "10px",
    height: "auto",
    // width: "100%",
    padding: "20px",
    "& label": {
      color: "#14133b",
    },
  },
  paperBox: {
    padding: "20px",
    position: "relative",
    marginTop: "-4px",
    borderRadius: "0px 0 10px 10px !important",
    "& .mainUploadProfile": {
      marginTop: "-100px",
      position: "relative",
      zIndex: "999",
    },
  },
  profileUpload: {
    marginTop: "-76px",
    position: "relative",
    zIndex: "999",
    "& img": {
      height: "100px",
      width: "100px",
      borderRadius: "50%",
      objectFit: "cover",
    },
  },
  colorbox1: {
    // width: "100%",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
    "& label": {
      color: "#14133b",
    },
    "& .camerChooseButton": {
      position: "absolute",
      bottom: "0px",
      right: "-10px",
    },
  },
  coverImg: {
    overflow: "hidden",
    // background: 'rgba(0,0,0,0.7)',
    position: "relative",
    backgroundPosition: "center !important",
    backgroundRepeat: " no-repeat !important",
    backgroundSize: "100% !important",
    height: "86px",
    borderRadius: "10px",
    width: "300px",

    "& img": {
      height: "auto",
      width: "100%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  box1: {
    background: theme.palette.primary.main,
    border: "1px solid #898989",
    height: "250px",
    borderRadius: "10px",
    width: "100%",
    overflow: "hidden",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const user = useContext(UserContext);
  console.log("useruser==>>>", user?.userData);
  const history = useHistory();

  return (
    <Box className={classes.mainprofileBox}>
      <Box>
        <img
          className="coverbackgroundImage"
          src={
            user.userData?.coverPic
              ? user.userData?.coverPic
              : "/images/profile_banner.svg"
          }
          alt="Default Image"
        />
      </Box>
      <Paper elevation={2} className={classes.paperBox}>
        <Box mainUploadProfile>
          <Box className={classes.profileUpload}>
            <img
              src={
                user.userData?.profilePic
                  ? user.userData?.profilePic
                  : "/images/profile_banner.svg"
              }
              alt=""
            />
          </Box>
        </Box>
        {/* <Box className="changepasswordbutton" align="right">
          <Button
            className="changeBtn"
            variant="contained"
            startIcon={<IoSettingsSharp />}
            onClick={() => history.push("/change-password")}
          >
            Change Password
          </Button>
        </Box> */}
        <Box mb={2} className="formInnerBox">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} className={classes.editsection}>
              <label>First Name</label>
              <FormControl fullWidth className={classes.inputsection}>
                <TextField
                  name="firstName"
                  placeholder="Enter your first name"
                  variant="outlined"
                  value={user?.userData?.firstName}
                  disabled
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={6} className={classes.editsection}>
              <label>Last name</label>
              <FormControl fullWidth className={classes.inputsection}>
                <TextField
                  name="lastName"
                  placeholder="Enter your last name"
                  variant="outlined"
                  value={user?.userData?.lastName}
                  disabled
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={6} className={classes.editsection}>
              <label>Username</label>
              <FormControl fullWidth className={classes.inputsection}>
                <TextField
                  placeholder="Enter your username"
                  name="userName"
                  variant="outlined"
                  value={user?.userData?.userName}
                  disabled
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={6} className={classes.editsection}>
              <label>Email Address </label>
              <FormControl fullWidth className={classes.inputsection}>
                <TextField
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  variant="outlined"
                  value={user?.userData?.email}
                  disabled
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} className={classes.editsection}>
              <label>Mobile Number</label>
              <FormControl fullWidth className={classes.inputsection}>
                <TextField
                  placeholder="Enter your number"
                  name="mobileNumber"
                  variant="outlined"
                  value={user?.userData?.mobileNumber}
                  disabled
                />
              </FormControl>
            </Grid>
          </Grid>

          <Box className={classes.inputfield}>
            <Box align="left" mt={3}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                style={{ minWidth: "140px" }}
                type="submit"
                // onClick={() => history.push("/edit-profile")}
              >
                Back
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
