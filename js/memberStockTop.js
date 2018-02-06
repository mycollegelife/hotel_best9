(function(){
	$(window).resize(function ()// 绑定到窗口的这个事件中
	{
	// 设置字体大小
		function setFontsize(){
			var whdef = 100/1920;// 表示1920的设计图,使用100PX的默认值
			var wH = window.innerHeight;// 当前窗口的高度
			var wW = window.innerWidth;// 当前窗口的宽度
			var rem = wW * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
			$('html').css('font-size', rem + "px");
		}
		setFontsize();

	// 设置   右下角内容区的高度
		function setConHeight() {
			var mem_height=$("#member_content").height();
			var mem_titleH = $(".manage_title").outerHeight(true);
			var mm_height=parseInt(mem_height)-parseInt(mem_titleH);
			$(".manage_main").css("height", mm_height);
		}
		setConHeight();

	// 设置模板内容的高度
		function modelHe(){
			var good_mo_hei = $(".manage_main").height();
			var ratio = window.innerWidth *100/1920;//计算比例
			var tem_hei = good_mo_hei - 1.7*ratio;
			
			$(".tm_main").css("height",tem_hei+"px");//设置模板内容的高度
		}
		modelHe();


		
	});
	$(window).resize();


	
})();