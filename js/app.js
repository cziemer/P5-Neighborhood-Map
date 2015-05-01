var map;

function initialize() {
	var mapOptions = {
		zoom: 11,
		center: new google.maps.LatLng(28.4136874, -81.432309)
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);