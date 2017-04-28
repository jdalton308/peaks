
// Cache elements
//----------------------
var $ctaBtn = $('.cta-btn');
var $ctaCancel = $('.cancel-cta');

var $newsForm = $('#news-form-signup');
var $newsSubmit = $('#news-submit');
var $newsName = $('#news-name');
var $newsEmail = $('#news-email');
var $newsSuccess = $('#news-success');

var $contactForm = $('#contact-form');
var $contactSubmit = $('#contact-submit');
var $contactName = $('#contact-name');
var $contactEmail = $('#contact-email');
var $contactMessage = $('#contact-message');
var $contactSuccess = $('#contact-success');
var $contactError = $('#contact-error');
var $contactErrorMsg = $contactError.find('.error-message');



// Coach vs Athlete CTA
//----------------------------
(function(){

	$ctaBtn.click(function(e){
		var targetId = $(this).attr('id');
		$('#'+ targetId +'-prompt').addClass('show');
	});

	$ctaCancel.click(function(e){
		$(this).parent('.cta-prompt').removeClass('show');
	});

})();



// Newletter Signup
//---------------------------
(function(){
	function signupSuccess(){
		// Hide form
		$newsForm.addClass('hide');

		// Show success
		window.setTimeout(function(){
			$newsSuccess.addClass('show');
		}, 400);
	}

	function onNewsSignup(e) {
		var newSubscription = {
			name: $newsName.val(),
			email: $newsEmail.val(),
		};

		console.log('New Newsletter Signup: %o', newSubscription);

		// GA log
		ga('send', 'event', 'Newsletter Signup', 'submit', {
			hitCallback: function(){
				signupSuccess();
			}
		});
	}

	function validateSignupForm() {
		// Just check if a value is present in each
		var hasName = $newsName.val() !== '';
		var hasEmail = $newsEmail.val() !== '';
	 	
	 	var isValid = (hasName && hasEmail);

	 	if (isValid) {
	 		$newsSubmit.prop('disabled', false);
	 	}
		return isValid;
	}

	function validateInput(e) {
		var $this = $(this);
		var hasContent = $this.val() !== '';

		$this.toggleClass('valid', hasContent);
		validateSignupForm();
	}

	function bindNewsEvents() {
		// Validate fields
		$newsName.keyup(validateSignupForm);
		$newsEmail.keyup(validateSignupForm);

		// Submit form
		$newsSubmit.click(onNewsSignup);
	}


	// Init newsletter signup
	bindNewsEvents();

})();



// Contact Form
//------------------------
(function(){
	function onContactSubmit(e) {
		e.preventDefault();

		var formData = {
			name: $contactName.val(),
			email: $contactEmail.val(),
			message: $contactMessage.val(),
		};
		
		$.post( "contact-submit.php", formData)
			.done(function( data ) {
				var jsonResponse = JSON.parse(data);
				console.log('Post success: %o', jsonResponse);

				// Show success message
				$contactForm.addClass('hide');

				// Show success
				window.setTimeout(function(){
					$contactSuccess.addClass('show');
				}, 400);
			})
			.fail(function( response ){
				var errorResponse = JSON.parse(response);
				var errorMessage = errorResponse.error;
				console.log('Post failed: %o', errorResponse);

				// Show error message
				$contactErrorMsg.text(errorMessage);
				$contactError.addClass('show');
			});
	}

	function validateContactForm() {
		// Just check if a value is present in each
		var hasName = $contactName.val() !== '';
		var hasEmail = $contactEmail.val() !== '';
		var hasMessage = $contactMessage.val() !== '';
	 	
	 	var isValid = (hasName && hasEmail && hasMessage);

	 	if (isValid) {
	 		$contactSubmit.prop('disabled', false);
	 	}
		return isValid;
	}

	function validateInput(e) {
		var $this = $(this);
		var hasContent = $this.val() !== '';

		$this.toggleClass('valid', hasContent);
		validateContactForm();
	}

	function bindContactEvents() {
		// Watch inputs for enabling submit
		$contactName.keyup(validateInput);
		$contactEmail.keyup(validateInput);
		$contactMessage.keyup(validateInput);

		// Submit form
		$contactSubmit.click(onContactSubmit);
	}


	// Init contact form
	bindContactEvents();

})();