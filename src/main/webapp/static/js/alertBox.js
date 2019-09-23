var getWinHeight = function () {
    //reference: http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
    return window.innerHeight || document.documentElement.clientHeight;
}


var getWinWidth = function () {
    return window.innerWidth || document.documentElement.clientWidth;
}

var getWidth = function ($el) {
    return $el.width();
}

var getHeight = function ($el) {
    return $el.height();
}

var AlertBox = {
    message: function (msg, callback) {
        var alertBox = $("#alert-box");
        alertBox.text(msg);
        setCenter(alertBox);
        alertBox.addClass("alert-success");
        alertBox.fadeIn();
        setTimeout(function () {
            alertBox.fadeOut();
            alertBox.removeClass("alert-success");
            callback()
        }, 1500);
    },
    messageWarn: function (msg, callback) {
        var alertBox = $("#alert-box");
        alertBox.text(msg);
        alertBox.addClass("alert-danger");
        setCenter(alertBox);
        alertBox.fadeIn();
        setTimeout(function () {
            alertBox.fadeOut();
            alertBox.removeClass("alert-danger");
            callback && callback();
        }, 5000);
    }
}

function setCenter($el) {
    var top = (getWinHeight() - getHeight($el)) / 2;
    var left = (getWinWidth() - getWidth($el)) / 2;
    if (top < 0) {
        top = 10;
    }
    $el.css({"top": top + 'px', "left": left + 'px'});
}



