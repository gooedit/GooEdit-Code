function onclickTwitter(e) {
    if ($(e.target).is('#ImageButtonTwitpic')) {
        if (!isSlider) {
            $('#ImageButtonTwitpic').css('background-color', '#ACB4C4');
            chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'Twitter' }, fecthTwitterSlider);
            isSlider = true;
        }
        else
            closeSlider();
    }

    if ($(e.target).is('#TwitterButtonClose')) {
        closeSlider();
    }

    if ($(e.target).is('#twitUpload')) {
        //var canvas = $('.gooEdit').get(0);
        //var data;
        //var msg = $('#twitMsg').val();
        //if(msg == "")
        //{
        //	msg = 'Upload with Gooedit for Google Chrome https://chrome.google.com/extensions/detail/mldnfiglpcfdfnaephjhpgocgnmgjkhp ';
        //}
        //try
        //{
        //	data = canvas.toDataURL("image/jpeg");
        //}
        //catch(err)
        //{
        //	data = canvas.src;
        //}
        //$('#twitStat').html('<img src="' + chrome.extension.getURL("images/imageload.gif") + '" />');
        //chrome.extension.sendRequest({ 'action': 'fetchTwitter', 'data': data, 'msg':msg }, fetchTwiter);		
    }
}

function fetchTwiter(data) {
    $('#twitStat').html(data);
}

function fecthTwitterSlider(data) {
    $('body').prepend(data);
    fixImagesSrcUrl('.twitterSlider');
    scrollSlider();
    $('.slider').slideDown('slow');

    $('#formTwit').submit(function () {
        //alert('twiter upload is not support yet');
        return false;

        var canvas = $('.gooEdit').get(0);

        var data;
        try {
            data = canvas.toDataURL("image/png");
        } catch (err) {
            data = canvas.src;
        }

        $('#twitdata').val(data);

        var msg = $('#twitMsg').val();
        if (msg == "") {
            msg = 'Upload with Gooedit for Google Chrome https://chrome.google.com/extensions/detail/mldnfiglpcfdfnaephjhpgocgnmgjkhp';
            $('#twitMsg').val(msg);
        }

        return true;
    });
}