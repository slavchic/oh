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


	$('a.report_btn').click(function(){
		$('#report-modal').modal('show')
		return false
	})
	$('#send_message_btn').click(function () {
		$('#send-message-modal').modal('show')
		return false
	})
	$('#report_form').validate({
		errorPlacement: function (error, element) {
			$(element).closest(".validation").append(error);
		},
		errorElement: "span",
		rules: {
			problem: "required",
			comment: "required",
			messages: {
				name: "Please accept our policy"
				//captcha: "Вы ввели неверный"
			}
		}
	})
	$('#send_message_form').validate({
		errorPlacement: function (error, element) {
			$(element).closest(".validation").append(error);
		},
		errorElement: "span",
		rules: {
			email: {
				required: true,
				email: true
			},
			comment: "required",
			messages: {
				name: "Please accept our policy"
				//captcha: "Вы ввели неверный"
			}
		}
	})

})