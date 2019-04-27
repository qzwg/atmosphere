
Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}

// // 初始化模板选择的下拉框
// var sel = document.getElementById('stylelist');
// for (var key in mapstyles) {
// var style = mapstyles[key];
// var item = new Option(style.title, key);
// sel.options.add(item);
// }
var map = new BMap.Map("allmap");
// var point = new BMap.Point(116.404, 39.915);
map.centerAndZoom("西安", 5); // 初始化地图,用城市名设置地图中心点
map.addControl(new BMap.NavigationControl()); // 添加平移缩放控件
map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
// map.addControl(new BMap.OverviewMapControl()); //添加缩略地图控件
map.enableScrollWheelZoom(); //启用滚轮放大缩小
// map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
// map.centerAndZoom(point, 14);

var mymapstyle = [{
    "featureType": "background",
    "elementType": "geometry",
    "stylers": {
        "color": "#062041bf"
    }
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": {
        "color": "#044e97ff"
    }
}, {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#044e9730"
    }
}, {
    "featureType": "districtlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#009bbfff"
    }
}, {
    "featureType": "districtlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#000000ff"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#fffffff5"
    }
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "districtlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}]
// function changeMapStyle(style) {
// console.log(style)
// map.setMapStyle({style: style});
// $('#desc').html(mapstyles[style].desc);
// }
// changeMapStyle('midnight')
// sel.value = 'midnight';


// map.setMapStyle({style: 'midnight'});
map.setMapStyle({
    styleJson: mymapstyle
});
// $('#desc').html(mapstyles['midnight'].desc);

// 提示信息 -- 数据+地名
var info_show = true;

let mapZoom = 6;
var map_point = "";

// 地图加载完毕
map.addEventListener("tilesloaded",
    function () {
        map.clearOverlays();
        console.log("地图倍数" + map.getZoom());
        mapZoom = map.getZoom();
        if (map.getZoom() < 6) {
            info_show = false;
            // map_init();
        } else {
            info_show = true;
            // map_init();
        }
      var bs=map.getBounds();
      var bssw = bs.getSouthWest()
      var bsne = bs.getNorthEast()
      var lat1 = (bssw.lat).toString()
      var lng1 =(bssw.lng).toString()
      var lat2 = (bsne.lat).toString()
      var lng2 = (bsne.lng).toString()
      console.log(bs)
      var obj = {}
      obj.level=mapZoom
      obj.lng=lng1
      obj.lat = lat1
      obj.lng1=lng2
      obj.lat1 = lat2

      var isRealTime =  $(".li.rightliFocus").text() == '实况' ?true:false
      if(isRealTime) {
        getDataRealTimeInfoList(obj)
      } else {
        getDataTotalInfoList(obj)
      }
      map_init()
        console.log("地图加载完毕");
        $("#loading").hide();
        map_point = new BMap.Point(map.getCenter().lng, map.getCenter().lat);
    })


var data_info = []

var opts = {
    width: 400, // 信息窗口宽度
    // height: 80, // 信息窗口高度
    // title: "<h4>城市详情</h4>", // 信息窗口标题
    enableMessage: true, //设置允许信息窗发送短息
};
var httpUrl = 'http://180.76.119.77:9096'
function getDataRealTimeInfoList(obj) {
  var dataForm = obj
  $.ajax({
    type: "post",//'/static/currentMapData.json'   '/api/currentMapData'
    url:httpUrl+'/api/currentMapData',//服务器
    data:dataForm,
    async: false,
    success: function(data){
        if(data.code == '200') {
          data_info =[]
          var restData=[]
          if(obj.level <10) {
            restData =data.data.OneCurrent
          }else if(obj.level <13){
            restData =data.data.TwoCurrent
          } else {
            restData =data.data.ThreeCurrent
          }
          for(var i in restData) {
            //[111.181262093, 34.7833199411, "河南省-三门峡市"]

            var date_str = new Date(restData[i].data_real_time).format("yyyy-MM-dd")
            data_info.push([
              restData[i].lng,restData[i].lat,restData[i].city_name,
              restData[i].aqi,restData[i].pm25,restData[i].pm10,restData[i].o3,
              restData[i].co,restData[i].no2,restData[i].so2,
              date_str,restData[i].composite_index,
            ])
          }
      }
      console.log(data_info)
    }
  })
}
function getDataTotalInfoList(obj) {
  var dataForm = obj
  $.ajax({
    type: "post", // /static/cumMapData.json
    url:httpUrl+'/api/cumMapData',//服务器
    data:dataForm,
    async: false,
    success: function(data){
        if(data.code == '200') {
          data_info =[]
          var restData=[]
          if(obj.level <10) {
            restData =data.data.OneCumUnion
          }else if(obj.level <13){
            restData =data.data.TwoCumUnion
          } else {
            restData =data.data.ThreeCumUnion
          }
          for(var i in restData) {
            //[111.181262093, 34.7833199411, "河南省-三门峡市"]

            var date_str = new Date(restData[i].data_real_time).format("yyyy-MM-dd")
            data_info.push([
              restData[i].lng,restData[i].lat,restData[i].city_name,
              restData[i].aqi,restData[i].pm25,restData[i].pm10,restData[i].o3,
              restData[i].co,restData[i].no2,restData[i].so2,
              date_str,restData[i].composite_index,
            ])
          }
      }
      console.log(data_info)
    }
  })
}

