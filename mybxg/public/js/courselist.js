define(['jquery','template','util'],function ($,template,util) {
    // 侧边菜单栏高亮显示
    util.setMenu(location.pathname);

    //  调用后台数据接口，渲染模板
    $.ajax({
        type:'get',
        dataType:'json',
        url:'/api/course',
        success:function (data) {
            if(data.code == 200){
                var html = template('courselistTpl',{list:data.result});
                $('#courselistId').html(html);
            }
        }
    })

});