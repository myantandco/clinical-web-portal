import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { SendRequest } from "./WebSocket/webSocket";
const useStyles = makeStyles((theme) => ({
  
}));

export default function ECGViewer() {
  useEffect(() => {
    SendRequest("get_connected_pods");
  });

  const options = {
    title: "",
    chart: {
      animation: false,
      events: {
        load: function () {
           // set up the updating of the chart each second
          //  var series = this.series[0];
          //  setInterval(function () {
          //      var x = (new Date()).getTime(), // current time
          //          y = Math.random();
          //      series.addPoint([x, y], true, true);
          //  }, 125);
        },
      },
    },
    mapNavigation: {
      enabled: true,
      enableButtons: false,
    },
    navigator: {
      series: [],
    },
    xAxis: {
      // min: 0,
      // max: 40,
      // startOnTick: false,
      // endOnTick: false,
      tickInterval: 45,
      minorTicks: true,
      minorTickInterval: 9,
      gridLineWidth: 1,
      gridLineColor: "#6CC5E9",
      lineWidth: 0,
      lineColor: "transparent",
      labels: {
        enabled: false,
      },
      title: {
        enabled: false,
      },
      minorTickLength: 0,
      tickLength: 0,
    },
    yAxis: {
      // min: 6530000,
      // max: 6560000,
      // startOnTick: false,
      // endOnTick: false,
      min: 0,
      max: 1,
      startOnTick: false,
      endOnTick: false,
      
      tickInterval: 1500,
      minorTicks: true,
      minorTickInterval: 300,
      gridLineWidth: 1,
      gridLineColor: "#6CC5E9",
      lineWidth: 0,
      lineColor: "transparent",
      labels: {
        enabled: false,
      },
      title: {
        enabled: false,
      },
      minorTickLength: 0,
      tickLength: 0,
    },
    plotOptions: {
      series: {
        showInNavigator: false,
        animation: false,
        connectNulls: true,
      },
      line: {
        events: {
          legendItemClick: function (event) {
            if (event.target.name === "ECG 1") {
              this.chart.series[1].hide();
              this.chart.series[2].hide();
            } else if (event.target.name === "ECG 2") {
              this.chart.series[0].hide();
              this.chart.series[2].hide();
            } else if (event.target.name === "ECG 3") {
              this.chart.series[0].hide();
              this.chart.series[1].hide();
            }
          },
        },
      },
    },
    series: [{
      name: 'Random data',
      data: (function () {
          // generate an array of random data
          var data = [],
              time = (new Date()).getTime(),
              i;

          for (i = -500; i <= 0; i += 1) {
              data.push({
                  x: time + i * 1000,
                  y: Math.random()
              });
          }
          return data;
      }())
    }],
    credits: { enabled: false },
  };
  const classes = useStyles();

  return (
    <HighchartsReact
        highcharts={Highcharts}
        options={options}
        // callback={(chart) => {
        //   this.mychart = chart;
        // }}
      />
  );
}
