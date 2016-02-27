DateTimeIntervalsBuilder = function() {
	var o = this;

	o.datetimepickerOptions =  {
		time: {
			format: 'HH:mm',
			icons: {
				time: "fa fa-clock-o",
				up: "fa fa-arrow-up",
				down: "fa fa-arrow-down"
			}
		},
		day: {}
	}

	o.maxTimeIntervals = 3;

	o.init = function() {
		$('body').on('click', 'button[data-interval]', o.addRemoveTimeInterval)
		return o
	}

	o.buildIntervals = function (name, type, title) {
		var $cont = $('<div class="row mb30">'),
				$wrapper = $('<div class="clearfix" data-' + type + '-container="' + name + '">'),
				$label = $('<b class="col-sm-3">' + title + ' </b>'),
				$inp_cont_1 = $('<div class="col-sm-3">'),
				$inp_cont_2 = $('<div class="col-sm-3">'),
				$inp_1 = $('<input type="text" autocomplete="off" name="' + name + '" class="form-control ' + type + 'picker"/>'),
				$inp_2 = $('<input type="text" autocomplete="off" name="' + name + '" class="form-control ' + type + 'picker"/>'),
				$controls = $('<div class="col-sm-2">'),
				$remove_btn = $('<button type="button" class="btn btn-danger hidden" title="Remove interval" data-interval="remove" data-type="' + type + '"><i class="fa fa-minus-circle"></i></button>'),
				$add_btn = $('<button type="button" class="btn btn-primary" title="Add interval" data-interval="add" data-type="' + type + '"><i class="fa fa-plus-circle"></i></button>');

		$cont.append($wrapper)
		$wrapper.append($label, $inp_cont_1, $inp_cont_2, $controls)
		$inp_cont_1.append($inp_1)
		$inp_cont_2.append($inp_2)
		$controls.append($remove_btn, $add_btn)

		$add_btn.data('type', type)

		$inp_1.datetimepicker(o.datetimepickerOptions[type])
		$inp_2.datetimepicker(o.datetimepickerOptions[type])


		return $cont
	}

	o.updateIntervalBtns = function($cont) {
		var elementsCount = $cont.children().length;

		$cont.children().each(function (i, el) {
			var $el = $(el),
					$addBtn = $el.find('button[data-interval=add]'),
					$removeBtn = $el.find('button[data-interval=remove]');

			if (i == 0 && elementsCount == 1) {
				$addBtn.removeClass('hidden')
				$removeBtn.addClass('hidden')
			} else if (i == 0 && elementsCount > 1) {
				$addBtn.addClass('hidden')
				$removeBtn.addClass('hidden')
			} else if (i > 0 && i == elementsCount - 1 && elementsCount < o.maxTimeIntervals) {
				$addBtn.removeClass('hidden')
				$removeBtn.removeClass('hidden')
			} else if (i > 0 && i < elementsCount - 1 && elementsCount == o.maxTimeIntervals) {
				$addBtn.addClass('hidden')
				$removeBtn.removeClass('hidden')
			} else if (i > 0 && i == elementsCount - 1) {
				$addBtn.addClass('hidden')
				$removeBtn.removeClass('hidden')
			}
		})
	}
	o.addRemoveTimeInterval = function (e) {

		var $btn = $(this),
				intervalType = $btn.data('type'),
				$cont = $btn.parents('div[data-' + intervalType + '-container]'),
				$contParent = $cont.parent(),
				elementsCount = $cont.siblings().length;

		if ($btn.data('interval') == 'add') {

			if (elementsCount + 2 > o.maxTimeIntervals) return

			var $newIntervalCont = $cont.clone();

			$newIntervalCont.addClass('mt10')
			$newIntervalCont.find('b').text('')
			$newIntervalCont.find('.datetimepicker').datetimepicker(o.datetimepickerOptions[intervalType]);

			$cont.after($newIntervalCont)
		} else {
			dbg('$cont', $cont)
			$cont.remove()
		}
		o.updateIntervalBtns($contParent)
	}
	o.init()

	return o;
}

$(function(){
	dateTimeIntervalsBuilder = new DateTimeIntervalsBuilder()
})