import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  TextField,
  FormHelperText,
  Paper,
  Table,
  Link,
  Icon,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextareaAutosize,
  Button,
  Radio,
  Hidden,
} from "@material-ui/core";
import {} from "react-feather";
import "react-phone-input-2/lib/style.css";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "src/context/User";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import { isValidEmail } from "src/utils";
import PhoneInput from "react-phone-input-2";
import * as yep from "yup";
import { Formik, ErrorMessage, Form } from "formik";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import ApiConfig from "src/config/APICongig";
import { values } from "lodash";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: "150px",
    paddingBottom: "50px",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "80px",
    },
    "& .react-tel-input .form-control": {
      background: "#e7e7e7 !important",
      border: "none !important",
    },
    "& .MuiOutlinedInput-input:-webkit-autofill": {
      "-webkit-text-fill-color": "#0c0d31 !important",
    },
    "&  .flag-dropdown": {
      border: "0px solid #cacaca !important",
      //   background: "#1a2c38 !important",
      //   color: "#fff !important",
    },
    "& .selected-flag": {
      color: "#fff !important",
      background: "#411643 !important",
      borderRadius: "5px 0px 0px 3px !important",
      // border: "none",
    },
    "& .country-list": {
      color: "#fff !important",
      background: "#411643 !important",
      borderRadius: "5px 0px 0px 3px !important",
    },
  },

  NewBreed: {
    // backgroundColor: "#0F212E",
    padding: "20px",
    "& input::placeholder": {
      fontSize: "13px",
      fontWeight: 300,
    },
    "& p": {
      color: "#0c0d31",
      fontWeight: "400",
    },
    "& h3": {
      color: "#0c0d31",
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "10.5px 14px",
    },
  },

  input: {
    display: "none",
  },
  cls: {
    borderRadius: "0px",
    // paddingTop: "10px",
    fontSize: "13px",
  },
}));

