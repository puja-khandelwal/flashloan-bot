import React, { useEffect, useState } from "react";
import { Box, makeStyles, Paper } from "@material-ui/core";
import Chart from "react-apexcharts";
import ButtonCircularProgress from "./ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    "& text": {
      fill: "#fff !important",
    },

    "& .apexcharts-menu ": {
      color: "#000 !important",
    },
  },
}));

export default function MetricsChart({ graphData, profit }) {
  const classes = useStyles();
  const [priceLists, setPriceList] = useState([]);
  const [months, setMonths] = useState([]);
  const [loader, setLoader] = useState(true);

  // console.log(graphData, "profit==========>>>>>>>>>>>>>>>>>", profit);
  // const PriceData =
  //   graphData.graphData && graphData.graphData.filter((month) => month.month);
  // console.log("PriceData======", PriceData);
  const graphArr = async () => {
    if (graphData) {
      // let PriceList = [];
      const list = graphData;
      if (list.length > 0) {
        // const add =
        const addMonths = await Promise.all(
          list.map(async (listData) => {
            // console.log(listData.month);
            // const monthss = `${listData.month} (${listData.year.slice(2)})`;
            // console.log(monthss);
            return listData.month;
          })
        );
        setMonths(addMonths);
        // console.log("add--------->", addMonths);
        const addPrice = await Promise.all(
          list.map(async (listData) => {
            // console.log(listData.month);
            return listData.totalPrice;
          })
        );
        const totalFalseTransaction = await Promise.all(
          list.map(async (listData) => {
            // console.log(listData.month);
            return listData.totalFalseTransaction;
          })
        );
        // console.log("add--------->", addPrice);
        if (profit) {
          setPriceList(addPrice);
        } else {
          setPriceList(totalFalseTransaction);
        }
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    graphArr();
  }, [graphData, profit]);

  const options = {
    series: [
      {
        name: "Desktops",
        data: [3, 5, 2, 5, 6, 2, 7, 2],
        // data: priceLists,
      },
    ],
    options: {
      chart: {
        height: 300,
        type: "line",
        zoom: {
          enabled: false,
        },
        categories: {
          color: "#fff",
          fontSize: "15px !important",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "PROFIT PERCENTAGE",
        align: "center",
        color: "#fff",
        fill: "#fff !important",
      },
      fill: {
        // text: "PROFIT PERCENTAGE",
        colors: ["#F44336", "#E91E63", "#9C27B0"],
      },
      grid: {
        row: {
          colors: ["#D5D7DB", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "jan",
          "fab",
          "mar",
          "apr",
          "may",
          "jun",
          "july",
          "aug",
          "sep",
          "oct",
          "nov",
          "dec",
        ],
        // categories: months,
      },
      noData: {
        text: "Loading...",
        color: "#fff",
      },
    },
  };

  // console.log("options.options,", options.options);
  // console.log("options.series,", options.series);
  return (
    <Box className={classes.mainBox}>
      <Paper
        style={{
          paddingTop: "16px",
          background: "#fff",
          boxShadow: "0 25px 70px rgba(0,0,0,.07)",
          // color: "#fff"
        }}
      >
        {loader && options?.options?.length == 0 ? (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "cnter",
              width: "100%",
            }}
          >
            <ButtonCircularProgress />
          </Box>
        ) : (
          <Chart
            options={options.options}
            series={options.series}
            style={{ fill: "#fff" }}
            type="line"
            height={300}
          />
        )}
      </Paper>
    </Box>
  );
}
