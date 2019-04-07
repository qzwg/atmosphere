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
            map_init();
        } else {
            info_show = true;
            map_init();
        }
        console.log("地图加载完毕");
        $("#loading").hide();
        map_point = new BMap.Point(map.getCenter().lng, map.getCenter().lat);
    })


var data_info = [
    [111.181262093, 34.7833199411, "河南省-三门峡市"],
    [114.085490993, 32.1285823075, "河南省-信阳市"],
    [112.542841901, 33.0114195691, "河南省-南阳市"],
    [114.654101942, 33.6237408181, "河南省-周口市"],
    [115.641885688, 34.4385886402, "河南省-商丘市"],
    [114.351806508, 36.1102667222, "河南省-安阳市"],
    [113.300848978, 33.7453014565, "河南省-平顶山市"],
    [114.351642118, 34.8018541758, "河南省-开封市"],
    [113.912690161, 35.3072575577, "河南省-新乡市"],
    [112.447524769, 34.6573678177, "河南省-洛阳市"],
    [114.0460614, 33.5762786885, "河南省-漯河市"],
    [115.026627441, 35.7532978882, "河南省-濮阳市"],
    [113.211835885, 35.234607555, "河南省-焦作市"],
    [113.486804058, 34.157183768, "河南省-省直辖"],
    [113.83531246, 34.0267395887, "河南省-许昌市"],
    [113.64964385, 34.7566100641, "河南省-郑州市"],
    [114.049153547, 32.9831581541, "河南省-驻马店市"],
    [114.297769838, 35.7554258742, "河南省-鹤壁市"],
    [104.776071339, 29.3591568895, "四川省-自贡市"],
    [104.635930302, 30.132191434, "四川省-资阳市"],
    [107.494973447, 31.2141988589, "四川省-达州市"],
    [105.564887792, 30.5574913504, "四川省-遂宁市"],
    [102.228564689, 31.9057628583, "四川省-阿坝藏族羌族自治州"],
    [103.009356466, 29.9997163371, "四川省-雅安市"],
    [117.210813092, 39.1439299033, "天津-天津市"],
    [105.196754199, 37.5211241916, "宁夏回族自治区-中卫市"],
    [106.208254199, 37.9935610029, "宁夏回族自治区-吴忠市"],
    [106.285267996, 36.0215234807, "宁夏回族自治区-固原市"],
    [106.379337202, 39.0202232836, "宁夏回族自治区-石嘴山市"],
    [106.206478608, 38.5026210119, "宁夏回族自治区-银川市"],
    [115.787928245, 33.8712105653, "安徽省-亳州市"],
    [116.505252683, 31.7555583552, "安徽省-六安市"],
    [117.282699092, 31.8669422607, "安徽省-合肥市"],
    [117.058738772, 30.5378978174, "安徽省-安庆市"],
    [118.752096311, 30.9516423543, "安徽省-宣城市"],
    [115.820932259, 32.9012113306, "安徽省-阜阳市"],
    [118.515881847, 31.6885281589, "安徽省-马鞍山市"],
    [118.293569632, 29.7344348562, "安徽省-黄山市"],
    [118.583926333, 37.4871211553, "山东省-东营市"],
    [118.340768237, 35.0724090744, "山东省-临沂市"],
    [122.093958366, 37.5287870813, "山东省-威海市"],
    [116.328161364, 37.4608259263, "山东省-德州市"],
    [119.507179943, 35.4202251931, "山东省-日照市"],
    [110.931245331, 21.6682257188, "广东省-茂名市"],
    [111.977009756, 21.8715173045, "广东省-阳江市"],
    [113.594461107, 24.8029603119, "广东省-韶关市"],
    [109.122627919, 21.472718235, "广西壮族自治区-北海市"],
    [108.297233556, 22.8064929356, "广西壮族自治区-南宁市"],
    [107.357322038, 22.4154552965, "广西壮族自治区-崇左市"],
    [119.173872217, 34.601548967, "江苏省-连云港市"],
    [119.455835405, 32.2044094436, "江苏省-镇江市"],
    [117.955463877, 28.4576225539, "江西省-上饶市"],
    [115.999848022, 29.7196395261, "江西省-九江市"],
    [115.893527546, 28.6895780001, "江西省-南昌市"]
]

var opts = {
    width: 400, // 信息窗口宽度
    // height: 80, // 信息窗口高度
    // title: "<h4>城市详情</h4>", // 信息窗口标题
    enableMessage: true, //设置允许信息窗发送短息
};
var httpUrl = 'http://180.76.119.77:9096'
function getDataInfoList() {
  $.ajax({
    type: "get",
    url: httpUrl+'/api/currentMapData',//服务器
    success: function(data){
        if(data.code == '200') {
          for(var i in data.data) {
            data_info.push()
          }
      }

    }
  })
}

