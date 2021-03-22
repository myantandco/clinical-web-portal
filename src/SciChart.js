
import React, {useEffect, useRef, useState} from 'react';
import { ECGStream, getECGData, getChartObject } from "./WebSocket/webSocket";
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function SciChart(props) {
    const ecgDataSubscription = useRef(null)
    const dataLength = 100; // number of dataPoints visible at any point
    let chart = useRef(null)
    let timeout;
    // let chart
    const getData = () => {
        return [];
        let data = []
        for(let i=0;i<1000;i++) {
            data.push({x: Date.now(), y: 0})
        }
        return data
    }
    let dataPoints = getData();
    // const [dp, setDP] = useState([]);
    const options = {
        theme: "light2",
        title: {
            text: "ECG Data"
        },
        data: [{
            type: "line",
            dataPoints: dataPoints
        }],
        scales:{
            xAxes: [{
                display: false //this will remove all the x-axis grid lines
            }]
        }
     }
    
    useEffect(() => {
        if(ecgDataSubscription.current == null) {
            ecgDataSubscription.current = getECGData().subscribe((ecgData)=> {
              try {
                    if(ecgData) {
                        if(ecgData.channel1) {
                            let channel1 = ecgData.channel1
                            let channel1Obj = getChartObject(channel1)
                            for (const [key, value] of Object.entries(channel1Obj)) {
                                timeout = setTimeout(()=>{
                                    if(chart) {
                                        for(let sampleValue of value) {
                                            if(dataPoints.length > dataLength) {
                                                dataPoints.shift();
                                            }
                                            dataPoints.push({x: Date.now(), y: sampleValue});
                                            chart.render();
                                        }
                                    }
                                }, 125)
                            }
                        }
                    }       
                } catch (e) {
                    console.log(e)
                }
            })
        }
        ECGStream(parseInt(props?.match?.params?.podid), true);
        return () => {
            ECGStream(parseInt(props?.match?.params?.podid), false);
            if(ecgDataSubscription.current != null) {
                ecgDataSubscription.current.unsubscribe();
                ecgDataSubscription.current = null;
            }
            if(timeout) {
                clearTimeout(timeout);
            }
        }
    })

    return (
        <div>
        <CanvasJSChart options = {options}
         onRef = {ref => chart = ref}
        />
      </div>
    );
}