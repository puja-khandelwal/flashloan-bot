import React from "react";
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  Paper,
  Avatar,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  profilecardBox: {
    position: "relative",
    "& h2": {
      color: "rgba(61, 61, 61, 1) !important",
      textAlign: "left",
      whiteSpace: "pre !important",
      fontSize: "25px !important",
    },
    "& h4": {
      fontSize: "20px",
      lineHeight: "29px",
      color: "rgba(243, 109, 54, 1)",
    },
    "& .hourButton": {
      height: "40px !important",
      marginRight: "10px",
      whiteSpace: "pre",
    },
    "& .iconbox": {
      borderRadius: "0px",
      width: "80px",
      height: "80px",
      marginLeft: "30px",
      paddingLeft: "30px",
      borderLeft: "3px solid #f36d33",
    },
    "& .dashboardinnerpurple": {
      "& .hourButton": {
        height: "40px !important",
        marginRight: "10px",
        whiteSpace: "pre",
        border: "1px solid rgba(65, 22, 67, 1) !important",
        color: "rgba(65, 22, 67, 1) !important",
        "&:hover": {
          background: "rgba(65, 22, 67, 1) !important",
          color: "#fff !important",
        },
      },

      "& .hourButtonyellow": {
        height: "40px !important",
        marginRight: "10px",
        whiteSpace: "pre",
        border: "1px solid #f36d33 !important",
        color: "#f36d33 !important",
        "&:hover": {
          background: "#f36d33 !important",
          color: "#fff !important",
        },
      },
    },
    "& .dashboardinner": {
      padding: "20px",
      position: "relative",
      zIndex: "9",
      overflow: "hidden",
      "&::after": {
        top: "0",
        left: "0",
        width: "100%",
        height: "94%",
        content: "''",
        zIndex: "-1",
        position: "absolute",
        background: "linear-gradient(to bottom, #FFFFFF 0%, #4116431c 20%)",
        borderRadius: "0 0px 173px 8px",
      },
    },

    "& .orangeafterBox": {
      padding: "20px",
      position: "relative",
      zIndex: "9",
      overflow: "hidden",
      "&::after": {
        top: "0",
        left: "0",
        width: "100%",
        height: "94%",
        content: "''",
        zIndex: "-1",
        position: "absolute",
        background: "linear-gradient(to bottom, #FFFFFF 0%, #f36d3629 20%)",
        borderRadius: "0 0px 173px 8px",
      },
    },
  },
}));

export default function Profile() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box className={classes.profilecardBox} mt={2}>
      <Grid container spacing={2} style={{ alignItems: "center" }}>
        <Grid item md={6} lg={4} sm={6} xs={12}>
          <Paper
            elevation={2}
            className="dashboardinnerpurple orangeafterBox"
            // className="orangeafterBox"
          >
            <Typography variant="h2" style={{ textAlign: "left" }}>
              Recent Total Profits (USDT)
            </Typography>
            <Box className="displayStart" mt={2}>
              <Button
                variant="outlined"
                color="primary"
                className="hourButtonyellow"
              >
                1 Hour
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className="hourButtonyellow"
              >
                24 Hour
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className="hourButtonyellow"
              >
                7 Days
              </Button>
            </Box>
            <Box className="displayStart" mt={3}>
              {" "}
              <Box>
                <Typography variant="h4" style={{ textAlign: "left" }}>
                  0 (USDT)
                </Typography>
                <Typography variant="h4" style={{ textAlign: "left" }}>
                  0 (USDT)
                </Typography>
              </Box>
              <Avatar src="/images/Dashboard/eth.png" className="iconbox" />
            </Box>
          </Paper>
        </Grid>
        <Grid item md={6} lg={4} sm={6} xs={12}>
          <Paper elevation={2} className="dashboardinnerpurple dashboardinner">
            <Typography variant="h2" style={{ textAlign: "left" }}>
              Top Performing Crypto Assets
            </Typography>
            <Box className="displayStart" mt={2} mb={2}>
              <Button variant="outlined" color="primary" className="hourButton">
                1 Hour
              </Button>
              <Button variant="outlined" color="primary" className="hourButton">
                24 Hour
              </Button>
              <Button variant="outlined" color="primary" className="hourButton">
                7 Days
              </Button>
            </Box>
            <Box className="displayStart" mt={3}>
              {" "}
              <Box>
                <Typography
                  variant="h4"
                  style={{ textAlign: "left", color: "rgba(65, 22, 67, 1)" }}
                >
                  0 (USDT)
                </Typography>
                <Typography
                  variant="h4"
                  style={{ textAlign: "left", color: "rgba(65, 22, 67, 1)" }}
                >
                  0 (USDT)
                </Typography>
              </Box>
              <Avatar
                src="/images/Dashboard/purpleeth.png"
                className="iconbox"
                style={{ borderLeft: "3px solid rgba(65, 22, 67, 1)" }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
