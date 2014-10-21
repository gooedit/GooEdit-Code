
function onclickEdge1(e)
{
	if($(e.target).is('#ImageButtonEdge1')) {
	    if (!isSlider) {
	        removeBoldFromToolbarIcons();
	        $('#ImageButtonEdge1').css('background-color', '#ACB4C4');
	        chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'Edge1' }, fecthEdge1Slider);
	        isSlider = true;
	    }
	    else {
	        $('#ImageButtonEdge1').css('background-color', 'transparent');
	        closeSlider();
	    }
	}
	
	if ($(e.target).is('#Edge1ButtonClose')) {
	    $('#ImageButtonEdge1').css('background-color', 'transparent');
		closeSlider();
	}
	
	if($(e.target).is('#edge1Button')) {
		loadEdge1();
	}

}

function loadEdge1() {
	setEdge1();
}

function fecthEdge1Slider(data) {
	$('body').prepend(data);
	fixImagesSrcUrl('.Edge1Slider');
	scrollSlider();
	$('.slider').slideDown('slow');
}

function setEdge1()
{
	var mono = $('#cbMono').attr('checked');
	var invert = $('#cbInvert').attr('checked');
	showImageLoader();
	Pixastic.process($('.gooEdit')[0], "edges", {mono:mono, invert:invert}, function () {
	    finishLoadImage();
	});

}