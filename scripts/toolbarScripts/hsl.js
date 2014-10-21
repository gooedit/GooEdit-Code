
function onclickHSL(e)
{
	if($(e.target).is('#ImageButtonHue')) {
	    if (!isSlider) {
	        removeBoldFromToolbarIcons();
	        $('#ImageButtonHue').css('background-color', '#ACB4C4');
	        chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'HSL' }, fecthHSLSlider);
	        isSlider = true;
	    }
	    else {
	        $('#ImageButtonHue').css('background-color', 'transparent');
	        closeSlider();
	    }
	}
	
	if ($(e.target).is('#HSLButtonClose')) {
	    $('#ImageButtonHue').css('background-color', 'transparent');
		closeSlider();
	}

	if($(e.target).is('#HSLButton')) {
		loadHSL();
	}
}

function loadHSL() {
	setHSL();
}

function fecthHSLSlider(data) {
	$('body').prepend(data);
	fixImagesSrcUrl('.HSLSlider');
	scrollSlider();
	$('#hueSlider').slider({
						min: -180, 
						max: 180,
						slide: function (event, ui) {
						    var radius = $("#hueSlider").slider("option", "value");
						    $('#value-hue').val(radius);
						}
	});
	$('#satSlider').slider({
						min: -100, 
						max: 100,
						slide: function (event, ui) {
						    var radius = $("#satSlider").slider("option", "value");
						    $('#value-saturation').val(radius);
						}
	});
	$('#ligSlider').slider({
						min: -100, 
						max: 100,
						slide: function (event, ui) {
						    var radius = $("#ligSlider").slider("option", "value");
						    $('#value-lightness').val(radius);
						}
	});
	$('.slider').slideDown('slow');
}

function setHSL()
{
	var hue = $( "#hueSlider" ).slider( "option", "value" );
	var sat = $( "#satSlider" ).slider( "option", "value" );
	var lig = $("#ligSlider").slider("option", "value");

	showImageLoader();
	Pixastic.process($('.gooEdit')[0], "hsl", { hue: hue, saturation: sat, lightness: lig }, function () {
	    finishLoadImage();
	});
}