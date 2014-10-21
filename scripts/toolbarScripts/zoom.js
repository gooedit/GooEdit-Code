var zoomImg;
var ctx, zoomX, zoomY;
var height, width;
var zratio;
var isCropScaled = false;
var isZoom = false;

function onclickZoom(e) {
	if($(e.target).is('#ImageButtonZoom')) {
		if(!isSlider)
		{
		    removeBoldFromToolbarIcons();
			$('#ImageButtonZoom').css('background-color', '#ACB4C4');
			chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'Zoom' }, fecthZoomSlider);
			isSlider = true;
			isZoom = true;
		}
		else
		{
			$('#zoomImage').css('border', '');
			$('#zoomImage').remove();
			$('.gooEdit').show();
			$('#ImageButtonZoom').css('background-color', 'transparent');
			closeSlider();
			isZoom = false;
		}
	}

	if($(e.target).is('#ZoomButtonClose')) {
		$('#zoomImage').css('border', '');
		var $parent = $('.gooEdit').parent();
			if($parent.get(0).tagName == "A")
				$parent = $parent.parent();
		$parent.css('border', 'none');
		$('#zoomImage').remove();
		$('.gooEdit').show();
		$('#ImageButtonZoom').css('background-color', 'transparent');
		closeSlider();
		isZoom = false;
	}
}

function loadZoom()
{
	zoomImg = $('.gooEdit').get(0);

	width = zoomImg.width;
	height = zoomImg.height;

	var $parent = $('.gooEdit').parent();
	if($parent.get(0).tagName == "A")
		$parent = $parent.parent();
	$parent.append('<canvas class="ZoomImage" id="zoomImage"></canvas>');
	$('.ZoomImage').css('border', '3px solid blue');
	var canvas=document.getElementById('zoomImage');
	canvas.width = width;
	canvas.height = height;
	ctx=canvas.getContext('2d');
	console.log($('.gooEdit'));
	$('.gooEdit').hide();
	zoomX = 0;
	zoomY = 0;
	zratio = 1;
	ctx.drawImage(zoomImg,0,0,width,height);
}

var isZoomStart = false;
var zDeltaX = 0, zDeltaY = 0;
function onmousedownZoom(e) {
	if($(e.target).is('#zoomImage')) {
		isZoomStart = true;
		zDeltaX = e.offsetX;
		zDeltaY = e.offsetY;
	}
}

function onmousemoveZoom(e) {
	if($(e.target).is('#zoomImage') && isZoomStart) {
		zDeltaX = e.offsetX - zDeltaX;
		zDeltaY = e.offsetY - zDeltaY;
		if(zDeltaX > 0)
			zoomX+=(3 * zratio);
		else if(zDeltaX < 0)
		{
			zoomX-=(3 * zratio);
			zDeltaX = 0;
			zDeltaX = e.offsetX - zDeltaX;
		}
		if(zDeltaY > 0)
		{
			zoomY+=(3 * zratio);
		}
		else if(zDeltaY < 0)
		{
			zoomY-=(3 * zratio);
			zDeltaY = 0;
			zDeltaY = e.offsetY - zDeltaY;
		}
		if(zoomX >= 0)
			zoomX = 0;
		if(zoomY >= 0)
			zoomY = 0;
		if((-1)*zoomX >= width*zratio - width)
			zoomX = (-1)*(width*zratio - width);
		if((-1)*zoomY >= height*zratio - height)
			zoomY = (-1)*(height*zratio - height);
		//console.log("x:"+zoomX+", y:"+zoomY + ", width:" + width + ", height:" + height);
		ctx.drawImage(zoomImg,zoomX,zoomY,width*zratio,height*zratio);
	}
}

function onmouseupZoom(e) {
	if($(e.target).is('#zoomImage')) {
		zDeltaX = 0;
		zDeltaY = 0;
		isZoomStart = false;
	}
}

function fecthZoomSlider(data) {
	$('body').prepend(data);
	fixImagesSrcUrl('.zoomSlider');
	scrollSlider();
		$('#zratioSlider').slider({
						min: 1.0, 
						max: 5.0,
						value: 1.0,
						step: 0.5,
						change: function(event, ui){
							zratio = $("#zratioSlider" ).slider( "option", "value" );
							$('#value-zoom').val(zratio);							
							ctx.drawImage(zoomImg,0,0,width*zratio,height*zratio);
						}
	});
	$('.slider').slideDown('slow');
	loadZoom();
}