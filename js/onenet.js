
var API_KEY = "eCQJZEKoyVqA5qV4ef3qTH2OZzo="

function getDeviceStatus(device_id) {
  var deviceConnected
  //查看设备连接状态，并刷新按钮状态
  wx.request({
    url: "https://api.heclouds.com/devices/" + device_id,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      "api-key": API_KEY
    },
    data: {

    },
    success(res) {
      console.log(res)
      if (res.data.data.online) {
        console.log("设备已经连接")
        deviceConnected = true
        return true
      } else {
        console.log("设备还未连接")
        deviceConnected = false
        return false
      }
    },
    fail(res) {
      console.log("请求失败")
      deviceConnected = false
      return false
    }
  })
}

function sendCmd(id, data)
{
  var deviceConnected
  //查看设备连接状态，并刷新按钮状态
  wx.request({
    url: ("https://api.heclouds.com/cmds?device_id="+id),
    header: {
      'content-type': 'application/json',
      "api-key": API_KEY
    },
    data: data,
    method: 'POST',
    success(res) {
      console.log(res)
      // if (res.data.data.online) {
      //   console.log("设备已经连接")
      //   deviceConnected = true
      // } else {
      //   console.log("设备还未连接")
      //   deviceConnected = false
      // }
    },
    fail(res) {
      console.log("请求失败")
      deviceConnected = false
    },
    complete() {
      if (deviceConnected) {
        console.log("complete ok")
        return true
      } else {
        console.log("complete error")
        return false
      }
    }
  })
}

function getDataPoints(id) {
  var deviceConnected
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
      // if (res.data.data.online) {
      //   console.log("设备已经连接")
      //   deviceConnected = true
      // } else {
      //   console.log("设备还未连接")
      //   deviceConnected = false
      // }
    },
    fail(res) {
      console.log("请求失败")
      deviceConnected = false
    },
    complete() {
      if (deviceConnected) {
        console.log("complete ok")
        return true
      } else {
        console.log("complete error")
        return false
      }
    }
  })
}

module.exports = {
  getDeviceStatus,
  sendCmd,
  getDataPoints
} 