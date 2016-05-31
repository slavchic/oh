$(function(){

	var $intervals_cont = $('#add_company_form_intervals')

	var days = {
				formNames: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
				titles: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
			},
			type = 'time';

	for (var i = 0; i < days.titles.length; i++) {
		var $dayCont = $('<div>'),
				s_dayNum = (i + 1).toString(),
				day_interval_vals = (schedule_data && schedule_data[s_dayNum]) ? schedule_data[s_dayNum] : null;

		$intervals_cont.append($dayCont);

		$dayCont.dateTimeIntervalsBuilder({
			name: 'days[' + (i + 1) + '][0][open]',
			type: type,
			title: _translation.days[i],
			intervals: (day_interval_vals) ? day_interval_vals : []
		})
	}



})
