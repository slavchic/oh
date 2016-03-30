$(function () {
	calendarEventEditor = function(){
		var o = this;

		o.eventData = null;

		o.time_interval_instance = null;

		o.dom = {
			$modal: $('#calendar-events-modal'),
			$form: $('#add_event_form')
		}

		o.init = function() {
			o.interface.initForm()
		}
		o.interface = {

			initForm: function(){
				$('#add_event_date').datetimepicker(datetimepickerOptions.date)



				$('#add_event_time_intervals').dateTimeIntervalsBuilder({
					name: 'time_intervals',
					type: 'time',
					title: 'Time intervals',
					maxTimeIntervals: 3
				})
				o.time_interval_instance = $('#add_event_time_intervals').dateTimeIntervalsBuilder('instance');

				$('#add_event_status').on('change', function (e) {
					var val = $(this).prop('checked'),
							$time_int_cont = $('#add_event_time_intervals');

					if (val) $time_int_cont.slideDown()
					else $time_int_cont.slideUp()
				})
				$('#add_event_status').change()
				$('#add_event_save_btn').click(o.actions.save)

				o.validator = o.dom.$form.validate({
					errorPlacement: function (error, element) {
						$(element).closest(".validation").append(error);
					},
					errorElement: "span",
					errorPlacement: function (error, element) {

						if (element.attr('name') == 'time_intervals')  {
							if (!o.dom.$modal.find('.time_intervals_error_cont')[0]) {
								var $cont = $('<div class="row time_intervals_error_cont"><div class="col-md-3"></div><div class="col-md-6"></div></div>'),
										$err_placement = $cont.find('div:nth-child(2)');
							} else {
								$err_placement = o.dom.$modal.find('.time_intervals_error_cont > div:nth-child(2)').empty()
							}


							$err_placement.append(error)
							$('#add_event_time_intervals').append($cont);
						} else {
							error.appendTo(element.parent());
						}
					},
					rules: {
						name: "required",
						regions: {
							require_from_group: [1, "select.require_from_group"]
						},
						companies: {
							require_from_group: [1, "select.require_from_group"]
						},
						date: {
							required: true,
							date: true
						},
						time_intervals: {
							time: true,
							require_from_group: [4, "[name=time_intervals]"]
						}
					},
					messages: {
						//industry: {
						//	maxlength: "You can't select more than 3 items"
						//}
					}
				})

				o.dom.$form.on('dti-add-block', function (e) {
					var time_intervals_containers = o.time_interval_instance.intervalContainersCount

					o.dom.$form.find('[name=time_intervals]').each(function(i, el){
						var $el = $(this);
						$el.rules('remove')
						$el.rules('add', {
							time: true,
							require_from_group: [time_intervals_containers * 2, "[name=time_intervals]"]
						})
					})
				})

			},
			open: function(eventData){
				o.methods.resetForm()

				if (eventData.start) {

					o.eventData = eventData;

					$('#add_event_name').val(eventData.title)
					$('#add_event_status').prop('checked', (eventData.status == 'opened') ? true : false).trigger('change')
					$('#add_event_date').val(moment(eventData.start).format(datetimepickerOptions.date.format))

					if (eventData.regions) $('#add_event_form_regions').val(eventData.regions).trigger('change')
					if (eventData.companies) $('#add_event_form_companies').val(eventData.companies).trigger('change')

					if (eventData.timeIntervals) {
						o.time_interval_instance.applyNewOptions({
							intervals: eventData.timeIntervals
						})
					}
				} else {
					$('#add_event_date').val(moment(eventData).format(datetimepickerOptions.date.format))
				}

				$('#calendar-events-modal').modal('show')

				return false
			}
		}
		o.methods = {
			resetForm: function(){
				o.dom.$modal.find('.select2').select2('val', '')
				o.validator.resetForm()
				o.dom.$form[0].reset();
				o.dom.$modal.find('.select2').trigger('change')
				$('#add_event_status').trigger('change')//bootstrapToggle('destroy').bootstrapToggle()
				o.time_interval_instance.reset()
			}
		}
		o.actions = {
			save: function(){
				dbg('save')
				var eventName = $('#add_event_name').val(),
						status = $('#add_event_status').prop('checked') ? 'opened' : 'closed',
						startDate = moment(o.dom.$modal.find('[name=date]').val()).format(datetimepickerOptions.date.format),
						regions = $('#add_event_form_regions').val(),
						companies = $('#add_event_form_companies').val(),
						timeIntervals = (status == 'opened') ? o.time_interval_instance.getValues() : null


				var eventData = {
					title: eventName,
					start: startDate,
					end: startDate,
					status: status,
					regions: regions,
					companies: companies
				};

				if (status == 'opened') eventData.timeIntervals = timeIntervals

				if (o.validator.form()) {
					$.ajax({
						type: "POST",
						url: "form_submiter.php",
						data: eventData,
						success: function (response) {
							$('#calendar').fullCalendar('renderEvent', eventData, true)
							o.dom.$modal.modal('hide')
							dbg(response);
						}
					});
				}
			}
		}
		o.init()
	}

	eventEditor = new calendarEventEditor()


	var calendar = $('#calendar').fullCalendar({
		firstDay:1,
		axisFormat:'HH:mm',
		timeFormat: 'HH:mm',
		height: 750,
		defaultView:'month',
		//allDaySlot:false,
		firstHour:6,
			header: {
			left: 'prev,next',//left: 'prev,next today',
			center: 'title',
			right: 'addEvent'
		},
		customButtons: {
			addEvent: {
				text: 'Add event!',
				click: eventEditor.interface.open
			}
		},
		selectable: true,
		//selectHelper: true,
		//selectOverlap: false,
		//slotEventOverlap:true,

		views: {
			agenda: {
				slotDuration: "00:60:00"

			}
		},
		eventClick: function (eventData, jsEvent, view) {
			eventEditor.interface.open(eventData)
			// change the border color just for fun
			//$(this).css('border-color', 'red');

		},
		select: function (start, end) {

			///dbg('select')
			eventEditor.interface.open(start)
			//var title = prompt('Event Title:');
			//var eventData;
			//if (title) {
			//	eventData = {
			//		title: title,
			//		start: start,
			//		end: end
			//	};
			//	$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
			//}
			//$('#calendar').fullCalendar('unselect');
		},
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		events: calendarEventsData
		// put your options and callbacks here
	});

	$('#calendar .fc-button').removeClass('fc-button fc-state-default fc-corner-left fc-corner-right').addClass('button md md-xs')
	$('#calendar .fc-addEvent-button').addClass('lg')



})

