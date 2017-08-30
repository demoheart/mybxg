define(['jquery'],function ($) {
   // 给登陆按钮添加登录事件
   $("#loginBtn").on('click',function () {
       $.ajax({
           type:'post',
           url:'/api/login',
           dataType:'json',
           data:$('#loginForm').serialize(),
           success:function (data) {
               if(data.code == 200){
                  location.href = '/main/index'
               }else {
                   alert('用户名或者密码输入错误');
               }
           },
           error:function(){
              alert('请输入用户名和密码');
           }
       })
       return false;
   })
})