import React, { Component } from "react";
import Plot from "react-plotly.js";
let initSize = 0,
  x = initSize;
function getInitialArray(x = false) {
  var data = [];
  for (let i = 0; i < initSize; i += 1) {
    data.push(x ? i : 0);
  }
  return data;
}
export default class ECGPlot extends Component {
  state = {
    line1: {
      x: getInitialArray(true),
      y: getInitialArray(),
      name: "Line 1",
      showticklabels: false,
    },
    layout: {
      responsive: true,
      displaylogo: false,
      datarevision: 0,
    },
    revision: 0,
  };
  componentDidMount() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        let response = JSON.parse(xmlHttp.responseText);
        if (response.status == "success" && response.data) {
          let seriesData = response.data;
          let indexS1 = 0;

          let intervalS1 = setInterval(() => {
            for (let i = 0; i < 20; i++) {
              const { line1, layout } = this.state;
              line1.x.push(++x);
              line1.y.push(parseInt(seriesData["ecg_ch1"][++indexS1]));
              if (line1.x.length >= 600) {
                line1.x.shift();
                line1.y.shift();
              }
              this.setState({ revision: this.state.revision + 1 });
              layout.datarevision = this.state.revision + 1;
              if (indexS1 > seriesData["ecg_ch1"].length) {
                clearInterval(intervalS1);
                break;
              }
            }
          }, 125);
        }
      }
    };
    xmlHttp.open("GET", "http://192.168.2.127:4000/skiin/ECG", true); // true for asynchronous
    xmlHttp.send(null);
    // setInterval(this.increaseGraphic, 125);
  }
  rand = () => parseInt(Math.random() * 10 + this.state.revision, 10);
  increaseGraphic = () => {};
  render() {
    return (
      <div>
        <Plot
          className="plotly-chart"
          data={[this.state.line1]}
          layout={this.state.layout}
          revision={this.state.revision}
          graphDiv="graph"
          ref={(chart) => {
            console.log(chart);
          }}
        />
      </div>
    );
  }
}