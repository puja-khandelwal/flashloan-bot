import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";
import * as yep from "yup";
import React, { useState } from "react";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { toast } from "react-toastify";
import { postAPIHandler } from "src/config/service";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import PageLoading from "src/component/PageLoading";
const useStyles = makeStyles((theme) => ({
  signupmainBox: {
    "& .signUpMainBox": {
      height: "100dvh",
      position: "relative",
      zIndex: "9",
      overflowY: "auto",
      "& p": {
        fontWeight: "400",
        color: "rgba(61, 61, 61, 1)",
      },
      "& .MuiFormControl-fullWidth": {
        marginTop: "8px",
      },
      "& svg": {
        color: "rgba(61, 61, 61, 1)",
        paddingRight: "15px",
      },
      "& h2": {
        color: "rgba(243, 109, 54, 1)",
        fontSize: "40px",
      },
      "& label": {
        color: "rgba(61, 61, 61, 1)",
      },
      "& .signUpBox": {
        height: "initail",
        margin: "15px auto",
        maxWidth: "95%",
        width: "900px",
        maxHeight: "100%",
      },
      "& .signUpPaper": {
        margin: "100px 0px ",
      },
      "& h6": {
        color: "rgba(61, 61, 61, 1)",
        fontWeight: "500",
        fontSize: "16px",
      },
      "& .descriptionText": {
        "& p": {
          color: "rgba(61, 61, 61, 1)",
        },
        "& span": {
          fontWeight: 600,
          color: " rgba(65, 22, 67, 1)",
        },
      },
      "& .mainTextBox1": {
        "& .MuiIconButton-label": {
          color: "rgba(243, 109, 54, 1)",
        },
        "& svg": {
          color: "rgba(243, 109, 54, 1)",
          paddingRight: "0px",
        },
      },
      "& .agreeText": {
        "& p": {
          color: "rgba(61, 61, 61, 1)",

          [theme.breakpoints.down("sm")]: {
            fontSize: "12px !important",
            marginLeft: "0px",
            lineHeight: "16px",
          },
        },
        "& span": {
          color: "rgba(65, 22, 67, 1)",
          cursor: "pointer",
        },
      },
    },
    "& .react-tel-input .flag-dropdown.open .selected-flag": {
      borderRadius: "10px 0 0 10px",
      width: "41px",
      height: "103%",
      borderRadius: "14px 82px 171px 20px !important",
    },
    "& .react-tel-input .form-control": {
      width: "100%",
      height: "50px",
      borderRadius: "23px 10px 10px 30px",
      background: "#E7E7E7 !important",
      color: "rgba(61, 61, 61, 1)",
      border: "1px solid transparent",
    },
    "& .react-tel-input .flag-dropdown": {
      borderRadius: "10px 0 0 10px",
    },
    "& .react-tel-input .selected-flag": {
      borderRadius: "10px 0 0 10px",
    },
    "& .react-tel-input .flag-dropdown.open": {
      borderRadius: "10px 0 0 10px",
    },
  },
}));
export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  console.log("isChecked==>>", isChecked);
  const initialValues = {
    fullName: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
    userName: "",
    phone: "",
    countryCode: "",
  };
  const formValidationSchema = yep.object().shape({
    fullName: yep
      .string()
      .required("Full name is required.")
      .max(30, "Should not exceeds 30 characters.")
      .matches(
        /^[a-zA-Z]+(([',. -][a-zA-Z])?[a-zA-Z]*)*$/g,
        "Please enter a valid name."
      ),
    email: yep
      .string()
      .email("Please enter your valid email address.")
      .max(256, "Email should not exceed 256 characters.")
      .required("Email is required.")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter valid email."
      ),
    newPassword: yep
      .string()
      .trim()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,}$/,
        "Password must contain 8 characters, one uppercase, one lowercase, one number and one special case character."
      )
      .required("Please enter a new password.")
      .min(8, "The new password must be at least 8 characters long.")
      .max(20, "The new password cannot exceed 20 characters."),
    userName: yep
      .string()
      .trim()
      .min(2, "Please enter atleast 2 characters.")
      .max(60, "You can enter only 60 characters.")
      .required("Username is required.")
      .matches(/^[a-zA-Z0-9._-]{3,16}$/, "Please enter valid username."),
    confirmPassword: yep
      .string()
      .required("Please enter the confirmation password.")
      .oneOf([yep.ref("newPassword"), null], "Passwords Doesn't match."),
    phone: yep
      .string()
      .required("Mobile number is required.")
      .max(13, "Enter a valid mobile number.")
      .min(7, "Must be only 7 digits.")
      .test(
        "notAllRepeatedDigits",
        "Phone number cannot have all repeated digits.",
        (value) => {
          const numericValue = value?.replace(/[^0-9]/g, "");
          return !/(\d)\1{6,}/.test(numericValue);
        }
      ),
  });

  const handleFormSubmit = async (values) => {
    try {
      setIsUpdating(true);
      const response = await postAPIHandler({
        endPoint: "signup",
        dataToSend: {
          fullName: values.fullName,
          email: values.email,
          mobileNumber: values.phone.toString(),
          password: values.newPassword,
          confirmPassword: values.confirmPassword,
          userName: values.userName,
          countryCode: values.countryCode.toString(),
        },
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        history.push({
          pathname: "/Verify-Otp",
          state: { email: values.email, type: "SIGNUP" },
        });
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsUpdating(false);
    } catch (error) {
      setIsUpdating(false);
    }
  };

  return (
    <Box className={classes.signupmainBox}>
      <Box className="signUpMainBox displayCenter">
        <Box className="signUpBox">
          <Paper elevation={2} className="signUpPaper">
            <Box className="displayColumn" align="center">
              <Typography variant="h2">Sign Up</Typography>
              <Box className="displayCenter descriptionText" mb={3}>
                <Typography variant="body1" mt={1}>
                  Already have an account?
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push("/login")}
                  >
                    &nbsp;Login
                  </span>
                </Typography>
              </Box>
            </Box>
            <Formik
              initialValues={initialValues}
              validationSchema={formValidationSchema}
              onSubmit={(values) => handleFormSubmit(values)}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
                setFieldValue,
                setFieldError,
              }) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box className="mainTextBox">
                        <label>Full Name</label>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder="Enter Full Name"
                          type="text"
                          name="fullName"
                          value={values.fullName}
                          error={Boolean(touched.fullName && errors.fullName)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <FormHelperText error className="errorMessage">
                          {touched.fullName && errors.fullName}
                        </FormHelperText>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box className="mainTextBox">
                        <label>Username</label>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder="Enter username"
                          name="userName"
                          type="text"
                          value={values.userName}
                          error={Boolean(touched.userName && errors.userName)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <FormHelperText error className="errorMessage">
                          {touched.userName && errors.userName}
                        </FormHelperText>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box className="mainTextBox">
                        <label>Email</label>
                        <TextField
                          fullWidth
                          placeholder="Enter email address"
                          type="email"
                          name="email"
                          variant="outlined"
                          value={values.email}
                          error={Boolean(touched.email && errors.email)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <FormHelperText error className="errorMessage">
                          {touched.email && errors.email}
                        </FormHelperText>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box className="mainTextBox">
                        <Box mb={1}>
                          <label>Mobile Number</label>
                        </Box>

                        <PhoneInput
                          country={"in"}
                          name="phone"
                          variant="outlined"
                          type="text"
                          fullWidth
                          value={values.phone}
                          error={Boolean(touched.phone && errors.phone)}
                          onBlur={handleBlur}
                          onChange={(phone, e) => {
                            setFieldValue("phone", phone);
                            setFieldValue("countryCode", e.dialCode);
                          }}
                        />
                        <FormHelperText error className="errorMessage">
                          {touched.phone && errors.phone}
                        </FormHelperText>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box className="mainTextBox">
                        <label>Create Password</label>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder="Create your password"
                          type={showPassword ? "text" : "password"}
                          name="newPassword"
                          value={values.newPassword}
                          error={Boolean(
                            touched.newPassword && errors.newPassword
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  style={{ padding: "1px" }}
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <HiEye className={"iconColor"} />
                                  ) : (
                                    <HiEyeOff className={"iconColor"} />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <FormHelperText error className="errorMessage">
                          {touched.newPassword && errors.newPassword}
                        </FormHelperText>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box className="mainTextBox">
                        <label>Confirm Password</label>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder="Confirm your password"
                          type={showPassword1 ? "text" : "password"}
                          name="confirmPassword"
                          value={values.confirmPassword}
                          error={Boolean(
                            touched.confirmPassword && errors.confirmPassword
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  style={{ padding: "1px" }}
                                  onClick={() =>
                                    setShowPassword1(!showPassword1)
                                  }
                                  edge="end"
                                >
                                  {showPassword1 ? (
                                    <HiEye className={"iconColor"} />
                                  ) : (
                                    <HiEyeOff className={"iconColor"} />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <FormHelperText error className="errorMessage">
                          {touched.confirmPassword && errors.confirmPassword}
                        </FormHelperText>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box className="displayStart mainTextBox1" mt={2} mb={2}>
                    <Checkbox
                      name="checkbox"
                      onChange={(e) => {
                        setIsChecked(e.target.checked);
                      }}
                      checked={isChecked}
                    />
                    <Box className="agreeText">
                      <Typography variant="body1">
                        I agree to the
                        <span
                          onClick={() => {
                            window.open("/static/term-condition");
                          }}
                        >
                          &nbsp;Terms & Conditions&nbsp;
                        </span>
                        and
                        <span
                          onClick={() => {
                            window.open("/static/privacy-policy");
                          }}
                        >
                          &nbsp;Privacy Policy.
                        </span>
                      </Typography>
                    </Box>
                  </Box>
                  <Box mb={2}>
                    <Container maxWidth="sm">
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        disabled={!isChecked || isUpdating}
                      >
                        Sign Up
                        {isUpdating && <ButtonCircularProgress />}
                      </Button>
                    </Container>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        </Box>
      </Box>
      {isUpdating && <PageLoading />}
    </Box>
  );
}
