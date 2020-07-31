// pages/map/event/event.js
import {
	CDN_PATH,
	PLUGIN_KEY
} from '../../config/appConfig';
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const qqmapsdk = new QQMapWX({
	key: PLUGIN_KEY // 必填
});
const app = getApp();
Page({

	/**
   * 页面的初始数据
   */
	data: {
		CDN_PATH,
		navH:app.globalData.navHeight,
		location: {
			latitude: 40.040415,
      longitude: 116.273511,
        jsList:[{
              id:'1111',
              name:"jjj",
              loc:'aaaaaa',
              val:22,
              level:'一级'
            }]
        
		},
		markers: [{
			id: 0,
			iconPath: `${CDN_PATH}/Marker3_Activated@3x.png`,
			latitude: 40.040415,
			longitude: 116.273511,
			width: 30,
      height: 30,
        callout:{
                content:"aaa",
                color:"rgba(0,0,0,0)",
                fontSize: 12,
                borderRadius: 10,
                bgColor: "rgba(0,0,0,0)",
                padding: 2,
                display: 'ALWAYS'
              }
		},
		{
			id: 1,
			iconPath: `${CDN_PATH}/Marker3_Activated@3x.png`,
			latitude: 40.041070,
			longitude: 116.275871,
			width: 30,
			height: 30
		},
		{
			id: 2,
			iconPath: `${CDN_PATH}/Marker3_Activated@3x.png`,
			latitude: 40.041267,
			longitude: 116.272266,
			width: 30,
			height: 30
		},
	],
		mapCallbackTxt: '点击地图触发回调事件',
		markerCallbackTxt: '点击标注点触发回调事件',
		poiCallbackTxt: '点击POI触发回调事件',
		regionCallbackTxt: '拖动地图触发视野回调',
	},
	// 点击地图事件
	onTapMap (event) {
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
			}]
		});
	},
	// 标注点击回调
	onTapMarker (event) {
	
		const markers = this.data.markers;
		console.log("event",event)
		for (let i = 0; i < markers.length; i++) { // 本示例只有一个marker，可用于处理单marker和多marker情况
			if (event.markerId === markers[i].id) {
				this.setData({
					  jsList:[{
						      id:'1',
						      name:markers[i].id,
						      loc:'bbbbb',
						      val:99,
						      level:'一级'
						    }]
				})
		
			}
		}
	},

	// poi点击回调
	onTapPoi (event) {
		const name = event.detail.name.length <= 8 ? event.detail.name : event.detail.name.substring(0, 8)+'...';
		const latitude = event.detail.latitude;
		const longitude = event.detail.longitude;
		this.setData({
			poiCallbackTxt: name + '：' + latitude.toFixed(6) + ',' + longitude.toFixed(6)
		});
	},

	// 监听视野变化
	onChangeRegion (event) {
		if (event.type === 'end' && event.causedBy === 'drag') {
			const mapCtx = wx.createMapContext('map', this);
			mapCtx.getCenterLocation({
				success: res => {
					const latitude = res.latitude;
					const longitude = res.longitude;
					this.setData({
						regionCallbackTxt: '中心点坐标：' + latitude.toFixed(6) + ',' + longitude.toFixed(6)
					});
				}
			});
		}
	},
	onShareAppMessage: function () {

	},
	navBack:function (){
    wx.navigateBack({ changed: true });
  },
});