function getAqiColorByNum (num) {
  var color =''
  if (0<= num &&  num <= 50)  {
    color = '#43ce17'
  }else if(50< num &&  num <= 100) {
    color = '#ddd72c'
  }else if(100< num &&  num <= 150) {
    color = '#e7a423'
  }else if(150< num &&  num <= 200) {
    color = '#ef6c19'
  }else if(200< num &&  num <= 300) {
    color = '#f7310f'
  }else {
    color = '#a7134c'
  }
  return color
}
function getPM25ColorByNum (num) {
  var color =''
  if (0<= num &&  num <= 35)  {
    color = '#43ce17'
  }else if(35< num &&  num <= 75) {
    color = '#ddd72c'
  }else if(75< num &&  num <= 115) {
    color = '#e7a423'
  }else if(115< num &&  num <= 150) {
    color = '#ef6c19'
  }else if(150< num &&  num <= 250) {
    color = '#f7310f'
  }else {
    color = '#a7134c'
  }
  return color
}
function getPM10ColorByNum (num) {
  var color =''
  if (0<= num &&  num <= 50)  {
    color = '#43ce17'
  }else if(50< num &&  num <= 150) {
    color = '#ddd72c'
  }else if(150< num &&  num <= 250) {
    color = '#e7a423'
  }else if(250< num &&  num <= 350) {
    color = '#ef6c19'
  }else if(350< num &&  num <= 420) {
    color = '#f7310f'
  }else {
    color = '#a7134c'
  }
  return color
}
function geto3ColorByNum (isRealTime,num) {
  var color =''
  if(isRealTime) {
    if (0<= num &&  num <= 160)  {
      color = '#43ce17'
    }else if(160< num &&  num <= 200) {
      color = '#ddd72c'
    }else if(200< num &&  num <= 300) {
      color = '#e7a423'
    }else if(300< num &&  num <= 400) {
      color = '#ef6c19'
    }else if(400< num &&  num <= 800) {
      color = '#f7310f'
    }else {
      color = '#a7134c'
    }
  } else {
    if (0<= num &&  num <= 100)  {
      color = '#43ce17'
    }else if(100< num &&  num <= 160) {
      color = '#ddd72c'
    }else if(160< num &&  num <= 215) {
      color = '#e7a423'
    }else if(215< num &&  num <= 265) {
      color = '#ef6c19'
    }else if(265< num &&  num <= 800) {
      color = '#f7310f'
    }else {
      color = '#a7134c'
    }
  }

  return color
}
function getcoColorByNum (isRealTime,num) {
  var color =''
  if(isRealTime) {
    if (0<= num &&  num <= 5)  {
      color = '#43ce17'
    }else if(5< num &&  num <= 10) {
      color = '#ddd72c'
    }else if(10< num &&  num <= 35) {
      color = '#e7a423'
    }else if(35< num &&  num <= 60) {
      color = '#ef6c19'
    }else if(60< num &&  num <= 90) {
      color = '#f7310f'
    }else {
      color = '#a7134c'
    }
  } else {
    if (0<= num &&  num <= 2)  {
      color = '#43ce17'
    }else if(2< num &&  num <= 4) {
      color = '#ddd72c'
    }else if(4< num &&  num <= 14) {
      color = '#e7a423'
    }else if(14< num &&  num <= 24) {
      color = '#ef6c19'
    }else if(24< num &&  num <= 36) {
      color = '#f7310f'
    }else {
      color = '#a7134c'
    }
  }
  return color
}

