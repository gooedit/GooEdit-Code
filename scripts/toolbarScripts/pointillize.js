
function onclickPointillize(e) {
    if ($(e.target).is('#ImageButtonPointillize')) {
        if (!isSlider) {
            removeBoldFromToolbarIcons();
            $('#ImageButtonPointillize').css('background-color', '#ACB4C4');
            chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'Pointillize' }, fetchPointillizeSlider);
            isSlider = true;
        }
        else {
            $('#ImageButtonPointillize').css('background-color', 'transparent');
            closeSlider();
        }
    }

    if ($(e.target).is('#PointillizeButtonClose')) {
        $('#ImageButtonPointillize').css('background-color', 'transparent');
        closeSlider();
    }

    if ($(e.target).is('#Pointillize')) {
        setPointillize();
    }

}

function fetchPointillizeSlider(data) {
    $('body').prepend(data);
    fixImagesSrcUrl('.PointillizeSlider');
    scrollSlider();
    $('#pointRadiusSlider').slider({
        min: 1,
        max: 100,
        value: 5,
        step: 1,
        slide: function (event, ui) {
            var radius = $("#pointRadiusSlider").slider("option", "value");
            $('#value-pointRadius').val(radius);
        }
    });
    $('#densitySlider').slider({
        min: 0.0,
        max: 5.0,
        value: 1.2,
        step: 0.1,
        slide: function (event, ui) {
            var density = $("#densitySlider").slider("option", "value");
            $('#value-density').val(density);
        }
    });
    $('#noiseSlider').slider({
        min: 0.0,
        max: 2.0,
        value: 1.0,
        step: 0.1,
        slide: function (event, ui) {
            var noise = $("#noiseSlider").slider("option", "value");
            $('#value-noise').val(noise);
        }
    });
    $('.slider').slideDown('slow');
}

function setPointillize() {
    var transparent;
    var radius = $('#value-pointRadius').val();
    var density = $('#value-density').val();
    var noise = $('#value-noise').val();
    if ($('#value-transparent').is(':checked'))
        transparent = true;
    else
        transparent = false;

    showImageLoader();
    Pixastic.process($('.gooEdit')[0], "pointillize", { radius: radius, density: density, noise: noise, transparent: transparent }, function () {
        finishLoadImage();
    });

}