import React from "react";
import {
  makeStyles,
  Box,
  Typography,
  Container,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  whitepsperroot: {
    padding: "150px 0px 80px",
    "& .headingBox": {
      "& h2": {
        color: theme.palette.primary.main,
      },
    },
    "& .mainBox": {},
  },
  whitepaperBox: {
    position: "relative",
    marginTop: "50px",
    backgroundSize: "cover",
    padding: "80px",
    overflow: "hidden",
    zIndex: "1",
    borderRadius: "25px",
    "&::before": {
      content: " '' ",
      background: theme.palette.background.section,
      mixBlendMode: "multiply",
      position: "absolute",
      display: "block",
      width: "100%",
      height: "100%",
      left: "0px",
      top: "0px",
      borderRadius: "25px",
      zIndex: " -1",
    },
    "&::after": {
      content: " '' ",
      position: "absolute",
      top: "0px",
      right: "0px",
      width: "434px",
      borderRadius: "30px",
      height: "100%",
      zIndex: "-11",
      background: "url(images/whitepaper.png)",
      opacity: "0.6",
    },
    backgroungColor: "red",
    [theme.breakpoints.down("md")]: {
      height: "auto",
    },
    "& .textBox": {
      "& .headingBox": {
        "& h5": {
          color: theme.palette.primary.main,
          fontWeight: "600",
        },
      },
      "& .mainTextBox": {
        maxWidth: "725px",
        "& h6": {
          color: theme.palette.primary.main,
        },
      },
    },
  },
}));

function WhitePaper() {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="lg">
        <Box className={classes.whitepsperroot}>
          <Box className="headingBox">
            <Typography variant="h2">White Paper</Typography>
          </Box>
          <Box className="mainBox">
            <Box className={classes.whitepaperBox}>
              <Box className="textBox">
                <Box className="headingBox">
                  <Typography variant="h5">OUR WHITEPAPER</Typography>
                </Box>
                <Box className="mainTextBox">
                  <Typography variant="h6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages.
                  </Typography>
                </Box>
              </Box>
              <Box mt={3} align="center">
                <Button variant="contained" color="primary">
                  Whitepaper
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default WhitePaper;
