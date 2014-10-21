var frameImg = new Image();
var frameFirstTime = true;
var originalImg = new Image();

function onclickFrame(e) {
    if ($(e.target).is('#ImageButtonFrame')) {
        if (!isSlider) {
            removeBoldFromToolbarIcons();
            $('#ImageButtonFrame').css('background-color', '#ACB4C4');
            chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'frame' }, fetchFrameSlider);
            isSlider = true;
        }
        else {
            $('#ImageButtonFrame').css('background-color', 'transparent');
            closeSlider();
        }
    }

    if ($(e.target).is('#frameButtonClose')) {
        $('#ImageButtonFrame').css('background-color', 'transparent');
        closeSlider();
    }

    if ($(e.target).is('#frameButton')) {
        setFrame();
        frameFirstTime = false;
    }
}

function handleClone() {
    var sourceImage = $(".gooEdit").get(0);

    if ($(sourceImage).is('img')) {
        originalImg = $(sourceImage).clone(); // for img
    } else {
        var sourceCanvas = sourceImage;
        var sourceCtx = sourceCanvas.getContext('2d');
        originalImg = sourceCtx.getImageData(0, 0, sourceCanvas.width - 1, sourceCanvas.height - 1);
    }
};


function fetchFrameSlider(data) {
    $('body').prepend(data);
    fixImagesSrcUrl('.frameSlider');
    scrollSlider();
    $('.slider').slideDown('slow');
    handleClone();
    $('#selectOpt').on('change', jsFunction);
}


var jsFunction = function () {
    var myselect = document.getElementById("selectOpt");
    setViewImage(myselect.options[myselect.selectedIndex].value);
}

function setViewImage(myselect) {
    var frameDisplayArea = document.getElementById('frameDisplayArea');
    frameDisplayArea.innerHTML = "";
    frameImg.height = 100;
    frameImg.src = chrome.extension.getURL('toolbars/images/borders/' + myselect + '.png');
    frameDisplayArea.appendChild(frameImg);
    document.getElementById("frameButton").disabled = false;
}

function setFrame() {
    //for img use
    if ($(originalImg).is('img')) {
        $('.gooEdit').replaceWith(originalImg);
    }
    else { //for canvas use
        var destinationCanvas = $(".gooEdit").get(0);
        var destinationCtx = destinationCanvas.getContext('2d');
        destinationCtx.putImageData(originalImg, 0, 0);
    }

    img = new Image();
    img.crossOrigin = "anonymous";
    img.src = frameImg.src;
    img.onload = function () {
        $('.gooEdit').css('border', "");
        var canvas = document.createElement("canvas");
        canvas.width = $('.gooEdit')[0].width;
        canvas.height = $('.gooEdit')[0].height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, $('.gooEdit')[0].width, $('.gooEdit')[0].height);
        var options = {
            amount: 1,
            mode: "normal",
            image: canvas
        }
        showImageLoader();
        Pixastic.process($('.gooEdit')[0], "blend", options, function () {
            $('.gooEdit').css('border', '3px solid blue');
            finishLoadImage();
        });
    }
}