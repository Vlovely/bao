// pages/input/input.js

var arr = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    nocart: false,
    sum: "",
    pay: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var sum = 0;
    var pay = 0;
    arr = wx.getStorageSync('cart')
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i].price * arr[i].times;
      pay += arr[i].times
    }
    if (arr.length > 0) {
      this.setData({
        nocart: true,
        arr: arr,
        sum: sum,
        pay: pay
      })
    } else {
      this.setData({
        nocart: false
      })
    }
    try {
      wx.setStorageSync("cart", arr)
    } catch (e) {
      console.log(e)
    }
  },
  plus: function (e) {
    var i = e.target.dataset.id;
    var sum = 0;
    var pay = 0;
    arr[i].times++;
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i].price * arr[i].times;
      pay += arr[i].times
    }
    this.setData({
      arr: arr,
      sum: sum,
      pay: pay
    })
    try {
      wx.setStorageSync("cart", arr)
    } catch (e) {
      console.log(e)
    }
  },
  minus: function (e) {
    var i = e.target.dataset.id;
    var sum = 0;
    var pay = 0;
    arr[i].times--;
    if (arr[i].times == 0) {
      arr[i].times = 1
    }
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i].price * arr[i].times;
      pay += arr[i].times
    }
    this.setData({
      arr: arr,
      sum: sum,
      pay: pay
    })
    try {
      wx.setStorageSync("cart", arr)
    } catch (e) {
      console.log(e)
    }
  },
  del:function(e){
      var i = e.target.dataset.id;
      var sum = 0;
      var pay = 0;
      arr.splice(i,1)
      for (var i = 0; i < arr.length; i++) {
        sum += arr[i].price * arr[i].times;
        pay += arr[i].times
      }
      this.setData({
        arr: arr,
        sum: sum,
        pay: pay
      })
      try {
        wx.setStorageSync("cart", arr)
      } catch (e) {
        console.log(e)
      }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})
