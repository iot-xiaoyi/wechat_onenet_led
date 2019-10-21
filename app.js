//app.js
var onenet = require('js/onenet.js');

App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    return new Promise(function (resolve, reject) {
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
          }
        })
        // 获取用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          }
        })
      
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
          that.globalData.employId = res.statusCode;
          //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.employIdCallback) {
            this.employIdCallback(res.statusCode);
          }

        },
        fail(res) {
          console.log("请求失败")
          // deviceConnected = false
        }
      })
    });
  },
  employIdCallback: function(e){
    return e;
  },
  globalData: {
    userInfo: null,
    devices: [],
    employId: ''
  }
})