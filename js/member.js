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
	
	// 会员列表的高度
		function setConHeight1() {
			var mem_height=$(".manage_main").height();
			var mem_bottomH = $(".apliPurchase_bottom").outerHeight(true);
			var mm_height=parseInt(mem_height)-parseInt(mem_bottomH);
			$(".center_hei").css("height", mm_height);
		}

	//消息群发展开  收起状态
		function quick_add(){
			$("#apbs_toDown").click(function(){
				$(".apb_spread").css("display","none");
				$(".apb_gather").css("display","block");
				setConHeight1();//设置右下内容模板 中间  高度
			
			});
			$("#apbg_toUp").click(function(){
				$(".apb_spread").css("display","block");
				$(".apb_gather").css("display","none");
				setConHeight1();//设置右下内容模板 中间  高度
			
			})
		}

	// 会员列表 --获取列表--时 遍历数据函数
		function memList_getData(data,myData){
			var str="";
			var status = "";
				console.log(myData);
			for (var i = 0; i < myData .length; i++) {
				
				if(data.info[i].user_info_flag == 1){
					status="checked";
				}
				str+='<tr><td><input type="checkbox" name=""></td><td>'+(i+1)+
				'</td><td>'+myData[i].user_info_name+
				'</td><td>'+myData[i].user_info_phone+
				'</td><td>'+myData[i].member_group_name+
				'</td><td class="myDisplay">'+myData[i].user_info_token+
				'</td><td>'+myData[i].member_degree_name+
				'</td><td>'+myData[i].user_info_balance+
				'</td><td>'+myData[i].user_info_score+
				'</td><td>'+myData[i].user_info_trade_count+
				'</td><td>'+myData[i].user_info_total+
				'</td><td><input type="checkbox" class="mui-switch mui-switch-animbg checkbox_shin size" '+status+
				'></td><td><img class="svg_style edit" src="../imgs/manage/change.svg" alt=""><img class="svg_style delete" src="../imgs/manage/delect.svg" alt=""></td></tr>'
			}
			$(".mem_main tbody").html(str);
		}

	// 会员等级 --获取列表--时 遍历数据函数
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

	// 会员分组 --获取列表--时 遍历数据函数
		function memGroup_getData(data,myData){
			var str ="";
			for (var i = 0; i < myData.length; i++) {
				str+='<tr><td>'+myData[i].member_group_name+
				'</td><td class="myDisplay">'+myData[i].member_group_token+
				'</td><td>'+myData[i].member_group_num+
				'</td><td>'+myData[i].member_group_master+
				'</td><td>'+myData[i].member_group_phone+
				'</td><td><img class="svg_style edit" src="../imgs/manage/change.svg" alt=""><img class="svg_style delete" src="../imgs/manage/delect.svg" alt=""></td></tr>';
			};
			$(".mem_main tbody").html(str);
		}

	// 挂账账单 --获取列表--时 遍历数据函数
		function memBill_getData(data,myData){
			var str ="";
			for (var i = 0; i < myData.length; i++) {
				str+='<tr> <td>1</td> <td>'
				+myData[i].user_info_name+'</td> <td>'
				+myData[i].bookdinner_info_phone+'</td> <td> '
				+myData[i].bookdinner_info_cost_type+' <span>查看消费详情</span> </td> <td>'
				+myData[i].bookdinner_info_times+'</td> <td class="myDisplay">'
				+myData[i].bookdinner_info_token+'</td> <td>'
				+myData[i].bookdinner_info_bills_cost+'</td> <td><span>结账</span></td> </tr>'
			};
			$(".mem_main tbody").html(str);
		}

	// 会员列表 编辑时 --处理--数据函数
		function memList_editData(myData,j){
			var status = "";
			console.log(myData[j].user_info_flag)
			if (myData[j].user_info_flag == "0") {//关
				status = '<option>开</option> <option selected>关</option>'
			}else{
				status = '<option selected>开</option> <option>关</option>'
			}
			// 得到所有的会员等级
				var option_level = "";
				var this_leval = myData[j].user_info_level;
				$.ajax({
					async: false,
					url:"/snug/queryMemberDegrees",
					success:function(data){
						var data = JSON.parse(data);
						console.log(data)
						var myData = data.info;
						for (var i = 0; i < myData.length; i++) {
							if (myData[i].member_degree_real == this_leval) {
								option_level +='<option selected>'+myData[i].member_degree_real+'</option> '
							}else{
								option_level +='<option>'+myData[i].member_degree_real+'</option> '
							}
						}
					},
					error:function(){
					    console.log("添加失败！")
					}
				})
			
			// 得到所有的会员分组
				var option_group ='';
				var this_group = myData[j].member_group_name;
				$.ajax({
					async: false,
					url:"/snug/queryMemberGroups",
					success:function(data){
						var data = JSON.parse(data)
						// console.log(data);
						var myData = data.info;
						for (var i = 0; i < myData.length; i++) {
							if (myData[i].member_group_name == this_group) {
								option_group +='<option selected>'+myData[i].member_group_name+'</option> '
							}else{
								option_group +='<option>'+myData[i].member_group_name+'</option> '
							}
						}
					},
					error:function(){
						console.log("添加失败！")
					}
				})

			var str = '<div class="tem_main"> <div><b>基础设置</b></div> <div> <label>姓名<i class="my_opacity">姓名</i></label> <input type="text" name="name" class="input input_lg" value="'
			+myData[j].user_info_name+'"/> </div> <div> <label>联系信息</label> <input type="text" name="phone" class="input input_lg" value="'
			+myData[j].user_info_phone+'"/> </div> <div> <label>会员分组</label><select name="group" class="select select_lg">'
			+option_group+'</select><img src="../imgs/select_logo.svg" alt=""></div> <div> <label>会员等级</label><select name="level" class="select select_lg">'
			+option_level+'</select><img src="../imgs/select_logo.svg" alt=""></div> <div> <label>积分<i class="my_opacity">积分</i></label> <input type="text" name="score" class="input input_lg" value="'
			+myData[j].user_info_score+'"/> <button class="button btn_yellow">充值</button> </div> <div> <label>余额<i class="my_opacity">余额</i></label> <input type="text" name="balance" class="input input_lg"  value="'
			+myData[j].user_info_balance+'"/> <button class="button btn_yellow">充值</button> </div> <div> <label>状态<i class="my_opacity">状态</i></label> <select class="select select_lg" id="Edit_status"> '
			+status+' </select> <img src="../imgs/select_logo.svg" alt=""> </div> </div> <div class="tem_main"> <div><b>交易信息</b></div> <div> <label>成交单数</label> <input type="text" name="trade_count" class="input input_lg" value="'
			+myData[j].user_info_trade_count+'"/> </div> <div> <label>成交金额</label> <input type="text" name="total" class="input input_lg" value="'
			+myData[j].user_info_total+'"/> <p>元</p> </div> </div>'
			return str;
		}

	// 会员等级 编辑时 --处理--数据函数
		function memRank_editData(myData,j){
			// ----设置等级   默认12级----
				var my_option = "";
				var this_token = myData[j].member_degree_token;
				console.log(this_token );
				
				for (var i = 1; i < 12; i++) {
					if (i == myData[j].member_degree_real) {
						my_option +='<option selected>'+myData[j].member_degree_real+'</option> '
					}else{
						my_option +='<option>'+i+'</option> '
					}
				}
				

				// $.ajax({
				// 	async: false,
				// 	url:"/snug/queryMemberDegrees",
				// 	success:function(data){
				// 		var data = JSON.parse(data);
				// 		console.log(data)
				// 		var myData = data.info;
				// 		for (var i = 0; i < myData.length; i++) {
				// 			if (myData[i].member_degree_token == this_token) {
				// 				my_option +='<option selected>'+myData[i].member_degree_real+'</option> '
				// 			}else{
				// 				my_option +='<option>'+myData[i].member_degree_real+'</option> '
				// 			}
				// 		}
				// 	},
				// 	error:function(){
				// 	    console.log("添加失败！")
				// 	}
				// })

			// ----设置等级   默认12级----

			// 状态设置
				var status = "";
				console.log(myData[j].member_degree_flag)
				if (myData[j].member_degree_flag == "0") {//关
					status = '<option>开</option> <option selected>关</option>'
				}else{
					status = '<option selected>开</option> <option>关</option>'
				}
			// 积分字符串截取
				var myUnit = myData[j].member_degree_unit;
				var index = myUnit.indexOf(":");
				var myUnit1 = myUnit.substring(0,index);
				var myUnit2 = myUnit.substring(index+1);

			var str = '<div class="tem_main rank_main"><div><b>等级设置</b></div> <div> <label>等级<i class="my_opacity">单位</i></label> <select class="select select_lg " name="real">'
			+my_option+
			'</select> <img src="../imgs/manage/select_logo.svg" alt=""> </div> <div> <label><i class="my_opacity">等级名称</i></label> <span>数字越大,等级越高</span> </div> <div> <label>等级名称</label> <input type="text" name="name" class="input input_lg" value="'
			+myData[j].member_degree_name+
			'"/> </div> <div> <label>等级条件</label> <input type="text" name="lower" class="input input_lg" value="'
			+myData[j].member_degree_lower+
			'"/> </div> <div> <label><i class="my_opacity">升级条件</i></label> <span>会员升级条件，不填写默认为不自动升级</span> </div> <div> <label>折扣<i class="my_opacity">单位</i></label> <input type="text" name="discount" class="input input_lg" value="'
			+myData[j].member_degree_discount+
			'"/> </div> <div> <label><i class="my_opacity">折扣折扣</i></label> <span>请设置0.1-10之间的数字，值为空代表不设置折扣</span> </div> <div> <label>积分规则</label> <p>每消费</p> <input type="text" name="unit1" class="input input_lg" value="'
			+myUnit1+
			'"/> <p>得</p> <input type="text" name="unit2" class="input input_lg" value="'
			+myUnit2+
			'"/> <p>积分</p> </div> <div> <label>信用额度</label> <input type="text" name="credit" class="input input_lg" value="'
			+myData[j].member_degree_discount+
			'"/> <p>元</p> </div> <div> <label>结算周期</label> <input type="text" name="settle" class="input input_lg" value="'
			+myData[j].member_degree_discount+
			'"/> <p>天</p> </div><div><label>状态<i class="my_opacity">状态</i></label> <select class="select select_lg" id="Edit_status">'
			+status+' </select> <img src="../imgs/select_logo.svg" alt=""> </div><div>'; 
			
			return str;
		}

	// 会员分组 编辑时 --处理--数据函数
		function memGroup_editData(myData,j){
			var str ='<div class="tem_main group_main"><div><b>分组设置</b></div> <div> <label>分组名称</label> <input type="text"  name="name"  class="input input_lg" value="'
			+myData[j].member_group_name+
			'"/> </div> <div> <label>联系人<i class="my_opacity">人</i></label> <input type="text" name="person"  class="input input_lg" value="'
			+myData[j].member_group_master+
			'"/> </div> <div> <label><i class="my_opacity">联系人人</i></label> <span>协议单位分组可填相关联系人</span> </div> <div> <label>联系电话</label> <input type="text" name="telNum"  class="input input_lg" value="'
			+myData[j].member_group_phone+
			'"/> </div> <div> <label><i class="my_opacity">联系电话</i></label> <span>联系人的电话</span> </div></div>'
			return str;	
		}

	// 会员列表 编辑时 --提交--数据函数
		function memList_editSubmit(token){
			var $name = $("input[name='name']").val();
			var $phone = $("input[name='phone']").val();
			var $group_name = $("select[name='group']").val();
			var $level = $("select[name='level']").val();
			var $score = $("input[name='score']").val();
			var $balance = $("input[name='balance']").val();
			var $trade_count = $("input[name='trade_count']").val();
			var $total = $("input[name='total']").val();
			var status = $("#Edit_status").val();
			var $status = "";
			if (status == "开") {
				$status = "1"
			}else{
				$status = "0"
			};

			// 获取等级的 token
				var $level_token ="";
				$.ajax({
					async: false,
					url:"/snug/queryMemberDegrees",
					success:function(data){
						var data = JSON.parse(data);
						// console.log(data)
						var myData = data.info;
						for (var i = 0; i < myData.length; i++) {
							if (myData[i].member_degree_real == $level) {
								$level_token = myData[i].member_degree_token;
							}
						}
					},
					error:function(){
					    console.log("添加失败！")
					}
				})
			// 获取分组的token
				var $group_token="";
				$.ajax({
					async: false,
					url:"/snug/queryMemberGroups",
					success:function(data){
						var data = JSON.parse(data)
						// console.log(data);
						var myData = data.info;
						for (var i = 0; i < myData.length; i++) {
							if (myData[i].member_group_name == $group_name) {
								$group_token = myData[i].member_group_token;
							}
						}
					},
					error:function(){
						console.log("添加失败！")
					}
				})
			console.log($name+','+$phone+','+$group_name+','+$level+','
				+$score+','+$balance+','+$trade_count+','+$total+','+ $status);
			// console.log(token)
			$.ajax({
				url:"/snug/updateMember",
				data:{
					user_info_name:$name,
					user_info_phone:$phone,
					user_info_group:$group_token,
					user_info_level:$level_token,
					user_info_score:$score,
					user_info_balance:$balance,
					user_info_flag:$status,
					user_info_trade_count:$trade_count,
					user_info_total:$total,
					user_info_token:token
				},
				success:function(data){
					var data = JSON.parse(data);
					if (data.status == 1) {
						loadMemList();//重新加载内容
						console.log("修改成功！")
					}else{
				    	console.log("发送成功，返回状态2！")
					}
				},
				error:function(){
				    console.log("修改失败！")
				}
			})

		}
	
	// 会员等级 编辑时 --提交--数据函数
		function memRank_editSubmit(token){
			var $real = $("#rank_model_edit .tem_main select").val();
			var $name = $("#rank_model_edit input[name='name']").val();
			var $lower = $("#rank_model_edit input[name='lower']").val();
			var $discount = $("#rank_model_edit input[name='discount']").val();
			var $unit1 = $("#rank_model_edit input[name='unit1']").val();
			var $unit2 = $("#rank_model_edit input[name='unit2']").val();
			var $unit = $unit1+":"+$unit2;
			var $credit = $("#rank_model_edit input[name='credit']").val();
			var $settle = $("#rank_model_edit input[name='settle']").val();
			var $flag_val = $("#Edit_status").val();
			var $flag = "";
			if ($flag_val == "开") {
				$flag ="1"
			}else{
				$flag ="0"
			}
			

			console.log("会员等级："+$real +",等级名称："+$name +
				"，等级条件："+$lower+"，折扣："+$discount+
				"，积分规则："+$unit+"，信用额度："+$credit+
				"，结算周期："+$settle+"，状态："+$flag);

			$.ajax({
				url:"/snug/updateMemberDegrees",
				data:{
					member_degree_name:$name,
					member_degree_discount:$discount,
					member_degree_lower:$lower,
					member_degree_real:$real,
					member_degree_unit:$unit,
					department_id:"1",
					member_degree_credit:$credit,
					member_degree_settlement_date:$settle,
					member_degree_token:token,
					member_degree_flag:$flag
				},
				success:function(data){
					var data = JSON.parse(data);
					console.log(data)
					if (data.status==1) {
						console.log("修改成功！")
						loadCon("member/mem_rank.html",test_con,add_con);//重新加载内容
					}else if(data.status==2) {
						console.log("修改失败2")
					}
				},
				error:function(){
					console.log("失败！")
				}
			}) 
		}


	// 会员分组 编辑时 --提交--数据函数
		function memGroup_editSubmit(token){
			var $name = $("#rank_model_edit input[name='name']").val();
			var $person = $("#rank_model_edit input[name='person']").val();
			var $telNum = $("#rank_model_edit input[name='telNum']").val();

			console.log($name+','+$person+','+$telNum);
			


			$.ajax({
				url:"/snug/updateMemberGroup",
				data:{
					member_group_name:$name,
					member_group_master:$person,
					member_group_phone:$telNum,
					department_id:1,
					member_group_token:token,
					xxx:new Date()
				},
				success:function(data){
					
					var data = JSON.parse(data);
					if (data.status==1) {
						console.log("修改成功！")
						loadCon("member/mem_group.html",test_con1,add_con1);//重新加载内容
					}else if(data.status==2) {
						console.log("失败 2 ！")
					}
				},
				error:function(){
					console.log("失败！")
				}
			})
		}

	
	// 会员 获取 -----------------所有列表内容 ------------------- 的函数封装
		function List_getCon(data,getDataFun,myToken,deleteUrl,addFun,editFun,reloadFun,editSubmitFun){
			var data = JSON.parse(data);
			var myData = data.info;
			
			console.log(data);

			$(".mem_main tbody").html("");
			
			if (data.status ==1) {

				getDataFun(data,myData)//获取数据 塞入tbody

				fix_thead(".manage_main");//固定表头
				
				// 点击修改
					$(".mem_main tbody img.edit").click(function(){
						var $myToken = $(this).parent().parent().find("td.myDisplay").html();
						// console.log($myToken);

						modelHe();
						var $rank_content = $("#rank_content");
						var $rank_model_edit = $("#rank_model_edit");
						var $add = $("#rank_model_edit #add");
						var $return= $("#rank_model_edit #return");

						$rank_content.addClass("myDisplay");
						$rank_model_edit.removeClass("myDisplay");						

						for (var j = 0; j < myData .length; j++) {
							if (eval(myToken) == $myToken) {
								console.log(myData[j]);
								
								var str = editFun(myData,j);//编辑  处理数据
							}
						}
						$(".tm_main").html(str);
						// 返回按钮
							$return.click(function(){
								$rank_content.removeClass("myDisplay");
								$rank_model_edit.addClass("myDisplay");
								$("#member_rankM input").val("");
							})
						// 确认添加按钮
							$add.click(function(){
								console.log($("input[name='name']").val());
								editSubmitFun($myToken)
								// memGroup_editSubmit($myToken);
								// memRank_editSubmit();
								// memList_editSubmit($myToken);

							})
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
									reloadFun();//重新加载内容
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
				
				setConHeight1();//设置会员列表 高度
				
				fix_thead(".mem_main");//固定表头

				quick_add()//消息群发的展开收起

				$.ajax({
					url:"/snug/queryMembers", 
					success:function(data){
				    	List_getCon(data,memList_getData,"myData[j].user_info_token","/snug/deleteMember",add_con,memList_editData,loadMemList,memList_editSubmit);//会员列表 获取内容 
					},
					error:function(){
					    console.log("获取失败！")
					}
				});

				// 搜索会员
				$("#mem_select").bind("input propertychange change",function(event){
					// console.log($("#mem_select").val());
					
					var $selectVal = $("#mem_select").val();

					if ($selectVal == "") {
						$.ajax({
							url:"/snug/queryMembers",
							success:function(data){
						    	List_getCon(data,memList_getData,"myData[j].user_info_token","/snug/deleteMember",add_con,memList_editData,loadMemList,memList_editSubmit);//会员列表 获取内容 
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
								List_getCon(data,memList_getData,"myData[j].user_info_token","/snug/deleteMember",add_con,memList_editData,loadMemList,memList_editSubmit);//会员列表 获取内容 
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
				    List_getCon(data,memRank_getData,"myData[j].member_degree_token","/snug/deleteMemberDegree",add_con,memRank_editData,test_con,memRank_editSubmit);//会员等级 获取内容 
				},
				error:function(){
				    console.log("添加失败！")
				}
			})
		}
	
	//获取 会员等级 要添加的内容，发送到后台
		function add_con(){
			var $real = $("#rank_model .tem_main select").val();
			var $name = $("#rank_model input[name='name']").val();
			var $lower = $("#rank_model input[name='lower']").val();
			var $discount = $("#rank_model input[name='discount']").val();
			var $unit1 = $("#rank_model input[name='unit1']").val();
			var $unit2 = $("#rank_model input[name='unit2']").val();
			var $unit = $unit1+":"+$unit2;
			var $credit = $("#rank_model input[name='credit']").val();
			var $settle = $("#rank_model input[name='settle']").val();

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
				    List_getCon(data,memGroup_getData,"myData[j].member_group_token","/snug/deleteMemberGroup",add_con1,memGroup_editData,test_con1,memGroup_editSubmit);//会员分组获取内容 
				},
				error:function(){
					console.log("添加失败！")
				}
			})
		}
	
	//获取 会员分组 要添加的内容，发送到后台
		function add_con1(){
			var $name = $("#rank_model input[name='name']").val();
			var $person = $("#rank_model input[name='person']").val();
			var $telNum = $("#rank_model input[name='telNum']").val();

			$.ajax({
				url:"/snug/addMemberGroup",
				data:{
					member_group_name:$name,
					member_group_master:$person,
					member_group_phone:$telNum,
					department_id:1,
					member_group_token:330236184
				},
				success:function(data){
					var data = JSON.parse(data);
					if (data.status==1) {
						loadCon("member/mem_group.html",test_con1,add_con1);//重新加载内容
						console.log("添加成功！")
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
	
	//点击挂账账单
		$("#mem_bill").click(function(){
			$("#member_content").load("member/mem_bill.html",function(){
				setConHeight();//设置右下内容高度
				test_con2()// 加载页面
				// 搜索
				$("#mem_select").bind("input propertychange change",function(event){
					// console.log($("#mem_select").val());
					var $selectVal = $("#mem_select").val();

					if ($selectVal == "") {
						test_con2()// 加载页面
					} else {
						$.ajax({
							url:"/snug/queryBillsListLikeName",
							data:{
								key_word:$selectVal,
							},
							success:function(data){
								var data = JSON.parse(data);
								var myData = data.info;
								if (data.status == 1) {
									memBill_getData(data,myData)//获取数据 塞入tbody
									fix_thead(".manage_main");//固定表头
									memBill_click()// 点击结账
								}else{
									console.log("返回状态为2")
								}
								
							},
							error:function(){
								console.log("搜索失败！")
							}
						});
					}
				});
			})
		})
	// 挂账账单加载页面
		function test_con2() {
			
			$.ajax({
				url:"/snug/queryBillsList",
				success:function(data){
				    var data = JSON.parse(data);
				    var myData = data.info;
				    console.log(data);

				    $(".mem_main tbody").html("");
				    if (data.status ==1) {

				    	memBill_getData(data,myData)//获取数据 塞入tbody

				    	fix_thead(".manage_main");//固定表头

				    	memBill_click()// 点击结账
				    	

				    }else{
				    	console.log("返回状态为2")
				    }
				},
				error:function(){
				    console.log("失败！")
				}
			})
		}
		//点击结账
		function memBill_click(){
			$(".mb_table tbody td:last-child span").click(function(){
				var str = '<div class="alert_bg"> <div class="alert_model mb_alert_model"> <div class="alert_model_title"><span>挂账-结账</span><button class="button btn_blue" id="alert_return">返回</button></div> <div class="alert_model_content"><div class="om_title">	<li class="hover">现金</li>	<li>微信</li>	<li>支付宝</li></div> <div> <label>欠费金额</label> <input type="text" name="" class="input input_lg"> </div><div> <label>实收<i class="my_opacity">实收</i></label> <input type="text" name="" class="input input_lg"> </div> <div> <label>找零<i class="my_opacity">找零</i></label> <input type="text" name="" class="input input_lg"> </div> </div> <div class="alert_model_item"> <button class="button" id="alert_confirm">确认收款</button> <button class="button" >重置</button> </div> </div> </div>';
				$(".wrap").prepend(str);

				$(".alert_model_content").find("div:nth-child(2) .input").focus();
				
				// $(".alert_bg").click(function(){
				// 	// $(this).find(".input").focus();
				// })
				//确认添加
				$("#alert_confirm").click(function(){
					var classify_name = $(this).parent().prev().find(".input").val();
					
					if (classify_name.length>0) {
						// console.log(classify_name);
						$(".alert_bg").remove();
					}
				})
				//返回添加
				$("#alert_return").click(function(){
					$(".alert_bg").remove();
				})
			})
		}

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
					var $add = $("#rank_model #add");
					var $return= $("#rank_model #return");

					$rank_content.addClass("myDisplay");
					$rank_model.removeClass("myDisplay");

					// 返回按钮
						$return.click(function(){
							$rank_content.removeClass("myDisplay");
							$rank_model.addClass("myDisplay");
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