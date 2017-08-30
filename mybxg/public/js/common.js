define(['jquery', 'cookie'], function ($) {
    // NProgress.start();
    // NProgress.done();

    //  右侧菜单的伸缩切换
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });

    // 退出功能键
    $('#logoutBtn').on('click', function () {
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/api/logout',
            success: function (data) {
                if (data.code == 200) {
                    location.href = '/main/login';
                }
            }
        })
        return false;
    })
    var sessionId = $.cookie('PHPSESSID');
    console.log(sessionId);
    // 判断是否有   sessionID
    if (!sessionId && location.pathname != '/main/login') {
        location.href = '/main/login';
    }
});
