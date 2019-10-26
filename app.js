//app.js
var onenet = require('js/onenet.js');

App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    //get devices of onenet
    wx.request({
      url: "https://api.heclouds.com/devices",
      header: {
        "api-key": "eCQJZEKoyVqA5qV4ef3qTH2OZzo="
      },
      data: {

      },
      success(res) {
        console.log(res)
        var devices = [];
        if (res.data.errno == 0) {
          for (var i = 0; i < res.data.data.total_count; i++) {
            devices.push(res.data.data.devices[i]);
          }
        }
        that.globalData.devices = devices
        console.log(devices)
      },
      fail(res) {
        console.log("请求失败")
        // deviceConnected = false
      }
    })
  },

  globalData: {
    userInfo: null,
    devices: [],
  }
})