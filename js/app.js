function initialize() {
	var mapOptions = {
		zoom: 12,
		center: new google.maps.LatLng(28.4117863, -81.5131844)
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
	setMarkers(map, attractions);
}

/**
 * Data for the markers consisting of a name, a LatLng and a zIndex for
 * the order in which these markers should display on top of each
 * other.
 */
var attractions = [
  ['Magic Kingdom Park', 28.417663, -81.581212, 11],
  ['EPCOT', 28.374694, -81.549404, 11],
  ['Disney Hollywood Studios', 28.357529, -81.558271, 11],
  ['Disney Animal Kingdom', 28.359719, -81.591313, 11],
  ['Downtown Disney', 28.370174, -81.521017, 11],
  ['Universal Orlando Resort', 28.474321, -81.467819, 11],
  ['Universal Islands of Adventure', 28.47114, -81.471565, 11],
  ['Universal CityWalk', 28.4731495, -81.465465, 11],
  ['Seaworld Orlando', 28.411456, -81.461705, 11],
  ['Fun Spot America', 28.465445, -81.455462, 11],
  ['Wet n Wild Orlando', 28.461565, -81.465523, 11],
  ['Disney Typhoon Lagoon', 28.365838, -81.529606, 11],
  ['Disney Blizzard Beach', 28.351849, -81.575296, 11]
];

function setMarkers(map, locations) {
  // Add markers to the map
  for (var i = 0; i < attractions.length; i++) {
    var park = attractions[i];
    var myLatLng = new google.maps.LatLng(park[1], park[2]);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: park[0],
        zIndex: park[3]
    });
  }
}

google.maps.event.addDomListener(window, 'load', initialize);