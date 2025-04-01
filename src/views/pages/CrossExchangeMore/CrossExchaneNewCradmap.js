import React from "react";
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  Paper,
  Button,
  Avatar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  crossexchangenewmapBox: {
    position: "relative",
    overflow: "hidden",
    "& .sqaureimage": {
      width: "100%",
      height: "24px",
      maxWidth: "100%",
      top: "0",
      left: "0",
      position: "absolute",
    },
    "& .avtarcrossBox": {
      width: "50px",
      height: "50px",
    },
    "& .datecontentbox": {
      background: "rgba(65, 22, 67, 1)",
      marginLeft: "-42px",
      borderRadius: "10px",
      padding: "5px",
    },
    "& .pinkpercentBox": {
      color: "#fff",
      width: "100%",
      margin: "10px 0",
      padding: "4px 0px",
      background: "rgba(65, 22, 67, 0.1)",
      borderRadius: "10px",
    },
    "& highlymainBox": {
      "& h3": {
        color: "rgba(255, 255, 255, 1)",
      },
      "& p": {
        color: "rgba(255, 255, 255, 1)",
      },
    },
  },
}));
export default function CrossExchaneNewCradmap({ data }) {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.crossexchangenewmapBox}>
      <img
        src="/images/market/square.png"
        alt="Images"
        className="sqaureimage"
      />
      <Grid container spacing={2}>
        <Grid item xs={6} align="center">
          <Box className={classes.content}>
            <Typography
              variant="h1"
              style={{
                color: "rgba(65, 22, 67, 1)",
                fontSize: "30px",
                lineHeight: "30px",
              }}
            >
              {data.name}
            </Typography>
            <Box className="pinkpercentBox">
              <Typography variant="h6" style={{ color: "rgba(65, 22, 67, 1)" }}>
                1.87%
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} align="center">
          <Box className={classes.content}>
            <Typography
              variant="h1"
              style={{
                color: "rgba(65, 22, 67, 1)",
                fontSize: "30px",
                lineHeight: "30px",
              }}
            >
              ETH
            </Typography>
            <Box className="pinkpercentBox">
              <Typography variant="h6" style={{ color: "rgba(65, 22, 67, 1)" }}>
                1.87%
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} align="center">
          <Box className="datecontentbox">
            <Typography
              variant="h6"
              style={{
                color: "#fff",
              }}
            >
              2024-Feb-23
            </Typography>
            <Box>
              <Typography variant="h6" style={{ color: "#fff" }}>
                At 12:45 UTC
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} align="center">
          <Box className="displayCenter">
            <Avatar src="/images/crossexchange.png" className="avtarcrossBox" />
            &nbsp; &nbsp;
            <img
              src="/images/crossvector.png"
              style={{ cursor: "pointer" }}
            />{" "}
            &nbsp; &nbsp;
            <Avatar src="/images/crossexchange.png" className="avtarcrossBox" />
          </Box>
        </Grid>
      </Grid>
      <Box align="center" mt={3}>
        <Button variant="contained" color="primary" fullWidth>
          Execute
        </Button>
      </Box>
    </Paper>
  );
}
