define(['jquery'],function ($) {
   return {
       setMenu:function (path) {
           $('.navs a[href="'+path+'"]').addClass('active');
       }
    }
})