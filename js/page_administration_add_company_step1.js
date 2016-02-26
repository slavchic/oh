$(function(){

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

	$('#add_company_form').validate({
		errorPlacement: function (error, element) {
			$(element).closest(".validation").append(error);
		},
		errorElement: "span",
		errorPlacement: function (error, element) {
			if (element.attr('name') == 'industry') element.parents('.activity').append(error.addClass('mt30'));
			else {
				error.appendTo(element.parent());
			}
		},
		rules: {
			company_name: "required",
			description: "required",
			email: {
				required: true,
				email: true
			},
			industry: {
				required: true,
				maxlength: 3
			},
			country: "required",
			city: "required",
			address: "required",
			zip: "required"
		},
		messages: {
			industry: {
				maxlength: "You can't select more than 3 items"
			}
		}
	})

	$('.activity input').on('change', function(e){
		var checkboxes = $('[name=industry]');
		checkboxes.filter(':unchecked').prop('disabled', (checkboxes.filter(':checked').length >= 3))
	})
	$('.activity input').change()

	$('#setDefaultAddressBtn').click(function(e){
		var defData = $(this).data('default-address').split(',');
		for (var i = 0; i < defData.length; i++) {
			var dataEl = defData[i].split('='),
					$elem = $('[name='+ dataEl[0] + ']');

			if ($elem.hasClass('select2')) {
				$elem.select2('val', dataEl[1])
			} else $elem.val(dataEl[1])

		}
	})

})
