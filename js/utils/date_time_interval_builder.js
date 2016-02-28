$.fn.dateTimeIntervalsBuilder = function(options) {

	var o = {};

	o.$source_container = this;

	o.name = options.name;
	o.type = options.type;
	o.title = options.title;
	o.maxTimeIntervals = (options.maxTimeIntervals) ? options.maxTimeIntervals : 3;

	o.intervalContainersCount = 0;

	o.dom = {
		intervalContainers:{},
		$cont: $('<div class="row mb30">')
	}

	o.datetimepickerOptions =  {
		time: {
			format: 'HH:mm',
			icons: {
				time: "fa fa-clock-o",
				up: "fa fa-arrow-up",
				down: "fa fa-arrow-down"
			}
		},
		date: {
			format: 'YYYY.MM.DD'
		}
	}

	o.inputConfig = {
		time: {
			momentFormat: o.datetimepickerOptions.time.format,
			minLimit: '00:00',
			maxLimit: '23:59'
		},
		date: {
			momentFormat: o.datetimepickerOptions.date.format,
			minLimit: false,
			maxLimit: false
		}
	}

	o.$source_container.append(o.dom.$cont)


	o.addIntervalBlock = function () {
		o.intervalContainersCount++;

		var dic = o.dom.intervalContainers,
				container_id = 'cont_' + o.intervalContainersCount,
				bd = dic[container_id] = {}, // block dom
				containers_class = 'col-sm-3';



		bd.$wrapper = $('<div class="clearfix" data-container-id="' + container_id + '">')
		bd.$label = $('<label class="' + containers_class + '">' + o.title + ' </label>')
		bd.$inp_cont_1 = $('<div class="' + containers_class + '">')
		bd.$inp_cont_2 = $('<div class="' + containers_class + '">')
		bd.$inp_1 = $('<input type="text" autocomplete="off" name="' + name + '" class="form-control" placeholder="From"/>')
		bd.$inp_2 = $('<input type="text" autocomplete="off" name="' + name + '" class="form-control" placeholder="To"/>')
		bd.$controls = $('<div class="' + containers_class + '">')
		bd.$remove_btn = $('<button type="button" class="btn btn-danger mr5" title="Remove interval" data-action="remove"><i class="fa fa-minus-circle"></i></button>')
		bd.$add_btn = $('<button type="button" class="btn btn-primary" title="Add interval" data-action="add"><i class="fa fa-plus-circle"></i></button>');

		bd.$wrapper.append((o.title) ? bd.$label : null, bd.$inp_cont_1, bd.$inp_cont_2, bd.$controls)
		bd.$inp_cont_1.append(bd.$inp_1)
		bd.$inp_cont_2.append(bd.$inp_2)
		bd.$controls.append(bd.$remove_btn, bd.$add_btn)

		bd.$inp_1.datetimepicker(o.datetimepickerOptions[o.type])
		bd.$inp_2.datetimepicker(o.datetimepickerOptions[o.type])

		if (o.intervalContainersCount > 1) {
			bd.$wrapper.addClass('mt10')
			bd.$label.empty()
		}

		bd.$inp_1.add(bd.$inp_2).on('dp.change', function(){
			o.updateLimits()
			o.updateIntervalBtns()
		})

		o.dom.$cont.append(bd.$wrapper)

		o.updateIntervalBtns()

	}
	o.updateLimits = function () {
		var prev_cont_id,
				a_container_ids = [],
				cont_nav = {},
				counter = 0;

		for (var cont_id in o.dom.intervalContainers) {
			a_container_ids.push(cont_id)
		}
		for (var cont_id in o.dom.intervalContainers) {
			if (!cont_nav[cont_id]) cont_nav[cont_id] = {}
			cont_nav[cont_id].next = (a_container_ids[counter + 1])? a_container_ids[counter + 1] : null;
			cont_nav[cont_id].prev = (a_container_ids[counter - 1]) ? a_container_ids[counter - 1] : null;

			counter++
		}


		for (var cont_id in o.dom.intervalContainers) {
			var contDom = o.dom.intervalContainers[cont_id],
					prevContDom = o.dom.intervalContainers[cont_nav[cont_id].prev],
					nextContDom = o.dom.intervalContainers[cont_nav[cont_id].next],
					$inp_1 = contDom.$inp_1,
					$inp_2 = contDom.$inp_2,
					inp_1_val = $inp_1.val(),
					inp_2_val = $inp_2.val(),
					o_ic = o.inputConfig[o.type];


			if (!inp_1_val && prevContDom) {
				if (o.type == 'time') {
					var prev_inp2_hours = moment(prevContDom.$inp_2.val(), o_ic.momentFormat).get('hours');
					if (prev_inp2_hours < 23) $inp_1.data("DateTimePicker").date(moment(prevContDom.$inp_2.val(), o_ic.momentFormat).add(1, 'hour').format(o_ic.momentFormat))
				} else {
					var prev_inp2_day = moment(prevContDom.$inp_2.val(), o_ic.momentFormat).get('day');
					if (prev_inp2_day < 30) $inp_1.data("DateTimePicker").date(moment(prevContDom.$inp_2.val(), o_ic.momentFormat).add(1, 'day').format(o_ic.momentFormat))
				}

			}

			dbg(o.type, o_ic.minLimit, o_ic.maxLimit)
			var inp_1_minDate = (o_ic.minLimit) ? moment(o_ic.minLimit, o_ic.momentFormat) : false,
					inp_1_maxDate = false,
					inp_2_minDate = false,
					inp_2_maxDate = (o_ic.maxLimit) ? moment(o_ic.maxLimit, o_ic.momentFormat) : false,

					next_inp1_val = (nextContDom) ? nextContDom.$inp_1.val() : null,
					prev_inp2_val = (prevContDom) ? prevContDom.$inp_2.val() : null;
			//end of var

			if (inp_2_val)
				inp_1_maxDate = moment(inp_2_val, o_ic.momentFormat);

			if (inp_1_val)
				inp_2_minDate = moment(inp_1_val, o_ic.momentFormat);

			if (!prevContDom && !nextContDom) {
			} else if (!prevContDom && nextContDom) {
				if (next_inp1_val) inp_2_maxDate = moment(next_inp1_val, o_ic.momentFormat)
			} else if (prevContDom && next_inp1_val) {
				if (prev_inp2_val) inp_1_minDate = moment(prev_inp2_val, o_ic.momentFormat)
				if (next_inp1_val) inp_2_maxDate = moment(next_inp1_val, o_ic.momentFormat)
			} else if (prevContDom && !nextContDom) {
				if (prev_inp2_val) inp_1_minDate = moment(prev_inp2_val, o_ic.momentFormat)
			}

			$inp_1.data("DateTimePicker").minDate(inp_1_minDate)
			$inp_1.data("DateTimePicker").maxDate(inp_1_maxDate)
			$inp_2.data("DateTimePicker").minDate(inp_2_minDate)
			$inp_2.data("DateTimePicker").maxDate(inp_2_maxDate)
			if (!nextContDom && $inp_1.val() == $inp_2.val()) {
				$inp_2.val('')
			}
		}

	}
	o.updateIntervalBtns = function() {

		var elementsCount = o.dom.$cont.children().length;

		o.dom.$cont.children().each(function (i, wrapper) {
			var $wrapper = $(wrapper),
					container_id = $wrapper.data('container-id'),
					contDom = o.dom.intervalContainers[container_id],
					$addBtn = contDom.$add_btn,
					$removeBtn = contDom.$remove_btn;

			if (contDom.$inp_1.val() && contDom.$inp_2.val()) {
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
			} else {
				$addBtn.addClass('hidden')
				$removeBtn.addClass('hidden')
				if (i > 0) {
					$removeBtn.removeClass('hidden')
				}
			}

			if (contDom.$inp_2.val() == '23:59') {
				$addBtn.addClass('hidden')
			}
			if (o.maxTimeIntervals == 1) {
				$addBtn.addClass('hidden')
				$removeBtn.addClass('hidden')
			}

		})
		o.updateLimits()
	}
	o.addRemoveTimeInterval = function (e) {

		var $btn = $(this),
				$wrapper = $btn.parents('[data-container-id]'),
				container_id = $wrapper.data('container-id'),
				contDom = o.dom.intervalContainers[container_id];

		if ($btn.data('action') == 'add') {
			o.addIntervalBlock()
		} else {
			$wrapper.remove()
			delete o.dom.intervalContainers[container_id]
		}
		o.updateIntervalBtns()
	}

	o.addIntervalBlock()
	o.dom.$cont.on('click', 'button[data-action]', o.addRemoveTimeInterval)

	return o.$source_container

	//return o;
}

