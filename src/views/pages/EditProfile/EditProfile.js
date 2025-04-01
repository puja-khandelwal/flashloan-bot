import React, { useContext, useState } from "react";
import {
  Grid,
  Box,
  Button,
  FormControl,
  makeStyles,
  FormHelperText,
  Paper,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import ApiConfig from "src/config/APICongig";
import axios from "axios";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { IoSettingsSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  profileSection: {
    width: "150px",
    border: "1px solid rgb(8, 86, 204)",
    height: "150px",
    position: "relative",
    background: "rgb(8, 86, 204)",
    borderRadius: "100px",
    // marginTop: "-91px",
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

  FAQ: {
    padding: "0px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "5px 0",
    },
    "& label": {
      color: "rgba(61, 61, 61, 1)",
    },
    "& .changepasswordbutton": {
      marginTop: "-70px",
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
    "& .editmainBox": {
      width: "100%",
      borderRadius: "20px",
      height: "250px",
      "& .editBanner": {
        position: "relative",
        top: "0px",
        borderRadius: "10px",
        width: "100%",
        height: "250px",
        backgroundSize: "cover !important",
        backgroundRepeat: "no-repeat !important",
        objectFit: "cover !important",
      },

      "& .cameraButtonImg": {
        width: "150px",
        border: "1px solid rgb(8, 86, 204)",
        height: "150px",
        position: "relative",
        background: "rgb(8, 86, 204)",
        borderRadius: "100px",
      },
      "& .buttonBox": {
        top: "21%",
        right: "12px",
        position: "absolute",
        zIndex: "999",
        [theme.breakpoints.down("xs")]: {
          top: "18%",
        },
      },
    },
    "& .buttonNotAllow": {
      cursor: "not-allowed",
      background: "#0f212e !important",
      border: "#0f212e",
    },
  },
  PageHeading: {
    paddingBottom: "20px",
    lineHeight: "140%",
    fontSize: "24px",
  },
  editsection: {
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
export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (err) {
    console.log("Error: ", err);
  };
};

export default function EditPerofile() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [coverImage, setCoverImage] = useState("");
  const [coverImage64, setCoverImage64] = useState(
    user?.userData?.coverPic ? user?.userData?.coverPic : ""
  );
  const [errMessage, setImgError] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [profileImage64, setProfileImage64] = useState(
    user?.userData?.profilePic ? user?.userData?.profilePic : ""
  );
  const history = useHistory();
  const [loader1, setLoader1] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const formValidationSchema = yep.object().shape({
    firstName: yep
      .string("Enter valid name")
      .required("First name is required  ")
      .strict(true)
      .nullable()
      .trim()
      .min(4, "Your name should be atleast 4 characters long")
      .max(30, "Your name should not be more than 30 characters"),
    lastName: yep
      .string("Enter valid name")
      .required("First name is required  ")
      .strict(true)
      .nullable()
      .trim()
      .min(4, "Your name should be atleast 4 characters long")
      .max(30, "Your name should not be more than 30 characters"),

    userName: yep
      .string("Enter valid user name")
      .required("User name is required  ")
      .strict(true)
      .nullable()
      .trim()
      .min(4, "Your username should be atleast 4 characters long")
      .max(30, "Your username should not be more than 30 characters"),

    email: yep
      .string("require password")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Must be a valid email."
      )
      .required("Email is required"),
  });

  return (
    <>
      <Box className={classes.FAQ}>
        {user?.userData && (
          <>
            <Box className="editmainBox">
              <Box>
                {coverImage64 ? (
                  <img className="editBanner" src={coverImage64} alt="" />
                ) : (
                  <img
                    className="editBanner"
                    src="/images/editbanner.png" // Provide the path to your default image
                    alt="Default Image"
                  />
                )}
              </Box>

              <Box className="buttonBox">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file-cover"
                  multiple
                  name="coverPic"
                  // value={values.profilePic}
                  type="file"
                  onChange={(e) => {
                    setCoverImage(URL.createObjectURL(e.target.files[0]));
                    getBase64(e.target.files[0], (result) => {
                      setCoverImage64(result);
                    });
                  }}
                />
                {loader1 ? (
                  <Button
                    component="span"
                    className={
                      loader1 ? "buttonNotAllow" : " cammerbannerButton"
                    }
                  >
                    <img
                      src="/images/editprofile.svg"
                      className="efitIconsvg"
                    />
                  </Button>
                ) : (
                  <label htmlFor="raised-button-file-cover">
                    <Button
                      component="span"
                      className={loader1 ? "buttonNotAllow" : ""}
                    >
                      <img
                        src="/images/editprofile.svg"
                        className="efitIconsvg"
                      />
                    </Button>
                  </label>
                )}
                {errMessage && (
                  <FormHelperText style={{ color: "red" }}>
                    Height and Width must be 400*1400
                  </FormHelperText>
                )}
                {coverImage64 == "" && isSubmit && (
                  <FormHelperText style={{ color: "red" }}>
                    Cover image is required
                  </FormHelperText>
                )}
              </Box>
            </Box>
            <Paper elevation={2} className={classes.paperBox}>
              <Box className="editcovermainBox">
                <Box className={classes.profileSection} mt={0.5}>
                  {profileImage64 && (
                    <img
                      className={classes.profileSection}
                      src={profileImage64}
                      alt=""
                    />
                  )}

                  <Box align="left" mt={1} className="camerChooseButton">
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="raised-button-file-profile"
                      multiple
                      name="profilePic"
                      // value={profileImage64}
                      type="file"
                      onChange={(e) => {
                        setProfileImage(URL.createObjectURL(e.target.files[0]));
                        getBase64(e.target.files[0], (result) => {
                          setProfileImage64(result);
                        });
                      }}
                    />
                    {loader1 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        className={
                          loader1 ? "buttonNotAllow" : "cameraButtonImg"
                        }
                      >
                        <img
                          src="/images/editprofile.svg"
                          className="efitIconsvg"
                        />
                      </Button>
                    ) : (
                      <label htmlFor="raised-button-file-profile">
                        <Button
                          component="span"
                          className={
                            loader1 ? "buttonNotAllow" : "cameraButtonImg"
                          }
                        >
                          <img
                            src="/images/editprofile.svg"
                            className="efitIconsvg"
                          />
                        </Button>
                      </label>
                    )}
                    {profileImage64 == "" && isSubmit && (
                      <FormHelperText style={{ color: "red" }}>
                        Profile image is required
                      </FormHelperText>
                    )}
                  </Box>
                </Box>
              </Box>

              <Box className="changepasswordbutton" align="right">
                <Button
                  className="changeBtn"
                  variant="contained"
                  startIcon={<IoSettingsSharp />}
                  onClick={() => history.push("/change-password")}
                >
                  Change Password
                </Button>
              </Box>

              <Box mb={2}>
                <Formik
                  initialValues={{
                    firstName: user?.userData?.firstName
                      ? user?.userData?.firstName
                      : "",

                    lastName: user?.userData?.lastName
                      ? user?.userData?.lastName
                      : "",

                    userName: user?.userData?.userName
                      ? user?.userData?.userName
                      : "",
                    email: user?.userData?.email ? user?.userData?.email : "",
                    coverPic: user?.userData?.coverPic
                      ? user?.userData?.coverPic
                      : "",
                    profilePic: user?.userData?.profilePic
                      ? user?.userData?.profilePic
                      : "",
                    mobileNumber: user?.userData?.mobileNumber
                      ? user?.userData?.mobileNumber
                      : "",
                  }}
                  initialStatus={{
                    success: false,
                    successMsg: "",
                  }}
                  validationSchema={formValidationSchema}
                  onSubmit={async ({
                    firstName,
                    lastName,
                    userName,
                    email,
                    name,
                    mobileNumber,
                  }) => {
                    setIsSubmit(true);
                    if (profileImage64 != "" && coverImage64 != "") {
                      setIsSubmit(false);
                      try {
                        setLoader1(true);
                        const response = await axios({
                          method: "PUT",
                          url: ApiConfig.updateProfile,
                          headers: {
                            token: window.sessionStorage.getItem("token"),
                          },
                          data: {
                            firstName: firstName,
                            lastName: lastName,
                            userName: userName,
                            email: email,
                            mobileNumber: mobileNumber,
                            coverPic: coverImage64,
                            profilePic: profileImage64,
                          },
                        });

                        if (response.data.responseCode === 200) {
                          toast.success(response.data.responseMessage);
                          history.push("/dashboard");
                          user.getProfileHandler(
                            window.sessionStorage.getItem("token")
                          );
                        } else {
                          toast.success(response.data.response_message);
                        }
                        setLoader1(false);
                      } catch (err) {
                        toast.error(err.response.data.responseMessage);
                        console.error(err.response);
                        setLoader1(false);
                      }
                    }
                  }}
                >
                  {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    touched,
                    values,
                    setFieldValue,
                  }) => (
                    <Form
                      onSubmit={handleSubmit}
                      className="formClass"
                      style={{ marginTop: "60px" }}
                    >
                      <Grid container spacing={2}>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          className={classes.editsection}
                        >
                          <label>First Name</label>
                          <FormControl
                            fullWidth
                            className={classes.inputsection}
                          >
                            <TextField
                              name="firstName"
                              value={values.firstName}
                              placeholder="Enter your first name"
                              error={Boolean(
                                touched.firstName && errors.firstName
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              variant="outlined"
                            />
                            <FormHelperText
                              error
                              style={{ paddingBottom: "15px" }}
                            >
                              {touched.firstName && errors.firstName}
                            </FormHelperText>
                          </FormControl>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          className={classes.editsection}
                        >
                          <label>Last name</label>
                          <FormControl
                            fullWidth
                            className={classes.inputsection}
                          >
                            <TextField
                              name="lastName"
                              value={values.lastName}
                              placeholder="Enter your last name"
                              error={Boolean(
                                touched.lastName && errors.lastName
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              variant="outlined"
                            />
                            <FormHelperText
                              error
                              style={{ paddingBottom: "15px" }}
                            >
                              {touched.lastName && errors.lastName}
                            </FormHelperText>
                          </FormControl>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          className={classes.editsection}
                        >
                          <label>Username</label>
                          <FormControl
                            fullWidth
                            className={classes.inputsection}
                          >
                            <TextField
                              placeholder="Enter your username"
                              name="userName"
                              value={values.userName}
                              error={Boolean(
                                touched.userName && errors.userName
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              variant="outlined"
                            />
                            <FormHelperText
                              error
                              style={{ paddingBottom: "15px" }}
                            >
                              {touched.userName && errors.userName}
                            </FormHelperText>
                          </FormControl>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          className={classes.editsection}
                        >
                          <label>Email Address </label>
                          <FormControl
                            fullWidth
                            className={classes.inputsection}
                          >
                            <TextField
                              placeholder="Enter your email"
                              type="email"
                              name="email"
                              value={values.email}
                              error={Boolean(touched.email && errors.email)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              variant="outlined"
                            />
                            <FormHelperText
                              error
                              style={{ paddingBottom: "15px" }}
                            >
                              {touched.email && errors.email}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          className={classes.editsection}
                        >
                          <label>Mobile Number</label>
                          <FormControl
                            fullWidth
                            className={classes.inputsection}
                          >
                            <TextField
                              placeholder="Enter your number"
                              name="mobileNumber"
                              multiline
                              rows={4}
                              value={values.mobileNumber}
                              error={Boolean(
                                touched.mobileNumber && errors.mobileNumber
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              inputProps={{
                                maxLength: 255,
                              }}
                              variant="outlined"
                            />
                            <FormHelperText
                              error
                              style={{ paddingBottom: "15px" }}
                            >
                              {touched.mobileNumber && errors.mobileNumber}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Box className={classes.inputfield}>
                        <Box align="left" mt={1}>
                          {loader1 ? (
                            <Button
                              variant="contained"
                              size="large"
                              color="primary"
                              // type="submit"
                              // type= "submit"
                              // disabled={loader1}
                              className={loader1 ? "buttonNotAllow" : ""}
                            >
                              UPDATE PROFILE
                              {loader1 && <ButtonCircularProgress />}
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              size="large"
                              color="primary"
                              // type="submit"
                              style={{ minWidth: "100px" }}
                              type="submit"
                              // disabled={loader1}
                              className={loader1 ? "buttonNotAllow" : ""}
                            >
                              Edit
                              {loader1 && <ButtonCircularProgress />}
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </Form>
                  )}
                </Formik>

                {/* <Grid item xs={12} sm={12} md={1}></Grid> */}
              </Box>
            </Paper>
          </>
        )}
      </Box>
    </>
  );
}
