import React, { Component } from 'react';
import LineChart from 'react-linechart';
import '../../node_modules/react-linechart/dist/styles.css';

class MyChart extends Component {  
  constructor(props){
    super(props);    
  }
  render() {
    console.log(this.props.chartData);
    return (
      <div>       
        <LineChart 
              hidePoints ="true"
              xMin = {0}
              xLabel = "time"
              yLabel = "velocity"
              width={1000}
              height={400}
              data={this.props.chartData}
          />
      </div>
    );
  }
}

MyChart.defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11,
    chartData:[{                 
        color: "#090909", 
        points: [{x:0,y:0}] 
      }]
}
export default MyChart;
