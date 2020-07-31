const app = getApp();

Page({
   
  data: {
    show:false,
    lists:[{
      carNo:'冀A12345',
      time:'2016-05-05 09:00',
      carState:'1',
      id:1
    },
    {
      carNo:'冀A66666',
      time:'2016-05-05 09:00',
      carState:'2',
      id:2
    }],
    carNo:'',
    carEqu:"",
    navH:app.globalData.navHeight
  },

  onReady() {
  },
  addCar:function (){
      this.setData({
        show:true
      })
  },
  saveCar:function (){
    console.log(this.data)
    wx.request({
      url: app.globalData.baseUrl+'/pc/sys/user/login', //仅为示例，并非真实的接口地址
      data: {
        carNo: this.data.carNo,
        carEqu: this.data.carEqu
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
      },
      fail:function (err){
        console.log(err)
      }
    })
  },
  cancelCar:function () {
    this.setData({
      show:false
    })
  },
  navBack:function (){
    wx.navigateBack({ changed: true });
  },
  
});
