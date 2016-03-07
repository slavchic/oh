$(function(){

	var $intervals_cont = $('#add_company_form_intervals')

	var days = {
				formNames: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
				titles: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
			},
			type = 'time';

	for (var i = 0; i < days.formNames.length; i++) {
		var $dayCont = $('<div>');

		$intervals_cont.append($dayCont);

		$dayCont.dateTimeIntervalsBuilder({
			name: days.formNames[i],
			type: type,
			title: days.titles[i]
		})
	}



})
