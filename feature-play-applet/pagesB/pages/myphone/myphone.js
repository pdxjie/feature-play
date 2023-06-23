Page({
    data: {
        mybrand: "",
        mymodel: "",
        mysystem: "",
        myscreen: "",
        mypixelRatio: "",
        mylanguage: "",
        myplatform: "",
        mywifi: "",
        myversion: ""
    },
    onLoad: function(e) {},
    onReady: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(n) {
                console.log(n), console.log(n.batteryLevel), 1 == n.wifiEnabled ? e.setData({
                    mywifi: "WIFI"
                }) : e.setData({
                    mywifi: "4G/5G"
                }), e.setData({
                    mybrand: n.brand,
                    mymodel: n.model,
                    mysystem: n.system,
                    myscreen: n.screenWidth + " X " + n.screenHeight,
                    mypixelRatio: n.pixelRatio,
                    mylanguage: n.language,
                    myplatform: n.platform,
                    myversion: n.version
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});