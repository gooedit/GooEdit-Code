function onclickRemoveNoise(e) {
    if ($(e.target).is('#ImageButtonRemoveNoise')) {
        removeBoldFromToolbarIcons();
        showImageLoader();

        Pixastic.process($('.gooEdit')[0], "removenoise", { }, function () {
            finishLoadImage();
        });

	}
}