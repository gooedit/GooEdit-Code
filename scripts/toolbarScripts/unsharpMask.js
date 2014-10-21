
function onclickUnsharpMask(e) {
    if ($(e.target).is('#ImageButtonUnsharpMask')) {
        if (!isSlider) {
            removeBoldFromToolbarIcons();
            $('#ImageButtonUnsharpMask').css('background-color', '#ACB4C4');
            chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'UnsharpMask' }, fetchUnsharpMaskSlider);
            isSlider = true;
        }
        else {
            $('#ImageButtonUnsharpMask').css('background-color', 'transparent');
            closeSlider();
        }
    }

    if ($(e.target).is('#unsharpMaskButtonClose')) {
        $('#ImageButtonUnsharpMask').css('background-color', 'transparent');
        closeSlider();
    }

    if ($(e.target).is('#unsharpMaskButton')) {
        setUnsharpMak();
    }

    if ($(e.target).is('#resetUnsharpMaskButton')) {
        setUnsharpMak();
    }
}

function fetchUnsharpMaskSlider(data) {
    $('body').prepend(data);
    fixImagesSrcUrl('.slider');
    scrollSlider();
    $('#amountSlider').slider({
        min: 0,
        max: 500,
        value: 100,
        step: 5,
        slide: function (event, ui) {
            var amount = $("#amountSlider").slider("option", "value");
            $('#value-amount').val(amount);
        }
    });
    $('#radiusSlider').slider({
        min: 0,
        max: 5,
        value: 1.0,
        step: 0.05,
        slide: function (event, ui) {
            var strength = $("#radiusSlider").slider("option", "value");
            $('#value-radius').val(strength);
        }
    });
    $('#thresholdSlider').slider({
        min: 0,
        max: 255,
        value: 13,
        step: 3,
        slide: function (event, ui) {
            var threshold = $("#thresholdSlider").slider("option", "value");
            $('#value-threshold').val(threshold);
        }
    });
    $('.slider').slideDown('slow');
}

function setUnsharpMak() {

        var amount = $('#value-amount').val();
        var radius = $('#value-radius').val();
        var threshold = $('#value-threshold').val();

        showImageLoader();
        Pixastic.process($('.gooEdit')[0], "unsharpmask", { amount: amount, radius: radius, threshold: threshold }, function () {
            finishLoadImage();
        });
}

