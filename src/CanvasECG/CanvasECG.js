import React, { useRef, useEffect } from 'react'
import { ECGStream, getECGData, getChartObject } from "../WebSocket/webSocket";

const CanvasECG = props => {
  // let data = [14208, 26208, 38208, 50208, 62208, 8672, 1000]
  const canvasRef = useRef(null)
  let canvas
  let ctx
  const ecgDataSubscription = useRef(null)
  var xPlot = 10;
  var timer = 0;
  useEffect(() => {
    console.log("props", props?.match?.params?.podid)
    if(ecgDataSubscription.current == null) {
      ecgDataSubscription.current = getECGData().subscribe((ecgData)=> {
        try {
          if(ecgData) {
            if(ecgData.channel1) {
              let channel1 = ecgData.channel1
              let channel1Obj = getChartObject(channel1)
              for (const [key, value] of Object.entries(channel1Obj)) {
                setTimeout(()=>{
                  if(ecgDataSubscription.current) {
                    drawChart(value)
                  }
                }, timer+=1000)
                
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
    }
  });
  
  useEffect(() => {
    canvas = canvasRef.current
    ctx = canvas.getContext('2d')
    canvas.width = 1200;
    canvas.height = 500;
    canvas.style.backgroundColor = "#ededed";
    drawGrids();
  }, [])

  const drawGrids = () => {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let xGrid = 10, yGrid = 10, cellSize = 10;
    while (xGrid < canvas.width) {
      ctx.moveTo(0, xGrid);
      if(xGrid%50==0) {
        ctx.lineTo(canvas.width, xGrid);  
      }
      ctx.lineTo(canvas.width, xGrid);
      xGrid += cellSize;
    }
    while (yGrid < canvas.width) {
      ctx.moveTo(yGrid, 0);
      ctx.lineTo(yGrid, canvas.height);
      yGrid += cellSize;
    }
    ctx.strokeStyle = "#ffcdd2";
    ctx.stroke();
    drawMajorGrids();
  }

  const drawMajorGrids = () => {
    ctx.beginPath();
    let xGrid = 10, yGrid = 10, cellSize = 50;
    while (xGrid < canvas.width) {
      ctx.moveTo(0, xGrid);
      ctx.lineTo(canvas.width, xGrid);
      xGrid += cellSize;
    }
    while (yGrid < canvas.width) {
      ctx.moveTo(yGrid, 0);
      ctx.lineTo(yGrid, canvas.height);
      yGrid += cellSize;
    }
    ctx.strokeStyle = "#ef9a9a";
    ctx.stroke();
  }

  const blocks = (count) => {
    return count * 10;
  } 

  const drawChart = (sampleData) => {
    console.log("drawing")
    console.log(xPlot)
    if(xPlot == 10) {
      ctx.beginPath();
      ctx.strokeStyle = "#37474f";
      ctx.moveTo(blocks(5), blocks(20))
    }
    for (let sample of sampleData) {
      var population = sample/2000;
      ctx.lineTo(blocks(xPlot), blocks(40-population))
      xPlot+=1
      ctx.stroke();
      if(xPlot > 120) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.stroke();
        ctx.moveTo(blocks(5), blocks(20))
        xPlot = 10
        drawGrids()
        ctx.beginPath();
        ctx.strokeStyle = "#37474f";
      }
    }
  }
  return <canvas ref={canvasRef} {...props}/>
}

export default CanvasECG