
function onclickEmboss(e) {
    if ($(e.target).is('#ImageButtonEmboss')) {
        if (!isSlider) {
            removeBoldFromToolbarIcons();
            $('#ImageButtonEmboss').css('background-color', '#ACB4C4');
            chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'Emboss' }, fetchEmbossSlider);
            isSlider = true;
        }
        else {
            $('#ImageButtonEmboss').css('background-color', 'transparent');
            closeSlider();
        }
    }

    if ($(e.target).is('#embossButtonClose')) {
        $('#ImageButtonEmboss').css('background-color', 'transparent');
        closeSlider();
    }

    if ($(e.target).is('#embossButton')) {
        setEmboss();
    }

}

function fetchEmbossSlider(data) {
    $('body').prepend(data);
    fixImagesSrcUrl('.slider');
    scrollSlider();
    $('#strengthSlider').slider({
        min: 0,
        max: 10,
        value: 1,
        step: 0.1,
        slide: function (event, ui) {
            var strength = $("#strengthSlider").slider("option", "value");
            $('#strength-amount').val(strength);
        }
    });
    $('#greyLevelSlider').slider({
        min: 0,
        max: 255,
        value: 180,
        step: 3,
        slide: function (event, ui) {
            var greyLevel = $("#greyLevelSlider").slider("option", "value");
            $('#value-greylevel').val(greyLevel);
        }
    });
    $('.slider').slideDown('slow');
}

function setEmboss() {
        var blend;
        var strength = $('#strength-amount').val();
        var greyLevel = $('#value-greylevel').val();
        var direction = document.getElementById("value-direction").value;
        if ($('#value-original').is(':checked'))
            blend = true;
        else
            blend = false;
        showImageLoader();
        Pixastic.process($('.gooEdit')[0], "emboss", { strength: strength, greyLevel: greyLevel, direction: direction, blend: blend }, function () {
            finishLoadImage();
        });
}

