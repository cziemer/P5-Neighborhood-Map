function setMarkers(map, name, lat, long, z){
    var myLatLng = new google.maps.LatLng(lat, long);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: name,
        zIndex: z
    });
}
    
function AppViewModel() {
    var self = this;
    var loc;
    
    //Set variables for the map
    var mapOptions = {
		zoom: 12,
		center: new google.maps.LatLng(28.4117863, -81.5131844)
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
    self.places = ko.observableArray([
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
    ]);
    
    for (var i = 0; i < self.places().length; i++) {
	    loc = self.places()[i];
	    setMarkers(map, loc.name, loc.lat, loc.long, loc.z)
    }
}

ko.applyBindings(new AppViewModel());