// pages/dogArticle/dogArticle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords:'',
    content:''
  },

  getValue(e){
    this.setData({
      keywords:e.detail.value
    })
  },
  generatorArticle(){
    console.log();
    wx.request({
      url: 'https://api.vore.top/api/Bullshit?subject='+this.data.keywords,
      success:res=>{
        this.setData({
          content:res.data.data.text,
        })
        wx.showToast({
          title: res.data.data.info,
        })
      }
    })
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