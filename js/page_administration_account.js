$(function(){


	$("#password_change_toggle").click(function(){
		var $btn = $(this);

		if (!$btn.data('initial-txt')) $btn.data('initial-txt', $btn.text())

		var initial_txt = $btn.data('initial-txt'),
				cancel_txt = $btn.data('cancel-txt');

		if ($btn.text() == initial_txt) {
			$btn.text(cancel_txt)
		}else $btn.text(initial_txt);


		$btn.switchToggleClass('btn-danger', 'btn-default')
		$('#password_change_cont').slideToggle('fast')
	})

	var photo_uploader = new plupload.Uploader({
		runtimes: 'html5',
		browse_button: 'upload_userpic', // you can pass in id...
		//container: 'logger', // ... or DOM Element itself
		url: 'js/plugins/plupload/upload.php',
		filters: {
			max_file_size: '10mb',
			mime_types: [{title: "Image files", extensions: "jpg,gif,png"}]
		},
		init: {
			PostInit: function () {
				//dbg('start')
			},
			FilesAdded: function (up, files) {
				plupload.each(files, function (file) {
					dbg(file)
					//o.actions.photos.photo_create_uploader(file.id)
				});
				photo_uploader.start();
			},
			UploadProgress: function (up, file) {
				//o.dom.product_images_list[file.id].loading_line.style.width = file.percent + '%'
			},
			FileUploaded: function (up, file, response) {
				return;
				var uploader = o.dom.product_images_list[file.id].cont
				uploader.parentNode.removeChild(uploader)

				o.dom.product_images_list[file.id] = {}

				var response = eval('(' + response.response + ')')

				if (response.error && response.error.message) {
					alert(response.error.message)
				} else {
					o.pd.photos[file.id] = {
						id: file.id,
						small_url: response.small_url,
						med_url: response.med_url
					}

					o.actions.photos.photo_add(file.id)
				}
			},
			Error: function (up, err) {
				alert(err.message)
				//document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
			}
		}
	})
	photo_uploader.init()

	$('#account_form').validate({
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

			country: "required",
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
