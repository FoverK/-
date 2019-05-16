// pages/detailArticle/detailArticle.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    time: '',
    title: '',
    content: '0',
    sentiment: '',
    photo: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    this.setData({
      id: options.id,
      time: options.time,
      title: options.title,
      content: options.content,
      sentiment: options.sentiment,
      photo: options.photo,
    })

  },


  updateDiary: function() {
    let id = this.data.id;

    wx.redirectTo({
      url: '../updateArticle/updateArticle?id=' + id
    })
  },

  deleteDiary: function() {
    var that = this;
    let id = this.data.id;
    console.log("id:" + id);

    app.ajax.post('/diary/delete', {
      id: id,
    }, function(res) {
      console.log(res.data);
      wx.navigateBack();
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})