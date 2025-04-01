import {
  Box,
  CardContent,
  Card,
  Typography,
  Avatar,
  Container,
  Paper,
  Grid,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    margin: "5px 0px",
    alignItems: "center",
  },
  root: {
    marginTop: "1rem",
  },
  btn: {
    display: "flex",
    justifyContent: "space-between",
    "@media (max-width: 320px)": {
      display: "block",
    },
    "& h2": {
      fontSize: "33px",
      fontWeight: "500",
      color: "rgba(0, 0, 0, 1)",
    },
  },
  btn1: {
    "& .buttonNotAllow": {
      cursor: "not-allowed",

      // border: "#0f212e",
      // border: "#fafafa",
    },
    "@media (max-width: 320px)": {
      display: "flex",
      justifyContent: "right",
      paddingBottom: "10px",
    },
  },
}));
const Data = [
  {
    id: "1",
    text: "Jatindutt123 has commit on your post.",
    text1: "a day ago",
  },
  {
    id: "2",
    text: "Jatindutt123 has commit on your post.",
    text1: "a day ago",
  },
  {
    id: "3",
    text: "Jatindutt123 has commit on your post.",
    text1: "a day ago",
  },
  {
    id: "4",
    text: "Jatindutt123 has commit on your post.",
    text1: "a day ago",
  },
  {
    id: "5",
    text: "Jatindutt123 has commit on your post.",
    text1: "a day ago",
  },
  {
    id: "6",
    text: "Jatindutt123 has commit on your post.",
    text1: "a day ago",
  },
  {
    id: "7",
    text: "Jatindutt123 has commit on your post.",
    text1: "a day ago",
  },
  {
    id: "",
    text: "Jatindutt123 has commit on your post.",
    text1: "a day ago",
  },
];

export default function Notification() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Paper elevation={2}>
        <Box className={classes.btn} mb={2}>
          <Typography variant="h2" style={{}}>
            Notification
          </Typography>
          <Box className={classes.btn1}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              // disabled={Data.length == 0}
              className={Data.length == 0 ? "buttonNotAllow" : ""}
            >
              Clear all
            </Button>
          </Box>
        </Box>

        <Box>
          {Data.map((value) => {
            return (
              <>
                <Box className={classes.box}>
                  <Avatar src="/images/photo.png" style={{ color: "white" }} />
                  <Box style={{ paddingLeft: "20px" }}>
                    <Typography
                      variant="h6"
                      style={{ lineHeight: "20px", color: "rgba(0, 0, 0, 1)" }}
                    >
                      {value.text}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        color: "rgb(8, 86, 204)",
                        fontSize: "14px",
                        paddingTop: "8px",
                      }}
                    >
                      {value.text1}
                    </Typography>
                  </Box>
                </Box>
                <hr style={{ border: "1px solid rgb(60 76 86 / 8%)" }} />
              </>
            );
          })}
          {Data.length == 0 && (
            <Box
              style={{
                display: "flex",
                // textAling: "center",
                justifyContent: "center",
                width: "100%",
                paddingTop: "35px",
              }}
            >
              <Typography variant="h6" style={{ color: "rgba(0, 0, 0, 1)" }}>
                No Notification Found
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
