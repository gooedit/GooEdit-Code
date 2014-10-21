var CropFirstTime = true;
var ctx;
var height, width;
var cropWidth, cropHeight;
var isCropScaled = false;

function onclickCrop(e)
{
	if($(e.target).is('#ImageButtonCrop')) {
	    if (!isSlider) {
	        removeBoldFromToolbarIcons();
	        $('#ImageButtonCrop').css('background-color', '#ACB4C4');
	        chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'Crop' }, fecthCropSlider);
	        isSlider = true;
	    }
	    else {
	        $('#ImageButtonCrop').css('background-color', 'transparent');
	        closeSlider();
	    }
	}
	
	if ($(e.target).is('#CropButtonClose')) {
	    $('#ImageButtonCrop').css('background-color', 'transparent');
		closeSlider();
	}
	
	if($(e.target).is('#cropButton')) {	
		$('#cropImage').css('border', '');
		$('#cropImage').remove();
		$('.gooEdit').show();

		showImageLoader();
		Pixastic.process($('.gooEdit')[0], "crop", { left:cropStartX, top:cropStartY, width:cropWidth, height:cropHeight }, function () {
		    finishLoadImage();
		});

		closeSlider();
	}
	
	if($(e.target).is('#cancelButton')) {
		$('#cropImage').css('border', '');
		$('#cropImage').remove();
		$('.gooEdit').show();
		closeSlider();
	}
}
var cropStartX, cropStartY, isCropStart = false;
function onmousedownCrop(e)
{
	if($(e.target).is('#cropImage')) {
		cropStartX = e.offsetX;
		cropStartY = e.offsetY;
		isCropStart = true;
	}
}

function onmousemoveCrop(e)
{
	if($(e.target).is('#cropImage')) {
		if(isCropStart) {
			ctx.drawImage(img,0,0,width,height);
			var w = e.offsetX - cropStartX;
			var h = e.offsetY - cropStartY;
			ctx.strokeRect (cropStartX, cropStartY, w, h);
			$('#label').html('x:'+e.clientX + ' y:'+e.clientY + ' <br />width:' + w + ' height:' + h);
		}
	}
}

function onmouseupCrop(e)
{
	if($(e.target).is('#cropImage')) {
		isCropStart = false;
		cropWidth = e.offsetX - cropStartX;
		cropHeight = e.offsetY - cropStartY;
		var currX = e.offsetX;
		var currY = e.offsetY;
		if (cropWidth < 0) {
			cropWidth *= (-1);
			cropStartX -= cropWidth;
			currX += cropWidth;
		}
		if (cropHeight < 0)  {
			cropHeight *= (-1);
			cropStartY -= cropHeight;
			currY += cropHeight;
		}
		ctx.drawImage(img,0,0,width,height);
		ctx.fillStyle="rgba(0,0,0,0.5)";
		ctx.fillRect(0,0,cropStartX,height);
		ctx.fillRect(cropStartX,0,width,cropStartY);
		ctx.fillRect(currX,cropStartY,width,height);
		ctx.fillRect(cropStartX, currY, cropWidth, height);
	}
}

function loadCrop() {
	img = $('.gooEdit').get(0);

	width = img.width;
	height = img.height;

	var $parent = $('.gooEdit').parent();
	if($parent.get(0).tagName == "A")
		$parent = $parent.parent();
	$parent.append('<canvas id="cropImage" class ="CropImg" style="cursor:crosshair"></canvas>');
	$('.CropImg').css('border', '5px solid blue');
	var canvas=document.getElementById('cropImage');
	canvas.width = width;
	canvas.height = height;
	ctx=canvas.getContext('2d');
	$('.gooEdit').hide();
	ctx.drawImage(img,0,0,width,height);
}

function fecthCropSlider(data) {
	$('body').prepend(data);
	fixImagesSrcUrl('.cropSlider');
	scrollSlider();
	$('.slider').slideDown('slow');
	loadCrop();
}

