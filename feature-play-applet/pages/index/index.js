Page({
  data: {
    foodList: [],
    hideNotice: false,
    notice: '',
    year:'',
    yearScale:0,
    month:'',
    monthScale:0,
    day:'',
    dayScale:0,
    time:'',
    timeScale:0
  },
  loadData(){
    wx.cloud.callContainer({
      "config": {
        "env": "prod-5gabo70rc418ca8a"
      },
      "path": "/main/count/down",
      "header": {
        "X-WX-SERVICE": "benefit-play",
        "content-type": "application/json"
      },
      "method": "GET",
      "data": ""
    }).then(res=>{
      this.setData({
        year:(res.data.countDown.month),
        yearScale:(res.data.countDown.monthScale).toFixed(0),
        month:res.data.countDown.day,
        monthScale:(res.data.countDown.dayScale).toFixed(0),
        day:res.data.countDown.week,
        dayScale:(res.data.countDown.weekScale).toFixed(0),
        time:res.data.countDown.time,
        timeScale:(res.data.countDown.timeScale).toFixed(0)
      })
    })
  },

  // 点击关闭公告
  switchNotice: function () {
    this.setData({
      hideNotice: true
    })
  },
  onLoad: function () {
    this.loadData()
    var that = this;
    var data = {
      "datas": [{
          "id": 1,
          "imgurl": "../../static/h1.png"
        },
        {
          "id": 2,
          "imgurl": "../../static/h1.png"
        },
        {
          "id": 3,
          "imgurl": "../../static/h1.png"
        }
      ]
    };
    that.setData({
      lunboData: data.datas
    })
  },
  goab: function () {
    wx.navigateTo({
      url: '../../pagesB/pages/blood/blood'
    })

  },
  gocs: function () {
    wx.navigateTo({
      url: '../../pagesB/pages/networkSpeed/networkSpeed'
    })

  },
  gosm: function () {
    wx.navigateTo({
      url: '../../pagesB/pages/blind/blind'
    })

  },


  alicopy: function (e) {
    wx.setClipboardData ? wx.setClipboardData({
      data: e.currentTarget.dataset.ali,
      success: function (e) {
        wx.showToast({
          title: "复制成功，请前往微信粘贴搜一搜",
          icon: "none",
          duration: 4e3
        });
      }
    }) : wx.showModal({
      title: "提示",
      content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
    });
  },
  goip: function () {
    wx.navigateTo({
      url: '../../pagesB/pages/clock/clock'
    })
  },
  fanyi: function () {
    wx.navigateTo({
      url: '../../pagesC/pages/index/index'
    })
  },
  b4: function () {
    wx.navigateTo({
      url: '../../taskOuter/pages/util/share/share'
    })
  },
  b2: function () {
    wx.navigateTo({
      url: '../../taskOuter/pages/util/material/poster'
    })
  },
  b3: function () {
    wx.navigateTo({
      url: '../../taskOuter/pages/util/material/avatar'
    })
  },
  go2: function () {
    wx.navigateTo({
      url: '../../pages/vipvideo/vipvideo'
    })
  },
  go1: function () {
    wx.navigateTo({
      url: '../../pages/video/index'
    })
  },
  goDog: function () {
    wx.navigateTo({
      url: '../../pagesA/pages/dogArticle/dogArticle'
    })
  },
  goMenu: function () {
    wx.navigateTo({
      url: '../../pagesA/pages/menu/menu'
    })
  },
  goSick: function () {
    wx.navigateTo({
      url: '../../pagesA/pages/sick/sick'
    })
  },
  gosjs: function () {
    wx.navigateTo({
      url: '../../pagesB/pages/randomNum/randomNum'
    })
  },
  go22: function () {
    wx.navigateTo({
      url: '../../pages/dm/newDanMu'
    })
  },
  go9: function () {
    wx.navigateTo({
      url: '../../pages/choujiang/choujiang'
    })
  },
  go21: function () {
    wx.navigateTo({
      url: '../../pagesB/pages/tax/tax'
    })
  },
  go24: function () {
    wx.navigateTo({
      url: '../../pages/ruler/ruler'
    })
  },
  go25: function () {
    wx.navigateTo({
      url: '../../pages/navigator/jiashuiyin/waterMarkSet/waterMarkSet'
    })
  },
  goCoins: function () {
    wx.navigateTo({
      url: '../../pagesA/pages/coins/coins'
    })
  },
  goqs: function () {
    wx.navigateTo({
      url: '../../pagesB/pages/quse/index'
    })
  },
  go27: function () {
    wx.navigateTo({
      url: '../../pagesA/pages/mm/mm'
    })
  },
  go28: function () {
    wx.navigateTo({
      url: '../../pagesA/pages/protractor/protractor'
    })
  },
  go29: function () {
    wx.navigateTo({
      url: '../../pagesA/pages/time/time'
    })
  },
  go23: function () {
    wx.navigateTo({
      url: '../../pages/time/time'
    })
  },
  gotouxiang: function () {
    wx.navigateTo({
      url: '../../pagesB/pages/hottouxiang/index'
    })
  },
  go5: function () {
    wx.navigateTo({
      url: '../../pages/numToCase/numToCase'
    })
  },
  go6: function () {
    wx.navigateTo({
      url: '../../pages/figure/figure'
    })
  },
  go8: function () {
    wx.navigateTo({
      url: '../../pages/color/color'
    })
  },
  go7: function () {
    wx.navigateTo({
      url: '../../pages/counter/counter'
    })
  },
  go3: function () {
    wx.navigateTo({
      url: '../../pagesA/pages/imagepress/imagepress'
    })
  },
  go10: function () {
    wx.navigateTo({
      url: '../../pages/myphone/myphone'
    })
  },
  tothree: function () {
    wx.navigateTo({
      url: '../../components/text/text'
    })
  },
  tofour: function () {
    wx.navigateTo({
      url: '../../components/picture/picture'
    })
  },
  tofive: function () {
    wx.navigateTo({
      url: '../../pages/video/index'
    })
  },
  tosix: function () {
    wx.navigateTo({
      url: '../../pages/vipvideo/vipvideo'
    })
  },
  totool: function () {
    wx.navigateTo({
      url: '../../components/search_tool/search_tool'
    })
  },
  tu1: function () {
    wx.navigateTo({
      url: '../../pages/jietus/album/index'
    })
  },
  tu2: function () {
    wx.navigateTo({
      url: '../../pages/navigator/heart/heart'
    })
  },
  tu3: function () {
    wx.navigateTo({
      url: '../../pages/navigator/pintu/pintu/pintu'
    })
  },
  tu4: function () {
    wx.navigateTo({
      url: '../../pages/navigator/pintu/cut/cut'
    })
  },
  tu6: function () {
    wx.navigateTo({
      url: '../../pages/navigator/combine/combine'
    })
  },
  tu88: function () {
    wx.navigateTo({
      url: '../../pagesA/pages/geshi/index'
    })
  },

  // 新增tools

  goMn:function(){
    wx.navigateTo({
      url: '../../pagesA/pages/mnld/mnld'
    })
  },
  goTS:function(){
    wx.navigateTo({
      url: '../../pages/color/color'
    })
  },
  goMyPhone:function(){
    wx.navigateTo({
      url: '../../pagesB/pages/myphone/myphone'
    })
  },
  
  goJoke:function(){
    wx.navigateTo({
      url: '../../pagesB/pages/joke/joke'
    })
  },
  goDanMu:function(){
    wx.navigateTo({
      url: '../../pages/dm/newDanMu'
    })
  },
  goRule:function(){
    wx.navigateTo({
      url: '../../pages/ruler/ruler'
    })
  },
  goDH:function(){
    wx.navigateTo({
      url: '../../pagesA/pages/dh/dh'
    })
  },
  goYX:function(){
    wx.navigateTo({
      url: '../../pagesA/pages/24/24'
    })
  },
  go2048:function(){
    wx.navigateTo({
      url: '../../pagesA/pages/2048/2048'
    })
  },
  goSZ:function(){
    wx.navigateTo({
      url: '../../pagesB/pages/zsz/zsz'
    })
  },
  onShareAppMessage: function () {
    return {
      title: "给你推荐一个微信便捷工具箱，干嘛嘛方便~",
      path: ""
    };
  },
  onShareTimeline: function () {
    return {
      title: "给你推荐一个微信便捷工具箱，干嘛嘛方便~"
    };
  }
})