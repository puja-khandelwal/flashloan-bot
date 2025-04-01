import {
  Box,
  Typography,
  Grid,
  Button,
  FormControl,
  Select,
  MenuItem,
  Paper,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  deployedBox: {
    position: "relative",
    "& h6": {
      color: "#3D3D3D",
    },
    "& h4": {
      color: "#3D3D3D",
      marginBottom: "10px",
    },
    "& .paperInnerBox": {
      padding: "10px",
      marginBottom: "10px",
    },
    "& .MuiSelect-icon": {
      color: "#3D3D3D",
    },
  },
}));

export default function Simple() {
  const classes = useStyles();
  const [age, setAge] = React.useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const menuProps = {
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    elevation: 0,
    PaperProps: {
      style: {
        top: "0px !important",
        maxHeight: 250,
      },
    },
  };
  return (
    <Box className={classes.deployedBox}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={7}>
          <Box align="right" style={{ marginTop: "-26px" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ minWidth: "150px" }}
            >
              Edit
            </Button>
          </Box>
          <Typography variant="h4">Bot Limit</Typography>
          <Paper elevation={2} className="paperInnerBox">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={2}>
                <Typography variant="h6">Min Profit:</Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Box className={classes.filterBox}>
                  <FormControl fullWidth className={classes.formControl}>
                    <TextField
                      name="name"
                      placeholder="Enter min Profile value"
                      variant="outlined"
                    />
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={2} className="paperInnerBox">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={2}>
                <Typography variant="h6">Currency:</Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Box className={classes.filterBox}>
                  <FormControl fullWidth className={classes.formControl}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      MenuProps={menuProps}
                    >
                      <MenuItem value={10}>Select</MenuItem>
                      <MenuItem value={20}>Blocked</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              style={{ minWidth: "150px" }}
            >
              Submit
            </Button>
          </Box> */}
        </Grid>

        <Grid item xs={12} sm={4} md={5}></Grid>
      </Grid>
    </Box>
  );
}
