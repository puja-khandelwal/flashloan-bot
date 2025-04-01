import React from "react";
import {
  Container,
  Box,
  makeStyles,
  Typography,
  Grid,
  Button,
  Card,
  IconButton,
} from "@material-ui/core";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import Slider from "react-slick";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Link as RouterLink } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FiSend, FiTwitter } from "react-icons/fi";
const useStyles = makeStyles((theme) => ({
  brd: {
    position: "relative",
    background: "#213743",
    borderRadius: "27px",
    padding: "20px",
    transition: "all .4s",
    // "&:hover": {
    //   transform: "scale(1.12)",
    //   transition: "all .4s",
    // },
    "& .IconsBox": {
      padding: "15px 0px 30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

   
  },
  img2: {
    textAlign: "center",
    padding: "5px",
  },
}));
export default function Bannner1({ data }) {
  const classes = useStyles();
  return (
    <Box className={classes.mainbox}>
      <Box style={{ margin: "0 12px" }}>
        <Box className={classes.brd}>
          <Box className={classes.img2}>
            <Box className="txt5">
              <Typography variant="h3" style={{ fontSize: "21px" }}>
                {" "}
                {data.data}
              </Typography>
            </Box>
            <hr
              width="100%"
              style={{ opacity: "0.15", border: "0.5px solid #0000008a" }}
            />
            <Box>
              <Typography variant="h1" style={{ fontSize: "40px" }}>
                {" "}
                {data.price}
              </Typography>

              <Typography variant="body1"> {data.month}</Typography>
            </Box>
            <Box mb={3} mt={3}>
              <Button variant="contained" fullWidth color="primary">
                Start Trial
              </Button>
            </Box>
            <Typography
              variant="body2"
              className="paragraphtext"
              style={{ fontSize: "16px", lineHeight: "23px" }}
            >
              {data.data2}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
