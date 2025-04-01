import { Box, Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import Arbirage from "./Arbirage";
import Borrow from "./Borrow";

const useStyles = makeStyles((theme) => ({
  flashmainBox: {
    position: "relative",
    "& .flashpaperBox": {
      padding: "20px",
    },
    "& h5": {
      color: "#3D3D3D !important",
      marginTop: "0px !important",
    },
    "& p": {
      color: "#3D3D3D",
    },
    "& .gridProper": {
      display: "grid",
      gridTemplateColumns: "auto auto",
      gap: "60px",
    },
  },
}));
export default function Flash() {
  const classes = useStyles();
  return (
    <Box className={classes.flashmainBox} mt={3}>
      <Grid container spacing={2}>
        <Grid item md={7} sm={12} xs={12}>
          <Paper elevation={2} className="flashpaperBox">
            <Typography variant="h5">Flash Loan</Typography>

            <Grid container spacing={5}>
              <Grid item md={6} sm={6} xs={12}>
                <Box className="displaySpaceBetween">
                  <Typography variant="body2">Network:</Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "rgba(65, 22, 67, 1)" }}
                  >
                    Male
                  </Typography>
                </Box>
                <Box className="displaySpaceBetween">
                  <Typography variant="body2">Token Name:</Typography>
                </Box>
              </Grid>

              <Grid item md={6} sm={6} xs={12}>
                <Box className="displaySpaceBetween">
                  <Typography variant="body2">Loan Amount:</Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "rgba(65, 22, 67, 1)" }}
                  >
                    0
                  </Typography>
                </Box>
                <Box className="displaySpaceBetween">
                  <Typography variant="body2">Gas Fee:</Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "rgba(65, 22, 67, 1)" }}
                  >
                    0 MATIC
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <Arbirage />
        </Grid>
        <Grid item md={5} sm={12} xs={12}>
          <Borrow />
        </Grid>
      </Grid>
    </Box>
  );
}
