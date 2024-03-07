import React from "react";
import Chart from "react-apexcharts";
import './CustomerReview.css'
const CustomerReview = () => {
  const data = {
    series: [
      {
        name: "Booking",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
      },
    ],
    options: {
      chart: {
        type: "line",
      },
      xaxis: {
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
        ],
      },
    },
  };

  return (
    <div className="CustomerReview" id="areachart">
      <Chart options={data.options} series={data.series} type="bar" />
    </div>
  );
};

export default CustomerReview;
