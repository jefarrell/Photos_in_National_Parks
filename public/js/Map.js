
// Got tons of helpful strategy from clhenrick here: 
// https://github.com/clhenrick/React-Leaflet-demo/blob/master/src/js/Map.js
var Card = require('./Card');
var L = require('leaflet');
var moment = require('moment');
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

// Resize the map correctly when the window is changing
$(window).resize(function() {
    $("#map").height($(window).height()).width($(window).width());
});

var clicked = false;
enlarger = function() {
  var overDiv = document.createElement('div');
  overDiv.id = "overlayDiv";
  document.getElementById("mapUI").appendChild(overDiv);
  if (!clicked) {
    var popup = document.getElementsByClassName("leaflet-popup")[0];
    popup.style.visibility="hidden";
    var el = document.getElementById("popupPic").src;
    var newImg = document.createElement('IMG')
    newImg.id="newImg";
    newImg.src=el;
    document.getElementById("mapUI").appendChild(newImg)
    clicked = true;
  } else {
    //el.style.width = "250px"
    clicked = false;
  }
}

// Make a status spinner for use when loading data
var opts = {
  lines: 13,
  length:28,
  color:'#FFF',
  zIndex:2e9,
  className: 'spinner',
  left: '50%',
  top: '50%',
  Hwaccel: true
};

var s = new Spinner(opts); 
$('#loader').after(s.spin().el); s
$('.spinner').hide();


// State of the map drives both the Map view and the Card information
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

  // Build our map once component mounts to DOM
  componentDidMount: function() {
    this.init(this.getID());
  },

  // Receive new props from button clicks
  componentWillReceiveProps: function(newProps) {
    // First, get data to populate map
    this.getData(newProps.parkAbv);
    // Then update state with new props
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
    // Reset map view based on our new props
    map.setView([newProps.parkLat, newProps.parkLon], newProps.parkZoom);
  },

  // Load up appropriate geojson file as designated by new props, then call addData
  getData: function(parkAbv) {
   $('.spinner').show()
    var self = this;
    $.getJSON(parkAbv+'.geojson', function(data) {
      self.addData(data)
    }).done(function(){
      $('.spinner').hide();
    }); 
  },

  // Add data from geojson file to the map
  // Also clear old data if applicable
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
  },

  // Set stylings for individual markers
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

  // Make a popup for each marker
  // It's going to load a photo from a url and show some user data
  onEachFeature: function(feature, layer) {
    var postDate = moment(feature.properties.time).format('MMMM Do, YYYY');
    var popup = '<img id="popupPic" src='+feature.properties.photo + '><br />' +
                '<span class="popup" id="popupUser"><a href="http://www.instagram.com/' + 
                feature.properties.user+'" target="_blank" >@' + feature.properties.user + 
                '</a></span> <br />'
              +   '<span class="popup">' + postDate +'</span> <button id="testb" onClick="enlarger()">Click</button>';
    layer.bindPopup(popup);
  },
  
  // Grab the ID of the DOM element where we want to make the map
  getID: function() {
    return ReactDOM.findDOMNode(this).querySelectorAll('#map')[0];
  },

  // Make the map
  init: function(id) {
    // Make geographic bounding box
    var southWest = L.latLng(25.0855988971, -132.01171875);
    var northEast = L.latLng(49.8096315636, -65.91796875);
    var bounds = L.latLngBounds(southWest, northEast);

    map = L.map(id, {
      maxBounds: bounds,
      maxZoom: 16,
      minZoom: 4
    }).setView([this.state.lat, this.state.lon], this.state.zoom)
    map.scrollWheelZoom.disable();
    L.control.scale({ position: "bottomleft"}).addTo(map);
    
    // Set our state to include the tile layer
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
