define(['jquery','template','util','datepicker','language','validate','form','status'],function ($,template,util) {
    util.setMenu('/teacher/list');


    // 获取ID
    var tcId = util.qs('tc_id');
    console.log(tcId);
    // 编辑得时候发送后台数据
    if(tcId){
        $.ajax({
            type:'get',
            url:'/api/teacher/edit',
            dataType:'json',
            data:{
                tc_id:tcId
            },
            success:function (data) {
                console.log(data);
                if(data.code == 200){
                    data.result.total='编辑讲师';
                    data.result.btn='修 改';
                    var html = template('tearchertpl',data.result);
                    $('.render').html(html);


                    //  js 控制时间插件
                    $('#joinTime').datepicker({
                        language:'zh-CN',
                        format:'yyyy-mm-dd'
                    })

                    //  绑定编辑的提交事件
                    setInfo('/api/teacher/update');

                }
            }
        });
    }else{
        var html = template('tearchertpl',{total:'添加讲师',btn:'添 加'});
        $('.render').html(html);


        //  js 控制时间插件
        $('#joinTime').datepicker({
            language:'zh-CN',
            format:'yyyy-mm-dd'
        })
        //  绑定添加的事件
        setInfo('/api/teacher/add');
    }

    // $('#joinTime').datepicker({
    //     language:'zh-CN',
    //     format:'yyyy-mm-dd'
    // })


    // 通过插件进行表单的验证
    function setInfo(url){
        $('#formId').validate({
            sendForm:false,
            onKeyup :true,
            valid:function () {
               //  验证完成后，进行表单提交
                //  表单控制提交
                $(this).ajaxSubmit({
                    type:'post',
                    url:url,
                    dataType:'json',
                    success:function (data) {
                        if(data.code==200){
                            location.href='/teacher/list';
                        }
                    }
                })

            },
            description:{
                tcName:{
                    required:'请输入用户名',
                    valid:'用户名可用'
                },
                tcPass:{
                    required:'密码不能为空',
                    pattern:'必须是6位数字',
                    valid:'密码正确'
                },
                tcJoinDate:{
                    required:'不能为空'
                }
            }
        })
    }



    // //   表单的验证
    // function setInfo(url) {
    //     $('#formBtn').click(function () {
    //         console.log($('#formId').serialize());
    //         $.ajax({
    //             type:'post',
    //             url:url,
    //             dataType:'json',
    //             data:$('#formId').serialize(),
    //             success:function (data) {
    //                 console.log(data);
    //                 location.href='/teacher/list';
    //             }
    //         })
    //     })
    // }
});