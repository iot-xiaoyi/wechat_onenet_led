var WxAutoImage = require('../../js/wxAutoImageCal.js');

var app = getApp();

Page({
  data: {
    imgUrls: [
      '../../image/onenet.jpg',
      '../../image/tecent.jpg',
      '../../image/rtt.jpg'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    room_names: ["客厅","卧室"],
    devices: [],
    employId: '',
    bindDisabled:false
  },

  onLoad: function (e){
    var that = this;
    var name = ''
    var devices_origin = ''

    console.log("onloading......");
    // setTimeout(function () {
    //   onenet.getAllDeviceStatus()
    // }, 3000);

    // 从app页面的devicesList中获取设备列表
    devices_origin = app.globalData.devices


    for (var i = 0; i < devices_origin.length; i++) {
      name = 'room_name_' + devices_origin[i].id
      try {
        var value = wx.getStorageSync(name)
        if (value) {
          devices_origin[i].room_name = value;
        }
      } catch (e) {
        // Do something when catch error
        console.log("get stroage data error!")
      }
    }

    that.setData({
      devices : devices_origin
    })
    // console.log("$$$$$$$$$$$$$", that.data.devices)
  },

  onShow: function (e) {
    var that = this
    var name = ''
    var devices_origin = ''

    // 从app页面的devicesList中获取设备列表
    devices_origin = app.globalData.devices

    for (var i = 0; i < devices_origin.length; i++) {
      name = 'room_name_' + devices_origin[i].id
      try {
        var value = wx.getStorageSync(name)
        if (value) {
          devices_origin[i].room_name = value;
        }
      } catch (e) {
        // Do something when catch error
        console.log("get stroage data error!")
      }
    }

    that.setData({
      devices: devices_origin
    })

  },
  
})