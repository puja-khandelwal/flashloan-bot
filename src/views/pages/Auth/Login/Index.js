import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import * as yep from "yup";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import { HiEye, HiEyeOff } from "react-icons/hi";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
import { postAPIHandler } from "src/config/service";
import { UserContext } from "src/context/User";
import PageLoading from "src/component/PageLoading";

const useStyles = makeStyles((theme) => ({
  loginmainrSection: {
    "& .loginmainBox": {
      height: "100dvh",
      position: "relative",
      zIndex: "9",
      overflowY: "auto",
      "& .MuiFormControl-fullWidth": {
        marginTop: "8px",
      },
      "& p": {
        fontWeight: "400",
        color: "rgba(61, 61, 61, 1)",
      },
      "& svg": {
        color: "rgba(61, 61, 61, 1)",
      },
      "& h2": {
        color: "rgba(243, 109, 54, 1)",
        fontSize: "40px",
      },
      "& label": {
        color: "rgba(61, 61, 61, 1)",
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
      "& .loginBox": {
        height: "initail",
        margin: "15px auto",
        maxWidth: "95%",
        width: "550px",
        maxHeight: "100%",
      },

      "& h6": {
        color: "rgba(61, 61, 61, 1)",
        fontWeight: "500",
        fontSize: "16px",
        [theme.breakpoints.down("sm")]: {
          fontSize: "12px !important",
          marginLeft: "0px",
        },
      },
      "& .forgotText": {
        color: "rgba(65, 22, 67, 1)",
        cursor: "pointer",
        fontWeight: 600,
        [theme.breakpoints.down("sm")]: {
          fontSize: "12px !important",
        },
      },
      "& .descriptionText": {
        "& p": {
          color: "rgba(61, 61, 61, 1)",
        },
        "& span": {
          color: " rgba(65, 22, 67, 1)",
        },
      },
    },
  },
}));

export default function Login() {
  const history = useHistory();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const user = useContext(UserContext);
  let rememberMe = window.localStorage.getItem("arbitage");
  const [isRemember, setIsRemember] = useState(rememberMe ? true : false);
  let RememberData = isRemember && rememberMe ? JSON.parse(rememberMe) : "";

  const initialValues = {
    email: isRemember ? RememberData.email : "",
    password: isRemember ? RememberData.password : "",
  };
  const formValidationSchema = yep.object().shape({
    email: yep
      .string()
      .max(100, "Should not exceeds 100 characters.")
      .email("Please enter a valid email address.")
      .required("Email is required."),
    password: yep
      .string()
      .trim()
      .required("Password is required.")
      .max(16, "Password should not exceed 16 characters.")
      .min(8, "Password must be a minimum of 8 characters."),
  });

  const handleFormSubmit = async (values) => {
    try {
      setIsUpdating(true);
      const response = await postAPIHandler({
        endPoint: "login",
        dataToSend: {
          email: values.email,
          password: values.password,
        },
      });

      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        window.sessionStorage.setItem("token", response?.data?.result?.token);
        if (isRemember) {
          window.localStorage.setItem(
            "arbitage",
            JSON.stringify({ email: values.email, password: values.password })
          );
        } else {
          window.localStorage.removeItem("arbitage");
        }
        user.userLogIn(true, response?.data?.result?.token);
        history.push("/dashboard");
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsUpdating(false);
    } catch (error) {
      setIsUpdating(false);
    }
  };

  return (
    <Box className={classes.loginmainrSection}>
      <Box className="loginmainBox displayCenter">
        <Box className="loginBox">
          <Paper className="mainBox" elevation={2}>
            <Box className="displayColumn" align="center">
              <Typography variant="h2" style={{color: "#07c954"}}>Welcome Back</Typography>
              <Box className="displayCenter descriptionText">
                <Typography variant="body1" mt={1}>
                  {/* Don’t have an account?
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push("/signup")}
                  >
                    &nbsp;Sign Up
                  </span> */}
                  Please enter your login detail below
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
              }) => (
                <Form>
                  <Box mt={2} className="mainTextBox">
                    <label>Email</label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter email Id"
                      type="email"
                      name="email"
                      value={values.email}
                      error={Boolean(touched.email && errors.email)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error className="errorMessage">
                      {touched.email && errors.email}
                    </FormHelperText>
                  </Box>
                  <Box mt={2} className="mainTextBox">
                    <label>Password</label>
                    <TextField
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      fullWidth
                      variant="outlined"
                      value={values.password}
                      error={Boolean(touched.password && errors.password)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              style={{ paddingRight: "15px" }}
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <HiEye className="iconClass1" />
                              ) : (
                                <HiEyeOff className="iconClass1" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormHelperText error className="errorMessage">
                      {touched.password && errors.password}
                    </FormHelperText>
                  </Box>

                  <Box className="displaySpaceBetween" mt={1} mb={2}>
                    <Box className="displayStart mainTextBox1">
                      <Checkbox
                        name="remember"
                        onChange={(e) => {
                          setIsRemember(e.target.checked);
                        }}
                        checked={isRemember}
                      />
                      <Typography variant="h6">Remember me</Typography>
                    </Box>

                    {/* <Typography
                      variant="h6"
                      className="forgotText"
                      onClick={() => history.push("/Forgot")}
                    >
                      Forgot Password?
                    </Typography> */}
                  </Box>
                  <Box mb={2} className="displayCenter">
                    <Button
                      variant="contained"
                      // color="primary"
                      type="submit"
                      fullWidth
                      disabled={isUpdating}
                      style={{backgroundColor: "#07c954"}}
                    >
                      Login
                      {isUpdating && <ButtonCircularProgress />}
                    </Button>
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
