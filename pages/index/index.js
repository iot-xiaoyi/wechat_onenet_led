var WxAutoImage = require('../../js/wxAutoImageCal.js');
var onenet = require('../../js/onenet.js');

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
    room_name: "客厅"

  },

  onLoad: function (e){
    var that = this;
    console.log("onloading......");
    setTimeout(function () {
      onenet.getAllDeviceStatus()
    }, 3000);
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

  btn_connect_fun:function(e){
    console.log("ready to connect to onenet!");
    var dat = onenet.getDeviceStatus("532808382")
    console.log(dat)
    if ( dat )
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
  cusImageLoad: function (e) {
    var that = this;
    that.setData(WxAutoImage.wxAutoImageCal(e));
  },
  set_room: function (e) {
    console.log("set room..............")
  }
})