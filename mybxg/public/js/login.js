define(['jquery','cookie'],function ($) {
   // 给登陆按钮添加登录事件
   $("#loginBtn").on('click',function () {
       $.ajax({
           type:'post',
           url:'/api/login',
           dataType:'json',
           data:$('#loginForm').serialize(),
           success:function (data) {
               if(data.code == 200){
                   // 请求成功后，将用户信息存到cookie中     JSON.stringify   是将对象转化为json的字符串
                   $.cookie('loginInfo',JSON.stringify(data.result),{path : '/'});
                   location.href = '/main/index';
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