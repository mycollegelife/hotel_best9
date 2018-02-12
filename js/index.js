$(function () {

	// 设置页面100%高度显示
	function setWindowFull(target) {
		var htmlHeight=window.innerHeight,
	    navHeight=$('#nav').height(),
	    indexHeight=parseInt(htmlHeight)-parseInt(navHeight)-20;
 	    $(target).css("height",indexHeight) //除了导航条外整个页面的高度
	}
	
    // 设置导航中间部分自定义
	function setNavFull() {
		// 获取屏幕宽度 nav左右两侧宽度 计算
	// 出中间宽度
	var windowW = parseInt(window.innerWidth),
	    navLeftW=parseInt($('.nav_logo').width()),
	    navRightW=parseInt($('.nav_user').width()),
	    navCenterW=0,
	    navCenterChildW=0;
	navCenterW=windowW-navLeftW-navRightW;
	// 获取ul下面li的个数
	var liNum=$('.nav_menu ul li').length;
	// 设置菜单的宽度 每个li的宽度
	$('.nav_menu').css('width',navCenterW);
	$('.nav_menu ul li a').css('width',navCenterW/liNum);

	}
			
     
	setWindowFull('#index');
	setWindowFull('#manage');
	setNavFull();


	// 时间选择器初始化
	// $('.set_time').flatpickr();




//~~~~~~~~~~~~~~~~~~~~~~ registe.html start
	// 发送验证码 localhost:8080/snug/verifycode?phone=15700218161
	$('#send_verificaton_code').click(function () {
		
		$.ajax({
			url:'/snug/verifycode',
			data:{"phone":$('#user_name').val()},
			success:function (data) {
			   
			    var data=JSON.parse(data);
			    console.log(data)
			},
			error:function () {
				alert('通信失败')
			}
		})
	})
	// 点击注册，把用户名密码传入数据库
	// http://localhost:8080/snug/register?phone=17323231312&snum=3992&pwd=123&img=123
	// 记录token值
	var userToken;
	$('#login_btn').click(function () {
		
        // 要发送的手机号 密码 验证码
		var user_name=$('#user_name').val(),
		    verification_code=$('#verification_code').val(),
		    user_pass=$('#user_pass').val();
        console.log(user_name,user_pass,verification_code);
		$.ajax({

			url:'/snug/register',
			data:{
				"type":'GET',
				"phone":user_name,
				"snum":verification_code,
				"pwd":user_pass,
				"img":'1.jpg'
			},
			success:function (data) {
				var data=JSON.parse(data);
				console.log(data);
				if (data.status=="1"){
				   userToken=data.info.token;
				}
				console.log(userToken)
			},
			error:function () {
				alert('通讯失败');
			}
		})
	})





	
// registe.html end ~~~~~~~~~~~~~~~~~~~~~~~~~~~
    


// ~~~~~~~~~~~~~~~~~~~~~login.html start
    // 登录 http://localhost:8080/snug/login?phone=15700218161&pwd=794594866
    $('#login_btn').click(function () {
    	var phone=$('#user_name').val(),
    	    pwd=$('#user_pass').val();
    	console.log(phone,pwd);
    	$.ajax({
    		url:'/snug/login',
    		data:{
    		  "phone":phone,
    		  "pwd":pwd
    	},
    		success:function (data) {
    			var data=JSON.parse(data);
    			console.log(data);
    		},
    		error:function () {
    			alert('登录失败')
    		}
    	})
    })

// end login.html界面 ~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~manage.html start
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~分区操作 start~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~分区操作 start~~~~~~~~~~~~~~
	$('#table_divide_zone').click(function (event) {
		
   	    // load加载页面
		$('#manage_content').load('manage/table_divide_zone.html',function () {
			

				// 显示分区

				$.ajax({
					url:'http://localhost:8080/snug/queryTableAddress',
					success:function (data) {
						var data=JSON.parse(data);

						for (var i = 0; i < data.info.length; i++) {
							var line='<div class="class_line"><span>'+data.info[i].resturnant_address_name+'</span><span>'+data.info[i].resturnant_address_content+'</span><span>'+data.info[i].resturnant_address_url+'</span><span>'+(data.info[i].resturnant_address_recommand==1? "推荐":"不推荐")+'</span><span>'+(data.info[i].resturnant_address_flag==1? "显示":"隐藏")+'</span><button class="add_zone">增加</button><button class="change_zone">修改</button><button class="delete_zone">删除</button></div>'
							var line_all=line_all+line;
						}
						// 插入dom中
						$('#manage_main').append(line_all);






						// 删除分区
						$('.delete_zone').click(function () {
							this.parentNode.remove()
						})

						// 修改分区


					}
				})



				// 添加分区操作

				$('#add_zone_btn').click(function () {
					$('#add_zone_model').css('display','block')
				});
				$('#return_zone').click(function () {
					$('#add_zone_model').css('display','none')
				});



				//http://localhost:8080/snug/insertTableAddress?resturnant_address_name=c栋 &resturnant_address_content=001&resturnant_address_sort=001&resturnant_address_recommand=001&resturnant_address_parent=12543&resturnant_id=001"

	           // 提交增加分区数据
	             
		           // 	分区名称 #zone_name
		           // 	所属层级 #zone_tier
		           // 	分区图片 #zone_img
		           // 	分区描述 #zone_discribe
		           // 	排序 #zone_sort
		           // 	默认状态 #zone_status
		           // 	是否推荐 #zone_recommand

		           

				$('#submit_zone').click(function () {
					//获取值 
		           var zone_name=$('#zone_name'),
			           zone_tier=$('#zone_tier'),
			           zone_img=$('#zone_img'),
			           zone_discribe=$('#zone_discribe'),
			           zone_sort=$('#zone_sort'),
			           zone_status=$('#zone_status'),
			           zone_recommand=$('#zone_recommand');

	                 console.log(zone_name,zone_tier,zone_img,zone_discribe,zone_sort,zone_status,zone_recommand);
	                   
	                  
					$.ajax({
						type:'GET',
						url:'/snug/insertTableAddress',
						data:{
							"resturnant_address_name":zone_name.val(),
							"resturnant_address_content":zone_discribe.val(),
							"resturnant_address_sort":zone_sort.val(),
							"resturnant_address_recommand":zone_recommand.val(),
							"resturnant_address_parent":zone_tier.val(),
							"resturnant_id":"001"

						},
						
						success:function (data) {
							var data=JSON.parse(data);
							console.log(data);
							// 数据提交成功之后清空表单
							$('#zone_name').val('');
							$('#zone_tier').val('');
							$('#zone_img').val('');
							$('#zone_discribe').val('');
							$('#zone_sort').val('');
							$('#zone_status').val('');
							$('#zone_recommand').val('');



						},
						error:function (xhr,type) {
							alert('通信失败');
						}
					})
				})

				// 修改分区
				$('.change_zone').click(function () {
					
				})
				
	

		})
	})

        //~~~~~~~~~~~~~~~~~分区操作end~~~~~~~~~~~~~~~~~~~~~~~~~~
		//~~~~~~~~~~~~~~~~~分区操作end~~~~~~~~~~~~~~~~~~~~~~~~~~
		//~~~~~~~~~~~~~~~~~分类操作start~~~~~~~~~~~~~~~~~~~~~~~~~~
		//~~~~~~~~~~~~~~~~~分类操作start~~~~~~~~~~~~~~~~~~~~~~~~~~
		//~~~~~~~~~~~~~~~~~分类操作start~~~~~~~~~~~~~~~~~~~~~~~~~~
			$('#table_divide_listing').click(function (event) {
           	    
           	    // load加载页面
				$('#manage_content').load('manage/table_divide_listing.html',function () {
					
						// 显示分类
						$.ajax({

						})

			         
						// 添加分类操作
			            
						$('#add_listing_btn').on('click',function () {
							 
							 $('#add_listing_model').css('display','block')
							
						});
						$('#return_listing').on('click',function () {
							$('#add_listing_model').css('display','none')
						});


			           // 提交增加分类数据
						$('#submit_listing').click(function () {
							$.ajax({
								type:'GET',
								url:'http:localhost:8080/snug/insertTableInfo',
								data:{
									"table_type_name":"厅",
									"table_type_img":"2.jpg",
									"table_type_sort":"20",
									"table_type_flag":"显示",
									"able_type_recommand":"推荐"



								},
								dataType:'json',
								success:function (data) {
									var data=JSON.parse(data);
									console.log(data);
								},
								error:function (xhr,type) {
									alert('通信失败');
								}
							})
						})

						// 修改分类
						$('.change_listing').click(function () {
							
						})


						// 删除分类
						$('.delete_listing').click(function () {
							
						})




				})
			})
			//~~~~~~~~~~~~~~~~~分类操作end~~~~~~~~~~~~~~~~~~~~~~~~~~
			//~~~~~~~~~~~~~~~~~分类操作end~~~~~~~~~~~~~~~~~~~~~~~~~~



			//~~~~~~~~~~~~~~~~~桌台操作start~~~~~~~~~~~~~~~~~~~~~~~~~~
			//~~~~~~~~~~~~~~~~~桌台操作start~~~~~~~~~~~~~~~~~~~~~~~~~~
			//~~~~~~~~~~~~~~~~~桌台操作start~~~~~~~~~~~~~~~~~~~~~~~~~~


			$('#table_setting').click(function (event) {
				


           	    // load加载页面
				$('#manage_content').load('manage/table_setting.html'),function () {


		            // ajax加载所有桌台
		            // 增加桌台
		            // 添加分类操作

		                     
		            $('#add_table_num').on('click',function () {
		                 console.log(111)	 
		            	 $('#add_table_model').css('display','block')
		            	
		            });
		            $('#return_table').on('click',function () {
		            	$('#add_table_model').css('display','none')
		            });
		            // 批量增加

				}
			})
		//~~~~~~~~~~~~~~~~~桌台操作end~~~~~~~~~~~~~~~~~~~~~~~~~~
		//~~~~~~~~~~~~~~~~~桌台操作end~~~~~~~~~~~~~~~~~~~~~~~~~~

		// 左侧导航状态切换
		var i_r=0;
      $('#restaurant_setting').click(function () {
      	var triangle='<svg class="triangle" xmlns="http://www.w3.org/2000/svg" viewBox="2363 5718 12.417 6.208"><defs><style>.cls-1 {fill: #fff;}</style></defs><path id="Path_157" data-name="Path 157" class="cls-1" d="M365.7,4492l6.208,6.208,6.208-6.208Z" transform="translate(1997.3 1226)"/></svg>',
           triangle2='<svg class="triangle" xmlns="http://www.w3.org/2000/svg" viewBox="2366 6153.896 6.208 12.417"><defs><style>.cls-1 {fill: #fff;}</style></defs><path id="Path_158" data-name="Path 158" class="cls-1" d="M365.7,4492l6.208,6.208,6.208-6.208Z" transform="translate(-2126 6532.013) rotate(-90)"/></svg>';
      	 
       if (i_r%2==0) {
       	$('#restaurant_setting_menu').css('display','block');
       	$(this).children('.triangle').replaceWith(triangle);
       	i_r++;
       }else{
       	$('#restaurant_setting_menu').css('display','none');
       	$(this).children('.triangle').replaceWith(triangle2)
       	i_r++;

       }
       
       // 导航移入
       $('.dropdown_menu>li>a').mousemove(function () {
       	var dropdown_tag='<span class="dropdown_tag"></span>';
       	  $(this).before(dropdown_tag);
       })

       // 鼠标移出
       $('.dropdown_menu>li>a').mouseout(function () {
       	var ifTemp=$(this).parent().find("i");
       	console.log(ifTemp.length)
          if(ifTemp.length<=0){
       	  $(this).siblings().remove('.dropdown_tag');
       	}else{
       		$(this).parent().find("i").remove()
       	}

       })

      	
      	
      })
      // 左侧导航条颜色设置和阻止事件冒泡 点击这个的颜色变化，其他的颜色不变
      $('.dropdown_menu>li>a').click(function () {
      	//阻止事件冒泡     
        event.stopPropagation();
      	// console.log($(this))
      	// 点击确认颜色
      	$(this).parent().siblings().css('background-color','');
      	$(this).parent().css('background-color','#ff6c0e');
      	// 点击插入dom temp是中间元素 如有有的话，鼠标经过，白条不消失
      	var dropdown_tag='<span class="dropdown_tag"></span>';
      	var temp='<i style="display:none"></i>'
      	$(this).before(dropdown_tag);
      	$(this).before(temp);


      	
      	$(this).parent().siblings().find("span").remove();

      })


  

    $('#table_fixed').scroll(function () {
    	var table_head=$('#table_fixed>table>thead'),
    	    scrollTop=this.scrollTop+'px';
    	console.log(scrollTop);

    	table_head.css('transform','translateY('+scrollTop+')');
    })









// ~~~~~~~~~~~~~~~~~~~~~~~~表头固定 start
    

// end 表头固定~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~manage.html start

// end manage.html~~~~~~~~~~~~~~~~~~~~~~~~
    














	
})