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
          <li @click="dispatch_page()">调度</li>
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
                <div class="circlechart">141</div>
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
                <i class="fa fa-angle-double-up " v-on:click='details_updown'></i>
                <i class="fa fa-angle-double-down " v-on:click='details_updown' ></i>
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
                  <li>省内</li>
                  <li>县区</li>
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
              <div id="_city_table_id" class="city_table">
                <i-table :height="eleHeight" no-data-text="" width="10%" :columns="columns1" :data="data2"></i-table>

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
                <li class="airtype right_ol_liFocus" data-type="aqi">AQI</li>
                <li class="airtype" data-type="pm25">PM<span class="whsub">2.5</span></li>
                <li class="airtype" data-type="pm10">PM<span class="whsub">10</span></li>
                <li class="airtype" data-type="o3">O<span class="whsub">3</span>(8h)</li>
                <li class="airtype" data-type="co">CO</li>
                <li class="airtype" data-type="no2">NO<span class="whsub">2</span></li>
                <li class="airtype" data-type="so2">SO<span class="whsub">2</span></li>
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
  import Vue from 'vue'
  import VAirtarget from '../components/Air_target'
  import {Table} from  'iview'
  import $ from 'jquery'
  Vue.component('i-table', Table);
  var httpUrl = 'http://180.76.119.77:9096'
  export default {
    data () {
      return {
        eleHeight:'190',
        columns1: [
          {
            title: '排名',
            type: 'index',
            align:'center',
            width:'30'
          },
          {
            title: '城市',
            align:'center',
            key: 'cityName',
            width:'80'
          },
          {
            title: 'AQI',
            align:'center',
            key: 'AQI',
            width:'60',
            sortable: true,
            render:(h, params) => {
              return h('span',{style:{color:'#fff',
                  padding:'5px 15px',
                  borderRadius:'10px',
                  backgroundColor: 'rgb(188, 176, 42)'
                }},params.row.AQI);
            }
          },
          {

            align:'center',
            width:'60',
            key: 'PM25',
            sortable: true,
            renderHeader:(h, params) => {
              return h('div',{style:{display:'inline'}}, [
                h('span','PM'),
                h('sub', '2.5')
              ]);
            }
          },
          {
            align:'center',
            width:'60',
            key: 'PM10',
            sortable: true,
            renderHeader:(h, params) => {
              return h('div',{style:{display:'inline'}}, [
                h('span','PM'),
                h('sub', '10')
              ]);
            }
          },
          {
            align:'center',
            width:'70',
            key: 'O3',
            sortable: true,
            renderHeader:(h, params) => {
              return h('div',{style:{display:'inline'}}, [
                h('span','O'),
                h('sub', '3'),
                h('span','(8h)'),
              ]);
            }
          },
          {
            title: 'CO',
            align:'center',
            width:'50',
            sortable: true,
            key: 'CO'
          },
          {
            align:'center',
            width:'50',
            key: 'NO2',
            sortable: true,
            renderHeader:(h, params) => {
              return h('div',{style:{display:'inline'}}, [
                h('span','NO'),
                h('sub', '2')
              ]);

            }
          },
          {
            align:'center',
            width:'80',
            key: 'SO2',
            sortable: true,
            renderHeader:(h, params) => {
              return h('div',{style:{display:'inline'}}, [
                h('span','SO'),
                h('sub', '2')
              ]);

            }
          }
        ],
        data2: []
      }
    },
    components: {
      VAirtarget
    },
    mounted (){
      this.eleHeight = $('#_city_table_id').height()+5
      var that = this
// 左下角城市排名 -- 排名范围切换
      $(".city_sort_change li").click(function () {
        $(".city_sort_change li").each(function (item) {
          if($(this).hasClass('liFocus')) {
            $(this).removeClass('liFocus')
          }
        })
        $(this).addClass('liFocus')
        that.getCityRank()
        let city_sort = $(this).text();
        console.log("城市排名范围切换：" + city_sort);
      })

// 左下角城市排名 -- 时间类型切换

      $(".city_time_change li").click(function () {
        let city_sort = $(".city_sort_change .liFocus").text();
        let city_time = $(this).text();
        $(".city_time_change li").each(function (item) {
          if($(this).hasClass('liFocus')) {
            $(this).removeClass('liFocus')
          }
        })
        $(this).addClass('liFocus')
        that.getCityRank()
        console.log("=========================")
        console.log("城市排名范围切换：" + city_sort);
        console.log("城市排名时间类型切换：" + city_time)
        console.log("=========================")
      })
      this.getCityRank()
    },
    methods:{
      getCityRank () {
        var dd = $(".city_sort_change .liFocus").text()
        console.log(dd)
        var modelNum = ''
        if (dd == '169') {
          modelNum = '2'
        }else if(dd == '2+26') {
          modelNum ='1'
        }else if(dd == '省') {
          modelNum ='4'
        }else if(dd == '县') {
          modelNum ='3'
        }
        var sort = '1'
        var  timedd =  $(".city_time_change .liFocus").text()
        var Num = ''
        if(timedd == '时') {
          Num ='1'
        }else if(timedd == '日') {
          Num ='2'
        }else if(timedd == '月') {
          Num ='3'
        }else if(timedd == '年') {
          Num ='4'
        }

        var that =  this
        $.ajax({
          type: "get",
          url: httpUrl+'/api/getIndexAllPortData?modelNum='+modelNum+'&sort='+sort+'&Num='+Num,//服务器
          success: function(data){
            if (Num == '1') {
              if(data.code =='200') {
                if(data.data[0].code == '200'){
                  var hourData = data.data[0].data.HourData
                  var tmpData=[]
                  for (var i in hourData) {
                    tmpData.push(
                      {
                        cityName: hourData[i].area_name,
                        AQI: hourData[i].aqi,
                        PM25: hourData[i].pm25,
                        PM10: hourData[i].pm10,
                        O3: hourData[i].o3,
                        CO: hourData[i].co,
                        NO2: hourData[i].no2,
                        SO2: hourData[i].so2
                      })
                  }
                  that.data2=tmpData
                }
              }
            } else if(Num == '2') {
              if(data.code =='200') {
                if(data.data[0].code == '200'){
                  var hourData = data.data[0].data.DayData
                  var tmpData=[]
                  for (var i in hourData) {
                    tmpData.push(
                      {
                        cityName: hourData[i].area_name,
                        AQI: hourData[i].aqi,
                        PM25: hourData[i].pm25,
                        PM10: hourData[i].pm10,
                        O3: hourData[i].o3,
                        CO: hourData[i].co,
                        NO2: hourData[i].no2,
                        SO2: hourData[i].so2
                      })
                  }
                  that.data2=tmpData
                }
              }
            }else if(Num == '3') {
              if(data.code =='200') {
                if(data.data[0].code == '200'){
                  var hourData = data.data[0].data.MonthData
                  var tmpData=[]
                  for (var i in hourData) {
                    tmpData.push(
                      {
                        cityName: hourData[i].area_name,
                        AQI: hourData[i].aqi,
                        PM25: hourData[i].pm25,
                        PM10: hourData[i].pm10,
                        O3: hourData[i].o3,
                        CO: hourData[i].co,
                        NO2: hourData[i].no2,
                        SO2: hourData[i].so2
                      })
                  }
                  that.data2=tmpData
                }
              }
            }else if(Num == '4'){
              if(data.code =='200') {
                if(data.data[0].code == '200'){
                  var hourData = data.data[0].data.YearList
                  var tmpData=[]
                  for (var i in hourData) {
                    tmpData.push(
                      {
                        cityName: hourData[i].area_name,
                        AQI: hourData[i].aqi,
                        PM25: hourData[i].pm25,
                        PM10: hourData[i].pm10,
                        O3: hourData[i].o3,
                        CO: hourData[i].co,
                        NO2: hourData[i].no2,
                        SO2: hourData[i].so2
                      })
                  }
                  that.data2=tmpData
                }
              }
            }
            console.log(that.code)
          }
        })
      },
      details_updown(type){
        console.log("fff");
        var that = this
        $(".airsix_bottom>i").css("margin", "auto");
        // $("#details").css("height","36vh");
        if ($(".fa-angle-double-down").css("display") == "none") {
          console.log("上滑");
          $(".fa-angle-double-up").css("display", "none");
          $(".fa-angle-double-down").css("display", "block");
          $(".airsix_content").slideUp(500);
          $(".content_left_top").animate({"height": "30vh"}, 500);
          $(".content_left_bottom").animate({"height": "52vh"}, 500);
          $(".city_table").animate({"height": "42.5vh"}, 500,function () {
            console.log($('#_city_table_id').height())
            that.eleHeight = $('#_city_table_id').height()
            console.log(that.eleHeight)
          });
          $("#details").css("top", "5vh");

        } else {
          console.log("下滑");
          $(".fa-angle-double-down").css("display", "none");
          $(".fa-angle-double-up").css("display", "block");
          $(".airsix_content").slideDown(500);
          $(".content_left_top").animate({"height": "54.5vh"}, 500);
          $(".content_left_bottom").animate({"height": "27.5vh"}, 500);
          $(".city_table").animate({"height": "18vh"}, 500,function () {
            console.log($('#_city_table_id').height())
            that.eleHeight = $('#_city_table_id').height()
            console.log(that.eleHeight)
          });
          $("#details").css("top", "29.5vh");
        }

      },
      dispatch_page(){
        window.location.href = './otherpage/index.html'
      },
    }
  }

