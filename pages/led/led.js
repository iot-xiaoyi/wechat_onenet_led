var WxAutoImage = require('../../js/wxAutoImageCal.js');
var onenet = require('../../js/onenet.js');
var API_KEY = "eCQJZEKoyVqA5qV4ef3qTH2OZzo="
var app = getApp();

Page({
  data: {
    showModal: false,
    imgUrls: [
      '../../image/swiper1.jpg',
      '../../image/swiper1.jpg',
      '../../image/swiper1.jpg'
    ],
    room_name:"",
    input_name:"",
    id:0,
    redSwitchChecked:false,
    greenSwitchChecked:false,
    blueSwitchChecked:false,
    switchFlag:false,
    myintervalid:0,
  },
  onLoad: function (e) {
    var that = this;
    console.log("onloading......");
    console.log("id is ", e.id)
    that.setData({
      id:e.id
    })
    that.getDataPoints(e.id)
    that.data.myintervalid = setInterval(function () {
      that.onShow()
    }, 3000)

    //get storage data
    var name = 'room_name_' + e.id
    try {
      var value = wx.getStorageSync(name)
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
  onShow: function (e) {
    var that = this
    // var dat = onenet.getDeviceStatus(e.id);
    // if (dat)
    //   console.log("connect to cloud success!");
    // else
    //   console.log("connect to cloud error!");

    that.getDataPoints(that.data.id)
  },
  onHide: function () {
    // 页面隐藏
    clearInterval(this.data.myintervalid);
  },

  onUnload: function () {
    // 页面关闭
    clearInterval(this.data.myintervalid);
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
  btn_red_led_fun: function (e) {
    var that = this;
    if (false == e.detail.value)
    {
      console.log("ready to open red led!");
      onenet.sendCmd(that.data.id, "0")
      that.setData({
        redSwitchChecked: false,
        greenSwitchChecked: false,
        blueSwitchChecked: false
      })
    }else
    {
      console.log("ready to close red led!");
      onenet.sendCmd(that.data.id, "2")
      that.setData({
        redSwitchChecked: true,
        greenSwitchChecked: false,
        blueSwitchChecked: false,
        switchFlag:true
      })
    }
  },
  btn_green_led_fun: function (e) {
    var that = this;
    if (false == e.detail.value) {
      console.log("ready to open blue led!");
      onenet.sendCmd(that.data.id, "0")
      that.setData({
        redSwitchChecked: false,
        greenSwitchChecked: false,
        blueSwitchChecked: false
      })
    } else {
      console.log("ready to close blue led!");
      onenet.sendCmd(that.data.id, "3")
      that.setData({
        redSwitchChecked: false,
        greenSwitchChecked: true,
        blueSwitchChecked: false,
        switchFlag: true
      })
    }
  },
  btn_blue_led_fun: function (e) {
    var that = this;
    if (false == e.detail.value) {
      console.log("ready to open blue led!");
      onenet.sendCmd(that.data.id, "0")
      that.setData({
        redSwitchChecked: false,
        greenSwitchChecked: false,
        blueSwitchChecked: false
      })
    } else {
      console.log("ready to close blue led!");
      onenet.sendCmd(that.data.id, "4")
      that.setData({
        redSwitchChecked: false,
        greenSwitchChecked: false,
        blueSwitchChecked: true,
        switchFlag: true
      })
    }
  },
//显示遮罩

//设置房间
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
    var that = this
    that.hideModal();
    that.setData({
      room_name: that.data.input_name
    })
    var name = 'room_name_' + that.data.id
    try {
      wx.setStorageSync(name, that.data.input_name)
    } catch (e) {
      // Do something when catch error
      console.log("setStorageSync error!")
    }
     console.log("success")
  },

  // LED控制
  switchChange: function (e) {
    console.log(e.detail.value)
  },

  //onenet interfce
  getDataPoints: function (id) {
    var that = this
    var deviceConnected
    var color_value = 0
    //查看设备连接状态，并刷新按钮状态
    wx.request({
      url: "http://api.heclouds.com/devices/" + id + "/datapoints?datastream_id=color",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "api-key": API_KEY
      },
      data: {

      },
      success(res) {
        console.log(res)
        deviceConnected = true

        if (that.data.switchFlag != true)
        {
          color_value = res.data.data.datastreams[0].datapoints[0].value
          switch (parseInt(color_value)) {
            case 1:
              that.setData({
                redSwitchChecked: false,
                greenSwitchChecked: false,
                blueSwitchChecked: false
              })
              break;
            case 2:
              that.setData({
                redSwitchChecked: true,
                greenSwitchChecked: false,
                blueSwitchChecked: false
              })
              break;
            case 3:
              that.setData({
                redSwitchChecked: false,
                greenSwitchChecked: true,
                blueSwitchChecked: false
              })
              break;
            case 4:
              that.setData({
                redSwitchChecked: false,
                greenSwitchChecked: false,
                blueSwitchChecked: true
              })
              console.log("color_value is ", color_value)
              console.log("blueSwitchChecked is ", that.data.blueSwitchChecked)
              break;
          }
          console.log("color_value is ", color_value)
        }else{
          that.setData({
            switchFlag:false
          })
        }
      },
      fail(res) {
        console.log("请求失败")
        deviceConnected = false
      }
    })
  },

})