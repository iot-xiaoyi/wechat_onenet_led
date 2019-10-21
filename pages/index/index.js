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
    //get storage data
    // 所以此处加入 callback 以防止这种情况
    //判断是用户是否绑定了
    if (app.globalData.employId && app.globalData.employId != '') {
      this.setData({
        
        bindDisabled: true
      });
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.employIdCallback = employId => {
        if (employId != '') {
          this.setData({
            bindDisabled: true
          });
        }
      }
    }

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
    };

    // 从app页面的devicesList中获取设备列表
    that.setData({
      devices: app.globalData.devices
    })
    console.log("$$$$$$$$$$$$$", that.data.devices)
    console.log(app.globalData.devices)
  },

  sleep:function (ms) {
    return new Promise(resolve =>
      setTimeout(resolve, ms)
    )
  }
  
})