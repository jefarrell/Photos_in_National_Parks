
// Got tons of helpful strategy from clhenrick here: 
// https://github.com/clhenrick/React-Leaflet-demo/blob/master/src/js/Map.js

var L = require('leaflet');
var qwest = require('qwest');
var map;
var config = {};

config.tileLayer = {
  uri: 'http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
  params: {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    id: '',
    accessToken: ''
  }
};


var Map = React.createClass({
  getInitialState: function() {
    return {
      tileLayer: null,
      geojsonLayer: null,
      geojson: null,
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

    // Change the map view as we receive props on each button click
    map.setView([newProps.parkLat, newProps.parkLon], newProps.parkZoom);

  },


  componentWillUnmount: function() {
    
    // code to run just before removing the map

  },


  getData: function(parkName) {
    var self = this;
    qwest.get(parkName+'.geojson',null,{responseType:'json'})
      .then(function(xhr,res) {
        self.addData(res);
      })
      .catch(function(xhr, res, e) {
        console.log('qwest catch: ', xhr, res, e);
      });  
  },


  addData: function(data) {
    this.state.geojson = data;

    if (this.state.geojsonLayer && data) {

      console.log("later && data");
      this.state.geojsonLayer.clearLayers();
      this.state.geojsonLayer.addData(data);

    } else if (!this.state.geojsonLayer) {

      console.log("else if");
      this.state.geojsonLayer = L.geoJson(data, {
        onEachFeature: this.onEachFeature,
        pointToLayer: this.pointToLayer
      }).addTo(map);
    }
    /*
     having problems with this setState
     this makes the map rerender over and over?
    */

    // this.setState({
    //   geojson: this.state.geojson,
    //   geojsonLayer: this.state.geojsonLayer
    // });

    // zoom to feature here?
  },

  pointToLayer: function(feature, latlng) {

    var markerParams = {
      radius: 4,
      fillColor: '#1f78b4',
      weight: 1,
      opacity: 0.5,
      fillOpacity: 0.5
    };
    return L.circleMarker(latlng, markerParams);
  },

  onEachFeature: function(feature, layer) {

    var popup = '<img id="popupPic" src='+feature.properties.photo + '><br />' +
                '<span class="popupTitle">User: </span>' + '<span class="popup">' + feature.properties.user + '</span> <br />'
              + '<span class="popupTitle">Date: </span>' + '<span class="popup">' + feature.properties.time +'</span>' ;
    layer.bindPopup(popup);
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
    this.getData(this.props.parkName);
    return (
      <div id="mapUI">
        <div id="map" ></div>
      </div>
    );
  }
});

module.exports = Map;
