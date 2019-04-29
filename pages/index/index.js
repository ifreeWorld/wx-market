//index.js
//获取应用实例
const baseUrl = require('../../utils/util.js').baseUrl
const wxCharts = require('../../third/wxcharts-min.js')
const app = getApp()
const date = new Date()
let columnChart = null

Page({
  data: {
    windowWidth: 320,
    start: `${date.getFullYear()}-01`,
    end: '2100-01',
    startMonth: `${date.getFullYear()}-01`,
    endMonth: `${date.getFullYear()}-12`,
    total: 0,
    average: 0
  },
  bindStartChange(e) {
    this.setData({
      startMonth: e.detail.value
    })
    this.initBar()
  },
  bindEndChange(e) {
    this.setData({
      endMonth: e.detail.value
    })
    this.initBar()
  },
  initBar() {
    wx.request({
      url: `${baseUrl}/market/getSaleAnalysisBar`,
      data: {
        startMonth: this.data.startMonth,
        endMonth: this.data.endMonth
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
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
          width: this.data.windowWidth,
          height: 200
        })
      }
    })
  },
  initCard() {
    wx.request({
      url: `${baseUrl}/market/getSaleAnalysisCard`,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        const response = res.data || {}
        const data = response.data || []
        console.log('res.data', data)

        this.setData({
          average: parseInt(data.average),
          total: parseInt(data.total)
        })
      }
    })
  },
  onLoad: function() {
    try {
      const res = wx.getSystemInfoSync()
      this.setData({
        windowWidth: res.windowWidth
      })
      console.log('windowWidth', res.windowWidth)
    } catch (e) {
      console.error('getSystemInfoSync failed!')
    }
    this.initCard()
    this.initBar()
  }
})
