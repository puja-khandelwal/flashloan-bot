import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  MainBox: {
    padding: "20px 0",
    cursor: "pointer",

    "& highlymainBox": {
      borderRight: "1px solid red",
      "& h3": {
        color: "rgba(255, 255, 255, 1)",
      },
      "& p": {
        color: "rgba(255, 255, 255, 1)",
      },
    },
  },
  lastChild: {
    // borderRight: "none",
  },
  top: {
    paddingTop: "20px",
    paddingBottom: "20px",
  },
}));
export default function Trading({ data }) {
  const classes = useStyles();

  return (
    <div className={classes.MainBox}>
      <Grid container>
        <Grid item xs={12}>
          <div className={`highlymainBox ${classes.lastChild}`} align="left">
            <div align="right">
              <Typography
                variant="h2"
                style={{
                  color: "#07C954",
                }}
              >
                {data.number}
              </Typography>
            </div>
            {/* <Typography
              variant="h2"
              style={{
                fontWeight: "600",
                paddingTop: "0px",
                textAlign: "left",
                color: "#14133b",
              }}
            >
              {data.heading}
            </Typography> */}
            <Typography
              variant="h3"
              style={{
                lineHeight: "25px",
                maxWidth: "180px",
                margin: "10px 0px",
                fontSize: "19px",
              }}
            >
              {data.name}
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontWeight: "400",
              }}
            >
              {data.description}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
