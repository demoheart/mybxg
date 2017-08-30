define(['jquery','template','util','bootstrap'],function ($,template,util) {
    // 控制侧边菜单高亮显示
    util.setMenu(location.pathName);
    console.log(location.pathName);

    // 教师列表渲染
    $.ajax({
        type:'get',
        url:'/api/teacher',
        dataType:'json',
        success:function (data) {
            if(data.code == 200){
                var html = template('teachertpl',{list:data.result});
                $('#teacherlist').html(html);
            };


            // 查看教师信息
            $('.preveiw').click(function () {
                var preveiwId= $(this).parent().attr("data-preveiwId");
                $.ajax({
                    type:'get',
                    url:'/api/teacher/view',
                    dataType:'json',
                    data:{
                        tc_id:preveiwId
                    },
                    success:function (data) {
                        $('#teacherModal').modal();
                        var html = template('modaltpl',data.result);
                        $('.modalInfo').html(html);

                    }
                })
            });

            //  启用和禁用
            $('.cod').click(function () {
                var that = this;
                var preveiwId= $(this).parent().attr("data-preveiwId");
                var codStatus = $(this).parent().attr('data-codStatus')
                $.ajax({
                    type:'get',
                    url:'/api/teacher/handle',
                    dataType:'json',
                    data:{
                        tc_id:preveiwId,
                        tc_status:codStatus
                    },
                    success:function (data) {
                        $(that).parent().attr('data-codStatus',data.result.tc_status);
                        if(data.result.tc_status == 0){
                            $(that).html('注 销');
                        }else{
                            $(that).html('启 用');
                        }
                    }
                })
            })
        }
    })
})