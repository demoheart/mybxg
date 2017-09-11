define(['jquery','template','util','ckeditor','datepicker','language','uploadify','region','validate','form','status'],function ($,template,util,ckeditor) {
    util.setMenu('/teacher/list');
    // 调用后台接口
    $.ajax({
        type:'get',
        dataType:'json',
        url:'/api/teacher/profile',
        success:function (data) {
            console.log(data);
            var html = template('settingTpl',data.result);
            $('#settingId').html(html);
            //  文件下载的插件
            $('#upfile').uploadify({
                width:'120',
                height: '120',
                buttonText:'<span></span>',
                itemTemplate:'<span></span>',
                swf:'/public/assets/uploadify/uploadify.swf',
                uploader:'/api/uploader/avatar',
                fileObjName:'tc_avatar',
                onUploadSuccess:function (f,data) {
                    console.log(data);
                    var data = JSON.parse(data);
                    $('.preview img').attr('src',data.result.path);
                }
            });
            //   三级联动
            $('#pcd').region({
                url:'/public/assets/jquery-region/region.json'
            });
            //   用插件处理  富文本
            CKEDITOR.replace('editor', {
                toolbarGroups:[
                    { name: 'forms' },
                    { name: 'tools' },
                    { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
                    { name: 'others' },
                    '/',
                    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                    { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
                    { name: 'styles' },
                    { name: 'colors' },
                    { name: 'about' }
                ]});
            //  表单验证并且提交
            $('#formInfo').validate({
                sendForm:false,
                valid:function () {
                    //  同步富文本得内容
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    var p = $('#p').find('option:selected').text();
                    var c = $('#c').find('option:selected').text();
                    var d = $('#d').find('option:selected').text();
                    var hometown = p + '|'+ c + '|' +d;
                    //  表单提交插件得应用
                    $(this).ajaxSubmit({
                        type:'post',
                        dataType:'json',
                        data:{tc_hometown:hometown},
                        url:'/api/teacher/modify',
                        success:function (data) {
                            if(data.code==200){
                                location.reload();
                            }
                        }
                    })
                }
            })

        }
    })


})