(function(){
//-------------------------------会员部分----------------------------------------------
	
	// 会员设置    固定表头
		function fix_thead(target){
			// console.log("固定表头")
			var ratio = window.innerWidth *100/1920;//计算比例
			// 滚动固定表格的头  $(this) == my_inner
			$(target).scroll(function () {
				
				if ($(this).scrollTop()>0.3*ratio) {
					var scrollH = $(this).scrollTop() -0.3*ratio;
					$(this).find("thead").css({
						transform: "translateY("+scrollH+"px)",
					});
				}else{
					$(this).find("thead").css({
						transform: "translateY(0px)",
					});
				}			    
			});
		}
	
	// 会员列表 获取列表时 遍历数据函数
		function memList_getData(data,myData){
			var str="";
			var status = "";
			for (var i = 0; i < myData .length; i++) {
				if(data.info[i].user_info_flag == 1){
					status="checked";
				}
				str+='<tr><td>'+(i+1)+'</td><td>'+myData[i].user_info_phone+
				'</td><td>'+myData[i].member_group_name+
				'</td><td class="myDisplay">'+myData[i].user_info_token+
				'</td><td>'+myData[i].user_info_level+
				'</td><td>'+myData[i].user_info_balance+
				'</td><td>'+myData[i].user_info_score+
				'</td><td>'+myData[i].user_info_trade_count+
				'</td><td>'+myData[i].user_info_total+
				'</td><td><input type="checkbox" class="mui-switch mui-switch-animbg checkbox_shin size" '+status+
				'></td><td><img class="svg_style edit" src="../imgs/manage/change.svg" alt=""><img class="svg_style delete" src="../imgs/manage/delect.svg" alt=""></td></tr>'
			}
			$(".mem_main tbody").html(str);

		}

	// 会员等级 获取列表时 遍历数据函数
		function memRank_getData(data,myData){
			var str ="";
			var status = "";
			for (var i = 0; i < myData.length; i++) {
				if(data.info[i].member_degree_flag == 1){
						status="checked";
					}
				str+='<tr><td>'+myData[i].member_degree_real+
				'</td><td>'+myData[i].member_degree_name+
				'</td><td class="myDisplay">'+myData[i].member_degree_token+
				'</td><td>'+myData[i].user_info_levelnums+
				'</td><td>'+myData[i].member_degree_discount+
				'</td><td>'+myData[i].member_degree_unit+
				'</td><td>'+myData[i].member_degree_lower+
				'</td><td><input type="checkbox" class="mui-switch mui-switch-animbg checkbox_shin size" '+status+
				'></td><td><img class="svg_style edit" src="../imgs/manage/change.svg" alt=""><img class="svg_style delete" src="../imgs/manage/delect.svg" alt=""></td></tr>';;
			};
			$(".mem_main tbody").html(str);
		}

	// 会员分组 获取列表时 遍历数据函数
		function memGroup_getData(data,myData){
			var str ="";
			for (var i = 0; i < myData.length; i++) {
				str+='<tr><td>'+myData[i].member_group_name+
				'</td><td class="myDisplay">'+myData[i].member_group_token+
				'</td><td>'+myData[i].member_group_num+
				'</td><td>'+myData[i].member_group_master+
				'</td><td><img class="svg_style edit" src="../imgs/manage/change.svg" alt=""><img class="svg_style delete" src="../imgs/manage/delect.svg" alt=""></td></tr>';
			};
			$(".mem_main tbody").html(str);
		}

	// 会员 获取 所有列表内容   的函数封装
		function List_getCon(data,getDataFun,myToken,deleteUrl){
			var data = JSON.parse(data);
			var myData = data.info;
			
			// console.log(data);

			$(".mem_main tbody").html("");
			
			if (data.status ==1) {

				getDataFun(data,myData)//获取数据 塞入tbody

				fix_thead(".manage_main");//固定表头
				
				// 点击修改
					$(".mem_main tbody img.edit").click(function(){
						var $myToken = $(this).parent().parent().find("td.myDisplay").html();
						
						console.log($myToken);
						
						for (var j = 0; j < myData .length; j++) {
							if (eval(myToken) == $myToken) {
								console.log(myData[j])
							}
						}
					})

				// 点击删除
					$(".mem_main tbody img.delete").click(function(){
						var $myToken = $(this).parent().parent().find("td.myDisplay").html();
						console.log($myToken);
						$.ajax({
							url:deleteUrl,
							data:{token:$myToken},
							success:function(data){
								var data = JSON.parse(data);
								if (data.status == 1) {
									console.log("删除成功！")
								}else{
							    	console.log("发送删除失败！")
								}
							},
							error:function(){
							    console.log("删除失败！")
							}
						})

					})
			}else{
				console.log("搜索失败！")
			}
		}

	// 会员列表  获取列表内容 
		function  loadMemList(){
			$("#member_content").load("member/mem_list.html",function(){
				setConHeight();//设置右下内容高度
				fix_thead(".manage_main");//固定表头

				$.ajax({
					url:"/snug/queryMembers",
					success:function(data){
				    	List_getCon(data,memList_getData,"myData[j].user_info_token","/snug/deleteMember");//会员列表 获取内容 
					},
					error:function(){
					    console.log("获取失败！")
					}
				});

				//搜索会员
				$("#mem_select").bind("input propertychange change",function(event){
					// console.log($("#mem_select").val());
					
					var $selectVal = $("#mem_select").val();

					if ($selectVal == "") {
						$.ajax({
							url:"/snug/queryMembers",
							success:function(data){
						    	List_getCon(data,memList_getData,"myData[j].user_info_token","/snug/deleteMember");//会员列表 获取内容 
							},
							error:function(){
							    console.log("获取失败！")
							}
						});
					} else {
						$.ajax({
							url:"/snug/queryFuzzyMembers",
							data:{
								search_condition:$selectVal,
							},
							success:function(data){
								List_getCon(data,memList_getData,"myData[j].user_info_token","/snug/deleteMember");//会员列表 获取内容 
							},
							error:function(){

								console.log("搜索失败！")
							}
						});

					}



					

				});
			})
		};//添加内容
		loadMemList();//点击会员时自动加载会员列表

	// 点击会员列表
		$('#mem_list').click(function () {
	   	      
	   	    loadMemList(); // load加载页面
		});

	// 会员等级获取列表内容
		function test_con(){
			$.ajax({
				url:"/snug/queryMemberDegrees",
				success:function(data){
				    List_getCon(data,memRank_getData,"myData[j].member_degree_token","/snug/deleteMemberDegree");//会员等级 获取内容 
				},
				error:function(){
				    console.log("添加失败！")
				}
			})
		}
	
	//获取 会员等级 要添加的内容，发送到后台
		function add_con(){
			var $real = $(".tem_main select").val();
			var $name = $("input[name='name']").val();
			var $lower = $("input[name='lower']").val();
			var $discount = $("input[name='discount']").val();
			var $unit1 = $("input[name='unit1']").val();
			var $unit2 = $("input[name='unit2']").val();
			var $unit = $unit1/$unit2;
			var $credit = $("input[name='credit']").val();
			var $settle = $("input[name='settle']").val();

			// alert("会员等级："+$real +",等级名称："+$name +
			// 	"，等级条件："+$lower+"，折扣："+$discount+
			// 	"，积分规则："+$unit+"，信用额度："+$credit+"，结算周期："+$settle);

			$.ajax({
				url:"/snug/insertMemberDegree",
				data:{
					member_degree_name:$name,
					member_degree_discount:$discount,
					member_degree_lower:$lower,
					member_degree_real:$real,
					member_degree_unit:$unit,
					department_id:"1",
					member_degree_credit:$credit,
					member_degree_settlement_date:$settle
				},

				success:function(data){
					var data = JSON.parse(data);
					if (data.status==1) {
						console.log("添加成功！")
						loadCon("member/mem_rank.html",test_con,add_con);//重新加载内容
					}else if(data.status==2) {
						console.log("添加失败！请检查网络连接")
					}
				},
				error:function(){
					console.log("添加失败！")
				}
			}) 
			

		}
	
	//点击会员等级
		newRankGroup('#mem_rank',"member/mem_rank.html",test_con,add_con)
	
	// 会员分组获取列表内容
		function test_con1(){
			$.ajax({
				url:"/snug/queryMemberGroups",
				success:function(data){
				    List_getCon(data,memGroup_getData,"myData[j].member_group_token","/snug/deleteMemberGroup");//会员分组获取内容 
				},
				error:function(){
					console.log("添加失败！")
				}
			})
		}
	
	//获取 会员分组 要添加的内容，发送到后台
		function add_con1(){
			var $name = $("input[name='name']").val();
			var $person = $("input[name='person']").val();
			var $telNum = $("input[name='telNum']").val();
			
			$.ajax({
				url:"/snug/addMemberGroup",
				data:{
					member_group_name:$name,
					member_group_master:$person,
					member_group_phone:$telNum,
					department_id:1
				},
				success:function(data){
					var data = JSON.parse(data);
					if (data.status==1) {
						console.log("添加成功！")
						loadCon("member/mem_group.html",test_con1,add_con1);//重新加载内容
					}else if(Data.status==2) {
						console.log("添加失败！")
					}
				},
				error:function(){
					console.log("添加失败！")
				}
			})
		}
	
	//点击会员分组
		newRankGroup('#mem_group',"member/mem_group.html",test_con1,add_con1)
	
	// 新建等级  和  新建分组的函数封装
		function newRankGroup(event1,loadUrl,listFUN,addFun){
			$(event1).click(function () {
				loadCon(loadUrl,listFUN,addFun)// load加载页面
			})
		};
		//右侧加载内容
		function loadCon(loadUrl,listFUN,addFun){
			$("#member_content").load(loadUrl,function(){
				setConHeight();//设置右下内容高度
				
				listFUN();// 加载列表内容

				//新建等级 更改页面内容
				$("#mem_newrank").click(function(){
					





					modelHe();
					var $rank_content = $("#rank_content");
					var $rank_model = $("#rank_model");
					var $add = $("#add");
					var $return= $("#return");

					$rank_content.css("display","none");
					$rank_model.css("display","block");

					// 返回按钮
						$return.click(function(){
							$rank_content.css("display","block");
							$rank_model.css("display","none");
							$("#member_rankM input").val("");
						})
					// 确认添加按钮
						$add.click(function(){
							addFun();
						})
				})
			})
		}


})();