function getno2ColorByNum (isRealTime,num) {
  var color =''
  if(isRealTime) {
    if (0<= num &&  num <= 100)  {
      color = '#43ce17'
    }else if(100< num &&  num <= 200) {
      color = '#ddd72c'
    }else if(200< num &&  num <= 700) {
      color = '#e7a423'
    }else if(700< num &&  num <= 1200) {
      color = '#ef6c19'
    }else if(1200< num &&  num <= 2340) {
      color = '#f7310f'
    }else {
      color = '#a7134c'
    }
  } else {
    if (0<= num &&  num <= 40)  {
      color = '#43ce17'
    }else if(40< num &&  num <= 80) {
      color = '#ddd72c'
    }else if(80< num &&  num <= 180) {
      color = '#e7a423'
    }else if(180< num &&  num <= 280) {
      color = '#ef6c19'
    }else if(280< num &&  num <= 565) {
      color = '#f7310f'
    }else {
      color = '#a7134c'
    }
  }

  return color
}
function getso2ColorByNum (isRealTime,num) {
  var color =''
  if(isRealTime) {
    if (0<= num &&  num <= 150)  {
      color = '#43ce17'
    }else if(150< num &&  num <= 500) {
      color = '#ddd72c'
    }else if(500< num &&  num <= 650) {
      color = '#e7a423'
    }else if(650< num &&  num <= 800) {
      color = '#ef6c19'
    }else {
      color = '#a7134c'
    }
  } else {
    if (0<= num &&  num <= 50)  {
      color = '#43ce17'
    }else if(50< num &&  num <= 150) {
      color = '#ddd72c'
    }else if(150< num &&  num <= 475) {
      color = '#e7a423'
    }else if(475< num &&  num <= 800) {
      color = '#ef6c19'
    }else {
      color = '#a7134c'
    }
  }
  return color
}
function map_init() {

  var type_param = $(".airtype.right_ol_liFocus").data('type')
  console.log(type_param)
  var isRealTime =  $(".li.rightliFocus").text() == '实况' ?true:false
    for (var i = 0; i < data_info.length; i++) {
       var marker = new BMap.Marker(new BMap.Point(data_info[i][0], data_info[i][1])); // 创建标注
       let color = ''
      var type_num = 3
      if(type_param == 'aqi') {
        type_num = 3
       color =  getAqiColorByNum(data_info[i][type_num])

      } else  if(type_param == 'pm25') {
        type_num = 4
        color =  getPM25ColorByNum(data_info[i][type_num])
      } else  if(type_param == 'pm10') {
        type_num = 5
        color =  getPM10ColorByNum(data_info[i][type_num])
      } else  if(type_param == 'o3') {
        type_num = 6
        color =  geto3ColorByNum(isRealTime,data_info[i][type_num])
      } else  if(type_param == 'co') {
        type_num = 7
        color =  getcoColorByNum(isRealTime,data_info[i][type_num])

      } else  if(type_param == 'no2') {
        type_num = 8
        color =  getno2ColorByNum(isRealTime,data_info[i][type_num])
      } else  if(type_param == 'so2') {
        type_num = 9
        color =  getso2ColorByNum(isRealTime,data_info[i][type_num])
      }
        if (info_show) {
            let label_content = '';
            label_content += '<div class="point">';
            label_content += '<div style="background-color:' + color + ' " class="point_num">' + data_info[i][type_num] + '</div>';
            label_content += '<div style="border-top-color: ' + color + ' "  class="point_arrow"></div>';
            label_content += '<div class="point_name"><span style="padding: 2px 5px;border-radius:3px;background-color: #fff;">' + data_info[i][2] + '</span></div>';
            label_content += '</div>';
            let labelpoint = new BMap.Point(data_info[i][0], data_info[i][1]);
            var labelopts = {
                position: labelpoint, // 指定文本标注所在的地理位置
                offset: new BMap.Size(-30, -30) //设置文本偏移量
            }
            var label = new BMap.Label(label_content, labelopts); // 创建文本标注对象
            map.addOverlay(label);

            labelClickHandler( label)
        } else {
            var imgrandom ='';
            if(color == '#43ce17') {
              imgrandom =4
            } else if (color == '#ddd72c') {
              imgrandom =3
            } else if (color == '#e7a423') {
              imgrandom =1
            } else if (color == '#ef6c19') {
              imgrandom =1
            }else if (color == '#f7310f') {
              imgrandom =2
            }else if (color == '#a7134c') {
              imgrandom =5
            }
            map.removeOverlay(marker);
            var icons = 'static/images/marker' + imgrandom + '.png'; //这个是你要显示坐标的图片的相对路径
            var icon = new BMap.Icon(icons, new BMap.Size(28, 28)); //显示图标大小
            marker.setIcon(icon); //设置标签的图标为自定义图标
            map.addOverlay(marker); //将标签添加到地图中去
            addClickHandler( marker);
        }
    }
}



