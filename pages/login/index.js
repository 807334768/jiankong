const app = getApp();
Page({
  data: {
    name:'',
    pwd:"",
    avatarUrl:'',
    show:true,
    navH:app.globalData.navHeight
   
  },
onReady(){

  
},
  onLoad() {
    // try {
    //   wx.getStorage({
    //     key: 'isLogin',
    //     success (res) {
    //       console.log(res.data)
    //       if (res.data==="1") {
    //           wx.navigateTo({
    //             url: '../marker/index'
    //           })
    //        }
    //     }
    //   })
    // } catch (e) {
    //   this.setData({
    //     show:true
    //   })
    //    console.log("未找到登录信息")
    // }
    console.log(1)
    var _this=this
    wx.getUserInfo({
      success: function(res) {
        console.log("res",res)
        var userInfo = res.userInfo
        _this.setData({
            name:userInfo.nickName,
            avatarUrl:userInfo.avatarUrl
        })
      }
    })
  
  },
  getPhoneNumber (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },

  clickMe: function() {
     console.log("ms",this.data.name,this.data.pwd)
    
  },
  toLogin: function (e) {
    wx.redirectTo ({
      url: '../marker/index'
    });
    // wx.request({
    //   url: app.globalData.baseUrl+'/pc/sys/user/login', //仅为示例，并非真实的接口地址
    //   data: {
    //     carNo: this.data.carNo,
    //     carEqu: this.data.carEqu
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success (res) {
    //     console.log(res.data)
    //     wx.setStorage({
    //       key:"isLogin",
    //       data:"1"
    //     })
    //     wx.switchTab({
    //       url: '../marker/index'
    //     })
    //   },
    //   fail:function (err){
    //     console.log(err)
    //   }
    // })
   
  }
});
