var isOpen = false;
var lastTarget = null;
var lastBorderStyle = null;
var imgData = null;
var isImageLoad = false;
var isSlider = false;
var selectImageFromMenu = false;
var hrefArray = new Array;
var isMainToolbarFetched = false;
var isSliderInRight = false;
var GooEditcanvas;
var GooEditSrcUrl = "";
var isUploadSlider = false;
var isPixelInfo = false;
var imageCollection = new Array();
var indexOfImageCollection = 0;
var maxIndex = 0;
var isUndo = false; 
var fetchJustUploadTools = false;

chrome.extension.onRequest.addListener(
	function (request, sender, sendResponse) {
	    if (request.select == "true") {
	        selectImageFromMenu = true;
	    }
	});

// Globals Functions
function showImageLoader() {
    var img = $('.gooEdit').get(0);
    if (img) {
        var top = Math.round($(img).offset().top + img.height / 2);
        var left = Math.round($(img).offset().left + img.width / 2);
        $('#imageload').css('top', top + 'px');
        $('#imageload').css('left', left + 'px');
        $('#imageload').css('background-color', 'transparent');
        $('#imageload').show();
    }
}

function closeMainToolbar() {
    showImageLoader();
    $('.mainToolbar').hide("slide", { direction: "left" }, 1000, function () {
        $('body').css('padding-top', '0px');
        $('.mainToolbar').remove();
        isMainToolbarFetched = false;
        isImageLoad = false;
        $('.gooDesignButton').css('display', 'none');
        $('.gooEdit').css('border', lastBorderStyle);
        $('.gooEdit').removeClass();
        hideLoadingImage();
    });
}

function closeSlider() {
    showImageLoader();
    $('.slider').slideUp('slow', function () {
        $('.slider').remove();
        isSlider = false;
        isSliderInRight = false;
        hideLoadingImage();
    });
    closePixInfo();
    $('#zoomImage').remove();
    $('#cropImage').remove();
}

function closeUploadSlider() {
    showImageLoader();
    $('.uplaodSlider').slideUp('slow', function () {
        isUploadSlider = false;
        this.remove();
        hideLoadingImage();
    });
    closePixInfo();
}



function getScrollXY() {
    var scrOfX = 0, scrOfY = 0;
    if (typeof (window.pageYOffset) == 'number') {
        //Netscape compliant
        scrOfY = window.pageYOffset;
        scrOfX = window.pageXOffset;
    } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
        //DOM compliant
        scrOfY = document.body.scrollTop;
        scrOfX = document.body.scrollLeft;
    } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
        scrOfX = document.documentElement.scrollLeft;
    }
    return [scrOfX, scrOfY];
}

function removeBoldFromToolbarIcons() {

    $('.gooButton').css('background-color', 'transparent');
}

function fetchMainToolbar(data) {

    if (!isMainToolbarFetched) {
        $('body').prepend(data);
        fixImagesSrcUrl('.mainToolbar');
        $('body').css('padding-top', '38px');
        $('.mainToolbar').hide().show("slide", { direction: "left" }, 1000);
        isMainToolbarFetched = true;
    }

    if (fetchJustUploadTools) {
        fetchJustUploadTools = false;
        return;
    }

    var src = chrome.extension.getURL('images/imageload.gif')
    $('body').append('<div id="imageload" style="z-index: 9999999; position: absolute; display: none">' +
    			     '<img src="' + src + '" /></div>');
    scrollToolbar();
    loadImage();
}

function fixImagesSrcUrl(className) {
    $(className).find('img').each(function () {
        var src = $(this).attr('src');
        if (src.search('chrome-extension') == -1) {
            src = chrome.extension.getURL('toolbars/' + src);
            $(this).attr('src', src);
        }
    });
}

// Events
oncontextmenu = function (e) {
    if (e.ctrlKey && e.shiftKey) {
        e.preventDefault();
        chrome.extension.sendRequest({ 'action': 'fetchMainToolbar' }, fetchMainToolbar);
        fetchJustUploadTools = true;
        return;

    } else if (!e.ctrlKey && !e.shiftKey && e.altKey) {
        e.preventDefault();
    }
    else if (selectImageFromMenu) {
        e.preventDefault();
        selectImageFromMenu = false;
    }
    else {
        return;
    }
    selectImage(e);
}

