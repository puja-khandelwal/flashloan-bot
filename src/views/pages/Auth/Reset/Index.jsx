import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import * as yep from "yup";
import React, { useState } from "react";
import { Form, Formik } from "formik";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useLocation } from "react-router-dom";
import ApiConfig from "src/config/APICongig";
import axios from "axios";
import PageLoading from "src/component/PageLoading";
const useStyles = makeStyles((theme) => ({
  resetmainSection: {
    "& .MuiFormControl-fullWidth": {
      marginTop: "8px",
    },
    "& .forgotMainBox": {
      height: "100dvh",
      zIndex: "9",
      position: "relative",
      overflowY: "auto",
      "& p": {
        fontWeight: "400",
        color: "rgba(61, 61, 61, 1)",
      },
      "& h2": {
        color: "rgba(243, 109, 54, 1)",
        fontSize: "40px",
      },
      "& .forgotBox": {
        height: "initail",
        margin: "0px auto",
        maxWidth: "95%",
        width: "550px",
        maxHeight: "100%",
      },

      "& h6": {
        color: "rgba(61, 61, 61, 1)",
        fontWeight: "500",
        fontSize: "16px",
      },
      "& .forgotText": {
        color: "rgba(43, 145, 239, 1)",
        fontWeight: 600,
      },
      "& label": {
        color: "rgba(61, 61, 61, 1)",
      },
      "& .descriptionText": {
        "& p": {
          color: "rgba(0, 0, 0, 0.40)",
        },
        "& span": {
          fontWeight: 600,
          color: " rgba(255, 85, 0, 1)",
        },
      },
      "& .logoBox": {
        "& img": {
          width: "100%",
          height: "50px",
          marginBottom: "24px",
        },
      },
      "& .iconColor": {
        color: "#585757",
        fontSize: "20px",
      },
    },
  },
}));
export default function ResetPassword() {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const formInitialSchema = {
    newPassword: "",
    confirmPassword: "",
  };

  const formValidationSchema = yep.object().shape({
    newPassword: yep
      .string()
      .trim()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?])[a-zA-Z\d!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]{8,}$/,
        "Password must contain 8 characters, one uppercase, one lowercase, one number and one special case character."
      )
      .required("Please enter a new password.")
      .min(8, "The new password must be at least 8 characters long.")
      .max(20, "The new password cannot exceed 20 characters."),

    confirmPassword: yep
      .string()
      .required("Please enter the confirmation password.")
      .oneOf([yep.ref("newPassword"), null], "Passwords Doesn't match."),
  });

  const handleFormSubmit = async (values) => {
    try {
      setIsUpdating(true);
      const response = await axios({
        method: "PUT",
        url: ApiConfig.resetPassword,
        headers: {
          token: location?.state?.token,
        },
        data: {
          password: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
      });
      console.log("responseresponse==>>>", response);
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        history.push("/login");
        setIsUpdating(false);
      } else {
        toast.error(response.data.responseMessage);
        setIsUpdating(false);
      }
    } catch (error) {
      setIsUpdating(false);
    }
  };
  return (
    <Box className={classes.resetmainSection}>
      <Box className="forgotMainBox displayCenter">
        <Box className="forgotBox">
          <Paper elevation={2}>
            <Box className="displayColumn" align="center">
              <Typography variant="h2">Reset Password</Typography>
            </Box>
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
                  <Box mt={2} className="mainTextBox">
                    <label>New Password</label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      value={values.newPassword}
                      error={Boolean(touched.newPassword && errors.newPassword)}
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
                                {showPassword ? (
                                  <HiEye className={"iconColor"} />
                                ) : (
                                  <HiEyeOff className={"iconColor"} />
                                )}
                              </Box>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormHelperText error className="errorMessage">
                      {touched.newPassword && errors.newPassword}
                    </FormHelperText>
                  </Box>
                  <Box mt={3} className="mainTextBox">
                    <label>Confirm Password</label>
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
                                  <HiEye className={"iconColor"} />
                                ) : (
                                  <HiEyeOff className={"iconColor"} />
                                )}
                              </Box>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormHelperText error className="errorMessage">
                      {touched.confirmPassword && errors.confirmPassword}
                    </FormHelperText>
                  </Box>

                  <Box mb={2} mt={4} className="displayCenter">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                    >
                      Reset Password
                      {isUpdating && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        </Box>
      </Box>
      {/* {openSucessfullModal && (
        <SucessfullModal
          open={openSucessfullModal}
          img={"/images/checkMark.png"}
          heading="Password Changed Successfully!"
          description={
            "In publishing and graphic design, Lorem ipsum is a  relying on meaningful content."
          }
          handleClose={() => {
            setOpenSucessfullModal(false);
            router.push("/auth/login");
          }}
        />
      )} */}
      {isUpdating && <PageLoading />}
    </Box>
  );
}