function labelClickHandler( label) {
    label.addEventListener("click", function (e) {

        openInfo(data_info, e)
        setTimeout(fun, 1000);//延迟一秒
        function fun() {
            var myChart1 = echarts.init(document.getElementById('main1'));
            console.log("如果找到id为main的div就会看到本条信息");
            var cData = [100, 152, 200, 334, 390, 330, 220,110, 52, 200, 334, 390, 330, 220, 330, 220, 152, 200, 334, 390, 330, 220, 330, 220]
            option1 = {
                tooltip: {
                    show:false,
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },

                legend: {
                    show: false,
                },
                grid: {
                    left: '-20',
                    right: '0',
                    bottom: '-3',
                    top: '5',
                    containLabel: true
                },
                xAxis: [
                    {
                        show:false,
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: '#aaa', // 颜色
                                width: 1 // 粗细
                            }
                        },
                        data: [100, 152, 200, 334, 390, 330, 220,110, 52, 200, 334, 390, 330, 220, 330, 220, 152, 200, 334, 390, 330, 220, 330, 220]
                    }
                ],
                yAxis: [
                    {
                        show: false,
                        splitLine: {show: false},//去除网格线
                        axisLine: {
                            lineStyle: {
                                color: '#aaa', // 颜色
                                width: 1 // 粗细
                            }
                        },
                        type: 'value',
                    }
                ],
                backgroundColor: "rgb(8,46,83)",
                series : [
                    {
                        type:'bar',
                        barWidth: '60%',
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    // build a color map as your need.
                                    var colorList = ['green', 'red', 'yellow'];
                                    // return colorList[params.dataIndex]
                                    return params.data == Math.max(...cData) ? 'red' : params.data == Math.min(...cData) ? 'green' : 'yellow';
                                },
                            },
                        },
                        data:cData,
                        barCategoryGap :2
                    }
                ]
            };
            myChart1.setOption(option1);
            var myChart2 = echarts.init(document.getElementById('main2'));
            console.log("如果找到id为main的div就会看到本条信息");
            option2 = {
                tooltip: {
                    show:false,
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },

                legend: {
                    show: false,
                },
                grid: {
                    left: '-20',
                    right: '0',
                    bottom: '-3',
                    top: '5',
                    containLabel: true
                },
                xAxis: [
                    {
                        show:false,
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: '#aaa', // 颜色
                                width: 1 // 粗细
                            }
                        },
                        data:[100, 152, 200, 334, 390, 330, 220, 330, 390, 330, 220, 330]
                    }
                ],
                yAxis: [
                    {
                        show: false,
                        splitLine: {show: false},//去除网格线
                        axisLine: {
                            lineStyle: {
                                color: '#aaa', // 颜色
                                width: 1 // 粗细
                            }
                        },
                        type: 'value',
                    }
                ],
                backgroundColor: "rgb(8,46,83)",
                series : [
                    {
                        color:"#666",
                        type:'bar',
                        barWidth: '60%',
                        data:[100, 152, 200, 334, 390, 330, 220, 330, 390, 330, 220, 330],
                        barCategoryGap :2
                    }
                ]
            };
            myChart2.setOption(option2);
        }
    });
}
function getCityNameBylatlng (){
  var i=0
  for(i=0 ;i<data_info.length; i++ ) {
    if (data_info[i][0] == (''+e.currentTarget.point.lng) && data_info[i][1]==(''+e.currentTarget.point.lat)) {
      console.log(i)
      return data_info[i]
    }
  }
}
function addClickHandler( marker) {
    marker.addEventListener("click", function (e) {

        openInfo(data_info, e)
        setTimeout(fun, 1000);//延迟一秒
        function fun() {
            var myChart1 = echarts.init(document.getElementById('main1'));
            console.log("如果找到id为main的div就会看到本条信息");
            var cData = [100, 152, 200, 334, 390, 330, 220,110, 52, 200, 334, 390, 330, 220, 330, 220, 152, 200, 334, 390, 330, 220, 330, 220]
            option1 = {
                tooltip: {
                    show:false,
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },

                legend: {
                    show: false,
                },
                grid: {
                    left: '-20',
                    right: '0',
                    bottom: '-3',
                    top: '5',
                    containLabel: true
                },
                xAxis: [
                    {
                        show:false,
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: '#aaa', // 颜色
                                width: 1 // 粗细
                            }
                        },
                        data: [100, 152, 200, 334, 390, 330, 220,110, 52, 200, 334, 390, 330, 220, 330, 220, 152, 200, 334, 390, 330, 220, 330, 220]
                    }
                ],
                yAxis: [
                    {
                        show: false,
                        splitLine: {show: false},//去除网格线
                        axisLine: {
                            lineStyle: {
                                color: '#aaa', // 颜色
                                width: 1 // 粗细
                            }
                        },
                        type: 'value',
                    }
                ],
                backgroundColor: "rgb(8,46,83)",
                series : [
                    {
                        type:'bar',
                        barWidth: '60%',
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    // build a color map as your need.
                                    var colorList = ['green', 'red', 'yellow'];
                                    // return colorList[params.dataIndex]
                                    return params.data == Math.max(...cData) ? 'red' : params.data == Math.min(...cData) ? 'green' : 'yellow';
                                },
                            },
                        },
                        data:cData,
                        barCategoryGap :2
                    }
                ]
            };
            myChart1.setOption(option1);
            var myChart2 = echarts.init(document.getElementById('main2'));
            console.log("如果找到id为main的div就会看到本条信息");
            option2 = {
                tooltip: {
                    show:false,
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },

                legend: {
                    show: false,
                },
                grid: {
                    left: '-20',
                    right: '0',
                    bottom: '-3',
                    top: '5',
                    containLabel: true
                },
                xAxis: [
                    {
                        show:false,
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: '#aaa', // 颜色
                                width: 1 // 粗细
                            }
                        },
                        data:[100, 152, 200, 334, 390, 330, 220, 330, 390, 330, 220, 330]
                    }
                ],
                yAxis: [
                    {
                        show: false,
                        splitLine: {show: false},//去除网格线
                        axisLine: {
                            lineStyle: {
                                color: '#aaa', // 颜色
                                width: 1 // 粗细
                            }
                        },
                        type: 'value',
                    }
                ],
                backgroundColor: "rgb(8,46,83)",
                series : [
                    {
                        color:"#666",
                        type:'bar',
                        barWidth: '60%',
                        data:[100, 152, 200, 334, 390, 330, 220, 330, 390, 330, 220, 330],
                        barCategoryGap :2
                    }
                ]
            };
            myChart2.setOption(option2);
        }
    });
}

