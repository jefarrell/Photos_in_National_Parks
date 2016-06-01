var L = require('leaflet');
var map;
var config = {};

config.params = {
  center: [38.9566841,-96.1107177], 
  zoomControl: true,
  zoom: 10,
  maxZoom: 19,
  minZoom: 10,
  legends: true,
  infoControl: false,
  attributionControl: true
};

config.tileLayer = {
  uri: 'http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
  params: {
    minZoom: 10,
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    id: '',
    accessToken: ''
  }
};


var Map = React.createClass({
  getInitialState: function() {
    return {
      lat: this.props.parkLat,
      lon: this.props.parkLon,
      zoom: 10
    };
  },
  
  componentWillMount: function() {
    
    // code to run just before adding the map

  },

  componentDidMount: function() {

    // code to run just after adding the map to the DOM
    // instantiate the Leaflet map object
    this.init(this.getID());

    // this.getData();
  },

  componentWillReceiveProps: function(newProps) {

    // code to run just before updating the map
    map.setView([newProps.parkLat, newProps.parkLon], newProps.parkZoom);

  },

  componentWillUnmount: function() {
    
    // code to run just before removing the map

  },

  updateMap: function(parkLat,parkLon) {
    // change the subway line filter
    console.log("////");
    console.log(parkLat, parkLon);
    // if (line === "All lines") {
    //   line = "*";
    // }

    // this.state.filter = line;
    // this.setState({
    //   filter: this.state.filter
    // });
    // this.getData();
  },
  
  getID: function() {
    return ReactDOM.findDOMNode(this).querySelectorAll('#map')[0];
  },

  init: function(id) {
    var southWest = L.latLng(25.0855988971, -132.01171875);
    var northEast = L.latLng(49.8096315636, -65.91796875);
    var bounds = L.latLngBounds(southWest, northEast);

    map = L.map(id, {
      maxBounds: bounds,
      minZoom: 4
    }).setView([this.state.lat, this.state.lon], this.state.zoom)
    map.scrollWheelZoom.disable();
    L.control.scale({ position: "bottomleft"}).addTo(map);
    
    // set our state to include the tile layer
    this.state.tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);

    this.setState({
      tileLayer: this.state.tileLayer
    });
  },

  render : function() {
    console.log("*****  " + this.props.parkLat + ", " + this.props.parkLon);

    return (
      <div id="mapUI">
        <div id="map" ></div>
      </div>
    );
  }
});

module.exports = Map;
