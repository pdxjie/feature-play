// pages/sick/sick.js
import { BASE_URL } from "../../../utils/constant"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newAsks:[],
    mostWatcheds:[],
    loading:false,
    searchSicks:[],
    keywords:''
  },

  onChange(e){
    console.log(e);
    this.setData({
      keywords:e.detail
    })
  },
  onSearch(){
    wx.request({
      url: BASE_URL + '/sick/search?keywords=' + this.data.keywords,
      method: 'GET',
      success: res => {
        this.setData({
          searchSicks:res.data.sickSearchBeans
        })
      }
    })
  },
  getTheNews(){
    this.setData({
      loading:true
    })
    wx.request({
      url: BASE_URL + '/sick/new/ask',
      method: 'GET',
      success: res => {
        this.setData({
          newAsks:res.data.askBeanDtos,
          mostWatcheds:res.data.mostWatcheds
        })
      }
    })
    this.setData({
      loading:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getTheNews();
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
