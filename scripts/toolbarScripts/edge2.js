function onclickEdge2(e) {
    if ($(e.target).is('#ImageButtonEdge2')) {
        removeBoldFromToolbarIcons();
        showImageLoader();
        Pixastic.process($('.gooEdit')[0], "edges2", { }, function () {
            finishLoadImage();
        });
	}
}
