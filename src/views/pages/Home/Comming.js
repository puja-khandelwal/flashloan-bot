import React from "react";
import {
  Container,
  Box,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    paddingTop: "30px",
  },
  Featuring: {},
  centering: {
    display: "flex",
    justifyContent: "center",
  },
  textBox: {
    position: "relative",
    "& .mainheadingBox": {
      marginTop: "6px",
    },
    "& h2": {
      color: "#fff",
    },
    "& p": {
      maxWidth: "350px",
      color: "#fff",
    },
  },
  bannerBox: {
    margin: "80px 0 12px",
    position: "relative",
    backgroundImage: "url(/images/tool_banner.png)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
    zIndex: "999",
    [theme.breakpoints.down("sm")]: {
      margin: "73px 0 10px",
    },
    "& h2": {
      maxWidth: "500px",
      textAlign: "left",
      color: "#fff",
      textTransform: "capitalize",
    },
    "& p": {
      maxWidth: "500px",
      color: "#fff",
      fontWeight: "400",
    },
    "& .accentbox": {
      position: "absolute",
      top: "-206px",
      left: "0",
      zIndex: "-1",
    },
  },
}));

export default function Comming() {
  const classes = useStyles();

  return (
    <Box className={classes.bannerBox}>
      {/* <img src="/images/acent.svg" alt="Image" className="accentbox" /> */}
      <Container>
        <Grid container spacing={3} style={{ alignItems: "center" }}>
          <Grid item lg={6} sm={6} xs={12} className={classes.centering}>
            <Box mt={5} mb={5} className={classes.textBox}>
              <Typography variant="h2" style={{ fontWeight: "600" }}>
                Works with these tools and more coming!{" "}
              </Typography>
              <Box mt={2}>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                  diam nunc, potenti placerat nunc, placerat dignissim. Sed
                  interdum morbi varius facilisis nisl est. Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit. Urna diam nunc, potenti
                  placerat nunc, placerat dignissim. Sed interdum morbi varius
                  facilisis nisl
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item lg={6} sm={6} xs={12} className={classes.centering}>
            <Box className={classes.textBox} align="center">
              <img
                src="images/comming.png"
                style={{ width: "100%", maxWidth: "500px" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
