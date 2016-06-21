
// Got tons of helpful strategy from clhenrick here: 
// https://github.com/clhenrick/React-Leaflet-demo/blob/master/src/js/Map.js
var Card = require('./Card');
var L = require('leaflet');
var qwest = require('qwest');
var map;
var info;
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
      lat: '40.9584787',
      lon: '-95.8119861',
      zoom: 4,
      abv: '',
      name: 'National Park Service',
      est: '1916',
      states: '27 of 50 states have National Parks',
      visitors: '307',
      area: '131,250'
    };
  },


  componentDidMount: function() {

    // code to run just after adding the map to the DOM
    // instantiate the Leaflet map object
    this.init(this.getID());
  },


  componentWillReceiveProps: function(newProps) {
    // Update state and reset map as we receive new props from button clicks
    this.getData(newProps.parkAbv);
    this.setState({
      lat: newProps.parkLat,
      lon: newProps.parkLon,
      zoom: newProps.parkZoom,
      abv: newProps.parkAbv,
      name: newProps.parkName,
      visitors: newProps.vis,
      area: newProps.area,
      states: newProps.states,
      est: newProps.est
    });

    map.setView([newProps.parkLat, newProps.parkLon], newProps.parkZoom);
  },

  // load up appropriate geojson file, then call addData
  getData: function(parkAbv) {
    var self = this;
    qwest.get(parkAbv+'.geojson',null,{responseType:'json'})
      .then(function(xhr,res) {
        self.addData(res);
      }).catch(function(xhr, res, e) {
        console.log('qwest map catch: ', xhr, res, e);
      });  
  },

  // add data from geojson file to the map
  // also clear old data if applicable
  addData: function(data) {
    this.state.geojson = data;

    if (this.state.geojsonLayer && data) {
      this.state.geojsonLayer.clearLayers();
      this.state.geojsonLayer.addData(data);

    } else if (!this.state.geojsonLayer) {
      this.state.geojsonLayer = L.geoJson(data, {
        onEachFeature: this.onEachFeature,
        pointToLayer: this.pointToLayer
      }).addTo(map);
    }
    // zoom to feature here?
  },

  // set stylings for individual markers
  pointToLayer: function(feature, latlng) {

    var markerParams = {
      radius: 4,
      color: '#1f78b4',
      fillColor: '#e31a1c',
      weight: 1,
      opacity: 0.5,
      fillOpacity: 0.5
    };
    return L.circleMarker(latlng, markerParams);
  },

  // make a popup for each marker
  // it's going to load a photo from a url and show some user data
  onEachFeature: function(feature, layer) {

    var popup = '<img id="popupPic" src='+feature.properties.photo + '><br />' +
                '<span class="popup" id="popupUser"><a href="http://www.instagram.com/'+ feature.properties.user+'" target="_blank" >@' + feature.properties.user + '</a></span> <br />'
              +   '<span class="popup">' + feature.properties.time +'</span>' ;
    layer.bindPopup(popup);
  },
  

  getID: function() {
    return ReactDOM.findDOMNode(this).querySelectorAll('#map')[0];
  },

  // make the map
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

  // Render also makes our info Card to sit on top of the map
  render : function() {  
    return (
      <div id="mapUI">
        <Card name={this.state.name} est={this.state.est} vis={this.state.visitors} area={this.state.area} states={this.state.states}/>
        <div id="map" ></div>
      </div>
    );
  }
});

module.exports = Map;
