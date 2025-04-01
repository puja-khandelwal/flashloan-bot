import React from "react";
import {
  Container,
  Box,
  Grid,
  makeStyles,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import { FaDollarSign } from "react-icons/fa";
const useStyles = makeStyles((theme) => ({
  newsubsMainBox: {
    cursor: "pointer",
    padding: "30px",
    zIndex: "999",
    background: "#fff",
    position: "relative",
    // boxShadow: "0 25px 70px rgba(0,0,0,.07)",
    borderRadius: "5px",
    "& h3": {
      color: "rgba(61, 61, 61, 1)",
    },
    "& svg": {
      color: "rgba(61, 61, 61, 1)",
      fontSize: "37px",
    },
    "& h2": {
      color: "rgba(61, 61, 61, 1)",
      textAlign: "left",
      fontSize: "40px",
    },
    "& p": {
      color: "rgba(61, 61, 61, 1)",
      marginBottom: "10px",
      position: "relative",
      paddingLeft: "25px",
      "&::before": {
        width: "10px",
        height: "10px",
        position: "absolute",
        background: "rgba(61, 61, 61, 1)",
        borderRadius: "100px",
        zIndex: "1",
        content: "''",
        top: "4px",
        left: "0",
      },
      "&:hover": {
        // background: "#fff",
      },
    },
    "&:hover": {
      background: "rgba(65, 22, 67, 1)",
      boxShadow: "0px 10px 26px -7px rgb(65, 22, 67)",
      "& p": {
        color: "#fff",
      },
      "& h2": {
        color: "#fff",
      },
      "& h3": {
        color: "#fff",
      },
      "& svg": {
        color: "#fff",
      },
      "& .startButton": {
        background: "#fff !important",
        color: "rgba(65, 22, 67, 1) !important",
        border: "1px solid #fff",
      },
      "&::before": {
        background: "#fff !important",
      },
    },
  },
}));
export default function NewSubscriptioncrd({ data }) {
  console.log("data==>>>", data);
  const classes = useStyles();

  return (
    <Box className={classes.newsubsMainBox}>
      <Box className="subscriptionBox" align="left">
        <Typography
          variant="h3"
          style={{
            lineHeight: "25px",
            textTransform: "uppercase",
            margin: "10px 0px",
            fontSize: "19px",
          }}
        >
          {data && data?.subscriptionName}
        </Typography>

        <Box className="displayStart" mb={3}>
          <FaDollarSign />
          <Typography variant="h2">
            {" "}
            {`${data && data?.price}/month`}
          </Typography>
        </Box>
        {data &&
          data?.description &&
          data?.description?.map((value, index) => {
            return (
              <Box>
                <Typography
                  variant="body1"
                  style={{
                    fontWeight: "400",
                  }}
                >
                  {value}
                </Typography>
              </Box>
            );
          })}
      </Box>
      <Box mt={3}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          className="startButton"
        >
          Start Trial
        </Button>
      </Box>
    </Box>
  );
}
