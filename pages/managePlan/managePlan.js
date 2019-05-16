var app = getApp();
var common = require("../../utils/common.js");
var date = new Date();
var Y = date.getFullYear();
var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1);
var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
Page({
        data: {
                plan_item: '',
                date: common.getDate(),
                selectedDate: common.getDate(),
        },
        //获取当天计划
        onShow: function() {
                var that = this
                var date = that.data.date
                wx.getUserInfo({
                        success: res => {
                                app.ajax.post('/plan/get', {
                                        nickName: res.userInfo.nickName,
                                        date: date,
                                }, function (res) {
                                        that.setData({
                                                plan_item: res.data,
                                        })
                                        console.log(that.data.plan_item)
                                        console.log(date)
                                        console.log(res.data);

                                })
                        }
                })
        },
        //选择日期
        bindDateChange: function (e) {
                var that = this
                that.setData({
                        selectedDate: e.detail.value
                })
        },
        //下拉刷新页面，获取不同时间的计划
        onPullDownRefresh:function(){
                var that = this
                var date = that.data.selectedDate
                wx.getUserInfo({
                        success: res => {
                                app.ajax.post('/plan/get', {
                                        nickName: res.userInfo.nickName,
                                        date: date,
                                }, function (res) {
                                        that.setData({
                                                plan_item: res.data,
                                        })
                                        console.log(that.data.plan_item)
                                        console.log(date)
                                        console.log(res.data);

                                })
                        }
                })
        },
        //删除计划
        deletePlan:function(e){
                var that = this
                wx.getUserInfo({
                        success: res => {
                                app.ajax.post('/plan/delete', {
                                        id: e.target.dataset.id
                                }, function (res) {
                                        console.log(res.data);
                                        that.onShow()
                                })
                        }
                })
        }
})