import {
  Box,
  Button,
  FormHelperText,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import * as yep from "yup";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import { postAPIHandler } from "src/config/service";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  forgotSection: {
    height: "calc(100vh - 75px)",
    position: "relative",
    overflowY: "auto",
    "& .MuiFormControl-fullWidth": {
      marginTop: "8px",
    },
    "& label": {
      color: "rgba(61, 61, 61, 1)",
    },
    "& .forgotMainBox": {
      height: "100%",
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
      "& .forgotBox": {
        height: "initail",
        margin: "0px auto",
        maxWidth: "95%",
        width: "550px",
        maxHeight: "100%",
      },

      "& h6": {
        color: "rgba(8, 5, 21, 1)",
        fontWeight: 500,
        fontFamily: "'Poppins', sans-serif",
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
          width: "auto",
          height: "50px",
          marginBottom: "24px",
        },
      },
    },
  },
}));
export default function Forgot() {
  const history = useHistory();
  const classes = useStyles();
  const [isUpdating, setIsUpdating] = useState(false);

  const initialValues = {
    email: "",
  };
  const formValidationSchema = yep.object().shape({
    email: yep
      .string()
      .email("Please enter your email.")
      .required("Email is required."),
  });

  const handleFormSubmit = async (values) => {
    try {
      setIsUpdating(true);
      const response = await postAPIHandler({
        endPoint: "forgotPassword",
        dataToSend: {
          email: values.email,
        },
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        history.push({
          pathname: "/Verify-Otp",
          state: { email: values.email, type: "FORGOT" },
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
    <Box className={classes.forgotSection}>
      <Box className="forgotMainBox displayCenter">
        <Box className="forgotBox">
          <Paper elevation={2}>
            <Box className="displayColumn">
              <Box className="logoBox" align="center">
                <img src="/images/forgotLogo.png" alt="Logo" />
              </Box>
              <Typography variant="h2">Forgot Password</Typography>
              <Box className="displayCenter descriptionText" align="center">
                <Typography variant="body1" mt={2} textAlign="center">
                  Enter your email for the verification process, we will send 6
                  digits code to your email
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
                      placeholder="Enter email Id"
                      type="email"
                      name="email"
                      fullWidth
                      variant="outlined"
                      value={values.email}
                      error={Boolean(touched.email && errors.email)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error className="errorText">
                      {touched.email && errors.email}
                    </FormHelperText>
                  </Box>
                  <Box mb={2} mt={4} className="displayCenter">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      disabled={isUpdating}
                    >
                      Submit
                      {isUpdating && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        </Box>
      </Box>
      {/* {isLoading && <PageLoader />} */}
    </Box>
  );
}
