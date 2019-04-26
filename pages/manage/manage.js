//manage.js
//获取应用实例
const app = getApp()
const expectTotal = [2000, 4500]

Page({
  data: {
    list: []
  },
  onLoad: function () {
    wx.request({
      url: 'https://www.freeworldl.club/market/getSaleTableInfo',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        const response = res.data || {}
        const data = response.data || []
        console.log('res.data', data)

        this.setData({
          list: data
        })
      }
    })
  }
})
