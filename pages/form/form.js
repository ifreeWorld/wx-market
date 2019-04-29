//form.js
//获取应用实例
const baseUrl = require('../../utils/util.js').baseUrl
const app = getApp()
const now = getNowFormatDate()

function getNowFormatDate() {
  var date = new Date()
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
}

Page({
  data: {
    key: 0,
    date: now,
    collector: '',
    collectorError: false,
    cash: '',
    cashError: false,
    wechat: '',
    wechatError: false,
    alipay: '',
    alipayError: false
  },
  confirm: function() {
    if (
      this.data.collector === '' ||
      this.data.cash === '' ||
      this.data.wechat === '' ||
      this.data.alipay === ''
    ) {
      wx.showModal({
        content: '请正确填写',
        showCancel: false
      })
      return
    }
    const url = this.data.key
      ? `${baseUrl}/market/updateSaleTableInfo`
      : `${baseUrl}/market/addSaleTableInfo`
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        key: this.data.key,
        date: this.data.date,
        collector: this.data.collector,
        cash: this.data.cash,
        wechat: this.data.wechat,
        alipay: this.data.alipay,
        total:
          parseInt(this.data.collector) +
          parseInt(this.data.cash) +
          parseInt(this.data.wechat) +
          parseInt(this.data.alipay)
      },
      method: 'POST',
      success: res => {
        const response = res.data || {}
        const error = response.error
        if (error === 0) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
            success: () => {
              setTimeout(() => {
                wx.navigateBack()
              }, 2000)
            }
          })
        }
      }
    })
  },
  delete: function() {
    wx.showModal({
      title: '警告',
      content: '你确定要删除吗?',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        console.log(res)
        if (res.confirm) {
          wx.request({
            url: `${baseUrl}/market/deleteSaleTableInfo`,
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              key: this.data.key
            },
            method: 'POST',
            success: res => {
              const response = res.data || {}
              const error = response.error
              if (error === 0) {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000,
                  success: () => {
                    setTimeout(() => {
                      wx.navigateBack()
                    }, 2000)
                  }
                })
              }
            }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindCollectorChange: function(e) {
    const value = e.detail.value
    if (this.validate(value)) {
      this.setData({
        collector: value,
        collectorError: false
      })
    } else {
      this.setData({
        collector: value,
        collectorError: true
      })
    }
  },
  bindCashChange: function(e) {
    const value = e.detail.value
    if (this.validate(value)) {
      this.setData({
        cash: value,
        cashError: false
      })
    } else {
      this.setData({
        cash: value,
        cashError: true
      })
    }
  },
  bindWechatChange: function(e) {
    const value = e.detail.value
    if (this.validate(value)) {
      this.setData({
        wechat: value,
        wechatError: false
      })
    } else {
      this.setData({
        wechat: value,
        wechatError: true
      })
    }
  },
  bindAlipayChange: function(e) {
    const value = e.detail.value
    if (this.validate(value)) {
      this.setData({
        alipay: value,
        alipayError: false
      })
    } else {
      this.setData({
        alipay: value,
        alipayError: true
      })
    }
  },
  validate: function(val) {
    return val >= 0 ? true : false
  },
  onLoad: function(option) {
    // 编辑
    if (option.key) {
      this.setData({
        key: option.key,
        date: option.date,
        collector: option.collector,
        cash: option.cash,
        wechat: option.wechat,
        alipay: option.alipay
      })
    }
  }
})