function openInfo(data_info, e) {
  var i=0
  console.log(e.currentTarget)
  console.log(e.currentTarget.point)
  console.log(e.currentTarget.point.lng)
  console.log(e.currentTarget.point.lat)
  for(i=0 ;i<data_info.length; i++ ) {
    if (data_info[i][0] == (''+e.currentTarget.point.lng) && data_info[i][1]==(''+e.currentTarget.point.lat)) {
      console.log(i)
       break;
    }
  }
  console.log(i)
  var isRealTime =  $(".li.rightliFocus").text() == '实况' ?true:false
  var content = '';
  content += '<div class="window_info " style="width: 380px;border-radius:5px;overflow: hidden;padding: 10px 0;border: 1px solid rgb(2,161,231);background-color: rgb(8,46,83);color: #fff">';
  content += '<div class="col-xs-12" style="height: 3vh;line-height: 3vh;font-size: 2vh;">城市详情<span class="pull-right cityInfo_close" onclick="map.closeInfoWindow()" style="margin-top:-10px;margin-right:-5px;font-size: 18px">×</span></div>';
  content += '<div class="text-center">';
  content += '<div class="transborder" style="overflow: hidden;height: 6.5vh">';
  content += '<div class="col-xs-4 transborder" style="height: 6vh;padding: 0 8px">';
  content += '<div class=" dark dark_num">';
  content += '<div class="" style="height: 3vh;line-height: 3vh;font-size: 1vh">' + data_info[i][2] + '</div>';
  content += '<div class="" style="height: 3vh;line-height: 3vh;">' + data_info[i][10] + '</div>';
  content += '</div>';
  content += '</div>';
  content += '<div class="col-xs-4 transborder" style="height: 6vh;padding: 0 4px">';
  content += '<div class=" dark">';
    var aqiColor = getAqiColorByNum(data_info[i][3])
  content += '<div class="" style="height: 3vh;line-height: 3vh;background-color:'+aqiColor+';">AQI</div>';
  content += '<div class="window_num dark_num" style="height: 3vh;line-height: 3vh;">'+ data_info[i][3] +'</div>';
  content += '</div>';
  content += '</div>';
  content += '<div class="col-xs-4 transborder" style="height: 6vh;padding: 0 8px">';
  content += '<div class=" dark">';
  content += '<div class="" style="height: 3vh;line-height: 3vh;">综合指数</div>';
  content += '<div class="window_num dark_num" style="height: 3vh;line-height: 3vh;">'+ data_info[i][11] +'</div>';
  content += '</div>';
  content += '</div>';
  content += '</div>';
  content += '<div class="" style="margin-top: 5px;overflow: hidden">';
  content += '<div class="col-xs-4  transborder" style="height: 6.5vh;padding: 0 8px">';
  content += '<div class="col-xs-6 dark " style="height: 6vh;padding-right: 3px">';
  content += '<div style="">';
  var pm25Color = getPM25ColorByNum(data_info[i][4])
  content += '<div class=" " style="height: 3vh;line-height: 3vh;background-color:'+pm25Color+';">PM2.5</div>';
  content += '<div class="dark_num" style="height: 3vh;line-height: 3vh;">'+ data_info[i][4] +'</div>';
  content += '</div>';
  content += '</div>';
  content += '<div class="col-xs-6 dark " style="height: 6vh;padding-left: 3px;>';
  content += '<div style="">';
  var pm10Color = getPM10ColorByNum(data_info[i][5])
  content += '<div class=" " style="height: 3vh;line-height: 3vh;background-color:'+pm10Color+';">PM10</div>';
  content += '<div class="dark_num" style="height: 3vh;line-height: 3vh;">'+ data_info[i][5] +'</div>';
  content += '</div>';
  // content += '</div>';
  content += '</div>';
  content += '<div class="col-xs-4 transborder" style="height: 6.5vh;padding: 0 4px">';
  content += '<div class="col-xs-6 dark" style="height: 6vh;padding-right: 3px">';
  content += '<div style="">';
  var so2Color = getso2ColorByNum(isRealTime,data_info[i][9])
  content += '<div class=" " style="height: 3vh;line-height: 3vh;background-color:'+so2Color+';">SO2</div>';
  content += '<div class="dark_num" style="height: 3vh;line-height: 3vh;">'+ data_info[i][9] +'</div>';
  content += '</div>';
  content += '</div>';
  content += '<div class="col-xs-6 dark " style="height: 6vh;padding-left: 3px">';
  content += '<div style="">';
  var no2Color = getno2ColorByNum(isRealTime,data_info[i][8])
  content += '<div class="" style="height: 3vh;line-height: 3vh;background-color:'+no2Color+';">NO2</div>';
  content += '<div class="dark_num" style="height: 3vh;line-height: 3vh;">'+ data_info[i][8] +'</div>';
  content += '</div>';
  content += '</div>';
  content += '</div>';
  content += '<div class="col-xs-4 transborder" style="height: 6.5vh;padding: 0 8px">';
  content += '<div class="col-xs-6 dark" style="height: 6vh;padding-right: 3px">';
  content += '<div style="">';
  var coColor = getcoColorByNum(isRealTime,data_info[i][7])
  content += '<div class=" " style="height: 3vh;line-height: 3vh;background-color:'+coColor+';">CO</div>';
  content += '<div class=" dark_num" style="height: 3vh;line-height: 3vh;">'+ data_info[i][7] +'</div>';
  content += '</div>';
  content += '</div>';
  content += '<div class="col-xs-6 dark" style="height: 6vh;padding-left: 3px">';
  content += '<div style="">';
  var o3Color = geto3ColorByNum(isRealTime,data_info[i][6])
  content += '<div class=" " style="height: 3vh;line-height: 3vh;background-color:'+o3Color+';">O3</div>';
  content += '<div class="dark_num" style="height: 3vh;line-height: 3vh;">'+ data_info[i][6] +'</div>';
  content += '</div>';
  content += '</div>';
  content += '</div>';
  content += '</div>';
  content += '</div>';
  content += '<div style="height: 6.5vh;margin-top: 5px;" class="text-center">';
  content += '<div class="col-xs-4 " style="height: 6vh;padding: 0 8px">';
  content += '<div class=" dark dark_num" style="height: 6vh;line-height: 6vh;font-size: 2vh"><i class="fa fa-thermometer-three-quarters"></i> 11.9℃</div>';
  content += '</div>';
  content += '<div class="col-xs-4 " style="height: 6vh;padding: 0 4px">';
  content += ' <div class="" >';
  content += ' <div class="" style="height: 3vh;line-height: 3vh;"><i class="fa fa-tint"></i> 湿度 47.5%</div>';
  content += ' <div class="" style="height: 3vh;line-height: 3vh;"><i class="fa fa-signal"></i> 风速 14km/h</div>';
  content += ' </div>';
  content += ' </div>';
  content += ' <div class="col-xs-4 " style="height: 6vh;padding: 0 8px">';
  content += '  <div class="">';
  content += '  <div class="" style="height: 3vh;line-height: 3vh;"><i class="fa fa-send-o"></i> 风向东北</div>';
  content += ' <div class="" style="height: 3vh;line-height: 3vh;"><i class="fa fa-superpowers"></i> 风力 1级</div>';
  content += ' </div>';
  content += '  </div>';
  content += '  </div>';
  content += '  <div style="height:15px;line-height:15px;text-align:center">最近及未来二十四小时AQI变化曲线</div>';
  content += '  <div style="height: 10.5vh;margin-top: 5px;" class="text-center">';
  content+='<div class="col-xs-12" style="width: 90%;float: right;margin-right:2%;border-top: 1px solid #aaa;position: relative">'
  content += '<span style="position: absolute;left: -28px;top: -10px;z-index: 999999999;background-color: rgb(8,46,83)">120 </span>'
  content += '<span style="position: absolute;left: 26.5%;top:0;z-index: 999999999;">历史</span>'
  content += '<span style="position: absolute;left: 76%;top:0;z-index: 999999999;">预测</span>'
  content+= ' </div>'
  content += ' <div class="col-xs-12 " style="height: 8vh;padding-top: 15px;position:relative">';
  content+='<div style="position:absolute;width:30%;right:4%;z-index:99999999;bottom:0;height:8vh;background-color:rgba(255,255,255,0.1)"></div>'
  content += '  <div class="col-xs-8" style="padding:0;height: 8vh;line-height: 8vh;padding-left: 10px" id="main1"></div>';
  content += '  <div class="col-xs-4" style="padding:0;height: 8vh;line-height: 8vh;" id="main2"></div>';
  content += '  </div>';
  content+='<div class="col-xs-12" style="width: 90%;float: right;margin-right:2%;border-bottom: 1px solid #aaa;position: relative">'
  content+='<div class="col-xs-12" style="height:5px;overflow:hidden;position: absolute">'
  content += '<span style="position: absolute;left: 11.5%;top: -10px;z-index: 99999;">|</span>'
  content += ' <span style="position: absolute;left: 40%;top: -10px;z-index: 99999;">|</span>'
  content += ' <span style="position: absolute;left: 75.5%;top:-10px;z-index: 99999;">|</span>'
  content+= ' </div>'
  content += ' <span style="position: absolute;left: -28px;top: -10px;z-index: 999999999;">&nbsp;&nbsp;0</span>'
  content += '<span style="position: absolute;left: 11%;top: 2px;z-index: 999999999;">02-14</span>'
  content += ' <span style="position: absolute;left: 40%;top: 2px;z-index: 999999999;">12:00</span>'
  content += ' <span style="position: absolute;left: 75%;top:2px;z-index: 999999999;">02-15</span>'
  content+= ' </div>'
  content += '  </div>';
  content += '  <div>';
  content += '  <div class="window_info_after1"></div>';
  content += '  <div class="window_info_after2"></div>';
  content += '  </div>';
  content += ' </div>';
    var p = e.target;
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
    map.openInfoWindow(infoWindow, point); //开启信息窗口
}

