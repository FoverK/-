// pages/music/music.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'',
    imgUrl:'',
    name:'',
    progress:0,
    pauseStatus: true,
    currentPosition:0,
    listShow:false,
    pauseStatus: true,
    timer: '',
    duration: 0, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //this.audioCtx = wx.createAudioContext('myAudio');
    this.getOneMusic();
  },

  onShow: function() {
  
  },

  onHide: function () {
 
  },

  getOneMusic: function() {
    var that = this
    app.ajax.post('/music/getOne', {}, function(res) {
      that.setData({
        music: res.data,
        src:res.data.src,
        imgUrl:res.data.imgUrl,
        name:res.data.name,
      })
      console.log(res.data);
      console.log(that.data.music.name);
    })
   
  },

  bindTapPlay: function () {
    console.log('bindTapPlay')
    console.log(this.data.pauseStatus)
    if (this.data.pauseStatus === true) {
      this.play()
      this.setData({ pauseStatus: false })
    } else {
      wx.pauseBackgroundAudio()
      this.setData({ pauseStatus: true })
    }
  },

  play() {
    wx.playBackgroundAudio({
      dataUrl: src,
      title: name,
      coverImgUrl: imgUrl
    })
  },

  setDuration(that) {
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log(res)
        let { status, duration, currentPosition } = res
        if (status === 1 || status === 0) {
          that.setData({
            currentPosition: that.stotime(currentPosition),
            duration: that.stotime(duration),
            sliderValue: Math.floor(currentPosition * 100 / duration),
          })
        }
      }
    })
  },

  stotime: function (s) {
    let t = '';
    if (s > -1) {
      // let hour = Math.floor(s / 3600);
      let min = Math.floor(s / 60) % 60;
      let sec = s % 60;
      // if (hour < 10) {
      //   t = '0' + hour + ":";
      // } else {
      //   t = hour + ":";
      // }

      if (min < 10) { t += "0"; }
      t += min + ":";
      if (sec < 10) { t += "0"; }
      t += sec;
    }
    return t;
  },

  bindSliderchange: function (e) {
    // clearInterval(this.data.timer)
    let value = e.detail.value
    let that = this
    console.log(e.detail.value)
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log(res)
        let { status, duration } = res
        if (status === 1 || status === 0) {
          that.setData({
            sliderValue: value
          })
          wx.seekBackgroundAudio({
            position: value * duration / 100,
          })
        }
      }
    })
  },

  bindTapPrev: function () {
    this.getOneMusic();
    this.setData({
      src: '',
      imgUrl: '',
      name: '',
      progress: 0,
      pauseStatus: true,
      currentPosition: 0,
      listShow: false,
      pauseStatus: true,
      timer: '',
      duration: 0, 
    })
  },

  bindTapNext: function () {
    this.getOneMusic();
    this.setData({
      src: '',
      imgUrl: '',
      name: '',
      progress: 0,
      pauseStatus: true,
      currentPosition: 0,
      listShow: false,
      pauseStatus: true,
      timer: '',
      duration: 0,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  audioPlay() {
    console.log('bindTapPlay');
    console.log(this.data.pauseStatus)
    if (this.data.pauseStatus === true) {
      this.play()
      this.setData({ pauseStatus: false })
    } else {
      wx.pauseBackgroundAudio()
      this.setData({ pauseStatus: true })
    }
    //this.audioCtx.play()
  },

  play:function(){
    var that = this;
    wx.playBackgroundAudio({
      dataUrl: that.data.src,
      title: that.data.name,
      coverImgUrl: that.data.imgUrl
    })
  },

  audioPause() {
    this.audioCtx.pause()
  },
  audio14() {
    this.audioCtx.seek(14)
  },
  audioStart() {
    this.audioCtx.seek(0)
  }
})