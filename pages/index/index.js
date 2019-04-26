//index.js
//获取应用实例
const wxCharts = require('../../third/wxcharts-min.js')
const app = getApp()
const date = new Date()
let columnChart = null

Page({
  data: {
    start: `${date.getFullYear()}-01`,
    end: '2099-12',
    startMonth: `${date.getFullYear()}-01`,
    endMonth: `${date.getFullYear()}-12`
  },
  bindStartChange(e) {
    this.setData({
      start: e.detail.value
    })
  },
  bindEndChange(e) {
    this.setData({
      end: e.detail.value
    })
  },
  onLoad: function() {
    let windowWidth = 320
    try {
      const res = wx.getSystemInfoSync()
      windowWidth = res.windowWidth
      console.log('windowWidth', windowWidth)
    } catch (e) {
      console.error('getSystemInfoSync failed!')
    }

    wx.request({
      url: 'https://www.freeworldl.club/market/getSaleAnalysisBar',
      // data: {
      //   startMonth: '',
      //   endMonth: ''
      // },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        const response = res.data || {}
        const data = response.data || []
        console.log('res.data', data)

        const categories = data.map(item => item.x)
        const series = [{ name: '销售额', data: [] }]
        series[0].data = data.map(item => item.y)
        console.log('categories', categories)
        console.log('series', series)

        columnChart = new wxCharts({
          canvasId: 'columnCanvas',
          type: 'column',
          categories,
          series,
          yAxis: {
            min: 0
          },
          width: windowWidth,
          height: 200
        })
      }
    })
  }
})
