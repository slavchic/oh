dbg = function () {
	console.log(arguments)
}
datetimepickerOptions = {
	time: {
		useCurrent: false,
		format: 'HH:mm',
		icons: {
			time: "fa fa-clock-o",
			up: "fa fa-arrow-up",
			down: "fa fa-arrow-down"
		}
	},
	date: {
		useCurrent: false,
		format: 'YYYY-MM-DD'
	}
}

function isEmpty(obj) {
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	// null and undefined are "empty"
	if (obj == null) return true;

	// Assume if it has a length property with a non-zero value
	// that that property is correct.
	if (obj.length > 0)    return false;
	if (obj.length === 0)  return true;

	// Otherwise, does it have any properties of its own?
	// Note that this doesn't handle
	// toString and valueOf enumeration bugs in IE < 9
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}

	return true;
}
$.fn.switchToggleClass = function (class_1, class_2) {
	var o = this;
	if (o.hasClass(class_1)) {
		o.removeClass(class_1);
		o.addClass(class_2);
	} else {
		o.removeClass(class_2);
		o.addClass(class_1);
	}
	return o;
};

fetchAddress = function (p, callback) {
	var Position = new google.maps.LatLng(p.coords.latitude, p.coords.longitude),
			Locater = new google.maps.Geocoder();

	Locater.geocode({'latLng': Position}, function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var _r = results[0];
			callback(_r.formatted_address)
		}
	});
}
getUserLocation = function (callback_fn) {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			fetchAddress(position, callback_fn);
		});
	}
}

$(function () {
	// fixed banner (affix)
	$(window).on('load scroll', function (e) {

		var $fixed_bns = $('.bn.right_fixed, .bn.aside_fixed');

		$fixed_bns.each(function(i, el){
			var $bn = $(el),
					offset_top_initial = $bn.data('offset-initial'),
					offset_top_end = $bn.data('offset-end'),
					offset_top_page = $(window).scrollTop(),
					was_calculated = $bn.data('was-calculated');

			if (offset_top_initial == 'calc' && e.type != 'load') return;
			if (offset_top_initial == 'calc' && e.type == 'load') {
				$bn.css('position', 'static')
				$bn.data('was-calculated', true)

				offset_top_initial = $bn.offset().top;
				if (offset_top_page <= offset_top_initial - offset_top_end) offset_top_end = 0

				$bn.data('offset-initial', offset_top_initial)
				$bn.css('position', 'fixed')

			}
			if (was_calculated && offset_top_page <= offset_top_initial - offset_top_end) offset_top_end = 0

			$bn.css('top', (offset_top_page <= offset_top_initial) ? offset_top_initial + offset_top_end - offset_top_page : offset_top_end)

		})

	})


	$('#header .search_toggle').click(function (e) {
		var $btn = $(this),
				$search_cont = $('#header .search_box');

		$btn.toggleClass('active fa-times');
		$search_cont.toggleClass('open');

	})

	$('.get_location_ico').click(function(e){
		var relatedInp = $(this).siblings('input[name=where]');
		getUserLocation(function (result) {
			relatedInp.val(result)
		});
		return false
	})

	$('[data-toggle="login_modal"]').click(function () {
			$('#login_modal').modal('show')
			return false
		}
	)
	$('#login_modal_forgot_btn, #login_modal_back_to_login_btn').click(function () {
		$('#login_modal_basic_form, #login_modal_forgot_form').slideToggle('fast')
	})

	$('label.bootstrap-toggle').on('click', function () { // fix for bootstrap-toggle label bug
		var for_inp = $('#' + $(this).attr('for'))[0];

		if (for_inp) for_inp.checked = !for_inp.checked
	})

	$(".select2").select2({
		width:'100%',
		minimumResultsForSearch: 5
	})

	$('select.select2').on('change', function () {
		$(this).trigger('blur')
	})

})