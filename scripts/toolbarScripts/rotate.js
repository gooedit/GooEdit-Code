
function onclickRotate(e) {
    if ($(e.target).is('#ImageButtonRLeft')) {

        showImageLoader();
        Pixastic.process($('.gooEdit')[0], "rotate", { angle: 90 }, function () {
            finishLoadImage();
        });

	}
    if ($(e.target).is('#ImageButtonRRight')) {

        showImageLoader();
        Pixastic.process($('.gooEdit')[0], "rotate", { angle: -90 }, function () {
            finishLoadImage();
        });

	}
    if ($(e.target).is('#ImageButtonFlipH')) {

        showImageLoader();
        Pixastic.process($('.gooEdit')[0], "fliph", { }, function () {
            finishLoadImage();
        });

	}
    if ($(e.target).is('#ImageButtonFlipV')) {

        showImageLoader();
        Pixastic.process($('.gooEdit')[0], "flipv", {}, function () {
            finishLoadImage();
        });

	}
	if($(e.target).is('#ImageButtonRotate')) {
	    if (!isSlider) {
	        removeBoldFromToolbarIcons();
	        $('#ImageButtonRotate').css('background-color', '#ACB4C4');
	        chrome.extension.sendRequest({ 'action': 'fetchRotate' }, fetchRotateSlider);
	        isSlider = true;
	    }
	    else {
	        $('#ImageButtonRotate').css('background-color', 'transparent');
	        closeSlider();
	    }
	}
	if ($(e.target).is('#RotateButtonClose')) {
	    $('#ImageButtonRotate').css('background-color', 'transparent');
		closeSlider();
	}
	if($(e.target).is('#rotateButton')) {
		var angle = new Number($('#rotateText').val());
		showImageLoader();
		Pixastic.process($('.gooEdit')[0], "rotate", { angle: angle }, function () {
		    finishLoadImage();
		});
	}
}

function fetchRotateSlider(data) {
	$('body').prepend(data);
	fixImagesSrcUrl('.rotateSlider');
	scrollSlider();
	$('#rotateSlider').slider({
						min: -360, 
						max: 360,
						change: function(event, ui) { 
							$('#rotateText').val($('#rotateSlider').slider( 'value' ));
						}
	});
	$('.slider').slideDown('slow');
}