function onclickGray(e) {
    if ($(e.target).is('#ImageButtonGray')) {
        removeBoldFromToolbarIcons();
        showImageLoader();
        Pixastic.process($('.gooEdit')[0], "hsl", { hue: 0, saturation: -100, lightness: 0 }, function () {
            finishLoadImage();
        });
	}
}
