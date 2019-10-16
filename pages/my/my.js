var app = getApp();

Page({
  data: {
    userInfo: {},
    mode: ['信息反馈', '联系客服', '关于我们']
  },
  onLoad: function () {
    var that = this;
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              userInfo: res.userInfo
            })
          }
        })
      }
    });
  }
})