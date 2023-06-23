// pages/menu/menu.js
import BASE_URL from '../../../utils/constant'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommends:[],
    loading:false,
    menus:[],
    searchVal:''
  },

  onChange(e){
    this.setData({
      searchVal:e.detail
    })
  },
  onSearch(){
    wx.request({
      url: '',
    })


    wx.cloud.callContainer({
      "config": {
        "env": "prod-5gabo70rc418ca8a"
      },
      "path": "/menu/search?keywords="+this.data.searchVal,
      "header": {
        "X-WX-SERVICE": "benefit-play",
        "content-type": "application/json"
      },
      "method": "GET",
      "data": ""
    }).then(res=>{
      this.setData({
        menus: res.data.searchMenus
      })
    })
  },
  getRecommends(){
    this.setData({
      loading:true
    })
    wx.cloud.callContainer({
      "config": {
        "env": "prod-5gabo70rc418ca8a"
      },
      "path": "/menu/recommend",
      "header": {
        "X-WX-SERVICE": "benefit-play",
        "content-type": "application/json"
      },
      "method": "GET",
      "data": ""
    }).then(res=>{
      this.setData({
        recommends:res.data.recommends
      })
    })
    this.setData({
      loading:false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getRecommends();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})