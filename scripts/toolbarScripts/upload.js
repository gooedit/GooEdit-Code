var blendFirstTime = true;
var resetImage = false;
var imgUpload = new Image();

function onclickUplaod(e) {
    if ($(e.target).is('#ImageButtonUpload')) {
        if (!isUploadSlider) {
            removeBoldFromToolbarIcons();
            $('#ImageButtonUpload').css('background-color', '#ACB4C4');
            chrome.extension.sendRequest({ 'action': 'fetchSlider', 'type': 'Upload' }, fetchUplaodSlider);
            isUploadSlider = true;
        }
        else {
            closeUploadSlider();
            
        }
    }

    if ($(e.target).is('#uploadButtonClose')) {
        closeUploadSlider();
    }

}

function fetchUplaodSlider(data) {
    $('body').prepend(data);
    fixImagesSrcUrl('.uplaodSlider');
    scrollSlider();

    $('.uplaodSlider').slideDown('slow');
}

function closeUploadSlider() {
    $('.uplaodSlider').slideUp('slow', function () {
        $('.uplaodSlider').remove();
        isUploadSlider = false;
    });
}

function changeImgUpload(e) {
    if ($(e.target).is('#fileInputUpload')) {
        var fileInput = document.getElementById('fileInputUpload');
        var fileDisplayArea = document.getElementById('fileUploadDisplayArea');
        var file = fileInput.files[0];
        var imageType = /image.*/;
        if (file.type.match(imageType)) {
            var reader = new FileReader();
            reader.onload = function (e) {
                fileDisplayArea.innerHTML = "";
                
                imgUpload.src = reader.result;

                fileDisplayArea.appendChild(imgUpload);
                initGooEditImage(imgUpload);
            }
            reader.readAsDataURL(file);
        } else {
            alert("File Not Supported");
            fileDisplayArea.innerHTML = "File not supported!"
        }
    }
}