</script>

<style>

  .ivu-table {
    width: inherit;
    height: 100%;
    max-width: 100%;
    overflow: hidden;
    color: #fff;
    font-size: 15px;
    background-color: transparent;
    -webkit-box-sizing: border-box;
    box-sizing: border-box
  }

  .ivu-table-wrapper {
    position: relative;
    /*border: 1px solid #dcdee2;*/
    border-bottom: 0;
    border-right: 0
  }

  .ivu-table-hide {
    opacity: 0
  }

  .ivu-table:before {
    content: '';
    width: 100%;
    height: 1px;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: transparent;
    z-index: 1
  }

  .ivu-table:after {
    content: '';
    width: 1px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    z-index: 3
  }

  .ivu-table-footer, .ivu-table-title {
    height: 48px;
    line-height: 48px;
    /*border-bottom: 1px solid #e8eaec*/
  }

  .ivu-table-footer {
    border-bottom: none
  }

  .ivu-table-header {
    overflow: hidden
  }

  .ivu-table-overflowX {
    overflow-x: scroll
  }

  .ivu-table-overflowY {
    overflow-y: scroll
  }

  .ivu-table-tip {
    overflow-x: auto;
    overflow-y: hidden
  }

  .ivu-table-with-fixed-top.ivu-table-with-footer .ivu-table-footer {
    /*border-top: 1px solid #dcdee2*/
  }

  .ivu-table-with-fixed-top.ivu-table-with-footer tbody tr:last-child td {
    border-bottom: none
  }

  .ivu-table td, .ivu-table th {
    min-width: 0;
    height: 34px;
    line-height: 34px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: left;
    text-overflow: ellipsis;
    vertical-align: middle;
    /*border-bottom: 1px solid #e8eaec*/
  }

  .ivu-table th {
    height: 30px;
    white-space: nowrap;
    overflow: hidden;
    background-color: transparent;
  }

  .ivu-table td {
    background-color: transparent;
    -webkit-transition: background-color .2s ease-in-out;
    transition: background-color .2s ease-in-out
  }

  td.ivu-table-column-left, th.ivu-table-column-left {
    text-align: left
  }

  td.ivu-table-column-center, th.ivu-table-column-center {
    text-align: center
  }

  td.ivu-table-column-right, th.ivu-table-column-right {
    text-align: right
  }

  .ivu-table table {
    table-layout: fixed
  }

  .ivu-table-border td, .ivu-table-border th {
    border-right: 1px solid #e8eaec
  }

  .ivu-table-cell {
    /*padding-left: 18px;*/
    /*padding-right: 18px;*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    -webkit-box-sizing: border-box;
    box-sizing: border-box
  }

  .ivu-table-cell-ellipsis {
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }

  .ivu-table-cell-tooltip {
    width: 100%
  }

  .ivu-table-cell-tooltip-content {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .ivu-table-cell-with-expand {
    height: 47px;
    line-height: 47px;
    padding: 0;
    text-align: center
  }

  .ivu-table-cell-expand {
    cursor: pointer;
    -webkit-transition: -webkit-transform .2s ease-in-out;
    transition: -webkit-transform .2s ease-in-out;
    transition: transform .2s ease-in-out;
    transition: transform .2s ease-in-out, -webkit-transform .2s ease-in-out
  }

  .ivu-table-cell-expand i {
    font-size: 14px
  }

  .ivu-table-cell-expand-expanded {
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg)
  }

  .ivu-table-cell-sort {
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
  }

  .ivu-table-cell-with-selection .ivu-checkbox-wrapper {
    margin-right: 0
  }

  .ivu-table-hidden {
    visibility: hidden
  }

  th .ivu-table-cell {
    display: inline-block;
    word-wrap: normal;
    vertical-align: middle
  }






  .ivu-table-large {
    font-size: 14px
  }

  .ivu-table-large th {
    height: 48px
  }

  .ivu-table-large td {
    height: 60px
  }

  .ivu-table-large-footer, .ivu-table-large-title {
    height: 60px;
    line-height: 60px
  }

  .ivu-table-large .ivu-table-cell-with-expand {
    height: 59px;
    line-height: 59px
  }

  .ivu-table-large .ivu-table-cell-with-expand i {
    font-size: 16px
  }

  .ivu-table-small th {
    height: 32px
  }

  .ivu-table-small td {
    height: 40px
  }

  .ivu-table-small-footer, .ivu-table-small-title {
    height: 40px;
    line-height: 40px
  }

  .ivu-table-small .ivu-table-cell-with-expand {
    height: 39px;
    line-height: 39px
  }

  .ivu-table-row-highlight td, .ivu-table-stripe .ivu-table-body tr.ivu-table-row-highlight:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr.ivu-table-row-highlight:nth-child(2n) td, tr.ivu-table-row-highlight.ivu-table-row-hover td {
    background-color: #ebf7ff
  }

  .ivu-table-fixed, .ivu-table-fixed-right {
    position: absolute;
    top: 0;
    left: 0;
    -webkit-box-shadow: 2px 0 6px -2px rgba(0, 0, 0, .2);
    box-shadow: 2px 0 6px -2px rgba(0, 0, 0, .2)
  }

  .ivu-table-fixed-right::before, .ivu-table-fixed::before {
    content: '';
    width: 100%;
    height: 1px;
    background-color: #dcdee2;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 4
  }

  .ivu-table-fixed-right {
    top: 0;
    left: auto;
    right: 0;
    -webkit-box-shadow: -2px 0 6px -2px rgba(0, 0, 0, .2);
    box-shadow: -2px 0 6px -2px rgba(0, 0, 0, .2)
  }

  .ivu-table-fixed-right-header {
    position: absolute;
    top: -1px;
    right: 0;
    background-color: #f8f8f9;
    border-top: 1px solid #dcdee2;
    border-bottom: 1px solid #e8eaec
  }

  .ivu-table-fixed-header {
    overflow: hidden
  }

  .ivu-table-fixed-body {
    overflow: hidden;
    position: relative;
    z-index: 3
  }

  .ivu-table-fixed-shadow {
    width: 1px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    -webkit-box-shadow: 1px 0 6px rgba(0, 0, 0, .2);
    box-shadow: 1px 0 6px rgba(0, 0, 0, .2);
    overflow: hidden;
    z-index: 1
  }

  .ivu-table-sort {
    display: inline-block;
    width: 14px;
    height: 12px;
    margin-top: -1px;
    margin-left: -6px;
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    position: relative
  }

  .ivu-table-sort i {
    display: block;
    height: 6px;
    line-height: 6px;
    overflow: hidden;
    position: absolute;
    color: #fff;
    -webkit-transition: color .2s ease-in-out;
    transition: color .2s ease-in-out;
    font-size: 17px
  }

  .ivu-table-sort i:hover {
    color: inherit
  }

  .ivu-table-sort i.on {
    color: #2d8cf0
  }

  .ivu-table-sort i:first-child {
    top: 0
  }

  .ivu-table-sort i:last-child {
    bottom: 0
  }

  .ivu-table-filter {
    display: inline-block;
    cursor: pointer;
    position: relative
  }

  .ivu-table-filter i {
    color: #c5c8ce;
    -webkit-transition: color .2s ease-in-out;
    transition: color .2s ease-in-out
  }

  .ivu-table-filter i:hover {
    color: inherit
  }

  .ivu-table-filter i.on {
    color: #2d8cf0
  }

  .ivu-table-filter-list {
    padding: 8px 0 0
  }

  .ivu-table-filter-list-item {
    padding: 0 12px 8px
  }

  .ivu-table-filter-list-item .ivu-checkbox-wrapper + .ivu-checkbox-wrapper {
    margin: 0
  }

  .ivu-table-filter-list-item label {
    display: block
  }

  .ivu-table-filter-list-item label > span {
    margin-right: 4px
  }

  .ivu-table-filter-list ul {
    padding-bottom: 8px
  }

  .ivu-table-filter-list .ivu-table-filter-select-item {
    margin: 0;
    line-height: normal;
    padding: 7px 16px;
    clear: both;
    color: #515a6e;
    font-size: 12px !important;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    -webkit-transition: background .2s ease-in-out;
    transition: background .2s ease-in-out
  }

  .ivu-table-filter-list .ivu-table-filter-select-item:hover {
    background: #f3f3f3
  }

  .ivu-table-filter-list .ivu-table-filter-select-item-focus {
    background: #f3f3f3
  }

  .ivu-table-filter-list .ivu-table-filter-select-item-disabled {
    color: #c5c8ce;
    cursor: not-allowed
  }

  .ivu-table-filter-list .ivu-table-filter-select-item-disabled:hover {
    color: #c5c8ce;
    background-color: #fff;
    cursor: not-allowed
  }

  .ivu-table-filter-list .ivu-table-filter-select-item-selected, .ivu-table-filter-list .ivu-table-filter-select-item-selected:hover {
    color: #2d8cf0
  }

  .ivu-table-filter-list .ivu-table-filter-select-item-divided {
    margin-top: 5px;
    border-top: 1px solid #e8eaec
  }

  .ivu-table-filter-list .ivu-table-filter-select-item-divided:before {
    content: '';
    height: 5px;
    display: block;
    margin: 0 -16px;
    background-color: #fff;
    position: relative;
    top: -7px
  }

  .ivu-table-filter-list .ivu-table-large .ivu-table-filter-select-item {
    padding: 7px 16px 8px;
    font-size: 14px !important
  }

  @-moz-document url-prefix() {
    .ivu-table-filter-list .ivu-table-filter-select-item {
      white-space: normal
    }
  }

  .ivu-table-filter-footer {
    padding: 4px;
    border-top: 1px solid #e8eaec;
    overflow: hidden
  }

  .ivu-table-filter-footer button:first-child {
    float: left
  }

  .ivu-table-filter-footer button:last-child {
    float: right
  }

  .ivu-table-tip table {
    width: 100%
  }

  .ivu-table-tip table td {
    text-align: center
  }

  .ivu-table-expanded-hidden {
    visibility: hidden
  }

  .ivu-table-popper {
    min-width: 0;
    text-align: left
  }

  .ivu-table-popper .ivu-poptip-body {
    padding: 0
  }

  @font-face {
    font-family: Ionicons;
    src: url(fonts/ionicons.ttf?v=3.0.0) format("truetype"), url(fonts/ionicons.woff?v=3.0.0) format("woff"), url(fonts/ionicons.svg?v=3.0.0#Ionicons) format("svg");
    font-weight: 400;
    font-style: normal
  }

  .ivu-icon {
    display: inline-block;
    font-family: Ionicons;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    text-rendering: auto;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    vertical-align: middle
  }
  .ivu-icon-md-arrow-dropup:before {
    content: "\f343"
  }
  .ivu-icon-md-arrow-dropdown:before {
    content: "\f33d"
  }
</style>
