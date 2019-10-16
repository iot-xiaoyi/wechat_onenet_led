var API_KEY = "eCQJZEKoyVqA5qV4ef3qTH2OZzo="

function getAllDeviceStatus(e) {
  var deviceConnected
  //查看设备连接状态，并刷新按钮状态
  wx.request({
    url: "https://api.heclouds.com/devices",
    header: {
      "api-key": API_KEY
    },
    data: {

    },
    success(res) {
      console.log(res)
      if (res.data.data.online) {
        console.log("设备已经连接")
        deviceConnected = true
      } else {
        console.log("设备还未连接")
        deviceConnected = false
      }
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
      } else {
        console.log("设备还未连接")
        deviceConnected = false
      }
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

function sendCmd(e)
{
  var deviceConnected
  //查看设备连接状态，并刷新按钮状态
  wx.request({
    url: "https://api.heclouds.com/cmds?device_id=532808382",
    header: {
      'content-type': 'application/json',
      "api-key": API_KEY
    },
    data: {
      "data":1
    },
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

function getDataPoints(e) {
  var deviceConnected
  //查看设备连接状态，并刷新按钮状态
  wx.request({
    url: "http://api.heclouds.com/devices/532808382/datapoints?datastream_id=color&start=2019-09-01T00:00:00&limit=100",
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
  getAllDeviceStatus,
  getDeviceStatus,
  sendCmd,
  getDataPoints
} 