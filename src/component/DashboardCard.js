import React from "react";
import { makeStyles, Box, Typography, Paper } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  mainbox: {
    "background": "rgba(237, 131, 34, 1)",
    borderRadius: "10px",
    padding: "30px",
    position: "relative",
    transition: "0.5s",
    "&:hover": {
      transform: "translateY(-10px)",
    },
    "& .imgbox": {
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
      "& img": {
        margin: "0 auto",
      },
    },
    "& .content": {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",

      "& h2": {
        color: "#fff",
        fontSize: "40px",
        textAlign: "center",
        fontWeight: "400",
        fontFamily: "'Mulish', sans-serif",
      },
      "& p": {
        marginBottom: "10px",
        fontFamily: "'Mulish', sans-serif",
        fontWeight: "500",
        fontSize: "17px",
        color: "#fff",
      },
    },
  },
}));

function FeatureCard(props) {
  const classes = useStyles();
  const { data, values, status } = props;

  return (
    <>
      <Paper className={classes.mainbox}>
        <Box className="content">
          <Typography variant="body2" style={{ marginBottom: "10px" }}>
            {data}
          </Typography>
          <Typography variant="h2"> {values} </Typography>
        </Box>
      </Paper>
    </>
  );
}

export default FeatureCard;