export default function Register() {
  const classes = useStyles();
  const history = useHistory();
  const [isUpdating1, setIsUpdating1] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [email, setemail] = useState("");

  const ContactUsSubmitApiHandler = async (values) => {
    console.log("values----", values);

    try {
      setIsUpdating(true);

      const res = await axios({
        method: "POST",
        url: ApiConfig.addContactUs,
        data: {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          mobileNumber: values.mobileNumber,
          message: values.message,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        history.push("/");
        setIsUpdating(false);
      }
      setIsUpdating(false);
    } catch (error) {
      console.log(error);
      setIsUpdating(false);
    }
  };

  return (
    <Box className={classes.wrapper}>
      <Container>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6} align="center">
            <Hidden smDown>
              <img
                src="images/contactus.png"
                alt="Register Images"
                width="100%"
              />
            </Hidden>
          </Grid>
          <Grid item xs={12} md={6}>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                mobileNumber: "",
                message: "",
                email: "",
              }}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={yep.object().shape({
                firstName: yep
                  .string()
                  .required("First name is required.")
                  .min(3, "Should be 3 character long")
                  .max(30, "should not exceed 30 characters"),

                lastName: yep
                  .string()
                  .required("Last name is required .")
                  .min(3, "Should be 3 character long")
                  .max(10, "should not exceed 10 characters"),
                mobileNumber: yep
                  .string()
                  .required("Mobile number is required .")
                  // .matches(/^[0-9]+$/, "Must be only 10 digits")
                  .max(13, "should not exceed 10 digits")
                  .min(9, "Must be only 9 digits"),

                email: yep
                  .string()
                  .required("Email address is required.")
                  .matches(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    "Please enter a valid email address"
                  ),
                message: yep
                  .string()
                  .required("Description is required .")
                  .min(3, "Should be 3 character long")
                  .max(500, "should not exceed 500 characters"),
                // .required("Email address is required"),
              })}
              onSubmit={ContactUsSubmitApiHandler}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
                setFieldValue,
              }) => {
                console.log("values...........", values.mobileNumber);
                return (
                  <Form noValidate onSubmit={handleSubmit}>
                    {isUpdating1 ? (
                      <Box textAlign="center" pt={4}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Paper className={classes.NewBreed}>
                        <Box mb={2} align="center">
                          <Typography variant="h3">Contact Us</Typography>
                        </Box>

                        <Grid container spacing={2}>
                          <Grid item md={6} lg={6} sm={12} xs={12}>
                            <FormControl fullWidth>
                              <Typography
                                variant="body2"
                                style={{
                                  paddingBottom: "3px",
                                }}
                              >
                                First Name
                              </Typography>

                              <TextField
                                variant="outlined"
                                placeholder="Enter first name"
                                name="firstName"
                                size="small"
                                fullWidth="true"
                                value={values.firstName}
                                error={Boolean(
                                  touched.firstName && errors.firstName
                                )}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <FormHelperText error>
                                {touched.firstName && errors.firstName}
                              </FormHelperText>
                            </FormControl>
                          </Grid>

                          <Grid item md={6} lg={6} sm={12} xs={12}>
                            <FormControl fullWidth>
                              <Typography
                                variant="body2"
                                style={{
                                  paddingBottom: "3px",
                                }}
                              >
                                Last Name
                              </Typography>

                              <TextField
                                variant="outlined"
                                placeholder="Enter last name"
                                name="lastName"
                                size="small"
                                fullWidth="true"
                                value={values.lastName}
                                error={Boolean(
                                  touched.lastName && errors.lastName
                                )}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <FormHelperText error>
                                {touched.lastName && errors.lastName}
                              </FormHelperText>
                            </FormControl>
                          </Grid>

                          <Grid item md={6} lg={6} sm={12} xs={12}>
                            <FormControl fullWidth>
                              <Typography
                                variant="body2"
                                style={{
                                  paddingBottom: "6px",
                                }}
                              >
                                Mobile Number
                              </Typography>
                              <PhoneInput
                                style={{ marginTop: "-3px" }}
                                country={"in"}
                                name="mobileNumber"
                                placeholder="Enter mobile number"
                                value={values.mobileNumber}
                                error={Boolean(
                                  touched.mobileNumber && errors.mobileNumber
                                )}
                                onBlur={handleBlur}
                                onChange={(phone, e) => {
                                  setCountryCode(e.dialCode);
                                  setFieldValue("mobileNumber", phone);
                                }}
                                inputStyle={{
                                  width: "100%",
                                  height: "41px",
                                  backgroundColor: "transparent",

                                  color: "#0c0d31",
                                  border: "1px solid #9F9A9A",
                                }}
                              />

                              <FormHelperText error>
                                {touched.mobileNumber && errors.mobileNumber}
                              </FormHelperText>
                            </FormControl>
                          </Grid>

                          <Grid item md={6} lg={6} sm={12} xs={12}>
                            <FormControl fullWidth>
                              <Typography
                                variant="body2"
                                style={{
                                  paddingBottom: "3px",
                                }}
                              >
                                Email Address
                              </Typography>

                              <TextField
                                variant="outlined"
                                placeholder="Enter email address"
                                name="email"
                                value={values.email}
                                fullWidth="true"
                                size="small"
                                error={Boolean(touched.email && errors.email)}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <FormHelperText error>
                                {touched.email && errors.email}
                              </FormHelperText>
                            </FormControl>
                          </Grid>
                          <Grid item lg={12} md={12} xs={12}>
                            <FormControl fullWidth>
                              <Typography
                                variant="body2"
                                style={{
                                  paddingBottom: "3px",
                                }}
                              >
                                Description
                              </Typography>
                              <TextField
                                name="message"
                                placeholder="Write something..."
                                value={values.message}
                                style={{ marginTop: "0px" }}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                rowsMax={4}
                                inputProps={{
                                  className: classes.cls,
                                  maxLength: 800,
                                }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(
                                  touched.message && errors.message
                                )}
                              />
                              <FormHelperText error>
                                {touched.message && errors.message}
                              </FormHelperText>
                            </FormControl>
                          </Grid>
                        </Grid>

                        <Box pt={3} align="center">
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={isUpdating}

                            // onClick={
                            //   setIsUpdating(false)}
                          >
                            Register now
                            {isUpdating && <ButtonCircularProgress />}
                          </Button>
                        </Box>
                      </Paper>
                    )}
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
