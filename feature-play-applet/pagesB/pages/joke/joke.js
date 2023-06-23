
Page({
  data: {
    jok:{},
    css:"null",
    cssbutton:"buttonnumm",
    flag:0,
  },
  randomNum:function (minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
  },
  temp:function(res){
    this.setData({
      css:'concent',
      cssbutton:'button',
      jok:res,
     })
  },
  need:function(){
    var that = this
    wx.request({
    url: "https://v.juhe.cn/joke/randJoke.php",  
    data:{
      'key':'229e83303a1c5dab5e8344086617375c',
    },
    method:'GET',
    timeout:2000,
    header:{'Content-Type':'application/x-www-form-urlencoded'},
    success: function(res){
      // console.log(res)
      that.data.flag=0
      that.temp(res.data.result)
    },
    fail: function() {
      wx.showToast({
        title: '加载失败,请检查网络', // 标题
        icon: 'none',  // 图标类型，默认success
        duration: 1500  // 提示窗停留时间，默认1500ms
      })
    },
    complete: function() {
    }
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.need();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
  }
})
