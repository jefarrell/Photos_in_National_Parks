

$(document).ready(function() {
	var map = L.map('map').setView([38.8945571,-97.3677515], 4);
	$.get('/mapauth', function(data) {
		var stamenLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
			attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
			minZoom: 4,
			id: data.leafletAccount,
			accessToken: data.leafletToken
		}).addTo(map);
	});
	map.scrollWheelZoom.disable();
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
