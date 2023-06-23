Page({
    data: {
        touzigeshu: 5,
        liebiao: []
    },
    shu: function(t) {
        var e = t.target.id;
        console.log(e), this.setData({
            touzigeshu: e
        });
    },
    queding: function() {
        wx.redirectTo({
            url: "/pagesB/pages/zsz/zsz"
        });
    },
    jia: function() {
        console.log("tap");
        var t = this.data.touzigeshu + 1;
        t > 6 && (t = 6), this.setData({
            touzigeshu: t
        });
    },
    jian: function() {
        console.log("tap");
        var t = this.data.touzigeshu - 1;
        t < 1 && (t = 1), this.setData({
            touzigeshu: t
        });
    },
    bangding: function(t) {
        var e = t.currentTarget.dataset;
        console.log(e), console.log(e.bean.title), wx.navigateToMiniProgram({
            appId: e.bean.uid,
            path: e.bean.dizhi,
            extraData: {
                foo: "bar"
            },
            envVersion: "release",
            success: function() {}
        });
    },
    onLoad: function() {
        var t = wx.getStorageSync("touzigeshu");
        t && this.setData({
            touzigeshu: t
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        wx.setStorageSync("touzigeshu", this.data.touzigeshu);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "喝酒神器摇骰子",
            path: "/pagesB/pages/zsz/zsz",
        };
    }
});