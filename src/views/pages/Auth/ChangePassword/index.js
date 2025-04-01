import React, { useState } from "react";
import {
  Box,
  makeStyles,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  FormHelperText,
  Button,
  Grid,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { patchAPIHandler } from "src/config/service";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import PageLoading from "src/component/PageLoading";
const useStyles = makeStyles((theme) => ({
  paperBox: {
    padding: "50px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px",
    },
  },
  mainbox: {
    position: "relative",
    padding: "40px 0",
    zIndex: "999",

    [theme.breakpoints.down("md")]: {
      padding: "30px 0",
    },
  },

  textBox: {
    "& h2": {
      color: "rgba(65, 22, 67, 1)",
    },
  },
  textheadBox: {
    paddingBottom: "9px",
    borderBottom: "1px solid #80808052",
    "& h2": {
      fontSize: "40px",
      color: "rgb(243, 109, 54)",
    },
  },
  changePassword: {
    "& p": {},
  },

  subheading: {
    "& p": {
      // color: theme.palette.primary.main,
      color: "#14133b",
      fontWeight: "400",
    },
  },
}));

export default function ChangePassword() {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const formInitialSchema = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const formValidationSchema = yep.object().shape({
    oldPassword: yep
      .string()
      .trim()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must be at least 8 characters including one upper case, one lower case, one alphanumeric and one special character."
      )
      .required("Old password is required.")
      .min(6, "Please enter atleast 6 characters")
      .max(20, "You can enter only 30 characters"),
    newPassword: yep
      .string()
      .trim()
      .notOneOf(
        [yep.ref("oldPassword"), null],
        "Password cannot be the same as old password."
      )
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must be at least 8 characters including one upper case, one lower case, one alphanumeric and one special character."
      )
      .required("New password is required.")
      .min(6, "Please enter atleast 6 characters")
      .max(20, "You can enter only 30 characters"),

    confirmPassword: yep
      .string()
      .required("Confirm password is required.")
      .oneOf(
        [yep.ref("newPassword"), null],
        "Confirm password should match with new password."
      ),
  });

  const handleFormSubmit = async (values) => {
    try {
      setIsUpdating(true);
      const response = await patchAPIHandler({
        endPoint: "changePassword",
        dataToSend: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
      });
      if (response.data.responseCode === 200) {
        window.sessionStorage.setItem("token", response.data.result.token);
        toast.success(response.data.responseMessage);
        history.push("/edit-profile");
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
      <Box className={classes.textheadBox}>
        <Box className="displayStart">
          <img
            onClick={() => history.goBack("/")}
            src="/images/arrowback.svg"
            width="35px"
            style={{ cursor: "pointer" }}
          />
          &nbsp;&nbsp;
          <Typography variant="h2" style={{ color: "rgba(243, 109, 54, 1)" }}>
            Change Password
          </Typography>
        </Box>
      </Box>
      <Box className={classes.changePassword}>
        <Formik
          initialValues={formInitialSchema}
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <Grid item xs={12}>
                    <Box mt={2}>
                      <Typography
                        mb={1}
                        variant="body2"
                        style={{
                          fontSize: "18px",
                          color: "rgba(61, 61, 61, 1)",
                        }}
                      >
                        Old Password
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Old password"
                        type={showPassword2 ? "text" : "password"}
                        name="oldPassword"
                        value={values.oldPassword}
                        error={Boolean(
                          touched.oldPassword && errors.oldPassword
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword2(!showPassword2)}
                                edge="end"
                              >
                                <Box>
                                  {showPassword2 ? (
                                    <HiEye className="iconClass1" />
                                  ) : (
                                    <HiEyeOff className="iconClass1" />
                                  )}
                                </Box>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormHelperText error>
                        {touched.oldPassword && errors.oldPassword}
                      </FormHelperText>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box mt={1}>
                      <Typography
                        mb={1}
                        variant="body2"
                        style={{
                          fontSize: "18px",
                          color: "rgba(61, 61, 61, 1)",
                        }}
                      >
                        New Password
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Password"
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
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                <Box>
                                  {showPassword ? <HiEye /> : <HiEyeOff />}
                                </Box>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormHelperText error>
                        {touched.newPassword && errors.newPassword}
                      </FormHelperText>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box mt={1}>
                      <Typography
                        mb={1}
                        variant="body2"
                        style={{
                          fontSize: "18px",
                          color: "rgba(61, 61, 61, 1)",
                        }}
                      >
                        Confirm Password
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Confirm password"
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
                                onClick={() => setShowPassword1(!showPassword1)}
                                edge="end"
                              >
                                <Box>
                                  {showPassword1 ? (
                                    <HiEye className="iconClass1" />
                                  ) : (
                                    <HiEyeOff className="iconClass1" />
                                  )}
                                </Box>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormHelperText error>
                        {touched.confirmPassword && errors.confirmPassword}
                      </FormHelperText>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Box className="buttonBox" mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isUpdating}
                >
                  Update
                  {isUpdating && <ButtonCircularProgress />}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      {isUpdating && <PageLoading />}
    </Paper>
  );
}
