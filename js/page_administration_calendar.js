$(function () {

	var calendar = $('#calendar').fullCalendar({
		firstDay:1,
		axisFormat:'HH:mm',
		timeFormat: 'HH:mm',
		height: 750,
		defaultView:'month',
		//allDaySlot:false,
		firstHour:6,
			header: {
			left: 'prev,next today',
			center: 'title',
			right: 'addEvent'
		},
		customButtons: {
			addEvent: {
				text: 'Add event!',
				click: function () {
					alert('Add event modal');
				}
			}
		},
		selectable: true,
		selectHelper: true,
		selectOverlap: false,
		slotEventOverlap:false,

		views: {
			agenda: {
				slotDuration: "00:60:00"

			}
		},
		select: function (start, end) {
			var title = prompt('Event Title:');
			var eventData;
			if (title) {
				eventData = {
					title: title,
					start: start,
					end: end
				};
				$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
			}
			$('#calendar').fullCalendar('unselect');
		},
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		events: [
			{
				title: 'Closed - Super holidays',
				start: moment().day(+6).hours(8).minutes(0).format(), //'2016-02-01' '2016-02-09T16:00:00'
				end: moment().day(+6).hours(17).minutes(0).format() //'2016-02-01'
			},
			{
				title: 'Closed',
				start: moment().day(+4).hours(8).minutes(0).format(), //'2016-02-01' '2016-02-09T16:00:00'
				end: moment().day(+4).hours(12).minutes(0).format() //'2016-02-01'
			},
			{
				title: 'Closed - New year',
				start: moment().day(+4).hours(13).minutes(0).format(), //'2016-02-01' '2016-02-09T16:00:00'
				end: moment().day(+4).hours(16).minutes(0).format() //'2016-02-01'
			},
			{
				title: 'Closed - Christmas',
				start: moment().day(+2).hours(8).minutes(0).format(), //'2016-02-01' '2016-02-09T16:00:00'
				end: moment().day(+2).hours(20).minutes(0).format() //'2016-02-01'
			},
			{

				title: 'Closed - simply closed',
				start: moment().day(+1).hours(0).minutes(0).format(), //'2016-02-01' '2016-02-09T16:00:00'
				end: moment().day(+1).hours(23).minutes(59).format(), //'2016-02-01' '2016-02-09T16:00:00'
				allDay: true
			},
			{
				title: 'Closed',
				start: moment().day(0).hours(0).minutes(0).format(), //'2016-02-01' '2016-02-09T16:00:00'
				end: moment().day(0).hours(23).minutes(59).format() //'2016-02-01' '2016-02-09T16:00:00'
				//allDay: true
			}
		]
		// put your options and callbacks here
	});

	$('#calendar .fc-button').removeClass('fc-button fc-state-default fc-corner-left fc-corner-right').addClass('btn btn-primary')
	$('#calendar .fc-addEvent-button').addClass('btn-lg')

	$('[data-toggle="login_modal"]').click(function () {
			$('#login_modal').modal('show')
			return false
		}
	)

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