var t = getApp();

Page({
    data: {
        siteroot: "",
        lists: [],
        message: "",
        page: 1,
        pagesize: 10,
        scrollTop: 0,
        inputShow: !0
    },
    onLoad: function(a) {
        var s = this;
        a.sid && wx.setStorageSync("sid", a.sid), this.setData({
            system: t.globalData.system,
            siteroot: t.globalData.siteroot.replace("/api.php", "")
        }), t.util.checkLogin().then(function() {
            s.getHistoryMsg();
        });
    },
    submitDraw: function() {
        var a = this, s = this.trim(this.data.message);
        if (!s) return t.util.message("请输入要求和场景描述"), void this.setData({
            message: ""
        });
        this.setData({
            message: ""
        }), this.scrollToBottom(), t.util.request({
            url: "/draw/draw",
            data: {
                message: s
            }
        }).then(function(t) {
            var e = a.data.lists;
            e.push({
                state: 0,
                draw_id: t.data.draw_id,
                message: s
            }), a.setData({
                lists: e
            }), a.startLoopResult(t.data.draw_id), setTimeout(function() {
                a.scrollToBottom();
            }, 500);
        }).catch(function(a) {
            -1 !== a.message.indexOf("请充值") && t.util.message(a.message, "error", function() {
                wx.navigateTo({
                    url: "/pages/pay/draw"
                });
            });
        });
    },
    sendConfirm: function() {
        var t = this;
        setTimeout(function() {
            t.submitDraw();
        }, 50);
    },
    startLoopResult: function(a) {
        var s = this, e = setInterval(function() {
            t.util.request({
                url: "/draw/getDrawResult",
                data: {
                    draw_id: a
                },
                loading: !1
            }).then(function(t) {
                var i = s.data.lists;
                i.forEach(function(r, o) {
                    if (r.draw_id == a) {
                        var n = t.data.state;
                        i[o].state = n, 0 != n && (clearInterval(e), 1 == n ? i[o].response = t.data.images : 2 == n && (i[o].errmsg = t.data.message), 
                        s.setData({
                            lists: i
                        }), setTimeout(function() {
                            s.scrollToBottom();
                        }, 300));
                    }
                });
            });
        }, 5e3);
    },
    retryDraw: function(a) {
        var s = this, e = a.detail;
        t.util.request({
            url: "/draw/draw",
            data: {
                draw_id: e
            }
        }).then(function(t) {
            var a = s.data.lists;
            a.forEach(function(t, i) {
                t.draw_id == e && (a[i].state = 0, a[i].errmsg = "", a[i].response = "", s.startLoopResult(e));
            }), s.setData({
                lists: a
            });
        });
    },
    getHistoryMsg: function() {
        var a = this;
        t.util.request({
            url: "/draw/getHistoryMsg",
            data: {
                page: this.data.page,
                pagesize: this.data.pagesize
            }
        }).then(function(t) {
            if (t.data.length > 0) {
                var s = t.data;
                a.setData({
                    lists: s
                }), s.forEach(function(t, s) {
                    0 == t.state && a.startLoopResult(t.draw_id);
                });
            }
            setTimeout(function() {
                a.scrollToBottom();
            }, 500);
        });
    },
    scrollToBottom: function() {
        var t = this;
        setTimeout(function() {
            var a = wx.createSelectorQuery().in(t);
            a.select(".list").boundingClientRect(function(a) {
                t.setData({
                    scrollTop: parseInt(a.height)
                });
            }), a.exec(function(t) {});
        }, 100);
    },
    copyText: function(t) {
        var a = t.currentTarget.dataset.index, s = this.data.lists[a].message;
        wx.setClipboardData({
            data: s
        });
    },
    previewImage: function(t) {
        var a = t.detail, s = [];
        this.data.lists.forEach(function(t, a) {
            1 == t.state && t.response.forEach(function(t, a) {
                s.push(t);
            });
        }), wx.previewImage({
            urls: s,
            current: a
        });
    },
    trim: function(t) {
        return t ? t.replace(/(^\s*)|(\s*$)/g, "") : "";
    },
    toEdit: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            message: this.data.lists[a].message
        });
    }
});