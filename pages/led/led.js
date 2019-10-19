var WxAutoImage = require('../../js/wxAutoImageCal.js');
var onenet = require('../../js/onenet.js');

var app = getApp();

Page({
  data: {
    showModal: false,
    imgUrls: [
      '../../image/swiper1.jpg',
      '../../image/swiper1.jpg',
      '../../image/swiper1.jpg'
    ],
    room_name:"客厅",
    input_name:"客厅"
  },

  onLoad: function (e) {
    var that = this;
    console.log("onloading......");
    // setInterval(function () {
    //   onenet.getDeviceStatus("532808382")
    // }, 3000)

    //get storage data
    try {
      var value = wx.getStorageSync('room_name')
      if (value) {
        // Do something with return value
        that.setData({
          room_name:value
        })
      }
    } catch (e) {
      // Do something when catch error
      console.log("get stroage data error!")
    }
  },

  btn_connect_fun: function (e) {
    console.log("ready to connect to onenet!");
    var dat = onenet.getDeviceStatus("532808382")
    console.log(dat)
    if (dat)
      console.log("connect to cloud success!");
    else
      console.log("connect to cloud error!");

  },
  btn_open_led_fun: function (e) {
    console.log("ready to open red led!");
    onenet.sendCmd()
  },
  btn_close_led_fun: function (e) {
    console.log("ready to close red led!");
    onenet.getDataPoints()
  },

  set_room: function () {
    this.setData({
      showModal: true
    })
  },
  inputChange:function(e) {
    this.setData({
      input_name: e.detail.value
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
    this.setData({
      room_name: this.data.input_name
    })
    try {
      wx.setStorageSync('room_name', this.data.room_name)
    } catch (e) {
      console.log("fsdddddddddddddddd error")
     }
     console.log("success")
  }

})