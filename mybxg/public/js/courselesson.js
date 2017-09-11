define(['jquery','template','util','bootstrap','form'],function ($, template, util) {
    // 侧边菜单高亮显示
    util.setMenu('/course/add');
    var csId = util.qs('cs_id');
    // 调用后台接口
    $.ajax({
        type:'get',
        dataType:'json',
        url:'/api/course/lesson',
        data:{cs_id:csId},
        success:function (data) {
            if(data.code==200){
                var html = template('courselessonTpl',data.result);
                $('#courselessonId').html(html);

                //  表单提交
                function submitBtn(url,ctCsId,ctId) {
                    $('#modalBtn').click(function () {
                        var param = {ct_cs_id:ctCsId};
                        if(ctId){
                            param.ct_id=ctId;
                        }
                        $('#modalForm').ajaxSubmit({
                            type:'post',
                            dataType:'json',
                            url:url,
                            data:param,
                            success:function (data) {
                                if(data.code==200){
                                    location.reload();
                                }
                            }
                        })
                    })
                }


                // 添加课时
                $('#modelId').click(function () {
                    $('#chapterModal').modal();
                    var html = template('modalTpl',{operate:'课程添加'});
                    $('#modalInfo').html(html);
                    submitBtn('/api/course/chapter/add',csId);
                })

                // 课时编辑
                $('.courselesson').click(function () {
                    // 获取 ID
                    var ctId = $(this).attr('data-ctId');
                    $('#chapterModal').modal();
                    $.ajax({
                        type:'get',
                        dataType:'json',
                        data:{ct_id:ctId},
                        url:'/api/course/chapter/edit',
                        success:function (data) {
                            if(data.code == 200){
                                data.result.operate = '课程编辑';
                                var html = template('modalTpl',data.result);
                                $('#modalInfo').html(html);
                                submitBtn('/api/course/chapter/modify',csId,ctId);
                            }
                        }
                    })
                })
            }
        }
    })
});