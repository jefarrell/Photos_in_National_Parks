

$(document).ready(function() {
	var southWest = L.latLng(25.0855988971, -132.01171875);
	var northEast = L.latLng(49.8096315636, -65.91796875);
	var bounds = L.latLngBounds(southWest, northEast);
	var map = L.map('map', {
		maxBounds: bounds,
		minZoom: 4
	}).setView([38.8945571,-97.3677515], 4);

	$.get('/mapauth', function(data) {
		var stamenLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
			attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
			id: data.leafletAccount,
			accessToken: data.leafletToken
		}).addTo(map);
	});
	map.scrollWheelZoom.disable();
});

// lat lon
// // nw =  49.8096315636, -132.01171875
// // se = 25.0855988971, -65.91796875
// ne = 49.8096315636, -65.91796875
// sw = 25.0855988971, -132.01171875
/*

$("#submit").click(function() {
	var n = $("#namefield").val();
	var v = $("#valfield").val();
	console.log("clicked - ", n, v);

	$.post('http://localhost:3000/api/create/'+n+'/'+v, function(data) {
		console.log("success! " + data);
	});
});

*/
