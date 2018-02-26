import React, { Component } from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker,Polyline } from "react-google-maps"


const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCxdzcNWr4OGeOg8kFOcNfBB2Rt6tJCfFI&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>    
  <GoogleMap
    defaultZoom={3}
    defaultCenter={props.MapCenter}
  >           
    <Polyline        
        path= {props.MapPath}         
        geodesic= {true}
        strokeColor= {'#FF0000'}
        strokeOpacity= {1.0}
        strokeWeight= {2}
    />            
  </GoogleMap>
)

class MyMap extends Component {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  componentWillReceiveProps(newProps){
    console.log(newProps);
    this.props = newProps;
  }


  render() {      
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        MapPath = {this.props.MapPath}
        MapCenter = {this.props.MapCenter}
      />
    )
  }
}

MyMap.defaultProps = {
    MapPath:[
        {lat: 37.772, lng: -122.214},
        {lat: 21.291, lng: -157.821},
        {lat: -18.142, lng: 178.431},
        {lat: -27.467, lng: 153.027}
      ],
      MapCenter:{lat: -27.467, lng: 153.027}
}
export default MyMap;