define(['jquery','template','util','validate','form'],function ($,template,util) {
    // 侧边菜单栏高亮
    util.setMenu(location.pathname);

    // 通过插件验证并提交表单

    $('#courseadd').validate({
        sendForm:false,
        valid:function () {
            $(this).ajaxSubmit({
                type:'post',
                dataType:'json',
                url:'/api/course/create',
                success:function (data) {
                    if(data.code==200){
                        location.href='/course/basic?flag=1&cs_id='+data.result.cs_id;
                    }
                }
            })
        }
    })
})