import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Box,
  makeStyles,
  Typography,
  Grid,
} from "@material-ui/core";
import Slider from "react-slick";
import Page from "src/component/Page";
import PlanCard from "src/component/PlanCard";
import axios from "axios";
import ApiConfig from "src/config/APICongig";
import { UserContext } from "src/context/User";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useWeb3React } from "@web3-react/core";
import WalletConnectModal from "src/component/ConnectWallet/WalletConnectModal";
import { getWeb3Obj, AdminOwner, getWeb3Obj12 } from "src/utils";
import { WETHToken } from "src/constants/index";
import Web3 from "web3";
import NewSubscriptioncrd from "./NewSubscriptioncrd";
import { getAPIHandler } from "src/config/service";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    position: "relative",
    padding: "90px 0",
    zIndex: "999",

    [theme.breakpoints.down("md")]: {
      padding: "50px 0",
    },
  },

  textBox: {
    "& h2": {
      color: "rgba(65, 22, 67, 1)",
    },
  },
  subheading: {
    marginBottom: "48px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "10px",
    },
    "& p": {
      // color: theme.palette.primary.main,
      color: "#14133b",
      fontWeight: "400",
    },
  },
}));

export default function Bannner1() {
  const classes = useStyles();
  const [subscriptionDataList, setSubscriptionDataList] = useState([]);
  console.log("subscriptionDataList==>>", subscriptionDataList);
  const [isSubscriptionUpdating, setIsSubscriptionUpdating] = useState(false);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState({
    pages: 1,
    totalPages: 1,
  });

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

  const settings = {
    arrows: true,
    dots: false,
    centerMode: true,
    centerPadding: "0px",
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    infinite: true,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: "160px",
          // autoplay: true,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          centerPadding: "0px",
          // autoplay: true,
        },
      },
      {
        breakpoint: 1063,
        settings: {
          slidesToShow: 2,
          centerPadding: "20px",
          centerMode: true,
          centerPadding: "20px",
          autoplay: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          centerPadding: "20px",
          autoplay: true,
          arrows: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "20px",
          autoplay: true,
          arrows: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "0px",
          autoplay: true,
          arrows: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <Page title="Subscription">
      <Box className={classes.mainbox}>
        <img src="/images/subscriptionright.png" className="choosedBox" />

        <img src="/images/pricebottomimg-1.png" className="choosedbottomBox" />

        <Container maxWidth="md">
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
              <Box mt={1} className={classes.subheading}>
                <Typography
                  variant="body2"
                  style={{ maxWidth: "538px", color: "rgba(61, 61, 61, 1)" }}
                >
                  Malesuada nec, amet maecenas cras mauris porta nunc. Tempor at
                  tortor scelerisque. You may downgrade to our free plan at the
                  end of your 14-day paid plan trial.
                </Typography>
              </Box>

              <Box className={classes.automatedMainBox}>
                <Slider
                  {...settings}
                  className="slickbottomsliderNew albumslickbottomslider"
                >
                  {subscriptionDataList &&
                    subscriptionDataList?.map((data, i) => {
                      return (
                        <Grid item xs={12}>
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
                </Slider>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
}
