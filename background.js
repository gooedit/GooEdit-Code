
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
    alert('Select image by:\n\n1. Right mouse button.\n2. Alt+Right mouse button on the image.\n3. Ctrl+Shift+Right mouse button to upload your image.');
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendRequest(tab.id, { select: "true" });
    });
});


function fetchMainToolbar(callback) {
    $.ajax({
        url: chrome.extension.getURL('toolbars/MainToolbar.html'),
        success: function (msg) {
            callback(msg);
        },
        error: function () {
            callback('error');
        }
    });
};

function fetchSlider(callback, type) {
    var urlSrc = null;
    urlSrc = chrome.extension.getURL('toolbars/' + type + 'Slider.html');
    //console.log("url = " + urlSrc);

    $.ajax({
        url: urlSrc,
        success: function (msg) {
            callback(msg);
        },
        error: function () {
            callback('error');
        }
    });
}

function fetchRotateSlider(callback) {
    $.ajax({
        url: chrome.extension.getURL('toolbars/RotateSlider.html'),
        success: function (msg) {
            callback(msg);
        },
        error: function () {
            callback('error');
        }
    });
};

function fetchUploadImagePage(callback) {
    $.ajax({
        url: chrome.extension.getURL('toolbars/UploadImagePage.html'),
        success: function (msg) {
            callback(msg);
        },
        error: function () {
            callback('error');
        }
    });
};

function fetchImageEffect(callback, src, width, height) {
    var img = document.createElement("img");
    img.width = width;
    img.height = height;
    img.src = src;
    temp = callback;
    img.onload = loadImage;
}

function loadImage(e) {
    var copy = document.getElementsByTagName("canvas")[0];
    var img = e.target;
    var width = img.width;
    var height = img.height;
    copy.width = width;
    copy.height = height;
    var context = copy.getContext('2d').drawImage(img, 0, 0, width, height);
    var data = copy.getContext("2d").canvas.toDataURL();
    temp(data);
}

function onRequest(request, sender, callback) {
    

    if (request.action == "fetchUploadImagePage") {
        fetchUploadImagePage(callback);
    }
    if (request.action == 'fetchMainToolbar') {
        fetchMainToolbar(callback);
    }

    if (request.action == 'fetchRotate') {
        fetchRotateSlider(callback);
    }

    if (request.action == 'fetchSlider') {
        fetchSlider(callback, request.type);
    }

    if (request.action == 'fetchImageEffect') {
        fetchImageEffect(callback, request.src, request.width, request.height)
    }

    if (request.action == 'resetSelect') {
        chrome.tabs.executeScript(null, { code: "alinkPushed=0" });
    }

    if (request.action == 'fetchTwitter') {
        var user = localStorage["twitUser"];
        var user = 'noamnoach';
        if (user) {
            var pass = localStorage["twitPass"];
            var pass = "n642002123n";
            if (pass) {
                $.ajax({
                    type: 'post',
                    url: 'http://aspspider.ws/gooedit/Twitpic/SaveImgData.aspx',
                    data: 'data=' + request.data + '&user=' + user + '&pass=' + pass + '&msg=' + request.msg,
                    success: function (data) {
                        callback(data);
                    },
                    error: function (data) {
                        alert(data.toSting());
                    }
                });
            }
            else
                callback('Please enter Twitter password, on the extention options');
        }
        else
            callback('Please enter Twitter user, on the extention options');
    }
};

chrome.extension.onRequest.addListener(onRequest);

