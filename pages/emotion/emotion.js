// pages/emotion/emotion.js
const API_URL = 'https://c.y.qq.com'
var common = require("../../utils/common.js");
const app = getApp();

Page({
  data: {
    src: "../../images/sun.png",
    msg: "你在的地方一定是晴天吧",
    music: {},
    emotion_value: 100,
    imgUrls1: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1093500769,4046965096&fm=200&gp=0.jpg',

    imgUrls2: 'http://img3.imgtn.bdimg.com/it/u=3449317484,1628858579&fm=15&gp=0.jpg',

    imgUrls3: 'http://img0.imgtn.bdimg.com/it/u=3691619425,2165126769&fm=200&gp=0.jpg',

    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    time:'',
  },

  onLoad:function(){
    this.setData({
      time: common.getDate()
    })
    app.globalData.time = this.data.time;
    this.getData();
  },

  getDairyList: function () {
    wx.navigateTo({
      url: '/pages/showArticle/showArticle',
    })
  },

  getMusicList: function() {
    wx.navigateTo({
      url: '/pages/music/music',
    })
  },

  getWishList: function() {
    wx.navigateTo({
      url: '/pages/wishWall/wishWall',
    })
  },

  //获取数据
  getData: function () {
    var that = this
    wx.getUserInfo({
      success: res => {
        app.ajax.post('/sentiment/get', {
          nickName: res.userInfo.nickName,
          time: app.globalData.time
        }, function (result) {
          that.setData({
            sentiment: result.data.sentiment
          })
          console.log(result);
          let emotion_value = 0;
          let sentiment = that.data.sentiment;
          console.log("sentiment:" + sentiment.length);

          for(let i = 0;i < sentiment.length;++i){
            emotion_value += sentiment[i];
            console.log("sentiment[]:" + sentiment[i]);
          }
          emotion_value /= 7;
          if(emotion_value == 0){
             emotion_value = 100;
          }
          
          that.setData({
            emotion_value: emotion_value,
          })
        })
      }
    })
  },
})