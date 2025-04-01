import React from "react";
import {
  Container,
  Box,
  Grid,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import WorksCard from "src/component/WorksCard";
const useStyles = makeStyles((theme) => ({
  tradingBox: {
    position: "relative",
    zIndex: "999",
  },
  automatedMainBox: {
    padding: "30px",
    marginTop: "90px",
    background: "rgba(65, 22, 67, 1)",

    borderRadius: "30px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px",
    },
  },
  box: {
    display: "flex",
    paddingTop: "30px",
  },
  centeringBox: {
    padding: "40px 0 0 !important",
  },
  centering: {},
  textBox: {
    position: "relative",
    "& .mainheadingBox": {
      marginTop: "6px",
    },
    "& h2": {
      color: "rgba(65, 22, 67, 1)",
      textAlign: "left",
      textTransform: "capitalize",
    },
    "& p": {
      textAlign: "left",

      color: "rgba(61, 61, 61, 1)",
    },
  },
  tradingmainBox: {
    position: "relative",
    padding: "60px 0",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 0 50px",
    },
  },
  head: {
    fontWeight: "400",
    fontSize: "25px",
    paddingTop: "6px",
    color: "rgba(65, 22, 67, 1) !important",
  },
}));
const GameMap1 = [
  {
    image: "images/features_1.png",
    heading: "Feature-1",
    number: "01",
    name: "Highly specialised consultants",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna diam nunc, potenti placerat nunc, placerat dignissim.",
  },
  {
    image: "images/features_2.png",
    heading: "Feature-2",
    number: "02",
    name: "Successfully completed cases",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna diam nunc, potenti placerat nunc, placerat dignissim.",
  },
  {
    image: "images/features_3.png",
    heading: "Feature-3",
    number: "03",
    name: "Satisfaction of our customers",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna diam nunc, potenti placerat nunc, placerat dignissim.",
  },
  {
    image: "images/features.png",
    heading: "Feature-4",
    number: "04",
    name: "Years Of Experience In Cleaning Field",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna diam nunc, potenti placerat nunc, placerat dignissim.",
  },
];
export default function Earn() {
  const classes = useStyles();

  return (
    <Box className={classes.tradingBox}>
      <Box className={classes.tradingmainBox}>
        <img src="/images/autolated_left.png" className="autolatedBox" />
        <Container>
          <Grid container spacing={3}>
            <Grid item lg={7} sm={6} xs={12} className={classes.centering}>
              <Box className={classes.textBox} align="center">
                <img src="images/trading_left.svg" style={{ width: "100%" }} />
              </Box>
            </Grid>

            <Grid item lg={5} sm={6} xs={12}>
              <Box
                className={classes.textBox}
                style={{
                  borderLeft: "3px solid rgba(65, 22, 67, 1)",
                  paddingLeft: "23px",
                }}
              >
                <Typography variant="h2" style={{ paddingTop: "0px" }}>
                  Automate your <br />
                  <span style={{ color: "rgba(243, 109, 54, 1)" }}>
                    Trading
                  </span>{" "}
                </Typography>
                <Box>
                  <Typography variant="body2" className={classes.head}>
                    Just seat back and trade
                  </Typography>

                  <Typography
                    variant="body1"
                    style={{ fontWeight: "400", marginTop: "10px" }}
                  >
                    Lorem ipsum dolor sit amet consectetur. Eget donec aliquam
                    et fermentum iaculis morbi. Sapien vulputate cras vulputate
                    erat massa id sit aliquam dui. Phasellus nullam nulla
                    aliquamvel quam nunc et.
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ fontWeight: "400", marginTop: "10px" }}
                  >
                    Lorem ipsum dolor sit amet consectetur. Eget donec aliquam
                    et fermentum iaculis morbi.
                  </Typography>
                  <Box mt={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ minWidth: "130px" }}
                    >
                      Start
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container>
        <Box className={classes.automatedMainBox}>
          <Grid container spacing={2}>
            {GameMap1.map((data, i) => {
              return (
                <Grid item lg={3} md={6} sm={12} xs={12}>
                  <Box key={i}>
                    <WorksCard data={data} type="timing" index={i} />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
