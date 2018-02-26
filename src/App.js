import React, { Component } from 'react';
import * as XLSX from 'xlsx';
import MyFancyComponent from './example';
import MyChart from './component/mychart';
import './App.css';
import MyMap from './component/mymap';

class App extends Component {
  constructor(props){
    super(props);    
    this.state = {
      chartData:[{                 
        color: "#090909", 
        points: [{x:0,y:0}] 
      }],
      MapPath:[
        {lat: 37.772, lng: -122.214},
        {lat: 21.291, lng: -157.821},
        {lat: -18.142, lng: 178.431},
        {lat: -27.467, lng: 4.373634}
      ],
      MapCenter:{
        lat: 51.988472, lng: 4.373634
      }
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
        var tempMap = [];
        var center = {};
        for(var i=1;i<data.length;i++){
          temp.push({
            x: data[i][0],
            y: data[i][5]
          });        
          tempMap.push({
            lat: Number(data[i][3]),
            lng: Number(data[i][4])
          });
          if(i > data.length/2 && i < data.length/2 +2){
            center = {
              lat: Number(data[i][3]),
              lng: Number(data[i][4])
            };
          }
          
        }  
        this.setState(
          {chartData: [{
              ...this.state.data,
              points:temp   
            }],
            MapPath: tempMap,
            MapCenter: center
        });        
    };
    reader.readAsBinaryString(fileToRead);
  }
  
  render() {
    return (
      <div className="App">
        <input type="file" id="file"/>
        <button id="myBtn" onClick={this.readingExcel.bind(this)} >Draw Graph</button>
        <MyChart chartData = {this.state.chartData} />  
        <MyMap MapPath = {this.state.MapPath} MapCenter = {this.state.MapCenter}/>      
      </div>
    );
  }
}

export default App;