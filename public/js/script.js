

$(document).ready(function() {
	var map = L.map('map').setView([38.8945571,-97.3677515], 5);
	$.get('/mapauth', function(data) {
		L.tileLayer('https://api.tiles.mapbox.com/v4/'+data.leafletAccount+'/{z}/{x}/{y}.png?access_token='+ data.leafletToken, {
    		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    		maxZoom: 18,
    		id: data.leafletAccount,
    		accessToken: data.leafletToken
		}).addTo(map);
	});
});




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
