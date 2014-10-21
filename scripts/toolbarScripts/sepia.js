function onclickSepia(e)
{
    if ($(e.target).is('#ImageButtonSepia')) {
        removeBoldFromToolbarIcons();
        showImageLoader();
        Pixastic.process($('.gooEdit')[0], "sepia", {}, function () {
            finishLoadImage();
        });

	}
}
