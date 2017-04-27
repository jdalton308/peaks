
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
var $contactSuccess = $('#contact-success');



// Coach vs Athlete CTA events
//----------------------------
// TODO: Hiding/showing animations
$ctaBtn.click(function(e){
	var targetId = $(this).attr('id');
	$('#'+ targetId +'-prompt').addClass('show');
});

$ctaCancel.click(function(e){
	$(this).parent('.cta-prompt').removeClass('show');
});



// Newletter Signup
//---------------------------
function signupSuccess(){
	// Hide form
	$newsForm.addClass('hide');

	// Show success
	window.setTimeout(function(){
		$newsSuccess.addClass('show');
	}, 400);
}

function newsSignup(e) {
	var newSubscription = {
		name: $newsName.val(),
		email: $newsEmail.val(),
	};

	// TODO: add form validation

	console.log('New Newsletter Signup: %o', newSubscription);

	// GA log
	ga('send', 'event', 'Newsletter Signup', 'submit', {
		hitCallback: function(){
			signupSuccess();
		}
	});
}

$newsSubmit.click(newsSignup);



// Contact Form
//------------------------
function contactSubmit(e) {

}