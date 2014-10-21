function onclickBlur(e) {
    if ($(e.target).is('#ImageButtonBlur')) {
        removeBoldFromToolbarIcons();
        showImageLoader();
        Pixastic.process($('.gooEdit')[0], "blur", {}, function () {
            finishLoadImage();
        });
	}
}
