
// Cache elements
//----------------------
// var $coachBtn = $('#coach');
// var $athleteBtn = $('#athlete');
var $ctaBtn = $('.cta-btn');
var $ctaCancel = $('.cancel-cta');



// Coach vs Athlete CTA
//----------------------------
$ctaBtn.click(function(e){
	var targetId = $(this).attr('id');
	$('#'+ targetId +'-prompt').addClass('show');
});

$ctaCancel.click(function(e){
	$(this).parent('.cta-prompt').removeClass('show');
});


