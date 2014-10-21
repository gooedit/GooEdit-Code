function onclickFacebook(e)
{
    if ($(e.target).is('#ImageButtonFacebook')) {

		if(!isSlider)
		{
		    removeBoldFromToolbarIcons();
		    $('#ImageButtonFacebook').css('background-color', '#ACB4C4');
		    chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'Facebook' }, fecthFacebookSlider);
			isSlider = true;
		}
		else {
		    $('#ImageButtonFacebook').css('background-color', 'transparent');
		    closeSlider();
		}
	}
	
    if ($(e.target).is('#FacebookButtonClose')) {
		closeSlider();
    }

}

function fecthFacebookSlider(data) {
    $('body').prepend(data);
    fixImagesSrcUrl('.Slider');
    scrollSlider();
    $('.slider').slideDown('slow');

    $('#formFB').submit(function () {
        //console.log(this);
        //return false;

        var canvas = $('.gooEdit').get(0);

        var data;
        try {
            data = canvas.toDataURL("image/png");
        } catch (err) {
            data = canvas.src;
        }
        
        $('#FBdata').val(data);

        var msg = $('#FBmsg').val();
        if (msg == "") {
            msg = 'Upload with Gooedit for Google Chrome https://chrome.google.com/extensions/detail/mldnfiglpcfdfnaephjhpgocgnmgjkhp';
            $('#FBmsg').val(msg);
        }

        return true;
    });
}