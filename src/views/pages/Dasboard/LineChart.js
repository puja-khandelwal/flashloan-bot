import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ReactApexChart from "react-apexcharts";

const useStyles = makeStyles((theme) => ({
  tablemainbox: {
    "& .activitysub": {
      padding: "20px",
      borderBottom: "1px solid #3A3939",
      "& svg": {
        fontSize: "20px",
      },
      "& h5": {
        fontWeight: "600",
        marginLeft: "10px",
      },
    },
  },
}));

const LineChart = () => {
  const classes = useStyles();

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Withdrawal",
        data: [31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42],
      },
      //   {
      //     name: "Deposit",
      //     data: [11, 32, 45, 32, 34, 52, 41, 11, 32, 45, 32, 34],
      //   },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      grid: {
        show: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#A2FF03"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      colors: ["#411643"],
      legend: {
        position: "top",
        horizontalAlign: "right",
        labels: {
          colors: "#411643 ",
          useSeriesColors: false,
        },
      },
      markers: {
        size: 2,
        hover: {
          size: 3,
        },
      },
      tooltip: {
        intersect: true,
        shared: false,
      },

      yaxis: {
        show: true,
        labels: {
          show: true,
        },
        lines: {
          show: false,
        },
        decimalsInFloat: 2,
      },
      xaxis: {
        type: "date",
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      fill: {
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.55,
          gradientToColors: [
            "#411643",
            "linear-gradient(180deg, #17565A 0%, rgba(23, 86, 90, 0.00) 100%)",
          ],
          inverseColors: false,
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100],
        },
      },
    },
  });

  return (
    <Box>
      <Box className={classes.tablemainbox}>
        <Box p={1}>
          <div id="chart">
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="area"
              height={350}
            />
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default LineChart;
