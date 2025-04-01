import React from "react";
import {
  Container,
  Box,
  Grid,
  makeStyles,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    paddingTop: "30px",
  },

  textBox: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      display: "block",
      justifyContent: "center",
    },
    "& .mainheadingBox": {
      marginTop: "6px",
    },
    "& p": {
      textAlign: "center",
      maxWidth: "350px",
      color: "#14133b",
    },
  },
  bannerBox: {
    padding: "56px 0 60px",
    zIndex: "999",
    position: "relative",
    background: "#f5e4e4",
    borderRadius: "0px 144px 0 0px",
    "& h2": {
      maxWidth: "1000px",
      textAlign: "left",
      color: "rgba(65, 22, 67, 1)",
    },

    "& .nextBox": {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    },
    "& .startmainBox": {
      padding: "30px",
      background: "rgba(255, 255, 255, 1)",
      borderRadius: "5px",
    },
  },
  textBox: {
    "& h2": {
      color: "rgba(65, 22, 67, 1)",
      fontSize: "40px",
      textTransform: "capitalize",
    },
    "& p": {
      color: "rgba(61, 61, 61, 1)",
      fontWeight: "400",
    },
    "& .displayphone": {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  },
}));

export default function Comming() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box className={classes.bannerBox}>
      <Container>
        <Paper elevation={2}>
          <Grid container spacing={3} style={{ alignItems: "center" }}>
            <Grid item lg={8} sm={6} xs={12}>
              <Box mt={1} mb={0} className={classes.textBox}>
                <Typography variant="h2" style={{ fontWeight: "700" }}>
                  Start trading with Ascent for free!
                </Typography>
                <Box mt={1} className={classes.textBox}>
                  <Typography
                    variant="body2"
                    style={{ fontSize: "22px", fontWeight: "400" }}
                  >
                    Free to use - no credit card required
                  </Typography>
                </Box>
                <Box mt={3} className="nextBox">
                  <Button
                    variant="contained"
                    color="primary"
                    className="displayStart"
                    onClick={() => {
                      history.push({
                        pathname: "/cross-exchange-more",
                      });
                    }}
                  >
                    Let’s get started &nbsp;
                    <img src="images/next.svg" alt="image" />
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item lg={4} sm={6} xs={12} className={classes.centering}>
              <Box className={classes.textBox} align="center">
                <img
                  src="images/contact_1.png"
                  alt="image"
                  style={{
                    width: "100%",
                    maxWidth: "120px",
                  }}
                />
                <img
                  src="images/contact.png"
                  alt="image"
                  className="moveTop displayphone"
                  style={{
                    marginLeft: "55px",
                    width: "100%",
                    maxWidth: "113px",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
