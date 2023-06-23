var t = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/regenerator")), e = require("../../@babel/runtime/helpers/asyncToGenerator"), a = getApp(), n = null;

Page({
    data: {
        pageIsLoad: !1,
        shareTitle: "",
        shareImage: "",
        timeline_share_id: 0,
        siteroot: "",
        index_type: "chat",
        content: null,
        token: ""
    },
    onLoad: function(t) {
        var e = this;
        t.sid && wx.setStorageSync("sid", t.sid), this.getWxappInfo().then(function() {
            a.util.checkLogin().then(function(t) {
                "chat" == e.data.index_type && (wx.showLoading({
                    title: "加载中"
                }), e.setData({
                    siteroot: a.globalData.siteroot,
                    token: wx.getStorageSync("token")
                })), e.setData({
                    pageIsLoad: !0
                });
            });
        });
    },
    webOnload: function() {
        wx.hideLoading();
    },
    getAd: function() {
        var t = this;
        a.util.request({
            url: "/wxapp/getIndexAd",
            loading: !1
        }).then(function(e) {
            t.setData({
                ad: e.data
            }), t.initInterAd();
        });
    },
    initInterAd: function() {
        var t = this.data.ad;
        if (!n && t.inter_is_open && t.inter_unit_id) {
            var e = new Date().getTime(), a = wx.getStorageSync("insertAdLastShow");
            a && e - a < 18e5 || wx.createInterstitialAd && (n = wx.createInterstitialAd({
                adUnitId: t.inter_unit_id
            })).onLoad(function() {
                wx.setStorageSync("insertAdLastShow", e), n.show();
            });
        }
    },
    getWxappInfo: function() {
        var t = this;
        return new Promise(function(e, n) {
            a.util.request({
                url: "/wxapp/getWxappInfo",
                loading: !1
            }).then(function(a) {
                var n = a.data.page_title;
                n && wx.setNavigationBarTitle({
                    title: n
                }), t.setData({
                    shareTitle: a.data.share_title,
                    shareImage: a.data.share_image,
                    index_type: a.data.index_type,
                    content: a.data.content ? JSON.parse(a.data.content) : ""
                }), e();
            });
        });
    },
    onShareAppMessage: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var n;
            return t.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, a.getShareId("wechat");

                  case 2:
                    return n = t.sent, t.abrupt("return", {
                        title: a.data.shareTitle,
                        imageUrl: a.data.shareImage,
                        path: "/pages/draw/chat?sid=" + n
                    });

                  case 4:
                  case "end":
                    return t.stop();
                }
            }, e);
        }))();
    },
    onShareTimeline: function() {
        var t = this.data.timeline_share_id;
        return t || this.getShareId("timeline"), {
            title: this.data.shareTitle,
            imageUrl: this.data.shareImage,
            query: "sid=" + t
        };
    },
    getShareId: function(n) {
        var r = this;
        return e(t.default.mark(function e() {
            var i;
            return t.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return i = 0, t.next = 3, a.util.request({
                        url: "/wxapp/doShare",
                        data: {
                            way: n
                        }
                    }).then(function(t) {
                        i = t.data.share_id, "timeline" == n && r.setData({
                            timeline_share_id: i
                        });
                    });

                  case 3:
                    return t.abrupt("return", i);

                  case 4:
                  case "end":
                    return t.stop();
                }
            }, e);
        }))();
    },
    onAddToFavorites: function() {
        return {
            title: this.data.shareTitle,
            imageUrl: this.data.shareImage
        };
    }
});