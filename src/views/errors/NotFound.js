import { Box, Typography, Button, makeStyles, } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import Page from "src/component/Page";

const useStyles = makeStyles((theme)=>({
  background:{
    backgroundColor:"#000",
    height:"100vh",
    color:"white",
    "& h1":{
      textShadow: "0px 0px 8px #fff",
      padding:"10px 30px",
      [theme.breakpoints.down("sm")]:{
        fontSize:"60px",
        padding:"0px 30px"
      },
      [theme.breakpoints.down("xs")]:{
        fontSize:"40px",
      },
    },
    "& h4":{
      textShadow: "0px 0px 8px #fff",
      padding:"30px 30px 50px",
    //   [theme.breakpoints.down("sm")]:{
    //     fontSize:"45px",
    // }
  }
  }
}))

export default function NotFound(props) {
  const history = useHistory();
  const classes = useStyles()
  return (
    <Box className={classes.background}>
        <Page title="page not found!">
          <Box pt={20} textAlign="center">
            <Typography variant="h1" align="center">
              Oops!
            </Typography>
            <Typography variant="h1" align="center" >
              404 Not Found
            </Typography>
            <Typography variant="h4" align="center">
              Sorry, an error has occured, Requested page not found!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/")}
            >
              Go to Home Page
            </Button>
        </Box>
      </Page>
    </Box>
  );
}