/// butstrap calendar example
//$(function () {
//
//	var options = {
//		events_source: 'js/plugins/bootstrap-calendar/events.json.php',
//		view: 'month',
//		tmpl_path: 'js/plugins/bootstrap-calendar/tmpls/',
//		tmpl_cache: false,
//		day: '2013-03-16',
//		first_day: 1,
//		weekbox: false,
//		display_week_numbers: false,
//		modal: '#calendar-events-modal',
//		onAfterEventsLoad: function (events) {
//			if (!events) {
//				return;
//			}
//			var list = $('#eventlist');
//			list.html('');
//
//			$.each(events, function (key, val) {
//				$(document.createElement('li'))
//					.html('<a href="' + val.url + '">' + val.title + '</a>')
//					.appendTo(list);
//			});
//		},
//		onAfterViewLoad: function (view) {
//			$('#calendar-title').text(this.getTitle());
//			$('.btn-group button').removeClass('active');
//			$('button[data-calendar-view="' + view + '"]').addClass('active');
//		},
//		classes: {
//			months: {
//				general: 'label'
//			}
//		}
//	};
//
//	var calendar = $('#calendar').calendar(options);
//
//	$('.btn-group button[data-calendar-nav]').each(function () {
//		var $this = $(this);
//		$this.click(function () {
//			calendar.navigate($this.data('calendar-nav'));
//		});
//	});
//
//	$('.btn-group button[data-calendar-view]').each(function () {
//		var $this = $(this);
//		$this.click(function () {
//			calendar.view($this.data('calendar-view'));
//		});
//	});
//	$('#events-in-modal').change(function () {
//		var val = $(this).is(':checked') ? $(this).val() : null;
//		calendar.setOptions({modal: val});
//	});
//	$('#events-modal .modal-header, #events-modal .modal-footer').click(function (e) {
//		//e.preventDefault();
//		//e.stopPropagation();
//	});
//
//})