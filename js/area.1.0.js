/**
	PineArea 地区三级联动插件
	
	@author liwenhao
	@email pine_lxk@163.com
	@version 1.0
	@update 2016/08/10
*/
(function(){

	var area = [['province','省'],['city','市'],['town','县']];
	
	//定义地区对象
	function Area(obj){
		this.obj = obj;
	}
	//通过原型添加功能
	Area.prototype = {
		//初始化数据
		init: function(){
			var container = '<div class="pine-area-container">'
							+ '<span class="pine-area-title">选择地区：</span>'
							+ '<div class="pine-area-content">';
			for(i in area){
				container += '<div class="pine-select pine-select-'+area[i][0]+'" name="'+area[i][0]+'">'
							+ '<span class="pine-select-where">--'+area[i][1]+'--</span>'
							+ '<ul class="pine-select-content"></ul>'
							+ '</div>';
			}			
			container += '</div></div>';

			this.obj.append(container);
			this.initValue();
			this.initProvince();
			this.addEvent();
		},
		//初始化对象的属性
		initValue: function(){
			this.container = this.obj.find('.pine-area-container');
			this.select = this.container.find('.pine-select');
			this.province = this.container.find('.pine-select-province');
			this.city = this.container.find('.pine-select-city');
			this.town = this.container.find('.pine-select-town');
			this.provinceDate = areaData.province;
			this.isProvince = 0;
			this.isCity = 0;
		},
		//初始化省级信息
		initProvince: function(){
			var province = '';
			for (var i=0;i<this.provinceDate.length;i++){
				province += '<li data='+ i +'><a title='+ this.provinceDate[i] +'>'+ this.provinceDate[i] +'</a></li>';
			}
			this.province.find("ul").html(province);
		},
		//添加事件
		addEvent: function(){
			this.selectEvent();
			this.provinceEvent();
			this.cityEvent();
			this.townEvent();
		},
		//添加省市县点击事件
		selectEvent: function(){
			var that = this;
			this.select.click(function(){
				$(this).find(".pine-select-content").toggle().parent().siblings().find(".pine-select-content").hide();
				if (that.isProvince == 1){
					that.city.find(".pine-select-content").show();
					that.isProvince = 0;
				}
				if (that.isCity == 1){
					that.town.find(".pine-select-content").show();
					that.isCity = 0;
				}
			});
		},
		//添加点击具体省事件
		provinceEvent: function(){
			var that = this;
			this.province.find("ul li a").click(function(){
			    var  province = $(this).text();
			    that.provinceIndex = $(this).parent().index();
			    that.province.find(".pine-select-where").text(province);
			    that.province.find(".pine-select-where").attr("data",province);
			    
			    that.city.find("ul li").remove();
			    that.town.find("ul li").remove();
			    that.city.find(".pine-select-where").text("--市--");
			    that.town.find(".pine-select-where").text("--县--");
			    //初始化市级信息
			    var cityData = areaData.city['a_'+that.provinceIndex];
			    var cityStr = '';
			    for (var i=0;i<cityData.length;i++ )
			    {
			        cityStr += '<li data='+ i +'><a title='+ cityData[i] +'>'+ cityData[i] +'</a></li>';
			    }
			    that.city.find("ul").html(cityStr);
			    that.isProvince = 1;
			});
		},
		//添加点击具体市事件
		cityEvent: function(){
			var that = this;
			this.city.on('click','ul li a',function(){
				var city = $(this).text();
		        that.city.find(".pine-select-where").text(city);
		        that.city.find(".pine-select-where").attr("data",city);
		        that.cityIndex = $(this).parent().index();
		        that.town.find("ul li").remove();
		        that.town.find(".pine-select-where").text("--县--");
		        //初始化县级信息
		        var townData = areaData.town['a_'+that.provinceIndex+'_'+that.cityIndex];
		       	var cityStr = '';
		        for (var i=0;i<townData.length;i++ )
		        {
		            cityStr += '<li data='+ i +'><a title='+ townData[i] +'>'+ townData[i] +'</a></li>';
		        }
		        that.town.find("ul").html(cityStr);
		        that.isCity = 1;
		    });
		},
		//添加点击具体县事件
		townEvent: function(){
			var that = this;
			this.town.on('click',"ul li a",function() {
	            that.town.find(".pine-select-where").text($(this).text());
	            that.town.find(".pine-select-where").attr("data", $(this).text());
	        });
		}
	}
	/*
		自动添加 地区 
	*/
	$('.area-container').each(function(){
		var obj = new Area($(this));
		obj.init();
	});
})();
