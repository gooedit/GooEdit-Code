var width, height;
var ctxData;
var ctx;



function onclickPixelInfo(e) {
    if ($(e.target).is('#ImageButtonPixelInfo')) {

        if (!isSlider) {
            removeBoldFromToolbarIcons();
            $('#ImageButtonPixelInfo').css('background-color', '#ACB4C4');
            isSlider = true;
            var slider = '<span class="slider or"></span>';
            $('body').prepend(slider);
            loadPixInfo();
        }
        else {
            closeSlider();
            closePixInfo();
            $('#ImageButtonPixelInfo').css('background-color', 'transparent');
        }
    }
}

function loadPixInfo(e) {
    img = $('.gooEdit').get(0);

    width = img.width;
    height = img.height;

    var $parent = $('.gooEdit').parent();
    if ($parent.get(0).tagName == "A")
        $parent = $parent.parent();
    $parent.append('<canvas id="pixInfoImage" class ="PixInfoImage"></canvas>');
    $('.PixInfoImage').css('border', '3px solid blue');
    var canvas = document.getElementById('pixInfoImage');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');
    $('.gooEdit').hide();
    ctx.drawImage(img, 0, 0, width, height);
}

function onmousedownPixInfo(e) {
    if ($(e.target).is('#pixInfoImage')) {
        var x = e.offsetX;
        var y = e.offsetY;
        ctxData = ctx.getImageData(0, 0, width, height);
        var redContent = ctxData.data[((y * (ctxData.width * 4)) + (x * 4)) + 0];
        var greenContent = ctxData.data[((y * (ctxData.width * 4)) + (x * 4)) + 1];
        var blueContent = ctxData.data[((y * (ctxData.width * 4)) + (x * 4)) + 2];
        var content = '<div href="" class="cute_balloon" clase="gray"' + 'tag="Cordinate X:' + ' ' + x + '</br>' + 'Cordinate Y:' + ' ' + y + '</br>' + 'RGB: [' + redContent + ', ' + greenContent + ', ' + blueContent + ']' + '"></div>';
        make_cute_balloon($(content), e.pageX, e.pageY);
    }
}

function onmouseupPixInfo(e) {

}