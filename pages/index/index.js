var WxAutoImage = require('../../js/wxAutoImageCal.js');

var app = getApp();

Page({
  data: {
    imgUrls: [
      '../../image/swiper1.jpg',
      '../../image/swiper1.jpg',
      '../../image/swiper1.jpg'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    room_name: "客厅",
    devices: [],
    employId: '',
    bindDisabled:false
  },

  onLoad: function (e){
    var that = this;
    console.log("onloading......");
    // setTimeout(function () {
    //   onenet.getAllDeviceStatus()
    // }, 3000);

    // 从app页面的devicesList中获取设备列表
    that.setData({
      devices: app.globalData.devices
    })
    console.log("$$$$$$$$$$$$$", that.data.devices)
    console.log(app.globalData.devices)
  },

  onShow: function (e) {
    var that = this
    //get storage data
    try {
      var value = wx.getStorageSync('room_name')
      if (value) {
        // Do something with return value
        that.setData({
          room_name: value
        })
      }
    } catch (e) {
      // Do something when catch error
      console.log("get stroage data error!")
    }
  },
  
})