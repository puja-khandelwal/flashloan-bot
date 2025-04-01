import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  makeStyles,
  Typography,
  Grid,
  Button,
  Card,
} from "@material-ui/core";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  img: {
    width: "100%",
    transition: "all .4s",
    "&:hover": {
      transform: "scale(1.12)",
      transition: "all .4s",
    },
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
  bck: {
    backgroundColor: "#FFFFFF",
    width: "270px",
    position: "absolute",
    right: "0px",
    padding: "8px 7px 15px 10px",
    bottom: "-75px",

    // [theme.breakpoints.down("md")]: {
    //   transform: "translate(83%, -69%)",
    // },
    // [theme.breakpoints.only("xs")]: {},
  },
  txt2: {
    fontFamily: "'Saira Semi Condensed', sans-serif",
    fontStyle: "normal",
    fontWeight: "700",
    paddingBottom: "5px",
    fontSize: "20px",
    lineHeight: "28px",
    color: "#000000",
  },
  txt3: {
    fontFamily: "'Saira Semi Condensed', sans-serif",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: "14px",
    lineHeight: "23px",
    color: "#000000",
  },
  txt4: {
    color: "#616161",
    fontFamily: "Inter', sans-serif",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "24px",
  },
  read: {
    color: "#1EB808",
  },
}));
export default function Bannner1({ data }) {
  const classes = useStyles();

  return (
    <Box className={classes.mainbox}>
      <Container>
        <Box
          style={{
            position: "relative",
          }}
        >
          <Box>
            <img src={data.image} alt=" " className={classes.img} />
          </Box>
          <Card className={classes.bck}>
            <Typography className={classes.txt4}>{data.date}</Typography>
            <Typography className={classes.txt2}>{data.subheading}</Typography>
            <Typography className={classes.txt3}>{data.description}</Typography>
            <Box align="end">
              <Button className={classes.read}>Read More </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
