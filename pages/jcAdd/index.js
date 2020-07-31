 
import {
	CDN_PATH,
	PLUGIN_KEY
} from '../../config/appConfig';
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const qqmapsdk = new QQMapWX({
	key: PLUGIN_KEY // 必填
});
 
Page({

	/**
   * 页面的初始数据
   */
	data: {
		CDN_PATH,
		loca:'',
		location:{
			latitude:"",
			longitude:""
		},
		markers: [{
			id: 0,
			iconPath: `${CDN_PATH}/Marker3_Activated@3x.png`,
			latitude: '',
			longitude: '',
			width: 30,
			height: 30
		}]
	},
 onReady:function (e){
	 this.mapCtx=wx.createMapContext('myMap')
this.selectLocation()
 },
 getCenterLocation: function () {
	this.mapCtx.getCenterLocation({
		success: function(res){
			console.log(res.longitude)
			console.log(res.latitude)
		}
	})
},
selectLocation:function (e){
	var that=this
  wx.getLocation({
		type: 'gcj02', //返回可以用于wx.openLocation的经纬度
		success (res) {
			const latitude = res.latitude
			const longitude = res.longitude
			console.log(res)
			that.setData({
				loca: latitude+","+longitude,
				location:{
					latitude:latitude,
					longitude:longitude
				},
				markers: [{
					id: 0,
					iconPath: `${CDN_PATH}/Marker3_Activated@3x.png`,
					latitude: latitude,
					longitude: longitude,
					width: 30,
					height: 30
				}],
			})
		}
	 })

},
onTapMap (event) {
	console.log('event.detail',event.detail)
	const latitude = event.detail.latitude;
	const longitude = event.detail.longitude;
	console.log(latitude.toFixed(6) + ',' + longitude.toFixed(6))
	this.setData({
		mapCallbackTxt: latitude.toFixed(6) + ',' + longitude.toFixed(6),
		markers: [{
			id: 0,
			iconPath: `${CDN_PATH}/Marker3_Activated@3x.png`,
			latitude: latitude,
			longitude: longitude,
			width: 30,
			height: 30
		}],
		loca: latitude.toFixed(6)+","+longitude.toFixed(6),
				location:{
					latitude:latitude,
					longitude:longitude
				}
	});
},

});
