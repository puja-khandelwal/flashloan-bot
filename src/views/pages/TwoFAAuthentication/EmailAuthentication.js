import React from "react";
import {
  Box,
  makeStyles,
  Typography,
  Paper,
  Switch,
  TextField,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paperBox: {
    padding: "50px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px",
    },
  },
  googleAuth: {
    "& h5": {
      color: "rgba(61, 61, 61, 1)",
    },
    "& img": {
      width: "250px",
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

export default function GoogleAuthentication() {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  });

  return (
    <Paper elevation={2} className={classes.paperBox}>
      <Box className={classes.textheadBox}>
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
            Email Authentication
          </Typography>
        </Box>
      </Box>
      <Box mt={3} className={classes.googleAuth}>
        <Typography variant="h5">
          Enter your email to enable Email Authentication.
        </Typography>
        <Box mt={2} className="mainTextBox">
          <Typography>Email</Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter email Id"
            type="email"
            name="email"
            // value={values.email}
            // error={Boolean(touched.email && errors.email)}
            // onBlur={handleBlur}
            // onChange={handleChange}
          />
          {/* <FormHelperText error className="errorMessage">
            {touched.email && errors.email}
          </FormHelperText> */}
        </Box>
      </Box>
    </Paper>
  );
}
