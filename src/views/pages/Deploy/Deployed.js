import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  paperbox: {
    padding: "20px",
    textAlign: "center",
  },
  Deployedroot: {
    height: "calc(100vh - 78px)",
    overflow: "auto",
    "& h1": {
      color: "rgba(65, 22, 67, 1)",
      fontSize: "40px",
    },
    "& p": {
      color: "rgba(61, 61, 61, 1)",
      lineHeight: "23px",
    },
  },
}));
const Data = [
  {
    id: "1",
    text: "Contract 1",
    text1: "a day ago",
  },
  {
    id: "2",
    text: "Contract 1",
    text1: "a day ago",
  },
  {
    id: "3",
    text: "Contract 1",
    text1: "a day ago",
  },
  {
    id: "4",
    text: "Contract 1",
    text1: "a day ago",
  },
  {
    id: "5",
    text: "Contract 1",
    text1: "a day ago",
  },
  {
    id: "6",
    text: "Contract 1",
    text1: "a day ago",
  },
  {
    id: "7",
    text: "Contract 1",
    text1: "a day ago",
  },
  {
    id: "",
    text: "Contract 1",
    text1: "a day ago",
  },
  {
    id: "6",
    text: "Contract 1",
    text1: "a day ago",
  },
  {
    id: "7",
    text: "Contract 1",
    text1: "a day ago",
  },
  {
    id: "",
    text: "Contract 1",
    text1: "a day ago",
  },
  {
    id: "",
    text: "Contract 1",
    text1: "a day ago",
  },
];

export default function Deployed() {
  const classes = useStyles();
  return (
    <Box className={classes.Deployedroot}>
      <Grid container spacing={2}>
        {Data.map((value) => {
          return (
            <>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className={classes.editsection}
              >
                <Paper elevation={2} className={classes.paperbox}>
                  <Box align="center">
                    <Typography variant="h1">{value.text}</Typography>
                    <Typography variant="body2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                    <Box mt={2}>
                      <Button variant="contained" color="primary" fullWidth>
                        {" "}
                        View
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </>
          );
        })}
      </Grid>
    </Box>
  );
}
