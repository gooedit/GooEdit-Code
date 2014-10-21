var resetImage = false;

function onclickGlow(e) {
    if ($(e.target).is('#ImageButtonGlow')) {
        if (!isSlider) {
            removeBoldFromToolbarIcons();
            $('#ImageButtonGlow').css('background-color', '#ACB4C4');
            chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'Glow' }, fetchGlowSlider);
            isSlider = true;
        }
        else {
            closeSlider();
            $('#ImageButtonGlow').css('background-color', 'transparent');
        }
    }

    if ($(e.target).is('#glowButtonClose')) {
        $('#ImageButtonGlow').css('background-color', 'transparent');
        closeSlider();
    }

    if ($(e.target).is('#glowButton')) {
        setGlow();
    }

    if ($(e.target).is('#resetGlowButton')) {
        resetImage = true;
        setGlow();
    }
}


function setGlow() {

    if (resetImage) {
        resetImage = false;

        showImageLoader();
        Pixastic.process($('.gooEdit')[0], "glow", { amount: 0, radius: 0 }, function () {
            $('.gooEdit').css('border', '3px solid blue');
            finishLoadImage();
        });
    }
    else {
        var amount = $('#value-amount').val();
        var radius = $('#value-radius').val();

        showImageLoader();
        Pixastic.process($('.gooEdit')[0], "glow", { amount: amount, radius: radius }, function () {
            $('.gooEdit').css('border', '3px solid blue');
            finishLoadImage();
        });
    }
}

function fetchGlowSlider(data)
{
    $('body').prepend(data);
    fixImagesSrcUrl('.GlowSlider');
    scrollSlider();
    $('#amountSlider').slider({
        min: 0, 
        max: 1,
        value: 0.30,
        step: 0.01,
        slide: function(event, ui){
            var amount = $( "#amountSlider" ).slider( "option", "value" );
            $('#value-amount').val(amount);							
        }
    });
    $('#radiusSlider').slider({
        min: 0, 
        max: 1,
        value: 0.20,
        step: 0.01,
        slide: function(event, ui){
            var strength = $("#radiusSlider").slider("option", "value");
            $('#value-radius').val(strength);
        }
    });
    $('.slider').slideDown('slow');	
}
