(function ($) {
	
	'use strict';


	//Game start

	function start() {
		$('#start_modal').modal('hide');
	}

	$('#start_modal').modal('show');
	$('#start').click(start);


	//Form submission

	function submit() {
		$.post('qr_proc.php', {
			'qr': $('[name="qr"]').val(),
			'submit': 1
		}, response);
		return false;
	}

	function response(data) {
		if (data === '1') {
			var score = localStorage.getItem('score');
			if (score) {
				localStorage.setItem('score', score + 1);
			} else {
				localStorage.setItem('score', 1);
			}
		}
	}

	$('#qr_form').submit(submit);


	//QR conversion

	window.URL = window.URL || window.webkitURL;

	function showDialog() {
		$('#load_qr').click();
	}

	function loadQR() {
		var files = this.files;

		if (!files) {
			$('#file_reader_ns').modal('show');
			return;
		}

		if (!files.length) {
			return;
		}

		try {
			var imageURL = URL.createObjectURL(files[0]);
			qrcode.decode(imageURL);
		} catch (e) {
			$('#object_url_ns').modal('show');
		}
	}

	function converted(qr) {
		$('#qr').val(qr);
	}

	$('#get_qr').click(showDialog);
	$('#load_qr').on('change', loadQR);
	qrcode.callback = converted;

})(jQuery);