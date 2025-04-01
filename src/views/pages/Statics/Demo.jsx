import { Box, Button, Grid, Typography, makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  demomainBox: {
    "& h2": {
      color: "red",
    },
    "& p": {
      color: "red",
    },
  },
}));
const Ddemodata = [
  {
    name: "Dummy",
  },

  {
    name: "Dummy",
  },
  {
    name: "Dummy",
  },
];
export default function Demo() {
  const classes = useStyles();
  return (
    <Box className={classes.demomainBox}>
      <Typography variant="h2">Pratice page</Typography>
      <Button> Demo</Button>
      <Grid container spacing={2}>
        {Ddemodata.map((data) => {
          return (
            <Grid item lg={6}>
              <Typography variant="body2">{data.name}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
