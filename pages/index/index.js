//index.js
//获取应用实例
const wxCharts = require('../../third/wxcharts-min.js')
const app = getApp()
const date = new Date()
const years = []
const months = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}
let columnChart = null

Page({
  data: {
    years,
    year: date.getFullYear(),
    months,
    month: 2,
    value: [9999, 1],
  },
  bindChange(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]]
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
      url: 'https://www.freeworldl.club/market/getSaleAnalysisBar', // 仅为示例，并非真实的接口地址
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