function cloneGooImage(img) {
    
    var newImg = document.createElement("img");
    newImg.crossOrigin = "anonymous";
    newImg.width = img.width();
    newImg.height = img.height();
    $(newImg).addClass('gooEdit');

    newImg.onload = function () {
        $(img).replaceWith(newImg);
        console.log(newImg);
    }

    newImg.src = img.attr('src');

}

function convertImageToCanvas(img) {

    var newImg = document.createElement("img");
    newImg.crossOrigin = "anonymous";
    newImg.width = img.width;
    newImg.height = img.height;

    newImg.onload = function () {

        var canvas = document.createElement("canvas");
        canvas.width = newImg.width;
        canvas.height = newImg.height;
        canvas.getContext("2d").drawImage(newImg, 0, 0, newImg.width, newImg.height);
        $(canvas).addClass('gooEdit');

        $(img).replaceWith(canvas);
        //console.log(canvas);
    }

    newImg.src = $(img).attr('src');

}

function isSiteSecured(img) {
    //console.log(img);
    var isSiteSecured = false

    try {

        //      showImageLoader();
        Pixastic.process(img, "coloradjust", { red: 0, green: 0, blue: 0 }, function () {
            //            finishLoadImage();
        });

    } catch (ex) {
        console.log(ex);
        isSiteSecured = true;
        alert('This site has security issue that prevent from GooEdit the best performance, please GooEdit this image in a new tab');
        saveImageAs(img.src);
    }


    var strSecured = isSiteSecured ? 'secured' : 'not secured';
    var str = 'gooedit - this site is ' + strSecured;
    console.log(str);

    return isSiteSecured;

}

function initGooEditImage(img) {
    //console.log(img);
    GooEditSrcUrl = $(img).attr('src');

    chrome.extension.sendRequest({ 'action': 'fetchMainToolbar' }, fetchMainToolbar);
    if (lastTarget != null) {
        $(lastTarget).css('border', lastBorderStyle);
    }
    lastBorderStyle = $(img).css('border');
    isImageLoad = false;
    $('.gooDesignButton').css('display', 'none');
    if ($('.gooEdit').hasClass('gooEdit')) {
        $('.gooEdit').css('border', lastBorderStyle);
        $('.gooEdit').removeClass();
    }
    $(img).css('border', '3px solid blue');
    $(img).addClass('gooEdit');

    //cloneGooImage(img);
    convertImageToCanvas(img)
    lastTarget = img;

    imageCollection[indexOfImageCollection] = $($('.gooEdit').get(0)).clone();

}

function selectImage(e) {
    //console.log(e.target);
    if ($(e.target).is('img') || $(e.target).is('canvas')) {
        initGooEditImage(e.target);
    }
    else {
        var img = $(e.target).find('img');
        if (img) {
            //console.log(img.get(0));
            initGooEditImage(img.get(0));
        }
    }
}

function loadImage() {

    var img = $('.gooEdit').get(0);
    chrome.extension.sendRequest({ 'action': 'fetchImageEffect', 'src': img.src, 'width': img.width, 'height': img.height }, fetchLoadedImage);
    isImageLoad = true;
    $('.gooDesignButton').css('display', 'block');
    isSiteSecured(img);

}

function fetchLoadedImage(data) {
    var img = $('f').get(0);
    img.src = data;
}

function addToImageCollection() {
    if (isUndo)
    {
        maxIndex = indexOfImageCollection + 1;
        isUndo = false;

    }
    indexOfImageCollection++;
    imageCollection[indexOfImageCollection] = $('.gooEdit')[0];
}

function hideLoadingImage() {
    $('#imageload').hide();
}

function finishLoadImage() {
    addToImageCollection();
    hideLoadingImage();
}

onmouseover = function (e) {
    var target = $(e.target);
    if (target.is('.gooButton')) {
        target.addClass('gooButtonOver');
    }
}

onmouseout = function (e) {
    var target = $(e.target);
    if (target.is('.gooButton')) {
        target.removeClass('gooButtonOver');
    }
}

onmousedown = function (e) {
    onmousedownCrop(e);
    onmousedownZoom(e);
    onmousedownPixInfo(e);
    onmousedownText(e);
}

onchange = function (e) {
    changeImgBlend(e);
    changeImgUpload(e);
    //showimage(e);
}
onmousemove = function (e) {
    onmousemoveCrop(e);
    onmousemoveZoom(e);
}

onmouseup = function (e) {
    onmouseupCrop(e);
    onmouseupZoom(e);
    onmouseupPixInfo(e);

}

