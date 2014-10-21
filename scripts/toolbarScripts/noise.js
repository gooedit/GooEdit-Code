
function onclickNoise(e) {
    if ($(e.target).is('#ImageButtonNoise')) {
        if (!isSlider) {
            removeBoldFromToolbarIcons();
            $('#ImageButtonNoise').css('background-color', '#ACB4C4');
            chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'Noise' }, fetchNoiseSlider);
            isSlider = true;
        }
        else {
            $('#ImageButtonNoise').css('background-color', 'transparent');
            closeSlider();
        }
    }

    if ($(e.target).is('#NoiseButtonClose')) {
        $('#ImageButtonNoise').css('background-color', 'transparent');
        closeSlider();
    }

    if ($(e.target).is('#addNoise')) {
        loadNoise();
    }

}

function loadNoise() {
    setNoise();
}

function fetchNoiseSlider(data) {
    $('body').prepend(data);
    fixImagesSrcUrl('.NoiseSlider');
    scrollSlider();
    $('#amountSlider').slider({
        min: 0,
        max: 1,
        value: 0.5,
        step: 0.01,
        slide: function (event, ui) {
            var amount = $("#amountSlider").slider("option", "value");
            $('#value-amount').val(amount);
        }
    });
    $('#strengthSlider').slider({
        min: 0,
        max: 1,
        value: 0.5,
        step: 0.01,
        slide: function (event, ui) {
            var strength = $("#strengthSlider").slider("option", "value");
            $('#value-strength').val(strength);
        }
    });
    $('.slider').slideDown('slow');
}

function setNoise() {
    var mono;
    var textAmnt = $('#value-amount').val();
    var textStrg = $('#value-strength').val();
    if ($('#value-mono').is(':checked'))
        mono = true;
    else
        mono = false;

    showImageLoader();
    Pixastic.process($('.gooEdit')[0], "noise", { mono: mono, amount: textAmnt, strength: textStrg }, function () {
        finishLoadImage();
    });
}