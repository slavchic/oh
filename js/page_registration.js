$(function () {

	function toggle_company_registration(e) {

		var ckb = $('#register_as_company_inp')[0],
				$company_reg_cont = $('.company_registration');

		dbg(ckb, ckb.checked, $company_reg_cont)
		if (ckb.checked) $company_reg_cont.slideDown()
		else $company_reg_cont.slideUp()
	}

	$('#register_as_company_inp').change(toggle_company_registration);
	toggle_company_registration()


	$('#register_form').validate({
		errorPlacement: function (error, element) {
			$(element).closest(".validation").append(error);
		},
		errorElement: "span",
		rules: {
			name: "required",
			surname: "required",
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 5
			},
			password_repeat: {
				required: true,
				minlength: 5,
				equalTo: "#reg_from_password"
			},

			company_name: "required",

			//country: "required",
			city: "required",
			address: "required",
			zip: "required",
			messages: {
				name: "Please accept our policy"
				//captcha: "Вы ввели неверный"
			}
		}
	})


})