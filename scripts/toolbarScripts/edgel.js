var EdgeLFirstTime = true;

function onclickEdgeL(e)
{
	if($(e.target).is('#ImageButtonEdgeL')) {
	    if (!isSlider) {
	        removeBoldFromToolbarIcons();
	        $('#ImageButtonEdgeL').css('background-color', '#ACB4C4');
	        chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'EdgeL' }, fecthEdgeLSlider);
	        isSlider = true;
	    }
	    else {
	        $('#ImageButtonEdgeL').css('background-color', 'transparent');
	        closeSlider();
	    }
	}
	
	if ($(e.target).is('#EdgeLButtonClose')) {
	    $('#ImageButtonEdgeL').css('background-color', 'transparent');
		closeSlider();
	}
	
	if($(e.target).is('#edgeLButton')) {
		if(!EdgeLFirstTime)
		{
			var temp = $('.gooEdit');
			Pixastic.revert(temp[0]);
		}
		setEdgeL();
		EdgeLFirstTime = false;
	}

}

function fecthEdgeLSlider(data) {
	$('body').prepend(data);
	fixImagesSrcUrl('.EdgeLSlider');
	$('#greySlider').slider({
						min: 0, 
						max: 255,
						value: 0,
						step: 1,
						slide: function(event, ui){
							var grey = $("#greySlider" ).slider( "option", "value" );
							$('#value-grey').val(grey);							
						}
						});
	$('#edgeSlider').slider({
						min: 0.0, 
						max: 5.0,
						value: 0.0,
						step: 0.1,
						slide: function(event, ui){
							var edge = $("#edgeSlider" ).slider( "option", "value" );
							$('#value-edge').val(edge);							
						}
						});
	scrollSlider();
	$('.slider').slideDown('slow');
}

function setEdgeL()
{
	var grey = $("#greySlider" ).slider( "option", "value" );
	var edge = $("#edgeSlider" ).slider( "option", "value" );
	var invert = $("#cbInvert").attr('checked');
	showImageLoader();
	Pixastic.process($('.gooEdit')[0], "laplace", { edgeStrength: edge, invert: invert, greyLevel: grey }, function () {
	    finishLoadImage();
	});
}