// 右侧类型切换
$(".content_left_bottom ul li,.content_left_bottom ol li").click(function () {
    $(this).addClass("liFocus");
    $(this).siblings().removeClass("liFocus");

})

// 右侧类型切换
$(".right_sort_change .li").click(function () {
    $(this).addClass("rightliFocus");
    $(this).siblings().removeClass("rightliFocus");
    if($(this).text() == '实况') {
      getDataRealTimeInfoList()

    } else {
      getDataTotalInfoList()
    }
   map_init()
})

$("#changeCity").click(function () {
    $("#city_change").fadeIn();
})

$("#city_change span").click(function () {
    $("#city_change").hide();
})

$("#select_area .form-group select").change(function () {
    $("#city_change").show();
})
$(".select_are_done").click(function () {
    let province = $("#province").val()
    let city = $("#city").val()
    let district = $("#district").val()
    console.log("您选择的区域：");
    console.log("省份：" + province);
    console.log("市：" + city);
    console.log("区/县：" + district);
    $("#location_city").html(district);
    $("#city_change").hide();
})
// 热门城市选择
$("#city_change ul li").click(function () {
    let city = $(this).html();
    $("#location_city").html(city);
    $("#city_change").hide();
})

// 游客IP所在城市开始
// var geoc = new BMap.Geocoder();
// var geolocation = new BMap.Geolocation();
// geolocation.getCurrentPosition(function (r) {
//     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
//         var mk = new BMap.Marker(r.point);
//         map.addOverlay(mk);
//         var pt = r.point;
//         geoc.getLocation(pt, function (rs) {
//             var addComp = rs.addressComponents;
//             // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
//             $("#location_city").html(addComp.city)
//         });
//     }
//     else {
//         alert('failed' + this.getStatus());
//     }
// }, {enableHighAccuracy: true})
//游客IP所在城市结束

var x = 0;
var leftright_limit = parseInt($(".footer_div>div>div").css("width"));
// 底部左箭头
$(".footer_left").click(function () {
    if ($(".footer_left").css("color")!="#666"){
    console.log('左左左');
    x += leftright_limit;
    $(".footer_right i").css("color","#fff")
    if (x >= parseInt($(".footer_div>div").css('width'))/ 3) {
        x = parseInt($(".footer_div>div").css('width'))/ 3;
        $(".footer_left i").css("color","#666")
    }
    // $(".footer_div").scrollLeft(x);
    $(".footer_div").animate({scrollLeft:x},500);
    hasScroll = $(".footer_div").scrollLeft();
    }
})
// 底部右箭头
$(".footer_right").click(function () {
    if ($(".footer_right").css("color")!="#666") {
        console.log('右右右');
        x -= leftright_limit;
        $(".footer_left i").css("color", "#fff")
        if (x <= 0) {
            x = 0;
            $(".footer_right i").css("color", "#666")
        }
        // $(".footer_div").scrollLeft(x);
        $(".footer_div").animate({scrollLeft: x}, 500);
        console.log($(".footer_div>div").scrollLeft() + "*********")
        hasScroll = $(".footer_div").scrollLeft();
    }
})

