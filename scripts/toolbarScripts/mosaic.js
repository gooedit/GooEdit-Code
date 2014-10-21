function onclickMosaic(e) {
    if ($(e.target).is('#ImageButtonMosaic')) {
        if (!isSlider) {
            removeBoldFromToolbarIcons();
            $('#ImageButtonMosaic').css('background-color', '#ACB4C4');
            chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'Mosaic' }, fetchMosaicSlider);
            isSlider = true;
        }
        else {
            $('#ImageButtonMosaic').css('background-color', 'transparent');
            closeSlider();
        }
    }
    if ($(e.target).is('#mosaicButtonClose')) {
        $('#ImageButtonMosaic').css('background-color', 'transparent');
        closeSlider();
    }

    if ($(e.target).is('#mosaicButton')) {
        setMosaic();
    }

}

function setMosaic() {

    var blockSize = $('#value-block-size').val();

    showImageLoader();
    Pixastic.process($('.gooEdit')[0], "mosaic", { blockSize: blockSize }, function () {
        finishLoadImage();
    });
}


function fetchMosaicSlider(data) {
    $('body').prepend(data);
    fixImagesSrcUrl('.MosaicSlider');
    scrollSlider();
    $('#blockSizeSlider').slider({
        min: 1,
        max: 50,
        value: 2,
        step: 1,
        slide: function (event, ui) {
            var blockSize = $("#blockSizeSlider").slider("option", "value");
            $('#value-block-size').val(blockSize);
        }
    });
    $('.slider').slideDown('slow');
}

