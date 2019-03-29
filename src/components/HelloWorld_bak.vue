<template>
  <div style="height: 100%;width: 100%">
    <div id="allmap"></div>
    <div class="main">
      <div class="header ">
        <img src="static/images/logo.png" alt="">
        大气环境AR实景调度决策
      </div>
      <div class="header_bottom">
        <div></div>
      </div>
      <div class="menu">
        <ul>
          <li>调度</li>
          <li>会商</li>
          <li>数据服务</li>
          <li>政策动态</li>
        </ul>
      </div>
      <div class="content">
        <div class="col-xs-3 content_left">
          <span class="h5">更新时间：2019-01-19 18:00</span><br>
          <p></p>
          <div class="whborder content_left_top ">
            <p class=" whtitle ">实时空气质量指数（AQI）
              <span class="pull-right">
                        <span id="location_city">石家庄市</span>
                        <i class="fa fa-exchange" id="changeCity" style="transform: rotate(90deg)"></i>
                    </span>
            </p>
            <div class="air ">
              <div class="col-xs-6">
                <div class="circlechart" data-percentage="30">30</div>
              </div>
              <div class="col-xs-6 whpadding ">
                首要污染物：PM2.5<br>
                污染浓度：196
              </div>
            </div>
            <div class="airdata ">
              <div class="col-xs-4 "><i class="fa fa-thermometer "></i> 温度11.9℃</div>
              <div class="col-xs-4 "><i class="fa fa-umbrella"></i> 湿度47.5%</div>
              <div class="col-xs-4 "><i class="fa fa-send-o"></i> 东北风1级</div>
            </div>
            <div class="airsix">
              <div class="airsix_title ">2019年空气质量目标完成</div>
              <div class="airsix_content ">
                <div class="col-xs-6 ">
                  <div class="airsix_left">
                    <div class="">
                      <span>PM<span class="whsub">2.5</span> 累计</span><br>
                      <span class="air_quality">63</span>
                    </div>
                    <div class="">
                      <span>目标/完成难度</span><br>
                      <span class="air_quality">62/10%</span>
                    </div>
                    <div class="">
                      <span>同期变化</span><br>
                      <span class="air_quality">13.3<i class="fa fa-long-arrow-down"
                                                       style="color: rgb(133,216,79)"></i></span>
                    </div>
                  </div>
                </div>
                <div class="col-xs-6 ">
                  <div class="airsix_right">
                    <div class="">
                      <span>综合指数累计</span><br>
                      <span class="air_quality">6.45</span>
                    </div>
                    <div class="">
                      <span>排名</span><br>
                      <span class="air_quality">倒数17</span>
                    </div>
                    <div class="">
                      <span>关注指标</span><br>
                      <span class="air_quality">NO<span class="whsub">2</span>(5)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="airsix_bottom">
                <i class="fa fa-angle-double-up details_updown"></i>
                <i class="fa fa-angle-double-down details_updown"></i>
                <div id="left_detail" class="">查看详情</div>
              </div>
            </div>
          </div>
          <div class="whborder content_left_bottom">
            <div class="city_header">
              <div class="col-xs-3 whtitle">城市排名</div>
              <div class="col-xs-9 text-right">
                <ul class="city_sort_change">
                  <li class="liFocus">169</li>
                  <li>2+26</li>
                  <li>省</li>
                  <li>县</li>
                </ul>
              </div>
            </div>
            <div class="city_bottom">
              <div class="city_tab">
                <ul class="city_time_change">
                  <li class="liFocus">时</li>
                  <li>日</li>
                  <li>月</li>
                  <li>年</li>
                </ul>
              </div>
              <div class="city_table">
                <table class="table  text-center" >
                  <thead>
                  <tr>
                    <th class="text-center">排名</th>
                    <th class="text-center">城市</th>
                    <th class="text-center" onclick="city_rank()">AQI <i class="fa fa-sort"></i></th>
                    <th class="text-center">PM<span class="whsub">2.5</span> <i class="fa fa-sort"></i></th>
                    <th class="text-center">PM<span class="whsub">10</span> <i class="fa fa-sort"></i></th>
                    <th class="text-center">O<span class="whsub">3</span>(8h) <i class="fa fa-sort"></i></th>
                    <th class="text-center">CO <i class="fa fa-sort"></i></th>
                    <th class="text-center">NO<span class="whsub">2</span> <i class="fa fa-sort"></i></th>
                    <th class="text-center">SO<span class="whsub">2</span> <i class="fa fa-sort"></i></th>
                  </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-7 whpadding">
          <div id="city_change">
            <h5>热门城市 <span class="pull-right warning_info_close" style="margin-right: 10px;font-size: 18px">×</span>
            </h5>
            <div class="clearfix hot_city">
              <ul>
                <li>北京</li>
                <li>上海</li>
                <li>广州</li>
                <li>杭州</li>
                <li>郑州</li>
                <li>石家庄</li>
                <li>南京</li>
                <li>深圳</li>
                <li>浙江</li>
                <li>武汉</li>
                <li>苏州</li>
                <li>宁波</li>
              </ul>
            </div>
            <h4>选择其他城市</h4>
            <div class="whoverflow" id="select_area">
              <form class="form-inline">
                <div data-toggle="distpicker">
                  <div class="form-group col-xs-4">
                    <label class="sr-only" for="province">Province</label>
                    <select class="" id="province"></select>
                  </div>
                  <div class="form-group col-xs-4">
                    <label class="sr-only" for="city">City</label>
                    <select class="" id="city"></select>
                  </div>
                  <div class="form-group col-xs-4">
                    <label class="sr-only" for="district">District</label>
                    <select class="" id="district"></select>
                  </div>
                </div>
              </form>
            </div>
            <div class="select_are_done" style="padding: 10px 0 0 15px">
              <button>确 定</button>
            </div>
          </div>
          <div id="details">
            <div class="left_detail_title ">详细信息 <span class="pull-right warning_info_close"
                                                       style="margin-right: 10px;font-size: 18px">×</span>
            </div>
            <div class="left_detail_line"></div>
            <div class="left_detail_content">
              <table class="table  text-center" border="1px solid #fff">
                <tr>
                  <td colspan="8">省定年度完成计划(1.1-12.26)</td>
                </tr>
                <tr>
                  <td rowspan="2"></td>
                  <td rowspan="2">四项任务指标</td>
                  <td>2018全国要求</td>
                  <td>1.1-12.16</td>
                  <td>12.16-12.31</td>
                  <td colspan="2">12.17-12.31</td>
                  <td rowspan="2">预测</td>
                </tr>
                <tr>
                  <td>目标任务</td>
                  <td>已完成</td>
                  <td>剩余控制</td>
                  <td>2016</td>
                  <td>2017</td>
                </tr>
                <tr>
                  <td rowspan="4">查看年度目标</td>
                  <td>PM10(μg/㎡)</td>
                  <td>≤115</td>
                  <td>≤103</td>
                  <td>≤395</td>
                  <td>247</td>
                  <td>141</td>
                  <td>可以完成</td>
                </tr>
                <tr>
                  <td>PM2.5(μg/㎡)</td>
                  <td>≤66</td>
                  <td>61</td>
                  <td>≤187</td>
                  <td>202</td>
                  <td>96</td>
                  <td>有风险</td>
                </tr>
                <tr>
                  <td>优良天(天)</td>
                  <td>200</td>
                  <td>160</td>
                  <td>40</td>
                  <td>1</td>
                  <td>8</td>
                  <td>无法完成</td>
                </tr>
                <tr>
                  <td>综合指数排名</td>
                  <td>169城市排名退20</td>
                  <td>倒排17(6.35)</td>
                  <td>--</td>
                  <td>--</td>
                  <td>--</td>
                  <td>艰难</td>
                </tr>
              </table>
            </div>
          </div>
          <div id="annotation">
            <div class="left_detail_title whoverflow">注释说明</div>
            <div class=" whoverflow" style="padding: 10px 0">单位说明<span style="color: #999">（在此平台某些己省略）</span></div>
            <div class="annotation_content">
              PM2.5
            </div>
            <div class=" whoverflow" style="padding: 10px 0">污染等级说明</div>
            <div class="colorchange">
              <div class="colorchange_color"></div>
              <div class="colorchange_content">
                <div class="col-xs-2">低</div>
                <div class="col-xs-2">良</div>
                <div class="col-xs-2">轻度</div>
                <div class="col-xs-2">中度</div>
                <div class="col-xs-2">重度</div>
                <div class="col-xs-2">严重</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-2 content_right">
          <div class="content_right_header pull-right">
            <div class="col-xs-6 text-right whpadding">
              <ul class="right_sort_change">
                <li class="li rightliFocus">实况</li>
                <li class="li">累计</li>
              </ul>
            </div>
            <div class="col-xs-6 map_sort whheight ">
              <div class="col-xs-6 text-center whpadding ">
                <span class="map_control">场景 <span class=" fa fa-caret-down"></span></span>
                <div class="map_select">
                  <p onclick="mapstyle(1)">地图模式</p>
                  <p onclick="maptype()">卫星图</p>
                  <!--<p onclick="maptype()">地形图</p>-->
                  <p onclick="mapstyle('dark')">夜间模式</p>
                </div>
              </div>
              <div class="col-xs-3 whpadding text-right" style="padding-left: 10px">
                <span class="notation"><i class="fa fa-info-circle"></i></span>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
          <div class="content_right_bottom">
            <div class="col-xs-6"></div>
            <div class="col-xs-6 whpadding">
              <ol class="right_ol">
                <li class="airtype right_ol_liFocus">AQI</li>
                <li class="airtype">PM<span class="whsub">2.5</span></li>
                <li class="airtype">PM<span class="whsub">10</span></li>
                <li class="airtype">O<span class="whsub">3</span>(8h)</li>
                <li class="airtype">CO</li>
                <li class="airtype">NO<span class="whsub">2</span></li>
                <li class="airtype">SO<span class="whsub">2</span></li>
                <li class="moveto" onclick="moveTo('西安')">全国</li>
                <li class="moveto" onclick="moveTo('北京')">京津翼</li>
                <li class="moveto" onclick="moveTo('石家庄')">2+26</li>
                <li class="moveto" onclick="moveTo('临汾')">汾渭平原</li>
                <li class="moveto" onclick="moveTo('广州')">珠三角</li>
                <li class="moveto" onclick="moveTo('上海')">长三角</li>
              </ol>
            </div>
            <div class="warning_info">
              <div class="warning">
                <img src="static/images/warning2.png" alt="" class="whheight warningimg">
                <audio id="warning_music" loop="loop">
                  <source src="static/music/warning.mp3">
                </audio>
              </div>
              <div class="warning_info_details">
                <div class="warning_title">
                  警报
                  <span class="pull-right" style="margin-right: 10px;">
                              <i class="fa fa-bell-o" style="color: #fff;font-size: 16px"></i> <span style="color: red">争优保良</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    class="warning_info_close">×</span>
                            </span>
                </div>
                <div class="warning_content">
                  <div class="col-xs-4">
                    砂土车<br>
                    ***********
                  </div>
                  <div class="col-xs-4">
                    砂土车<br>
                    ***********
                  </div>
                  <div class="col-xs-4">
                    砂土车<br>
                    ***********
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <!--<div class="footer_left"><i class="fa fa-chevron-left"></i></div>-->
        <div class="footer_leftright">
          <div class="footerEchart">
            <div id="footer_echart"></div>
          </div>
        </div>
        <!--<div class="footer_right"><i class="fa fa-chevron-right"></i></div>-->
        <div class="play">
          <i class="fa fa-play"></i>
          <i class="fa fa-pause"></i>
        </div>
        <div id="bottom_line">
          <div class="line"></div>
          <div class="line_mark">
            <div>
              <div class="col-xs-1">
                <div class="line_mark_i">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div class="line_mark_num">
                  <div>
                    <i>03</i>
                    <i>06</i>
                    <i>09</i>
                    <i>12</i>
                    <i>15</i>
                    <i>18</i>
                    <i>21</i>
                  </div>
                </div>
              </div>
              <div class="col-xs-1">
                <div class="line_mark_i">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div class="line_mark_num">
                  <div>
                    <i>03</i>
                    <i>06</i>
                    <i>09</i>
                    <i>12</i>
                    <i>15</i>
                    <i>18</i>
                    <i>21</i>
                  </div>
                </div>
              </div>
              <div class="col-xs-1">
                <div class="line_mark_i">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div class="line_mark_num">
                  <div>
                    <i>03</i>
                    <i>06</i>
                    <i>09</i>
                    <i>12</i>
                    <i>15</i>
                    <i>18</i>
                    <i>21</i>
                  </div>
                </div>
              </div>
              <div class="col-xs-1">
                <div class="line_mark_i">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div class="line_mark_num">
                  <div>
                    <i>03</i>
                    <i>06</i>
                    <i>09</i>
                    <i>12</i>
                    <i>15</i>
                    <i>18</i>
                    <i>21</i>
                  </div>
                </div>
              </div>
              <div class="col-xs-1">
                <div class="line_mark_i">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div class="line_mark_num">
                  <div>
                    <i>03</i>
                    <i>06</i>
                    <i>09</i>
                    <i>12</i>
                    <i>15</i>
                    <i>18</i>
                    <i>21</i>
                  </div>
                </div>
              </div>
              <div class="col-xs-1">
                <div class="line_mark_i">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div class="line_mark_num">
                  <div>
                    <i>03</i>
                    <i>06</i>
                    <i>09</i>
                    <i>12</i>
                    <i>15</i>
                    <i>18</i>
                    <i>21</i>
                  </div>
                </div>
              </div>
              <div class="col-xs-1">
                <div class="line_mark_i">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div class="line_mark_num">
                  <div>
                    <i>03</i>
                    <i>06</i>
                    <i>09</i>
                    <i>12</i>
                    <i>15</i>
                    <i>18</i>
                    <i>21</i>
                  </div>
                </div>
              </div>
              <div class="col-xs-1">
                <div class="line_mark_i">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div class="line_mark_num">
                  <div>
                    <i>03</i>
                    <i>06</i>
                    <i>09</i>
                    <i>12</i>
                    <i>15</i>
                    <i>18</i>
                    <i>21</i>
                  </div>
                </div>
              </div>
              <div class="col-xs-1">
                <div class="line_mark_i">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div class="line_mark_num">
                  <div>
                    <i>03</i>
                    <i>06</i>
                    <i>09</i>
                    <i>12</i>
                    <i>15</i>
                    <i>18</i>
                    <i>21</i>
                  </div>
                </div>
              </div>
              <div class="col-xs-1">
                <div class="line_mark_i">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div class="line_mark_num">
                  <div>
                    <i>03</i>
                    <i>06</i>
                    <i>09</i>
                    <i>12</i>
                    <i>15</i>
                    <i>18</i>
                    <i>21</i>
                  </div>
                </div>
              </div>
              <div class="col-xs-1">
                <div class="line_mark_i">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div class="line_mark_num">
                  <div>
                    <i>03</i>
                    <i>06</i>
                    <i>09</i>
                    <i>12</i>
                    <i>15</i>
                    <i>18</i>
                    <i>21</i>
                  </div>
                </div>
              </div>
              <div class="col-xs-1">
                <div class="line_mark_i">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div class="line_mark_num">
                  <div>
                    <i>03</i>
                    <i>06</i>
                    <i>09</i>
                    <i>12</i>
                    <i>15</i>
                    <i>18</i>
                    <i>21</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mark_point"></div>
          <div class="line_info">
            <div>12:00</div>
            <div></div>
          </div>
        </div>
        <div class="footer_div">
          <div>
            <div class="col-xs-1 ">
              <div class="col-xs-5 footer_date">
                1-17
              </div>
              <div class="col-xs-7">
                <div class="footer_date1">昨日 <span class="red">320</span></div>
                <div class="footer_date2">同期 <span class="red">320</span></div>
              </div>
            </div>
            <div class="col-xs-1 ">
              <div class="col-xs-5 footer_date">
                1-18
              </div>
              <div class="col-xs-7">
                <div class="footer_date1">昨日 <span class="orange">320</span></div>
                <div class="footer_date2">同期 <span class="red">320</span></div>
              </div>
            </div>
            <div class="col-xs-1 ">
              <div class="col-xs-5 footer_date">
                1-19
              </div>
              <div class="col-xs-7">
                <div class="footer_date1">昨日 <span class="red">320</span></div>
                <div class="footer_date2">同期 <span class="green">320</span></div>
              </div>
            </div>
            <div class="col-xs-1 ">
              <div class="col-xs-5 footer_date">
                1-20
              </div>
              <div class="col-xs-7">
                <div class="footer_date1">昨日 <span class="orange">320</span></div>
                <div class="footer_date2">同期 <span class="red">320</span></div>
              </div>
            </div>
            <div class="col-xs-1 " style="padding-left: 10px !important;padding-right: 10px !important;">
              <div class="col-xs-5 footer_date">
                1-21
              </div>
              <div class="col-xs-7">
                <div class="footer_date1">累计 <span class="red">320</span></div>
                <div class="footer_date2">同期 <span class="green">320</span></div>
              </div>
            </div>
            <div class="col-xs-1 ">
              <div class="col-xs-5 footer_date">
                1-22
              </div>
              <div class="col-xs-7">
                <div class="footer_date1">预测 <span class="red">320</span></div>
                <div class="footer_date2">同期 <span class="red">320</span></div>
              </div>
            </div>
            <div class="col-xs-1 ">
              <div class="col-xs-5 footer_date">
                1-23
              </div>
              <div class="col-xs-7">
                <div class="footer_date1">预测 <span class="red">320</span></div>
                <div class="footer_date2">同期 <span class="red">320</span></div>
              </div>
            </div>
            <div class="col-xs-1 ">
              <div class="col-xs-5 footer_date">
                1-24
              </div>
              <div class="col-xs-7">
                <div class="footer_date1">预测 <span class="orange">320</span></div>
                <div class="footer_date2">同期 <span class="red">320</span></div>
              </div>
            </div>
            <div class="col-xs-1 ">
              <div class="col-xs-5 footer_date">
                1-25
              </div>
              <div class="col-xs-7">
                <div class="footer_date1">预测 <span class="red">320</span></div>
                <div class="footer_date2">同期 <span class="green">320</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="loading">
      <img src="http://img.zcool.cn/community/01069b58ec2faca8012049efebd2d6.gif" alt="">
    </div>
  </div>
</template>

<style scoped>
  .header{
    background-image: url("../../static/images/header.png");
  }

</style>
<script>
  import VAirtarget from '../components/Air_target'

  export default {
    data() {
      return { }
    },
    components: {
      VAirtarget
    }
  }

</script>

