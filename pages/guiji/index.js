const mock = require('../../utils/mock.js')
const app = getApp()
var btnEnable = true
Page({
  data: {
    markers: [{
      iconPath: '/asset/map_location_bus.png',
      id: 20,
      latitude: 31.169527,
      longitude: 121.407722,
      width: 30,
      height: 38,
    }],

    polyLine: []

  },
  onLoad: function () {
    var testPoints = mock.testPoints

    console.log(testPoints)

    let newPolyline = ({
      points: testPoints,
      color: '#5085E7',
      width: 5,
      dottedLine: false
    })
    this.setData({
      polyline: [newPolyline]
    })
    var that = this
    setTimeout(function() { 
      that.mapCtx.includePoints({
        padding: [50, 50, 50, 50],
        points: testPoints
      })

    },200)

  },

  onReady: function() {
    this.mapCtx = wx.createMapContext('map', this)
  },

  /**测试点坐标运动 */
  moveMarker: function () {
    if(! btnEnable ) {
      return
    }

    var points = this.data.polyline[0].points

    this.loopAnamation(points, 0, 20)

    btnEnable = false
  },

  /**
   *  创建循环动画
   */
  loopAnamation: function (subArray, index, markerId) {

    var that = this
    if (index >= subArray.length) {
      btnEnable = true
      return
    }
    console.log('开始移动第', index, '个点', 'markerId：', markerId, subArray)
    that.mapCtx.translateMarker({
      markerId: 20,
      autoRotate: false,
      duration: 15000 / (subArray.length - 1),
      destination: {
        latitude: subArray[index].latitude,
        longitude: subArray[index].longitude,
      },
      animationEnd() {
        console.log('animation end')
        that.loopAnamation(subArray, index + 1, markerId)
      },
      fail: function (e) {
        console.log("来了老弟");
        console.log(e);
      }
    })
  },
})
