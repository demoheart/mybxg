
	NProgress.start();

	NProgress.done();

	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	// 退出功能键
	$('#logoutBtn').on('click',function () {
		$.ajax({
			type:'post',
			dataType:'json',
			url:'/api/logout',
			success:function (data) {
				if(data.code == 200){
                    location.href = '/main/login'
				}
            }
		})
		return false;
    })