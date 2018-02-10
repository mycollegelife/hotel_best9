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

	// 会员列表 获取列表时 遍历数据函数
		function memList_getData(data,myData){
			var str="";
			var status = "";
			for (var i = 0; i < myData .length; i++) {
				if(data.info[i].user_info_flag == 1){
					status="checked";
				}
				str+='<tr><td><input type="checkbox" name=""></td><td>'+(i+1)+
				'</td><td>'+myData[i].user_info_phone+
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
				'</td><td>'+myData[i].member_group_phone+
				'</td><td><img class="svg_style edit" src="../imgs/manage/change.svg" alt=""><img class="svg_style delete" src="../imgs/manage/delect.svg" alt=""></td></tr>';
			};
			$(".mem_main tbody").html(str);
		}

	// 会员列表 编辑时 处理数据函数
		function memList_editData(myData,j){
			var str = "<h3>页面没有写</h3>";
			return str;
		}

	// 会员等级 编辑时 处理数据函数
		function memRank_editData(myData,j){
			// ----------    等级   --------先默认设置12级
				var my_real = myData[j].member_degree_real;
				var my_option = "";
				for (var i = 0; i < 12; i++) {
					if (i  == my_real) {
						my_option +='<option selected>'+(i+1)+'</option>';
					}else{
						my_option +='<option>'+(i+1)+'</option>';
					}
				}
			// ----------    等级   --------先默认设置12级
			
			// 积分字符串截取
				var myUnit = myData[j].member_degree_unit;
				var index = myUnit.indexOf(":");
				var myUnit1 = myUnit.substring(0,index);
				var myUnit2 = myUnit.substring(index+1);

			var str = '<div><b>等级设置</b></div> <div> <label>等级<i class="my_opacity">单位</i></label> <select class="select select_lg " name="real">'
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
			'"/> <p>天</p> </div>';

			return str;
		}

	// 会员分组 编辑时 处理数据函数
		function memGroup_editData(myData,j){
			var str ='<div><b>分组设置</b></div> <div> <label>分组名称</label> <input type="text"  name="name"  class="input input_lg" value="'
			+myData[j].member_group_name+
			'"/> </div> <div> <label>联系人<i class="my_opacity">人</i></label> <input type="text" name="person"  class="input input_lg" value="'
			+myData[j].member_group_master+
			'"/> </div> <div> <label><i class="my_opacity">联系人人</i></label> <span>协议单位分组可填相关联系人</span> </div> <div> <label>联系电话</label> <input type="text" name="telNum"  class="input input_lg" value="'
			+myData[j].member_group_num+
			'"/> </div> <div> <label><i class="my_opacity">联系电话</i></label> <span>联系人的电话</span> </div>'


			return str;	
		}


	// 会员 获取 所有列表内容   的函数封装
		function List_getCon(data,getDataFun,myToken,deleteUrl,addFun,editFun){
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
						console.log($myToken);

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
						$(".tem_main").html(str);	

						// 返回按钮
							$return.click(function(){
								$rank_content.removeClass("myDisplay");
								$rank_model_edit.addClass("myDisplay");
								$("#member_rankM input").val("");
							})
						// 确认添加按钮
							$add.click(function(){
								addFun();

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
						console.log(1)
				    	List_getCon(data,memList_getData,"myData[j].user_info_token","/snug/deleteMember",add_con,memList_editData);//会员列表 获取内容 
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
						    	List_getCon(data,memList_getData,"myData[j].user_info_token","/snug/deleteMember",add_con,memList_editData);//会员列表 获取内容 
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
								List_getCon(data,memList_getData,"myData[j].user_info_token","/snug/deleteMember",add_con,memList_editData);//会员列表 获取内容 
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
				    List_getCon(data,memRank_getData,"myData[j].member_degree_token","/snug/deleteMemberDegree",add_con,memRank_editData);//会员等级 获取内容 
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
			var $unit = $unit1+":"+$unit2;
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
				    List_getCon(data,memGroup_getData,"myData[j].member_group_token","/snug/deleteMemberGroup",add_con1,memGroup_editData);//会员分组获取内容 
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
	
	//点击挂账账单
		$("#mem_bill").click(function(){
			$("#member_content").load("member/mem_bill.html",function(){
				setConHeight();//设置右下内容高度
				// 点击结账
				
				$(".mb_table tbody td:last-child span").click(function(){
					console.log(1)

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
			})
		})




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