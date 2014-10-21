var AdjustFirstTime = true;

function onclickAdjustColor(e) {
    if ($(e.target).is('#ImageButtonAdjustColor')) {
        if (!isSlider) {
            removeBoldFromToolbarIcons();
            $('#ImageButtonAdjustColor').css('background-color', '#ACB4C4');
            chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'ColorAdjust' }, fetchAdjustColorSlider);
            isSlider = true;
        }
        else {
            $('#ImageButtonAdjustColor').css('background-color', 'transparent');
            closeSlider();
        }
    }

    if ($(e.target).is('#AdjustColorButtonClose')) {
        $('#ImageButtonAdjustColor').css('background-color', 'transparent');
        closeSlider();
    }

    if ($(e.target).is('#adjustColor')) {
        setAdjustColor();
    }

    if ($(e.target).is('#reset')) {
        setAdjustColor();
    }
}

function fetchAdjustColorSlider(data) {
    $('body').prepend(data);
    fixImagesSrcUrl('.AdjustColorSlider');
    scrollSlider();
    $('#redSlider').slider({
        min: -1,
        max: 1,
        value: 0.00,
        step: 0.01,
        slide: function (event, ui) {
            var red = $("#redSlider").slider("option", "value");
            $('#value-red').val(red);
        }
    });
    $('#greenSlider').slider({
        min: -1,
        max: 1,
        value: 0.00,
        step: 0.01,
        slide: function (event, ui) {
            var green = $("#greenSlider").slider("option", "value");
            $('#value-green').val(green);
        }
    });
    $('#blueSlider').slider({
        min: -1,
        max: 1,
        value: 0.00,
        step: 0.01,
        slide: function (event, ui) {
            var blue = $("#blueSlider").slider("option", "value");
            $('#value-blue').val(blue);
        }
    });
    $('.slider').slideDown('slow');
}

function setAdjustColor() {
    var red = $('#value-red').val();
    var green = $('#value-green').val();
    var blue = $('#value-blue').val();
    showImageLoader();
    Pixastic.process($('.gooEdit')[0], "coloradjust", { red: red, green: green, blue: blue }, function () {
        finishLoadImage();
    });

}