function map_init() {

    for (var i = 0; i < data_info.length; i++) {
        var marker = new BMap.Marker(new BMap.Point(data_info[i][0], data_info[i][1])); // 创建标注
        var content = '';
        content += '<div class="window_info " style="width: 380px;border-radius:5px;overflow: hidden;padding: 10px 0;border: 1px solid rgb(2,161,231);background-color: rgb(8,46,83);color: #fff">';
        content += '<div class="col-xs-12" style="height: 3vh;line-height: 3vh;font-size: 2vh;">城市详情<span class="pull-right cityInfo_close" onclick="map.closeInfoWindow()" style="margin-top:-10px;margin-right:-5px;font-size: 18px">×</span></div>';
        content += '<div class="text-center">';
        content += '<div class="transborder" style="overflow: hidden;height: 6.5vh">';
        content += '<div class="col-xs-4 transborder" style="height: 6vh;padding: 0 8px">';
        content += '<div class=" dark dark_num">';
        content += '<div class="" style="height: 3vh;line-height: 3vh;font-size: 1vh">' + data_info[i][2] + '</div>';
        content += '<div class="" style="height: 3vh;line-height: 3vh;">2019-02-13 13:00</div>';
        content += '</div>';
        content += '</div>';
        content += '<div class="col-xs-4 transborder" style="height: 6vh;padding: 0 4px">';
        content += '<div class=" dark">';
        content += '<div class="bgorange" style="height: 3vh;line-height: 3vh;">AQI</div>';
        content += '<div class="window_num dark_num" style="height: 3vh;line-height: 3vh;">105</div>';
        content += '</div>';
        content += '</div>';
        content += '<div class="col-xs-4 transborder" style="height: 6vh;padding: 0 8px">';
        content += '<div class=" dark">';
        content += '<div class="bgorange" style="height: 3vh;line-height: 3vh;">综合指数</div>';
        content += '<div class="window_num dark_num" style="height: 3vh;line-height: 3vh;">5.83</div>';
        content += '</div>';
        content += '</div>';
        content += '</div>';
        content += '<div class="" style="margin-top: 5px;overflow: hidden">';
        content += '<div class="col-xs-4  transborder" style="height: 6.5vh;padding: 0 8px">';
        content += '<div class="col-xs-6 dark " style="height: 6vh;padding-right: 3px">';
        content += '<div style="">';
        content += '<div class=" bgorange" style="height: 3vh;line-height: 3vh;">PM2.5</div>';
        content += '<div class="dark_num" style="height: 3vh;line-height: 3vh;">79</div>';
        content += '</div>';
        content += '</div>';
        content += '<div class="col-xs-6 dark " style="height: 6vh;padding-left: 3px;>';
        content += '<div style="">';
        content += '<div class=" bgyellow" style="height: 3vh;line-height: 3vh;">PM10</div>';
        content += '<div class="dark_num" style="height: 3vh;line-height: 3vh;">99</div>';
        content += '</div>';
        // content += '</div>';
        content += '</div>';
        content += '<div class="col-xs-4 transborder" style="height: 6.5vh;padding: 0 4px">';
        content += '<div class="col-xs-6 dark" style="height: 6vh;padding-right: 3px">';
        content += '<div style="">';
        content += '<div class=" bggreen" style="height: 3vh;line-height: 3vh;">SO2</div>';
        content += '<div class="dark_num" style="height: 3vh;line-height: 3vh;">10</div>';
        content += '</div>';
        content += '</div>';
        content += '<div class="col-xs-6 dark " style="height: 6vh;padding-left: 3px">';
        content += '<div style="">';
        content += '<div class=" bgyellow" style="height: 3vh;line-height: 3vh;">NO2</div>';
        content += '<div class="dark_num" style="height: 3vh;line-height: 3vh;">46</div>';
        content += '</div>';
        content += '</div>';
        content += '</div>';
        content += '<div class="col-xs-4 transborder" style="height: 6.5vh;padding: 0 8px">';
        content += '<div class="col-xs-6 dark" style="height: 6vh;padding-right: 3px">';
        content += '<div style="">';
        content += '<div class=" bggreen" style="height: 3vh;line-height: 3vh;">CO</div>';
        content += '<div class=" dark_num" style="height: 3vh;line-height: 3vh;">0.7</div>';
        content += '</div>';
        content += '</div>';
        content += '<div class="col-xs-6 dark" style="height: 6vh;padding-left: 3px">';
        content += '<div style="">';
        content += '<div class=" bggreen" style="height: 3vh;line-height: 3vh;">O3</div>';
        content += '<div class="dark_num" style="height: 3vh;line-height: 3vh;">34</div>';
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

        let colorArr = ["rgb(215,156,37)", "rgb(223,79,50)", "rgb(80,194,44)", "rgb(185,33,79)", "rgb(193,42,49)", "rgb(214,198,66)"];
        let color = colorArr[Math.floor(Math.random() * 5)]

        if (info_show) {
            let label_content = '';
            label_content += '<div class="point">';
            label_content += '<div style="background-color:' + color + ' " class="point_num">' + Math.floor(Math.random() * 200) + '</div>';
            label_content += '<div style="border-top-color: ' + color + ' "  class="point_arrow"></div>';
            label_content += '<div class="point_name"><span style="padding: 2px 5px;border-radius:3px;background-color: #fff;">' + data_info[i][2].substring(data_info[i][2].indexOf("-") + 1, data_info[i][2].length - 1) + '</span></div>';
            label_content += '</div>';
            let labelpoint = new BMap.Point(data_info[i][0], data_info[i][1]);
            var labelopts = {
                position: labelpoint, // 指定文本标注所在的地理位置
                offset: new BMap.Size(-30, -30) //设置文本偏移量
            }
            var label = new BMap.Label(label_content, labelopts); // 创建文本标注对象
            map.addOverlay(label);

            labelClickHandler(content, label)
        } else {
            var imgrandom = Math.floor(Math.random() * 5 + 1);
            map.removeOverlay(marker);
            var icons = 'static/images/marker' + imgrandom + '.png'; //这个是你要显示坐标的图片的相对路径
            var icon = new BMap.Icon(icons, new BMap.Size(28, 28)); //显示图标大小
            marker.setIcon(icon); //设置标签的图标为自定义图标
            map.addOverlay(marker); //将标签添加到地图中去
            addClickHandler(content, marker);
        }
    }
}

map_init()

function labelClickHandler(content, label) {
    label.addEventListener("click", function (e) {
        openInfo(content, e)
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

function addClickHandler(content, marker) {
    marker.addEventListener("click", function (e) {
        openInfo(content, e)
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

function openInfo(content, e) {
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




