dbg = function () {
	console.log(arguments)
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
$(function () {
	// fixed banner (affix)
	$(window).on('load scroll', function (e) {

		var $fixed_bn = $('.bn.right_fixed'),
				offset_top_initial = $fixed_bn.data('offset-initial'),
				offset_top_end = $fixed_bn.data('offset-end'),
				offset_top_page = $(this).scrollTop();

		$fixed_bn.css('top', (offset_top_page <= offset_top_initial) ? offset_top_initial + offset_top_end - offset_top_page : offset_top_end)
	})


	$('#header .search_toggle').click(function (e) {
		var $btn = $(this),
				$search_cont = $('#header .search_box');

		$btn.toggleClass('active fa-times');
		$search_cont.toggleClass('open');

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

	$(".select2").select2()

	$('select.select2').on('change', function () {
		$(this).trigger('blur')
	})

})