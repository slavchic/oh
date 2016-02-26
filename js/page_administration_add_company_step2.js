$(function(){

	var timePickerOptions = {
				format: 'HH:mm',
				icons: {
					time: "fa fa-clock-o",
					up: "fa fa-arrow-up",
					down: "fa fa-arrow-down"
				}
			},
			maxIntervals = 3;




	$('.datetimepicker').datetimepicker(timePickerOptions);

	function updateIntervalBtns($cont) {
		var elementsCount = $cont.children().length;

		$cont.children().each(function(i, el){
			var $el = $(el),
					$addBtn = $el.find('button[data-interval=add]'),
					$removeBtn = $el.find('button[data-interval=remove]');

			if (i == 0 && elementsCount == 1) {
				$addBtn.removeClass('hidden')
				$removeBtn.addClass('hidden')
			} else if (i == 0 && elementsCount > 1) {
				$addBtn.addClass('hidden')
				$removeBtn.addClass('hidden')
			} else if (i > 0 && i == elementsCount - 1 && elementsCount < maxIntervals) {
				$addBtn.removeClass('hidden')
				$removeBtn.removeClass('hidden')
			} else if (i > 0 && i < elementsCount - 1 && elementsCount == maxIntervals) {
				$addBtn.addClass('hidden')
				$removeBtn.removeClass('hidden')
			} else if (i > 0 && i == elementsCount - 1) {
				$addBtn.addClass('hidden')
				$removeBtn.removeClass('hidden')
			}
		})
	}
	function addRemoveTimeInterval(e) {

		var $btn = $(this),
				$cont = $btn.parents('div[data-day-container]'),
				$contParent = $cont.parent(),
				elementsCount = $cont.siblings().length;

		if ($btn.data('interval') == 'add') {

			if (elementsCount + 2 > maxIntervals) return

			var $newIntervalCont = $cont.clone();

			$newIntervalCont.addClass('mt10')
			$newIntervalCont.find('b').text('')
			$newIntervalCont.find('.datetimepicker').datetimepicker(timePickerOptions);

			$cont.after($newIntervalCont)
		} else {
			$cont.remove()
		}
		updateIntervalBtns($contParent)
	}

	$('form').on('click', 'button[data-interval]', addRemoveTimeInterval)


})
