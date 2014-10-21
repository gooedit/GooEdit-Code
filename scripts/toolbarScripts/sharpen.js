function onclickSharpen(e) {
    if ($(e.target).is('#ImageButtonSharpen')) {
        removeBoldFromToolbarIcons();
        showImageLoader();
        Pixastic.process($('.gooEdit')[0], "sharpen", {}, function () {
            finishLoadImage();
        });
	}
}
