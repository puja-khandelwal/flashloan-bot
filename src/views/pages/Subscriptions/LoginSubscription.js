import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Box,
  makeStyles,
  Typography,
  Grid,
  Paper,
} from "@material-ui/core";

import Page from "src/component/Page";

import NewSubscriptioncrd from "./NewSubscriptioncrd";
import { getAPIHandler } from "src/config/service";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paperBox: {
    padding: "50px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px",
    },
  },
  mainbox: {
    position: "relative",
    padding: "40px 0",
    zIndex: "999",

    [theme.breakpoints.down("md")]: {
      padding: "30px 0",
    },
  },

  textBox: {
    "& h2": {
      color: "rgba(65, 22, 67, 1)",
    },
  },
  textheadBox: {
    "& h2": {
      fontSize: "40px",
      color: "rgb(243, 109, 54)",
      paddingBottom: "9px",
      borderBottom: "1px solid #80808052",
    },
  },
  subheading: {
    "& p": {
      // color: theme.palette.primary.main,
      color: "#14133b",
      fontWeight: "400",
    },
  },
}));

export default function LoginSubscription() {
  const [subscriptionDataList, setSubscriptionDataList] = useState([]);
  console.log("subscriptionDataList==>>", subscriptionDataList);
  const [isSubscriptionUpdating, setIsSubscriptionUpdating] = useState(false);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState({
    pages: 1,
    totalPages: 1,
  });
  const classes = useStyles();
  const subscriptionManagementApi = async (source) => {
    try {
      const response = await getAPIHandler({
        endPoint: "listSubscriptionPlan",
        paramsData: {
          page: page,
          limit: 10,
        },
        source: source,
      });
      if (response.data.responseCode === 200) {
        setSubscriptionDataList(response.data.result.docs);
        setNoOfPages({
          pages: response.data.result.pages,
          totalPages: response.data.result.total,
        });
      } else {
        setSubscriptionDataList([]);
      }

      setIsSubscriptionUpdating(false);
    } catch (error) {
      setSubscriptionDataList([]);
      setIsSubscriptionUpdating(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    subscriptionManagementApi(source);
    return () => {
      source.cancel();
    };
  }, [page]);

  return (
    <Page title="Subscription">
      <Paper elevation={2} className={classes.paperBox}>
        <Box className={classes.textheadBox}>
          <Typography variant="h2" style={{ color: "rgba(243, 109, 54, 1)" }}>
            Subscription
          </Typography>
        </Box>
        <Box className={classes.mainbox}>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item lg={12} sm={12} xs={12} align="center">
                <Box className={classes.textBox}>
                  <Typography variant="h2">
                    Choose{" "}
                    <span style={{ color: "rgba(243, 109, 54, 1)" }}>
                      Your Plan
                    </span>
                  </Typography>
                </Box>
                <Box mt={1} mb={6} className={classes.subheading}>
                  <Typography
                    variant="body2"
                    style={{ maxWidth: "538px", color: "rgba(61, 61, 61, 1)" }}
                  >
                    Malesuada nec, amet maecenas cras mauris porta nunc. Tempor
                    at tortor scelerisque. You may downgrade to our free plan at
                    the end of your 14-day paid plan trial.
                  </Typography>
                </Box>

                <Box className={classes.automatedMainBox}>
                  <Grid container spacing={4} alignItems="center">
                    {subscriptionDataList &&
                      subscriptionDataList?.map((data, i) => {
                        return (
                          <Grid item xs={12} md={4} sm={6}>
                            <Box key={i}>
                              <NewSubscriptioncrd
                                data={data}
                                type="timing"
                                index={i}
                              />
                            </Box>
                          </Grid>
                        );
                      })}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Paper>
    </Page>
  );
}
