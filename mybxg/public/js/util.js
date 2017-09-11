define(['jquery'],function ($) {
   return {
       setMenu:function (path) {
           $('.navs a[href="'+path+'"]').addClass('active').closest('ul').show();
       },
       qs:function (key) {
           var param = location.search.substring(1);
           var result = null;
           if(param){
               var kvs = param.split('&');
               $.each(kvs,function (i, item) {
                   var kv = item.split('=');
                   if(key == kv[0]){
                       result = kv[1];
                       return false; // 终止循环
                   }
               })
           }
           return result;
       }
    }
})