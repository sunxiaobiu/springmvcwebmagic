$(function () {
    $('.url-submit').click(function () {
        $.blockUI({
            message: '<div style="background-color:#a9a9a9;font-size:20px;">hint message </div><div><h5>processing...be patient</h5></div>',
            css: {}
        });
        var originUrl = $.trim($('[data-id = "originUrl"]').val());
        var siteDomain = $.trim($('[data-id = "siteDomain"]').val());

        var deadUrlDetectRequest = {};
        deadUrlDetectRequest.originUrl = originUrl;
        deadUrlDetectRequest.domain = siteDomain;

        $.ajax({
            url: '../deadUrlDetect/checkUrlAlive',
            type: 'post',
            dateType: 'json',
            data: JSON.stringify(deadUrlDetectRequest),
            contentType: "application/json",
            success: function (data) {
                $.unblockUI();
                if (data.code == 200) {
                    $.blockUI({
                        message: '<div style="background-color:#a9a9a9;font-size:20px;">hint message</div><div><h5>success</h5></div>',
                        css: {},
                        timeout: 10000
                    });
                    location.href = '../deadUrlDetect/start';
                }
                else {
                    $.blockUI({
                        title: 'hello',
                        message: '<div style="background-color:#a9a9a9;font-size:20px;">error message</div><div><h5>' + data.msg + '</h5></div>',
                        css: {}
                    });
                    $('.blockOverlay').attr('title', 'Click to unblock').click(function () {
                        $.unblockUI();
                    });
                }
            },
            error: function (code, err) {
                $.blockUI({
                    message: '<div style="background-color:#a9a9a9;font-size:20px;">error message</div><div><h5>Server error</h5></div>',
                    css: {},
                    timeout: 2000
                });
            }
        });
        return false;
    });
});