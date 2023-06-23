// pages/02-23/demo1/newDanMu.js
Page({

  /**
   * Page initial data
   */
  data: {
    inputText: '',
    text: '请输入弹幕内容~',

    sliderValOfFontSize:90,
    fontSize: 300,
    fontColor:'white',
    backgroundColor:'black',

    animateTime:10,
    sliderValOfAnimateTime:90,

    currentTab: 0,
    textMoveAnimate:null,
    colorArr:[
      { color: 'pink' },
      { color: "red" },
      { color: "blue" },
      { color: "yellow" },
      { color: "white" },
      { color: "aqua" },
      { color: "green" },
      { color: "skyblue" },
      { color: "hotpink" },
      { color: "black" }
    ]
  },
  //改变背景颜色
  setBackGroundColor(e){
    console.log(e.target.dataset.index);
    let index = e.target.dataset.index;

    let that = this;
    let selectColor = that.data.colorArr[index].color;
    that.setData({
      backgroundColor: selectColor
    })
  },

  // 选择弹幕的字体颜色
  setColor(e){
    // console.log(e.target.dataset.index);
    let index = e.target.dataset.index;
    
    let that = this;
    let selectColor = that.data.colorArr[index].color;
    that.setData({
      fontColor:selectColor
    })
  },
  //改变弹幕滚动速度
  changeTextSpeend(e){
    console.log(e.detail.value);
    let sliderVal = e.detail.value;
    let that = this;
    //50 默认 10s
    //0 是 15s
    //100 是 5s
    that.setData({
      animateTime: sliderVal * -0.1 + 15,
      sliderValOfAnimateTime: sliderVal
    })
  },

  // 改变字号
  changeFontSize(e){
    //获取滑竿的值
    console.log(e.detail.value);
    let sliderVal = e.detail.value;
    let that = this;
    //运算边界值
    //50 对应 300rpx 的字号
    //0 对应 150rpx
    //100 对应 450rpx

    that.setData({
      fontSize: sliderVal * 3 + 150,
      sliderValOfFontSize: sliderVal
    })

  },


  // input失去焦点时获取输入的文字
  inputBlur(e) {
    let that = this;
    let inputVal = e.detail.value;
    // console.log(inputVal);
    that.setData({
      inputText: inputVal
    })
  },

  sendBtn() {
    let that = this;
    if (that.data.inputText){
            that.setData({
              text: that.data.inputText
            })
  
        wx.showModal({
          title: f.data.data,
          icon: "none",
          duration: 800
      }); 
    
      }
    if (that.data.inputText == '') {
      wx: wx.showToast({
        title: '不能为空哦',
        duration: 2000
      })
    }
    
  },


  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    // console.log(e.detail.current);
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    
  },

 
  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareTimeline: function(res){
    let img = this.data.path_image+this.data.shop.shop_img  //取得是称
    console.log(img)
    return {
      title: '有料工具箱上线啦~' , //字符串  自定义标题
      query: '有料工具箱',  //页面携带参数
      imageUrl: "https://jinjinyl.cn/ylapi/fx.jpg"   //图片地址
    }
  },
onShareAppMessage: function() {
    return {
        path: "/pages/navigator/index/index",
        title: "有料工具箱上线啦~",
        desc: "",
        imageUrl: "https://jinjinyl.cn/ylapi/fx.jpg"
    };
}
})