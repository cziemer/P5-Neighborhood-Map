var model={
	attractions: [
		{ name: 'Magic Kingdom Park', lat: 28.417663, long: -81.581212, zoom: 11},
		{ name: 'EPCOT', lat: 28.374694, long: -81.549404, zoom: 11},
		{ name: 'Disney Hollywood Studios', lat: 28.357529, long: -81.558271, zoom: 11},
		{ name: 'Disney Animal Kingdom', lat: 28.359719, long: -81.591313, zoom: 11},
		{ name: 'Downtown Disney', lat: 28.370174, long: -81.521017, zoom: 11},
		{ name: 'Universal Orlando Resort', lat: 28.474321, long: -81.467819, zoom: 11},
		{ name: 'Universal Islands of Adventure', lat: 28.47114, long: -81.471565, zoom: 11},
		{ name: 'Universal CityWalk', lat: 28.4731495, long: -81.465465, zoom: 11},
		{ name: 'Seaworld Orlando', lat: 28.411456, long: -81.461705, zoom: 11},
		{ name: 'Fun Spot America', lat: 28.465445, long: -81.455462, zoom: 11},
		{ name: 'Wet n Wild Orlando', lat: 28.461565, long: -81.465523, zoom: 11},
		{ name: 'Disney Typhoon Lagoon', lat: 28.365838, long: -81.529606, zoom: 11},
		{ name: 'Disney Blizzard Beach', lat: 28.351849, long: -81.575296, zoom: 11}
	]
};

function createContent(name) {
	var contentString;
	contentString = "<h2>" + name + "</h2><hr>Some info here";
	
	return contentString;
}

function clearMarkers(markers){
	for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
    return markers;
}

function setMarkers(map, name, lat, long, z){
	var infoWindow;
    var myLatLng = new google.maps.LatLng(lat, long);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: name,
        zIndex: z
    });
    
    infowindow = new google.maps.InfoWindow();
    
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(createContent(name));
		infowindow.open(map, marker);
		map.panTo(marker.position);
	});
	return marker;
}
    
var viewModel = function () {
    var self = this;
    var loc;
    self.filteredArray = ko.observableArray();
    self.filter = ko.observable('');
    self.markers = [];
    
    //Set variables for the map
    var mapOptions = {
		zoom: 12,
		center: new google.maps.LatLng(28.4117863, -81.5131844)
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
	self.filteredArray = ko.computed(function() {
		var filter = self.filter().toLowerCase();
		var tmpArray = [];
		for (var i = 0; i < model.attractions.length; i++) {
			loc = model.attractions[i];
			if (loc.name.toLowerCase().indexOf(filter) >= 0) {
				tmpArray.push(loc);
			}
		}
		self.markers = clearMarkers(self.markers);
		for (var i = 0; i < tmpArray.length; i++) {
			loc = tmpArray[i];
			self.markers.push(setMarkers(map, loc.name, loc.lat, loc.long, loc.z));
		}
		return tmpArray;
    });
    
    // trigger click event to markers when list item is clicked
	self.clicked = function(place) {
		var clickedPlace = place.name.toLowerCase();
		var loc;
		//console.log(self.filteredArray()[1]);
		for (var i = 0; i < self.filteredArray().length; i++) {
			loc = self.filteredArray()[i].name.toLowerCase();
			if (clickedPlace === loc) {
				console.log(clickedPlace);
				console.log(loc);
				console.log(self.markers.length);
				google.maps.event.trigger(self.markers[i], 'click');
			}
		}
	};
}
ko.applyBindings(new viewModel());