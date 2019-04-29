//manage.js
//获取应用实例
const app = getApp()
const baseUrl = require('../../utils/util.js').baseUrl
const expectTotal = [2000, 4500]

Page({
  data: {
    list: []
  },
  add: function() {
    wx.navigateTo({
      url: '/pages/form/form'
    })
  },
  onShow: function() {
    wx.request({
      url: `${baseUrl}/market/getSaleTableInfo`,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        const response = res.data || {}
        const data = response.data || []
        console.log('res.data', data)

        data.sort((a, b) => a.date < b.date ? 1 : -1)
        this.setData({
          list: data
        })
      }
    })
  }
})
