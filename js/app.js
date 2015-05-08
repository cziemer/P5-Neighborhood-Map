/*
	* Model stores the data needed by the View to set Map Marker locations
*/
var model={
	attractions: [
		{ name: 'Magic Kingdom Park', lat: 28.417663, long: -81.581212, zoom: 11, fourID: '4b11d311f964a520758523e3'},
		{ name: 'EPCOT', lat: 28.374694, long: -81.549404, zoom: 11, fourID: '4b301d74f964a52053f624e3'},
		{ name: 'Disney Hollywood Studios', lat: 28.357529, long: -81.558271, zoom: 11, fourID: '4acb60d2f964a52094c320e3'},
		{ name: 'Disney Animal Kingdom', lat: 28.359719, long: -81.591313, zoom: 11, fourID: '4b058693f964a5206e6622e3'},
		{ name: 'Downtown Disney', lat: 28.370174, long: -81.521017, zoom: 11, fourID: '4ac9055ef964a52012be20e3'},
		{ name: 'Universal Studios Florida', lat: 28.474321, long: -81.467819, zoom: 11, fourID: '4ad62c90f964a5208c0521e3'},
		{ name: 'Universal Islands of Adventure', lat: 28.47114, long: -81.471565, zoom: 11, fourID: '4b59beb8f964a520c99528e3'},
		{ name: 'Universal CityWalk', lat: 28.4731495, long: -81.465465, zoom: 11, fourID: '4b058693f964a520726622e3'},
		{ name: 'Seaworld Orlando', lat: 28.411456, long: -81.461705, zoom: 11, fourID: '4b058692f964a520536622e3'},
		{ name: 'Fun Spot America', lat: 28.465445, long: -81.455462, zoom: 11, fourID: '4b058691f964a520446622e3'},
		{ name: 'Wet n Wild Orlando', lat: 28.461565, long: -81.465523, zoom: 11, fourID: '4b97ade0f964a520360f35e3'},
		{ name: 'Disney Typhoon Lagoon', lat: 28.365838, long: -81.529606, zoom: 11, fourID: '4b0586a2f964a520a66822e3'},
		{ name: 'Disney Blizzard Beach', lat: 28.351849, long: -81.575296, zoom: 11, fourID: '4b0586a2f964a520a56822e3'},
		{ name: 'Gatorland', lat: 28.355462, long: -81.403874, zoom: 11, fourID: '4b058691f964a5203a6622e3'},
		{ name: 'Aquatica', lat: 28.415581, long: -81.456631, zoom: 11, fourID: '4b0586a2f964a520a86822e3'},
		{ name: 'ESPN Wide World of Sports', lat: 28.337806, long: -81.551746, zoom: 11, fourID: '4b802c2bf964a520185930e3'},
		{ name: 'Wonderworks', lat: 28.433721, long: -81.471739, zoom: 11, fourID: '4b058693f964a520916622e3'},
		{ name: 'Holy Land Experience', lat: 28.495742, long: -81.432944, zoom: 11, fourID: '4b6de9eff964a520629b2ce3'}
	]
};

/*
	* Builds the HTML for the map InfoWindow
	* @param {object} map is the Google Maps object
	* @param {object} marker is the Google Maps Marker obect to build the infoWindow for
	* @param {string} fourID is the FourSquare ID for the location being built in infoWindow
*/
function buildContent(map, marker, fourID) {
	var name;
	var address;
	var phone;
	var desc;
	var url;
	var tmp;
	var photoArray = [];
	var a;
	var FSReqTimeout = setTimeout(function() {
	   		$iw-container.text("Failed to get FourSquare resources");
   		},8000);
   	
   	//build the FourSquare URL to get data
	var fsURL = "https://api.foursquare.com/v2/venues/" + fourID + "?client_id=1GDZWF2EXB4AHKVRWXSFXA5REWFR2KHC2TY3PTDW1IVSHORE&client_secret=EMPTPKLVHRRX2DYVHU4M3KUIDJ5YBJJVUQ05GSOUXF555KQN&v=20150506";
	$.getJSON(fsURL, function(data) {
		a = data.response.venue;
		name = a.name;
		address = a.location.formattedAddress;
		phone = a.contact.formattedPhone;
		desc = a.description;
		url = a.url;
		infoContent = "<div id='iw-container'><h2 class='iw-title'>" + name + "</h2>";
		if (address != undefined) {
			infoContent += address + "<br>";
		}
		if (phone != undefined) {
			infoContent += phone + "<br>";
		}
		if (url != undefined) {
			infoContent += "URL: <a href='" + url + "' target='_blank'>" + url + "</a><br>";
		}
		if(desc != undefined) {
			infoContent += "<p>" + desc + "</p>";
		}
		for (var i = 0; i < 6; i++) {
			infoContent += "<img src='" + a.photos.groups[0].items[i].prefix + "152x152" + a.photos.groups[0].items[i].suffix + "'>";
		}
		infoContent += "</div>";
		//Build the Marker by calling the function
		addMarkerListener(map, marker, fourID, infoContent);
		clearTimeout(FSReqTimeout);
	}).error(function(e){
		//Error retrieving FourSquare Data, build the marker reflecting that
		addMarkerListener(map, marker, fourID, "Sorry, Unable to load FourSquare Data");
	});
}