$(".window_info").parents().css("padding", "0");
// 右侧顶部地图显示类型切换
$(".right_sort_change .li").click(function () {
    let type = $(this).text();
    console.log("地图显示类型切换 -- " + type)
})

// 右侧顶部select地图场景切换
$(".map_sort").change(function () {
    let style = $(this).val();
    if (style.length > 1) {
        map.setMapStyle({
            style: style
        });
    } else {
        map.setMapStyle({
            styleJson: mymapstyle
        });
    }
})
// 右侧类型切换 -- PM2.5、AQI等切换
$(".right_ol .airtype").click(function () {
    let type = $(this).text();
    console.log("状态切换--" + type);
    $(this).addClass("right_ol_liFocus");
    $(this).siblings('.airtype').removeClass("right_ol_liFocus");
  map_init()
})
// 右侧类型切换 -- PM2.5、AQI等切换
$(".right_ol .moveto").click(function () {
    let type = $(this).text();
    console.log("状态地区--" + type);
    $(this).addClass("right_ol_liFocus");
    $(this).siblings(".moveto").removeClass("right_ol_liFocus");
})



// 底部echarts
var myChart = echarts.init(document.getElementById("footer_echart"));
bottomoption = null;
bottomoption = {

    title: {
// text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'item',
        position: "top"
    },
    legend: {
        show: false,
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    grid: {
        left: '0',
        right: '10',
        bottom: '20',
        containLabel: true
    },

    xAxis: {
        show: false,
        type: 'category',
        boundaryGap: false,
        data: ['1-11', '1-12', '1-13', '1-14', '1-15', '1-16', '1-17', '1-18', '1-19']
    },
    yAxis: {
        show: false,
        type: 'value',
        splitLine: {show: false},//去除网格线
    },
    series: [
        {
            name: '',
            type: 'line',
            smooth: true,
        },
        {
            name: '',
            type: 'line',
            smooth: true,
        }

    ]
};

if (bottomoption && typeof bottomoption === "object") {
    bottomoption.series[0].data = [200, 932, 500, 934,1290, '', '', '', '', '', '', ''];
    bottomoption.series[0].color = "rgb(9,16,174)";
    bottomoption.series[1].data = ['', '', '', '', 1290, 200, 932, 500, 934];
    bottomoption.series[1].color = "rgb(4,185,219)";
    myChart.setOption(bottomoption, true);
}
// 提示窗口底部的echarts
// setTimeout(function () {
//     var windowInfo_chart = echarts.init(document.getElementById("window_echarts"));
//     windowInfo_option = {
//         legend: {},
//         tooltip: {},
//         dataset: {
//             source: [
//                 ['product', '2015', '2016', '2017'],
//                 ['Matcha Latte', 43.3, 85.8, 93.7],
//                 ['Milk Tea', 83.1, 73.4, 55.1],
//                 ['Cheese Cocoa', 86.4, 65.2, 82.5],
//                 ['Walnut Brownie', 72.4, 53.9, 39.1]
//             ]
//         },
//         xAxis: {type: 'category'},
//         yAxis: {},
//         // Declare several bar series, each will be mapped
//         // to a column of dataset.source by default.
//         series: [
//             {type: 'bar'},
//             {type: 'bar'},
//             {type: 'bar'}
//         ]
//     };
//     if (windowInfo_option && typeof windowInfo_option === "object") {
//         windowInfo_chart.setOption(windowInfo_option, true);
//     }
// }, 2000)

// 左侧 查看详情
$("#left_detail").click(function () {
    $("#details").fadeIn();
})

$(".left_detail_title span").click(function () {
    $("#details").hide();
})

// 右侧 查看详情
$(".notation").mouseover(function () {
    $("#annotation").fadeIn();
})

$(".notation").mouseout(function () {
    $("#annotation").hide();
})

// 警报
setTimeout(function () {
    $('.warningimg').attr('src', 'static/images/warning1.png');
    // $("#warning_music")[0].play();
}, 2000)

// 报警信息 查看详情
$(".warning").click(function () {
    $(".warning_info_details").fadeIn();
})

$(".warning_info_close").click(function () {
    $(".warning_info_details").hide();
    $("#warning_music")[0].pause();
    $('.warningimg').attr('src', 'static/images/warning2.png');
})

// 地图类型切换
var map_select_flag = false;
$(".map_control").click(function () {
    if (!map_select_flag) {
        $(".map_select").fadeIn();
        map_select_flag = true;
    } else {
        $(".map_select").hide();
        map_select_flag = false;
    }

})

$(".map_select").click(function () {
    $(".map_select").hide();
})

function maptype(type) {
    map.reset()
    map.centerAndZoom(map_point, mapZoom); // 初始化地图,用城市名设置地图中心点
    map.setMapType(BMAP_HYBRID_MAP);
}

function mapstyle(style) {
    map.reset()
    if (style == 1) {
        map.setMapType(BMAP_NORMAL_MAP);
        map.setMapStyle({
            styleJson: mymapstyle
        });
    } else {
        map.setMapType(BMAP_NORMAL_MAP);
        let mapstylejson = [{
            "featureType": "background",
            "elementType": "geometry",
            "stylers": {
                "color": "#212121ff"
            }
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": {
                "color": "#181818ff"
            }
        }, {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#044e9730"
            }
        }, {
            "featureType": "districtlabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#797676ff"
            }
        }, {
            "featureType": "districtlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#000000ff"
            }
        }, {
            "featureType": "poilabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "poilabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "poilabel",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#fffffff5"
            }
        }, {
            "featureType": "road",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "poilabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "districtlabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "country",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#ffffffff"
            }
        }]
        map.setMapStyle({styleJson: mapstylejson});
    }

    map.centerAndZoom(map_point, mapZoom); // 初始化地图,用城市名设置地图中心点
}

