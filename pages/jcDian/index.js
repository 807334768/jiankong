import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '24小时总悬浮颗粒物',
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
   
    tooltip: {
      show: false,
      trigger: 'axis'
    },
    dataZoom: {
      show: true,
      realtime: true,
      height: 20,
      start: 20,
      end: 80,
      bottom:0
    },
    xAxis: {
      type: 'category',
      data: ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00','14:00','15:00','16:00','17:00','18:00'],
      // show: false
      axisPointer:{
        value:'10:00',
        snap:true,
        lineStyle:{
          color:'red',
          opacity:0.5,
          width:2
        },
        label:{
          show:true,
          formatter:function (params){
            return   "雾炮车经过"
          },
          background:'green'
        },
        handle:{
          show:true,
          color:'rgba(0,0,0,0)'
        }
      },
      spliteLine:{
        show:false
      }
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: '一级',
      type: 'line',
      smooth: true,
      data: [18, 36]
    },{
      name: '二级',
      type: 'line',
      smooth: true,
      data: [ '-',36,65, 30,  ]
    },{
      name: '三级',
      type: 'line',
      smooth: true,
      data: [ '-','-','-', 30,78, 40, 33,15,6,19,25,30,22,28]
    },{
      name:'m',
      type:'line',
      markLink:{
        name:'111',
        data:[
          [{
            coord:['11:00',0]
          },{
            coord:['11:00',78]
          }]
        ]
      }
    }]
  };

  chart.setOption(option);
  return chart;
}
function initChart2(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3"],
    series: [{
      name: 'DDD',
      type: 'gauge',
      detail: {
        formatter: '{value}%'
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 30,
          shadowBlur: 0,
          color: [
            [0.3, '#67e0e3'],
            [0.7, '#37a2da'],
            [1, '#fd666d']
          ]
        }
      },
      data: [{
        value: 40,
        name: 'TSP',
      }]

    }]
  };

  chart.setOption(option, true);

  return chart;
}
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    },
    ec2: {
      onInit: initChart2
    },
    navH:app.globalData.navHeight
  },

  onReady() {
  },
  navBack:function (){
    wx.navigateBack({ changed: true });
  },
});