/*
	* Clears all current markers from the map object
	* @param {array} markers is an array of all current markers in the map
	* @return {array} markers is sent back as an empty array of markers
*/
function clearMarkers(markers){
	for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
    return markers;
}

/*
	* Adds a marker with needed infoWindow to the Google Maps object
	* @param {object} map is the Google Maps object
	* @param {object} marker is the Google Maps Marker obect to build the infoWindow for
	* @param {string} fourID is the FourSquare ID for the location being built in infoWindow
	* @param {string} infoContent is the HTML for the infoWindow build in the calling function
*/
function addMarkerListener(map, marker, fourID, infoContent) {
	var infoWindow;
	infowindow = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, 'click', function() {
		//buildContent(fourID);
		infowindow.setContent(infoContent);
		infowindow.open(map, marker);
		map.panTo(marker.position);
	});
	
	/*
	* The google.maps.event.addListener() event waits for
	* the creation of the infowindow HTML structure 'domready'
	* and before the opening of the infowindow defined styles
	* are applied.
	* Credit to http://en.marnoto.com/2014/09/5-formas-de-personalizar-infowindow.html
	*/
	google.maps.event.addListener(infowindow, 'domready', function() {

		// Reference to the DIV which receives the contents of the infowindow using jQuery
		var iwOuter = $('.gm-style-iw');
		
		/* The DIV we want to change is above the .gm-style-iw DIV.
		* So, we use jQuery and create a iwBackground variable,
		* and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
		*/
		var iwBackground = iwOuter.prev();
		
		// Remove the background shadow DIV
		iwBackground.children(':nth-child(2)').css({'display' : 'none'});
		
		// Remove the white background DIV
		iwBackground.children(':nth-child(4)').css({'display' : 'none'});
		
		// Taking advantage of the already established reference to
		// div .gm-style-iw with iwOuter variable.
		// You must set a new variable iwCloseBtn.
		// Using the .next() method of JQuery you reference the following div to .gm-style-iw.
		// Is this div that groups the close button elements.
		var iwCloseBtn = iwOuter.next();
		
		// Apply the desired effect to the close button
		iwCloseBtn.css({
			opacity: '1', // by default the close button has an opacity of 0.7
			right: '38px', top: '3px', // button repositioning
			border: '7px solid #48b5e9', // increasing button border and new color
			'border-radius': '13px', // circular effect
			'box-shadow': '0 0 5px #3990B9' // 3D effect to highlight the button
		});
		
		// The API automatically applies 0.7 opacity to the button after the mouseout event.
		// This function reverses this event to the desired value.
		iwCloseBtn.mouseout(function(){
			$(this).css({opacity: '1'});
		});
	});
}

/*
	* Sets all required markers for the Google Maps object
	* @param {object} map is the Google Maps object
	* @param {string} name is the Name for a marker
	* @param {long} lat is the latitude for the marker on the map object
	* @param {long} long is the longitude for the marker on the map object
	* @param {integer} z is the zoom level on the map object for the marker
	* @param {string} fourID is the FourSquare ID for the location being built in infoWindow
	* @return {object} returns the marker object created	
*/
function setMarkers(map, name, lat, long, z, fourID){
    var myLatLng = new google.maps.LatLng(lat, long);
    var marker = new google.maps.Marker({
	    position: myLatLng,
        map: map,
        title: name,
        zIndex: z
    });
    //build the infoWindow & content inside
    buildContent(map, marker, fourID);
	return marker;
}
    
var viewModel = function () {
    var self = this;
    var loc;
    self.filteredArray = ko.observableArray();
    self.filter = ko.observable('');
    self.markers = [];
    self.infoWindowContent = ko.pureComputed(function() {
	    return $("#infoWindow").html();
    });
    
    //Set variables for the map
    var mapOptions = {
		zoom: 12,
		center: new google.maps.LatLng(28.4117863, -81.5131844)
	};
	//Create the map object
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
	//The list of places as a result of the search - as an array
	self.filteredArray = ko.computed(function() {
		var filter = self.filter().toLowerCase();
		var tmpArray = [];
		//Check the search filter against our attractions list in the model
		for (var i = 0; i < model.attractions.length; i++) {
			loc = model.attractions[i];
			if (loc.name.toLowerCase().indexOf(filter) >= 0) {
				tmpArray.push(loc);
			}
		}
		self.markers = clearMarkers(self.markers);
		//Set markers for each place that matches the search results
		for (var i = 0; i < tmpArray.length; i++) {
			loc = tmpArray[i];
			self.markers.push(setMarkers(map, loc.name, loc.lat, loc.long, loc.z, loc.fourID));
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
				google.maps.event.trigger(self.markers[i], 'click');
			}
		}
	};
}
ko.applyBindings(new viewModel());