// 顶部菜单
$(".header").mouseover(function () {
    $(".menu").stop().slideDown();
})

$(".header").mouseout(function () {
    $(".menu").stop().slideUp();
})

$(".menu").mouseover(function () {
    $(".menu").stop().slideDown();
})

$(".menu").mouseout(function () {
    $(".menu").stop().slideUp();
})

$(window).resize(function () {
    myChart.resize()
});

function moveTo(where) {
    console.log(where);
    if (where == "西安") {
        map.centerAndZoom(where, 6); // 初始化地图,用城市名设置地图中心点
    } else if (where == "石家庄") {
        map.centerAndZoom(where, 8); // 初始化地图,用城市名设置地图中心点

    }
    else if (where == "临汾") {
        map.centerAndZoom(where, 8); // 初始化地图,用城市名设置地图中心点
    }
    else {
        map.centerAndZoom(where, 9); // 初始化地图,用城市名设置地图中心点
    }
}

// 已经滚动的距离
var hasScroll = $(".footer_div").scrollLeft();
// 声明定时器 myScroll
var myScroll = "";
var linex = parseInt($(".line").css("width"));

function bottom_scroll() {
    linex += parseInt($(".line_mark_i ul li").css("width"))/3;
    if (linex <= parseInt($(".line_mark").css("width"))){
        $(".line").css("width", linex+ "px")
        $(".line_info").css("left", linex-15-parseInt($(".line_mark_i ul li").css("width")) + "px")
    }else{
        linex=0;
    }
}

$(".play").click(function () {
    clearInterval(myScroll);
    if ($(".fa-play").css('display') == 'inline-block') {
        // 播放
        myScroll = setInterval(bottom_scroll, 1500);
        $(".fa-play").css('display', "none");
        $(".fa-pause").css('display', "inline-block");
    } else {
        // 暂停
        $(".fa-pause").css('display', "none");
        $(".fa-play").css('display', "inline-block");
    }
})

$("#bottom_line").click(function (e) {
    // console.log($(".line").offset().left)
    // console.log(e.pageX);
    linex=parseInt(e.pageX)-parseInt($(".line").offset().left);
    $(".line").css("width", linex+ "px");
    $(".line_info").css("left", linex-15-parseInt($(".line_mark_i ul li").css("width")) + "px")
})

$(".details_updown").click(function () {
    $(".airsix_bottom>i").css("margin", "auto");
    // $("#details").css("height","36vh");
    if ($(".fa-angle-double-down").css("display") == "none") {
        console.log("上滑");
        $(".fa-angle-double-up").css("display", "none");
        $(".fa-angle-double-down").css("display", "block");
        $(".airsix_content").slideUp(500);
        $(".content_left_top").animate({"height": "30vh"}, 500);
        $(".content_left_bottom").animate({"height": "52vh"}, 500);
        $(".city_table").animate({"height": "42.5vh"}, 500);
        $("#details").css("top", "5vh");

    } else {
        console.log("下滑");
        $(".fa-angle-double-down").css("display", "none");
        $(".fa-angle-double-up").css("display", "block");
        $(".airsix_content").slideDown(500);
        $(".content_left_top").animate({"height": "54.5vh"}, 500);
        $(".content_left_bottom").animate({"height": "27.5vh"}, 500);
        $(".city_table").animate({"height": "18vh"}, 500);
        $("#details").css("top", "29.5vh");
    }
})

// 城市排名表格数据
var cityname_arr = ["郑州", "许昌", "平顶山", "驻马店", "信阳", "周口", "许昌"]
var cityAIQ_arr = [15, 25, 36, 48, 96, 123, 200]

// 表格行数tr -- 7，表格列数td -- cityname_arr.length，
function city_rank() {
    cityname_arr=cityname_arr.reverse();
    cityAIQ_arr=cityAIQ_arr.reverse();
    let cityrank_content = '';
    for (let i = 0; i < cityname_arr.length; i++) {
        cityrank_content += '<tr>'
        cityrank_content += '<td>' + parseInt(i+1) + '</td>'
        cityrank_content += '<td>' + cityname_arr[i] + '</td>'
        cityrank_content += '<td><span>' + cityAIQ_arr[i] + '</span></td>'
        cityrank_content += '<td>' + 52 + '</td>'
        cityrank_content += '<td>' + 52 + '</td>'
        cityrank_content += '<td>' + 52 + '</td>'
        cityrank_content += '<td>' + 52 + '</td>'
        cityrank_content += '<td>' + 52 + '</td>'
        cityrank_content += '<td>' + 52 + '</td>'
        cityrank_content += '</tr>'
    }
    $(".city_table tbody").html(cityrank_content)
}

// city_rank()




