import React, {useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ECGStream, getECGData, getChartObject } from "./WebSocket/webSocket";
import { lightningChart,
  DataPatterns,
  AxisScrollStrategies,
  SolidLine,
  SolidFill,
  ColorHEX,
  AutoCursorModes,
  Themes } from "@arction/lcjs";
import { createSampledDataGenerator } from '@arction/xydata'
import { TimeSeries, SmoothieChart } from "smoothie"
const useStyles = makeStyles((theme) => ({
  
}));
console.log(lightningChart)
export default function ECGViewer(props) {
  const ecgDataSubscription = useRef(null)
  useEffect(() => {
    console.log("props", props?.match?.params?.podid)
    // // Create a time series
    // var series1 = new TimeSeries();
    // var series2 = new TimeSeries();
    
    // // Find the canvas
    // var canvas = document.getElementById('chart');
    
    // Create the chart
    // var chart = new SmoothieChart();
    // chart.addTimeSeries(series1, { strokeStyle: 'rgba(255, 0, 0, 1)' });
    // // chart.addTimeSeries(series2, { strokeStyle: 'rgba(0, 255, 0, 1)' });
    // chart.streamTo(canvas, 500);
    // if(ecgDataSubscription.current == null) {
    //   ecgDataSubscription.current = getECGData().subscribe((ecgData)=> {
    //     try {
    //             if(ecgData) {
    //               if(ecgData.channel1) {
    //                 let channel1 = ecgData.channel1
    //                 let channel1Obj = getChartObject(channel1)
    //                 for (const [key, value] of Object.entries(channel1Obj)) {
    //                   // console.log(key, value)
    //                   for(let sampleValue of value) {
    //                     // let d = [(new Date()).getTime(), sampleValue]
    //                     // console.log(d)
    //                     // series.addPoint(d, true, true);
    //                     // series.add({ x: (new Date()).getTime(), y: sampleValue })
    //                     series1.append(Date.now(), sampleValue);
    //                   }
    //                 }
    //               }
    //             }
    //           } catch (e) {
    //             console.log(e)
    //           }
        
    //   })
    // }
    
    // SendRequest("get_connected_pods");
    // getConnectedPods();

   

    // Points that are used to generate a continuous stream of data.
    // const point = []
    // Create a data generator to supply a continuous stream of data.
    // createSampledDataGenerator(point, 1, 10)
    //   .setSamplingFrequency(1)
    //   .setInputData(point)
    //   .generate()
    //   .setStreamBatchSize(48)
    //   .setStreamInterval(50)
    //   .setStreamRepeat(true)
    //   .toStream()
    //   .forEach(point => {
    //       // Push the created points to the series.
    //       series.add({ x: point.timestamp, y: point.data.y })
    //   })
  //   ecgDataSubscription.current = getECGData().subscribe((ecgData)=> {
  //     try {
  //       if(ecgData) {
  //         if(ecgData.channel1) {
  //           let channel1 = ecgData.channel1
  //           let channel1Obj = parseData(channel1)
  //           for (const [key, value] of Object.entries(channel1Obj)) {
  //             // console.log(key, value)
  //             for(let sampleValue of value) {
  //               let d = [(new Date()).getTime(), sampleValue]
  //               console.log(d)
  //               // series.addPoint(d, true, true);
  //               series.add({ x: (new Date()).getTime(), y: sampleValue })
  //             }
  //           }
  //         }
  //       }
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   })


    ECGStream(parseInt(props?.match?.params?.podid), true);
    return () => {
      ECGStream(parseInt(props?.match?.params?.podid), false);
      if(ecgDataSubscription.current != null) {
        ecgDataSubscription.current.unsubscribe();
        ecgDataSubscription.current = null;
      }
    }
  });
  const initSize = 1800
  const getInitialArray = () => {
    var data = [];
    for (let i = 0; i < initSize; i += 1) {
      data.push(0);
    }
    return data;
  }
  const options = {
    title: "",
    chart: {
      animation: false,
      events: {
        load: function () {
          var series = this.series[0];
          if(ecgDataSubscription.current == null) {
            ecgDataSubscription.current = getECGData().subscribe((ecgData)=> {
              try {
                if(ecgData) {
                  if(ecgData.channel1) {
                    let channel1 = ecgData.channel1
                    let channel1Obj = getChartObject(channel1)
                    setTimeout(()=>{
                        if(series){
                        for (const [key, value] of Object.entries(channel1Obj)) {
                          // console.log(key, value)
                          for(let sampleValue of value) {
                            let d = [(new Date()).getTime(), sampleValue]
                            console.log(d)
                            series.addPoint(d, true, true);
                          }
                        }
                      }
                    }, 125)
                  }
                }
              } catch (e) {
                console.log(e)
              }
            })
          }
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
      // min: 0,
      // max: 1,
      // startOnTick: false,
      // endOnTick: false,
      
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
      data: getInitialArray()
    }],
    credits: { enabled: false },
  };
  const classes = useStyles();

  return (
    // <></>
    <HighchartsReact
        highcharts={Highcharts}
        options={options}
        // callback={(chart) => {
        //   this.mychart = chart;
        // }}
      />
    // <canvas id="chart" width="1000" height="300"></canvas>
  );
}
