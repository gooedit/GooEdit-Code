function onclickInvert(e) {
    if ($(e.target).is('#ImageButtonInvert')) {
        removeBoldFromToolbarIcons();
        showImageLoader();
        Pixastic.process($('.gooEdit')[0], "invert", {  }, function () {
            finishLoadImage();
        });

	}
}