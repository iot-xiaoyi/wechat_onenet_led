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

    itemArray: [
      {
        "itemUrl": '../../image/huaju.jpeg',
        "itemText": '11月20日话剧《风声》'
      },
      {
        "itemUrl": '../../image/huaju.jpeg',
        "itemText": '11月20日话剧《原野》'
      },
      {
        "itemUrl": '../../image/huaju.jpeg',
        "itemText": '11月28日“夜店”演唱会'
      },
    ]
  },

  onLoad: function (e){
    var that = this;
    console.log("onloading......");
    setTimeout(function () {
      onenet.getAllDeviceStatus()
    }, 3000)
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