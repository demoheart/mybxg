define(['jquery','template','util', 'cookie'], function ($,template,util) {
    // NProgress.start();
    // NProgress.done();
    util.setMenu(location.pathname);
    // console.log(util);
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
    // 判断是否有   sessionID
    if (!sessionId && location.pathname != '/main/login') {
        location.href = '/main/login';
    }

    //导航菜单的头像区
    var cookie = $.cookie('loginInfo');
    //  将字符串转化为对象
    var loginInfo = cookie?JSON.parse(cookie):{ };
    //  $('#profileId img').attr('src',loginInfo.tc_avatar);
    //  $('#profileId h4').html(loginInfo.tc_name);


    //  运用模板重构头像区域
    var  tpl = '<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>';
    var html = template.render(tpl,loginInfo);
    $('#profileId').html(html);
});
