function onclickSolarize(e) {
    if ($(e.target).is('#ImageButtonSolarize')) {
        removeBoldFromToolbarIcons();
        showImageLoader();
        Pixastic.process($('.gooEdit')[0], "solarize", {}, function () {
            finishLoadImage();
        });

	}
}
