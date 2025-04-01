import {
  Box,
  Typography,
  Grid,
  Button,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Radio,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  filterswapBox: {
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
    "& .filteriinnerBox": {
      padding: "20px",
    },
  },
}));

export default function Filterswap() {
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
    <Box className={classes.filterswapBox}>
      <Paper elevation={2} className="filteriinnerBox">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className={classes.filterBox}>
              <Typography variant="boay2" style={{ color: "#14133b" }}>
                From Date:
              </Typography>
              <Box mt={1}>
                <KeyboardDatePicker
                  value={timeFilter}
                  onChange={(date) => {
                    setTimeFilter(new Date(date));
                  }}
                  format="DD/MM/YYYY"
                  inputVariant="outlined"
                  disableFuture={true}
                  margin="dense"
                  variant="outlined"
                  helperText=""
                  name="dob"
                  fullWidth
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
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
                  <MenuItem value={10}>Triangle Exchange </MenuItem>
                  <MenuItem value={20}>Blocked</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
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
                  <MenuItem value={10}>Buy</MenuItem>
                  <MenuItem value={20}>Blocked</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
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
    </Box>
  );
}
