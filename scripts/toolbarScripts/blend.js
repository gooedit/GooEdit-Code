var imgBlend = new Image();

function onclickBlend(e) {
    if ($(e.target).is('#ImageButtonBlend')) {
        if (!isSlider) {
            removeBoldFromToolbarIcons();
            $('#ImageButtonBlend').css('background-color', '#ACB4C4');
            chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'blend' }, fetchBlendSlider);
            isSlider = true;
        }
        else {
            $('#ImageButtonBlend').css('background-color', 'transparent');
            closeSlider();
        }
    }

    if ($(e.target).is('#blendButtonClose')) {
        closeSlider();
    }

    if ($(e.target).is('#blendButton')) {
        setBlend();
    }
}

function fetchBlendSlider(data) {
    $('body').prepend(data);
    fixImagesSrcUrl('.blendSlider');
    scrollSlider();

    $('.slider').slideDown('slow');

    $('#blendRadiusSlider').slider({
        min: 0.0,
        max: 1.0,
        value: 0,
        step: 0.1,
        slide: function (event, ui) {
            var radius = $("#blendRadiusSlider").slider("option", "value");
            $('#value-amount').val(radius);
        }
    });
}

function setBlend() {

    var amount = $('#value-amount').val();
    var mode = document.getElementById("value-mode").value;
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgBlend.src;
    var canvas = document.createElement("canvas");
    canvas.width = $('.gooEdit')[0].width;
    canvas.height = $('.gooEdit')[0].height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, $('.gooEdit')[0].width, $('.gooEdit')[0].height);

    showImageLoader();
    Pixastic.process($('.gooEdit')[0], "blend", {
        amount: amount,
        mode: mode,
        image: canvas
    }, function () {
        finishLoadImage();
    });
}

function changeImgBlend(e) {
    if ($(e.target).is('#fileInput')) {
        var fileInput = document.getElementById('fileInput');
        var fileDisplayArea = document.getElementById('fileDisplayArea');
        var file = fileInput.files[0];
        var imageType = /image.*/;
        if (file.type.match(imageType)) {
            document.getElementById("blendButton").disabled = false;
            var reader = new FileReader();
            reader.onload = function (e) {
                fileDisplayArea.innerHTML = "";
                imgBlend.height = 100;
                imgBlend.src = reader.result;
                fileDisplayArea.appendChild(imgBlend);
            }
            reader.readAsDataURL(file);
        } else {
            document.getElementById("blendButton").disabled = true;
            alert("File Not Supported");
            fileDisplayArea.innerHTML = "File not supported!"
        }
    }
}

