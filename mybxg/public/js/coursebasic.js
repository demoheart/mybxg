define(['jquery','template','util','validate','form'],function ($, template, util) {
    //  侧边菜单栏高亮显示
    util.setMenu('/course/add');
    var csId = util.qs('cs_id');
    var flag = util.qs('flag');
    // 判断是编辑还是添加

        $.ajax({
            type:'get',
            dataType:'json',
            url:'/api/course/basic',
            data:{cs_id:csId},
            success:function (data) {
                console.log(data);
                if(flag!=1){
                    data.result.operate = '课程编辑';
                    var html = template('basicTpl',data.result);
                    $('#basicId').html(html)
                }else {
                    data.result.operate = '课程添加';
                    var html = template('basicTpl',data.result);
                    $('#basicId').html(html)
                }


                //  二级联动
                $('#firstType').change(function () {
                    $.ajax({
                        type:'post',
                        dataType:'json',
                        url:'/api/category/child',
                        data:{cg_id:$(this).val()},
                        success:function (data) {
                            var tpl = '<option value="0">请选择二级分类。。。</option>{{each list}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}}';
                            var html = template.render(tpl,{list:data.result});
                            $('#secondType').html(html);
                        }
                    })
                });

                // 表单验证并提交功能
                $('#formId').validate({
                    sendForm:false,
                    valid:function () {
                        $(this).ajaxSubmit({
                            type:'post',
                            dataType:'json',
                            data:{cs_id:csId},
                            url:'/api/course/update/basic',
                            success:function (data) {
                               if(data.code==200){
                                   location.href='/course/picture?cs_id='+data.result.cs_id;
                               }
                            }
                        })
                    }
                })
            }
        })
})