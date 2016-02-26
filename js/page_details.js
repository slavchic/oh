$(function () {
  function initialize() {
	var mapOptions = {
	  zoom: 10,
	  center: new google.maps.LatLng(-33.9, 151.2)
	}
	var map = new google.maps.Map(document.getElementById('map-canvas'),
	  mapOptions);

	setMarkers(map, temp_locations);
  }

  var temp_locations = [
	['Bondi Beach', -33.890542, 151.274856, 4]
  ];

  function setMarkers(map, locations) {
	for (var i = 0; i < locations.length; i++) {
	  var beach = locations[i];
	  var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
	  var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		title: beach[0],
		zIndex: beach[3]
	  });
	}
  }

  google.maps.event.addDomListener(window, 'load', initialize);
})