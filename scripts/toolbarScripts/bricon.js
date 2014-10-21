
function onclickBriCon(e) {
    var target = $(e.target);
    if ($(e.target).is('#ImageButtonBriCon')) {
        if (!isSlider) {
            removeBoldFromToolbarIcons();
            $('#ImageButtonBriCon').css('background-color', '#ACB4C4');
            chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'BriCon' }, fecthBriConSlider);
            isSlider = true;
        }
        else {
            $('#ImageButtonBriCon').css('background-color', 'transparent');
            closeSlider();
        }
    }
    if ($(e.target).is('#BriConButtonClose')) {
        $('#ImageButtonBriCon').css('background-color', 'transparent');
        closeSlider();
    }
    if ($(e.target).is('#conBriButton')) {
        setBriCon();
    }
}

function fecthBriConSlider(data) {
    $('body').prepend(data);
    fixImagesSrcUrl('.briConSlider');
    scrollSlider();
    $('#briSlider').slider({
        min: -150,
        max: 150,
        slide: function (event, ui) {
            var brightness = $("#briSlider").slider("option", "value");
            $('#value-brightness').val(brightness);
        }

    });
    $('#conSlider').slider({
        min: -100,
        max: 300,
        slide: function (event, ui) {
            var brightness = $("#conSlider").slider("option", "value");
            $('#value-contrast').val(brightness);
        }
    });
    $('.slider').slideDown('slow');
}

function setBriCon() {
    var bri = $("#briSlider").slider("option", "value");
    var con = $("#conSlider").slider("option", "value");
    con = con / 100;
    showImageLoader();
    Pixastic.process($('.gooEdit')[0], "brightness", { brightness: bri, contrast: con }, function () {
        finishLoadImage();
    });
}