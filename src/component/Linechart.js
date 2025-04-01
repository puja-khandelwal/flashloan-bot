import React from "react";
import Chart from "react-apexcharts";
const LineChart = () => {
  const options = {
    chart: {
      id: "crypto-line",
      type: "line",
      height: 300,
      toolbar: {
        show: false, // Hide the chart toolbar
      },
    },
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      colors: undefined,
      width: 3,
      dashArray: 0,
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
    grid: {
      show: false,
    },
    colors: ["#36F097", "#1ED6FF", "#7D56E7"],
    xaxis: {
      show: true,
      labels: {
        show: true,
      },
      lines: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
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
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "bottom",
      horizontalAlign: "left",
      floating: false,
      fontSize: "12px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      offsetX: 0,
      offsetY: 10,
      labels: {
        colors: "#f5f5f5",
        useSeriesColors: false,
      },
      markers: {
        width: 22,
        height: 4,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 12,
        offsetX: -6,
        offsetY: -3,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 2,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  };
  const series = [
    {
      name: "X Score",
      data: [30, 52, 75, 80, 99, 108, 120, 129, 109, 125, 135],
    },
    {
      name: "Followers Statistics",
      data: [0, 0, 0, 18, 22, 36, 61, 94, 112, 142, 122],
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="line" />
    </div>
  );
};

export default LineChart;
