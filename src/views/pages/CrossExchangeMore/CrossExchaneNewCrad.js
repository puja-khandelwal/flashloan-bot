import React from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";

import CrossExchaneNewCradmap from "./CrossExchaneNewCradmap";
const useStyles = makeStyles((theme) => ({
  crossExchaneNewCradBox: {
    position: "relative",
    zIndex: "999",
    "& .crosspaperBox": {
      padding: "20px",
    },
  },

  box: {
    display: "flex",
    paddingTop: "30px",
  },
  centeringBox: {
    padding: "40px 0 0 !important",
  },
  centering: {},
  textBox: {
    position: "relative",
    "& .mainheadingBox": {
      marginTop: "6px",
    },
    "& h2": {
      color: "rgba(65, 22, 67, 1)",
      textAlign: "left",
    },
    "& p": {
      textAlign: "left",

      color: "rgba(61, 61, 61, 1)",
    },
  },
  tradingmainBox: {
    position: "relative",
    padding: "100px 0",
  },
  head: {
    fontWeight: "400",
    fontSize: "25px",
    paddingTop: "6px",
    color: "rgba(65, 22, 67, 1) !important",
  },
}));
const GameMap1 = [
  {
    image: "images/features_1.png",
    heading: "Feature-1",
    number: "01",
    name: "BTC",
  },
  {
    image: "images/features_2.png",
    heading: "Feature-2",
    number: "02",
    name: "BTC",
  },
  {
    image: "images/features_3.png",
    heading: "Feature-3",
    number: "03",
    name: "BTC",
  },
  {
    image: "images/features.png",
    heading: "Feature-4",
    number: "04",
    name: "BTC",
  },
  {
    image: "images/features_3.png",
    heading: "Feature-3",
    number: "03",
    name: "BTC",
  },
  {
    image: "images/features.png",
    heading: "Feature-4",
    number: "04",
    name: "BTC",
  },
];
export default function CrossExchaneNewCrad() {
  const classes = useStyles();

  return (
    <Box className={classes.crossExchaneNewCradBox}>
      <Box className={classes.automatedMainBox}>
        <Grid container spacing={4}>
          {GameMap1.map((data, i) => {
            return (
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Box key={i}>
                  <CrossExchaneNewCradmap data={data} type="timing" index={i} />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