function closePixInfo() {
    $("table.cute-balloon").remove();
    $('#pixInfoImage').remove();
    var $parent = $('.gooEdit').parent();
    if ($parent.get(0).tagName == "A")
        $parent = $parent.parent();
    $parent.css('border', 'none');
    $('.gooEdit').show();
}

onclick = function (e) {
    var target = $(e.target);
    if ($(e.target).is('#ImageButtonSLeft')) {
        showImageLoader();
        closeMainToolbar();
        closeSlider();
        closeUploadSlider();
        if (isPixelInfo) {
            closePixInfo();

        }
        else if (isZoom) {
            $('#zoomImage').remove();
            $('.gooEdit').show();
            var $parent = $('.gooEdit').parent();
            if ($parent.get(0).tagName == "A")
                $parent = $parent.parent();
            $parent.css('border', 'none');
            isZoom = false;
        }

    }

    if ($(e.target).is('#ImageButtonReset')) {
        showImageLoader();
        var temp = $('.gooEdit');
        Pixastic.revert(temp[0])
        hideLoadingImage();
        $('#zoomImage').remove();
        $('.gooEdit').show();
    }

    if ($(e.target).is('#ImageButtonUndo')) {
        if (maxIndex < indexOfImageCollection) {
            maxIndex = indexOfImageCollection;
        }

        indexOfImageCollection--;
        if (indexOfImageCollection < 0) {
            indexOfImageCollection = 0;
        }

        $('.gooEdit').replaceWith(imageCollection[indexOfImageCollection]);
        $('.gooEdit').show();
		isUndo = true;
    }

    if ($(e.target).is('#ImageButtonRedo')) {

        indexOfImageCollection++;

        if (maxIndex < indexOfImageCollection) {
            indexOfImageCollection = maxIndex;
        }

        $('.gooEdit').replaceWith(imageCollection[indexOfImageCollection]);
        $('.gooEdit').show();
    }

    if ($(e.target).is('#ImageButtonSave')) {
        var canvas = $('.gooEdit').get(0);
        try {
            saveImageAs(canvas.toDataURL());
        }
        catch (err) {
            saveImageAs(canvas.src);
        }
    }

    if (target.is('.changeSliderPositionImg')) {
        changeSliderPosition();
    }

    onclickRotate(e);
    onclickBlur(e);
    onclickBlend(e);
    onclickSolarize(e);
    onclickSepia(e);
    onclickBriCon(e);
    onclickHSL(e);
    onclickCrop(e);
    onclickSharpen(e);
    onclickEdge1(e);
    onclickEdge2(e);
    onclickEdgeL(e);
    onclickNoise(e);
    onclickAdjustColor(e);
    onclickInvert(e);
    onclickRemoveNoise(e);
    onclickGray(e);
    onclickPointillize(e);
    onclickPixelInfo(e);
    onclickZoom(e);
    onclickTwitter(e);
    onclickMosaic(e);
    onclickFrame(e);
    onclickGlow(e);
    onclickEmboss(e);
    onclickUnsharpMask(e);
    onclickWebSite(e);
    onclickUplaod(e);
    onclickText(e);
    onclickFacebook(e)
}

function saveImageAs(imgOrURL) {
    window.open(imgOrURL);
}

onscroll = function (e) {
    scrollAll();
}

function scrollAll() {
    var pos = scrollToolbar();
    $('.slider').css('top', pos[1] + 33 + 'px');
}

function scrollToolbar() {
    var pos;

    pos = getScrollXY();
    $('.mainToolbar').css('top', pos[1] + 'px');
    return pos;
}

function scrollSlider() {
    var pos;

    pos = getScrollXY();
    $('.slider').css('top', pos[1] + 33 + 'px');
}

function sleep(milliSeconds) {
    var startTime = new Date().getTime(); // get the current time 
    while (new Date().getTime() < startTime + milliSeconds); // hog cpu 
}

function changeSliderPosition(target) {
    if (isSliderInRight) {
        $('.slider').animate({ 'left': '0px' }, 1000, function () {
            $('.changeSliderPositionImg').attr('src', chrome.extension.getURL('toolbars/images/forward_arrow_right.png'));
            isSliderInRight = false;
        });
    } else {
        $('.slider').animate({ 'left': $('.mainToolbar').width() - $('.slider').width() + 'px' }, 1000, function () {
            $('.changeSliderPositionImg').attr('src', chrome.extension.getURL('toolbars/images/forward_arrow_left.png'));
            isSliderInRight = true;
        });
    }
}


