// pages/me/me.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onUserTap(){
    Dialog.alert({
      selector: '#van-dialog',
      message: '派多宝当前为beta版本 v1.0.0',
      theme: 'round-button',
    }).then(() => {
      
    });
  },
  
  onOrderTap(){
    Dialog.alert({
      selector: '#description-pi',
      title: '小程序简介',
      message: '派多宝是一个聚集了多个有趣的小功能为一身的敏捷式应用程序，立志于将无厘头发挥到最大极致，更多好玩的功能站长正在奋力开发中...',
      theme: 'round-button',
    }).then(() => {
      
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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