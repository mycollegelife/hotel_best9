	
	// 侧边栏导航
		var maMeLi = $("#manage_menu li");
		maMeLi.click(function(){

			var triangle='<svg class="triangle" xmlns="http://www.w3.org/2000/svg" viewBox="2363 5718 12.417 6.208"><defs><style>.cls-1 {fill: #fff;}</style></defs><path id="Path_157" data-name="Path 157" class="cls-1" d="M365.7,4492l6.208,6.208,6.208-6.208Z" transform="translate(1997.3 1226)"/></svg>',triangle2='<svg class="triangle" xmlns="http://www.w3.org/2000/svg" viewBox="2366 6153.896 6.208 12.417"><defs><style>.cls-1 {fill: #fff;}</style></defs><path id="Path_158" data-name="Path 158" class="cls-1" d="M365.7,4492l6.208,6.208,6.208-6.208Z" transform="translate(-2126 6532.013) rotate(-90)"/></svg>';

			//通过为 li 增加 Class 来判断它现在的展开状态
			if ($(this).hasClass("drop")) {
				// 改变 li 的class值
				$(this).removeClass("drop");

				// 改变下拉菜单的状态
				$(this).find('dl').css('display','none');

				// 改变右边三角形的状态
				$(this).children('.triangle').replaceWith(triangle2)
			}else{
				$(this).siblings().removeClass("drop");
				$(this).addClass("drop");

				$(this).siblings().find('dl').css('display','none');//隐藏所有的下拉
				$(this).find('dl').css('display','block');
				
				$(this).siblings().children('.triangle').replaceWith(triangle2);
				$(this).children('.triangle').replaceWith(triangle);
			}
		})
		//点击下拉的dt 改变其样式
			$(".dropdown_menu dt").click(function(){
				
				event.stopPropagation();
				$(".dropdown_menu dt").removeClass("hover");//影藏所有dt的背景
				$(this).addClass("hover");
				
				//增加竖条
				var str = "<span>|</span>";
				$(".dropdown_menu dt span").remove();
				$(this).find('a').before(str);
			});


	// 设置 右下角内容区    的高度
		function setConHeight() {
			var mem_height=$("#member_content").height();
			var mem_titleH = $(".manage_title").outerHeight(true);
			var mm_height=parseInt(mem_height)-parseInt(mem_titleH);
			$(".manage_main").css("height", mm_height);
		}

	// 设置添加模板内容的高度
		function modelHe(){
			var good_mo_hei = $(".manage_main").height();
			var ratio = window.innerWidth *100/1920;//计算比例
			var tem_hei = good_mo_hei - 1.7*ratio;
	
			$(".tm_main").css("height",tem_hei+"px");//设置模板内容的高度
		}

