import React, { Component } from 'react';
import * as XLSX from 'xlsx';
import logo from './logo.svg';
import './App.css';
import LineChart from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';
// import MyMapComponent from './map';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MyMapComponent = withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
)

class App extends Component {
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  };  
  constructor(props){
    super(props);    
    this.state = {
      data:[{                 
        color: "#090909", 
        points: [{x:0,y:0}] 
      }]
    }
    this.readingExcel = this.readingExcel.bind(this);
  }

  readingExcel(){
    var fileToRead = document.getElementById('file').files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {         
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, {type:'binary'});        
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];        
        const data = XLSX.utils.sheet_to_json(ws, {header:1});        
        var temp = [];
        for(var i=1;i<data.length;i++){
          temp.push({
            x: data[i][0],
            y: data[i][5]
          });        
        }  
        this.setState({data: [{
              ...this.state.data,
              points:temp   
            }
          ]
        });
    };
    reader.readAsBinaryString(fileToRead);

  }


  render() {
    
    return (
      <div className="App">
        <input type="file" id="file"/>
        <button id="myBtn" onClick={this.readingExcel.bind(this)} >Draw Graph</button>
       
        <LineChart 
              hidePoints ="true"
              xMin = {0}
              xLabel = "time"
              yLabel = "velocity"
              width={1000}
              height={400}
              data={this.state.data}
          />

        <MyMapComponent isMarkerShown />
        <MyMapComponent isMarkerShown={false} />
      </div>
    );
  }
}

export default App;
