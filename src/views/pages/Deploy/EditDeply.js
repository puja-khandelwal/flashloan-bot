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

export default function EditDeply() {
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
    <Box className={classes.deployedBox} mt={2}>
      <Typography variant="h4">Deploy Contract for Arbitrage:</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={2} className="paperInnerBox">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3}>
                <Typography variant="h6">Contract Address :</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Box className={classes.filterBox}>
                  <FormControl fullWidth className={classes.formControl}>
                    <TextField
                      name="name"
                      placeholder="0*4454TTT56T5TY65676RTYT"
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
                <Typography variant="h6">Pair :</Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Box className={classes.filterBox}>
                  <FormControl fullWidth className={classes.formControl}>
                    <TextField
                      name="name"
                      placeholder="BTH"
                      variant="outlined"
                    />
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Box className={classes.filterBox}>
                  <FormControl fullWidth className={classes.formControl}>
                    <TextField
                      name="name"
                      placeholder="ETH"
                      variant="outlined"
                    />
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={2} className="paperInnerBox">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3}>
                <Typography variant="h6">Exchange:</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Box className={classes.filterBox}>
                  <FormControl fullWidth className={classes.formControl}>
                    <TextField
                      name="name"
                      placeholder="Uniswap"
                      variant="outlined"
                    />
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={2} className="paperInnerBox">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Typography variant="h6">Flash Loan Currency:</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Box className={classes.filterBox}>
                  <FormControl fullWidth className={classes.formControl}>
                    <TextField
                      name="name"
                      placeholder="USDC"
                      variant="outlined"
                    />
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              style={{ minWidth: "150px" }}
            >
              Back
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={4}></Grid>
      </Grid>
    </Box>
  );
}
