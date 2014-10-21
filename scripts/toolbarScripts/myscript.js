/// <reference path="C:\Users\sagi\Documents\Visual Studio 2008\WebSites\PyotitWebSite\javascript\jquery-1.3.2-vsdoc2.js" />

onclick = function(e) {
    if ($(e.target).is('#ImageButtonBriCon')) {
		chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'BriCon' }, fecthBriConSlider);
	}

}

function fecthBriConSlider(data) {
	$('body').prepend(data);
	$('.briConToolbox').css('top', '33px');
	$('.briConToolbox').css('left', '1px');
	$('#briSlider').slider({
						min: -150, 
						max: 150
	});
	$('#conSlider').slider({
						min: -100, 
						max: 300
	});
	$('.briConToolbox').slideDown('slow');
}


