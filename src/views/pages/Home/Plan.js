import React from "react";
import {
  Container,
  Box,
  makeStyles,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import Slider from "react-slick";
import PlanCard from "src/component/PlanCard";
// import { lineHeight } from "@mui/system";
const useStyles = makeStyles((theme) => ({
  bannerbox: {
    position: "relative",
    padding: "110px 0 60px",
  },
  mainbox: {
    position: "relative",
    padding: "100px 0 60px",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 0 0px",
    },
  },
  brd: {
    borderRadius: "27px",
    padding: "20px",
    background: theme.palette.background.section,
    boxShadow: "0px 0px 130px rgba(0, 0, 0, 0.1)",
    "& .IconsBox": {
      padding: "15px 0px 30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  brd2: {
    position: "absolute",
    top: "55px",
    background: "#fff",
    boxShadow:"0 25px 70px rgba(0,0,0,.07)",
    borderRadius: "27px",
    paddingTop: "45px",
    paddingBottom: "40px",
    paddingLeft: "20px",
    paddingRight: "20px",
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      top: "-38px",
    },
    [theme.breakpoints.down("xs")]: {
      position: "relative",
      top: "0px",
    },
  },
  img2: {
    textAlign: "center",
    padding: "5px",
    "& p": {
      color: theme.palette.primary.main,
    },
    "& .txt3": {
      "& h3": {
        // color: theme.palette.primary.main,
        color: "#14133b",
        fontWeight: "600",
      },
      "& p": {
        // color: theme.palette.primary.main,
        color: "#14133b",
      },
    },
  },
  subheading: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2rem",
    },
    "& p": {
      // color: theme.palette.primary.main,
      color: "#14133b",
    },
  },

  press: {
    "& p": {
      maxWidth: "870px",
      color: "#14133b",
    },
  },
  textBox: {
    "& h2": {
      // color: theme.palette.primary.main,
      color: "#14133b",
    },
  },
}));

export default function Bannner1() {
  const classes = useStyles();

  return (
    <Box className={classes.bannerbox}>
      <Container maxWidth="md">
        <Grid container>
          <Grid item lg={12} sm={12} xs={12} align="center" position="relative">
            <Box className={classes.textBox}>
              <Typography variant="h2" style={{ fontWeight: "700" }}>
                Choose Your Plan
              </Typography>
            </Box>
            <Box mt={1} className={classes.subheading}>
              <Typography
                variant="body2"
                style={{ maxWidth: "538px", fontWeight: "400" }}
              >
                Malesuada nec, amet maecenas cras mauris porta nunc. Tempor at
                tortor scelerisque. You may downgrade to our free plan at the
                end of your 14-day paid plan trial.
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={12} sm={12} xs={12} className={classes.centering}>
            <Grid container spacing={2}>
              <Grid item lg={4} sm={6} md={4} xs={12}>
                <Box className={classes.mainbox}>
                  <Box style={{ margin: "0 12px" }}>
                    <Box className={classes.brd}>
                      <Box className={classes.img2}>
                        <Box className="txt3">
                          <Typography variant="h3" style={{ fontSize: "21px" }}>
                            STARTER
                          </Typography>
                        </Box>
                        <hr
                          width="100%"
                          style={{
                            opacity: "0.15",
                            border: "0.5px solid #0000008a",
                          }}
                        />
                        <Box>
                          <Typography
                            variant="h1"
                            style={{ fontSize: "50px", color: "#fafafa" }}
                          >
                            $12
                          </Typography>

                          <Typography variant="body1"> / month</Typography>
                        </Box>
                        <Box mb={3} mt={3}>
                          <Button variant="contained" fullWidth color="primary">
                            Start Trial
                          </Button>
                        </Box>
                        <Typography
                          variant="body2"
                          className="paragraphtext"
                          style={{ fontSize: "16px", lineHeight: "23px" }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. At nunc sed volutpat cras lobortis. Diam orci
                          phasellus suspendisse vitae, phasellus nibh. Turpis
                          neque tincidunt nam volutpat. Varius at urna, amet
                          facilisi nisi sit eget.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={4} sm={6} md={4} xs={12}>
                <Box className={classes.mainbox}>
                  <Box style={{ margin: "0 12px" }}>
                    <Box className={classes.brd2}>
                      <Box className={classes.img2}>
                        <Box className="txt3">
                          <Typography variant="h3" style={{ fontSize: "21px" }}>
                            PREMIUM
                          </Typography>
                        </Box>
                        <hr
                          width="100%"
                          style={{
                            opacity: "0.15",
                            border: "0.5px solid #0000008a",
                          }}
                        />
                        <Box>
                          <Typography
                            variant="h1"
                            style={{
                              fontSize: "40px",
                              color: "rgb(129, 23, 147)",
                            }}
                          >
                            $24
                          </Typography>

                          <Typography variant="body1"> / month</Typography>
                        </Box>
                        <Box mb={3} mt={3}>
                          <Button variant="contained" fullWidth color="primary">
                            Start Trial
                          </Button>
                        </Box>
                        <Typography
                          variant="body2"
                          className="paragraphtext"
                          style={{ fontSize: "16px", lineHeight: "23px" }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. At nunc sed volutpat cras lobortis. Diam orci
                          phasellus suspendisse vitae, phasellus nibh. Turpis
                          neque tincidunt nam volutpat. Varius at urna, amet
                          facilisi nisi sit eget.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={4} sm={6} md={4} xs={12}>
                <Box className={classes.mainbox}>
                  <Box style={{ margin: "0 12px" }}>
                    <Box className={classes.brd}>
                      <Box className={classes.img2}>
                        <Box className="txt3">
                          <Typography variant="h3" style={{ fontSize: "21px" }}>
                            TEAMS
                          </Typography>
                        </Box>
                        <hr
                          width="100%"
                          style={{
                            opacity: "0.15",
                            border: "0.5px solid #0000008a",
                          }}
                        />
                        <Box>
                          <Typography
                            variant="h1"
                            style={{
                              fontSize: "40px",
                              color: "rgb(129, 23, 147)",
                            }}
                          >
                            $49
                          </Typography>

                          <Typography variant="body1"> / month</Typography>
                        </Box>
                        <Box mb={3} mt={3}>
                          <Button variant="contained" fullWidth color="primary">
                            Start Trial
                          </Button>
                        </Box>
                        <Typography
                          variant="body2"
                          className="paragraphtext"
                          style={{ fontSize: "16px", lineHeight: "23px" }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. At nunc sed volutpat cras lobortis. Diam orci
                          phasellus suspendisse vitae, phasellus nibh. Turpis
                          neque tincidunt nam volutpat. Varius at urna, amet
                          facilisi nisi sit eget.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
