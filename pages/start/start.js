
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0
  },
  goToIndex: function () {
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
  onLoad: function () {
    var that = this
  },
  onShow: function () {

  },
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  },
  bindGetUserInfo(res) {
    var that = this
    console.log(res);
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // // 可以将 res 发送给后台解码出 unionId
              // this.globalData.userInfo = res.userInfo
              console.log("授权成功");
              this.goToIndex();
            }
          })
        }else{
          this.goToIndex();
        }
      }
    })
    // if (res.detail.userInfo) {
    //   console.log("点击了同意授权");
    //   this.goToIndex();

    // } else {
    //   console.log("点击了拒绝授权");
    // }
  }
})