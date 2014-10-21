var frameImg = new Image();
var frameFirstTime = true;
var originalImg = new Image();
var selectedFont;
var selectedColor;
var selectedSize;
var selectedStyle;
var positionX;
var positionY;



function onclickText(e) {
    if ($(e.target).is('#ImageButtonText')) {
        if (!isSlider) {
            $('#ImageButtonText').css('background-color', '#ACB4C4');
            chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'text' }, fetchTextSlider);
            isSlider = true;
        }
        else {
            $('#ImageButtonText').css('background-color', 'transparent');
            closeSlider();
        }
    }

    if ($(e.target).is('#TextButtonClose')) {
        $('#ImageButtonText').css('background-color', 'transparent');
        closeSlider();
    }

    if ($(e.target).is('#textButton')) {
        setText();
    }

    if ($(e.target).is('#undoTextButton')) {
        undoAllTexts();
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

function undoAllTexts() {
    //for img use
    if ($(originalImg).is('img')) {
        $('.gooEdit').replaceWith(originalImg);
    }
    else { //for canvas use
        var destinationCanvas = $(".gooEdit").get(0);
        var destinationCtx = destinationCanvas.getContext('2d');
        destinationCtx.putImageData(originalImg, 0, 0);
    }
}

function fetchTextSlider(data) {
    handleClone();
    $('body').prepend(data);
    fixImagesSrcUrl('.textSlider');
    scrollSlider();
    $('.slider').slideDown('slow');
    $('#fontSelector').on('change', viewExampleText);
    $('#colorSelector').on('change', viewExampleText);
    $('#styleSelector').on('change', viewExampleText);
    $('#sizeSelector').on('change', viewExampleText);
    viewExampleText();
}

var viewExampleText = function () {
    selectedFont = document.getElementById("fontSelector").value;
    selectedColor = document.getElementById("colorSelector").value;
    selectedStyle = document.getElementById("styleSelector").value;
    selectedSize = document.getElementById("sizeSelector").value;
    setLabelExample();
}

function setLabelExample() {
    var frameDisplayArea = document.getElementById('exampleDisplayArea');
    frameDisplayArea.style.fontFamily = selectedFont;
    frameDisplayArea.style.color = selectedColor;
    frameDisplayArea.style.font = selectedStyle + " " + selectedSize + "px " + selectedFont;
}

function setText() {
    var text = document.getElementById("inputText").value;
    var canvas = document.createElement("canvas");
    canvas.width = $('.gooEdit')[0].width;
    canvas.height = $('.gooEdit')[0].height;
    var ctx = canvas.getContext("2d");
    ctx.font = selectedStyle + " " + selectedSize + "px " + selectedFont;
    console.log(ctx.font);
    ctx.fillStyle = selectedColor;
    ctx.fillText(text, positionX, positionY);
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

function onmousedownText(e) {
    if ($(e.target).is('.gooEdit')) {
        positionX = e.offsetX;
        positionY = e.offsetY;
        if (document.getElementById("msgLocation")) {

            document.getElementById("msgLocation").innerHTML = "Location: " + "X: " + positionX + " Y: " + positionY;
            document.getElementById("textButton").style.visibility = "visible";
            document.getElementById("undoTextButton").style.visibility = "visible";
        }

    }
}

