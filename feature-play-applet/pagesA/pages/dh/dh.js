getApp();

Page({
    data: {
        swiperHeight: "",
        scrollLeft: 0,
        navigation: [ "紧急电话", "投诉电话", "党政电话", "快递电话", "银行电话", "保险电话", "大学电话", "企业电话", "通信电话", "航空电话" ],
        selectedTitle: "0"
    },
    phoneCall: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.replyPhone
        });
    },
    bindtap: function(e) {
        this.setData({
            selectedTitle: e.currentTarget.id
        });
    },
    bindChange: function(e) {
        var t = this;
        wx.createSelectorQuery().select(".nav-item-" + e.detail.current).boundingClientRect(function(n) {
            wx.getSystemInfo({
                success: function(c) {
                    wx.createSelectorQuery().select(".nav-scroll").scrollOffset(function(i) {
                        t.setData({
                            scrollLeft: i.scrollLeft + n.width / 2 + n.left - c.windowWidth / 2,
                            selectedTitle: e.detail.current
                        });
                    }).exec();
                }
            });
        }).exec(), wx.pageScrollTo && wx.pageScrollTo({
            scrollTop: 0
        });
    },
    showinte:function(){
      var that = this;
      let InterstitialAd;
      if (that.data.appConfig.ad.wxinter) {
        if (wx.createInterstitialAd) {
          InterstitialAd = wx.createInterstitialAd({
            adUnitId: that.data.appConfig.ad.wxinter
          })
          InterstitialAd.onLoad(() => {})
          InterstitialAd.offClose();
          InterstitialAd.offError();
          InterstitialAd.onError((err) => {})
          InterstitialAd.onClose(() => {})
        }
        // 在适合的场景显示插屏广告
        if (InterstitialAd) {
          if (that.data.appConfig.ad.insetgp == 1) {
            that.inadset = setInterval(() => {
              InterstitialAd.show().catch((err) => {
                console.error(err)
              })
            }, that.data.appConfig.ad.wxinsettime*1000)
          } else {
            setTimeout(() => {
              InterstitialAd.show().catch((err) => {
                console.error(err)
              })
            },  that.data.appConfig.ad.wxinsettime*1000)
          }
        }
      } 
    },
    onLoad: function (a) {
      var o = this;
        if(wx.getStorageSync("adlist")){
            o.setData({
              appConfig: wx.getStorageSync("adlist")
            })
            o.showinte();
          }else{
        getApp().showADlist().then(function() {
            var f= wx.getStorageSync("adlist");
            o.setData({
              appConfig: f
          })
          o.showinte();
        
      }) 
    };
    },
    onReady: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    swiperHeight: t.windowHeight * t.pixelRatio - 30
                });
            }
        });
    }
});