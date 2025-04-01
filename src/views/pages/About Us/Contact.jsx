import {
  Box,
  Button,
  Container,
  TextField,
  FormControl,
  FormHelperText,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";
// import useState from "react";
import { Form, Formik } from "formik";
import * as yep from "yup";
import ApiConfig from "src/config/APICongig";
import { toast } from "react-toastify";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    padding: "130px 0 80px",
    position: "relative",
  
    [theme.breakpoints.only("xs")]: {
      padding: "80px 0",
    },
    "& h2": {
      fontWeight: "600",
      fontSize: "30px",
      lineHeight: "60px",
      color: "#0c0d31",
    },
    "& p": {
      marginTop: "15px",
      color: "#0c0d31",
    },
  },
  textFeild: {
    // maxWidth:"450px",
    padding: "8px 0px",
    "& input": {
      fontSize: "10px",
    },
  },
  imgBox: {
    maxWidth: "500px",
    "@media(max-width:960px)": {
      display: "none",
    },
  },
}));

const Contact = () => {
  const formValidationSchema = yep.object().shape({
    email: yep
      .string()
      .email("You have entered an invalid email address. Please try again")
      .required("Email address is required")
      .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
    name: yep
      .string()
      .required(" Name is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and white spaces are allowed for this field number are not. "
      ),
    message: yep
      .string()
      .required(" Message is required")
      // .min(10, "Please enter at least 10 characters")
      .max(350, "You can enter only 350 characters"),
    contact: yep.string().required("Mobile number is required"),
    // .matches(
    //   /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    //   "Must be a valid mobile"
    // )
    // .max(13, "Should not exceeds 13 digits")
    // .min(9, "Must be only 9 digits"),
  });
  const [loader, setLoader] = React.useState();
  const formInitialValue = {
    name: "",
    email: "",
    contact: "phone",
    message: "",
  };

  const classes = useStyles();

  const handleSubmit = async (values) => {
    // console.log("window.sessionStorage.getItem", values);
  
  };
  return (
    <>
      <Box className={classes.mainBox}>
        <Container>
          <Grid container spacing={2} >
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box>
                <Typography variant="h2">Contact us</Typography>
              </Box>
              <Formik
                initialValues={formInitialValue}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={formValidationSchema}
                onSubmit={(values) => handleSubmit(values)}
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
                    <Box>
                      <Typography variant="body1">Name</Typography>
                      <TextField
                        variant="outlined"
                        name="name"
                        autoComplete="off"
                        fullWidth
                        className={classes.textFeild}
                        error={Boolean(touched.name && errors.name)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText
                        error
                        style={{ margin: "0px", fontSize: "12px" }}
                      >
                        {touched.name && errors.name}
                      </FormHelperText>
                    </Box>
                    <Box>
                      <Typography variant="body1">Email Address</Typography>
                      <TextField
                        variant="outlined"
                        name="email"
                        autoComplete="off"
                        fullWidth
                        className={classes.textFeild}
                        error={Boolean(touched.email && errors.email)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText
                        error
                        style={{ margin: "0px", fontSize: "12px" }}
                      >
                        {touched.email && errors.email}
                      </FormHelperText>
                    </Box>
                    <Box>
                      <Typography variant="body1">Contact Number</Typography>
                      {/* <TextField
                        variant="outlined"
                        name="contact"
                        autoComplete="off"
                        fullWidth
                        className={classes.textFeild}
                        error={Boolean(touched.contact && errors.contact)}
                        onBlur={handleBlur}
                      /> */}

                      <PhoneInput
                        className={classes.textFeild}
                        country={"in"}
                        type="number"
                        name="number"
                        value={values.number}
                        // error={Boolean(touched.number && errors.number)}
                        // helperText={touched.number && errors.number}
                        label="none"
                        error={Boolean(touched.number && errors.number)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // onChange={(phone) => handlePhoneChange(phone)}
                        // onChange={(phone, e) => {
                        //   // setCountryCode(e.dialCode);
                        //   // setFieldValue("number", phone);
                        // }}
                        inputStyle={{
                          width: "100%",
                          height: "42px",
                          width: "100%",
                          height: "50px",
                          background: "transparent",
                          border: "1px solid gray",
                          color: "#fff",
                          paddingLeft: "10px",
                        }}
                      />
                      <FormHelperText error>
                        {touched.number && errors.number}
                      </FormHelperText>
                      <FormHelperText
                        error
                        style={{ margin: "0px", fontSize: "12px" }}
                      >
                        {touched.contact && errors.contact}
                      </FormHelperText>
                    </Box>
                    <Box>
                      <Typography variant="body1">Message</Typography>
                      <TextField
                        multiline
                        rows={4}
                        variant="outlined"
                        autoComplete="off"
                        name="message"
                        fullWidth
                        className={classes.textFeild}
                        placeholder="Enter Your Query...."
                        error={Boolean(touched.message && errors.message)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText
                        error
                        style={{ margin: "0px", fontSize: "12px" }}
                      >
                        {touched.message && errors.message}
                      </FormHelperText>
                    </Box>
                    <Box mt={2} align="right">
                      <Button variant="contained" type="submit" color="primary">
                        Submit{loader && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Grid>
            {/* <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Box className={classes.imgBox}>
                <img
                  src="./images/ConactRight.png"
                  alt="side Logo"
                  width="100%"
                />
              </Box>
            </Grid> */}
          </Grid>

        
        </Container>
      </Box>
    </>
  );
};

export default Contact;
