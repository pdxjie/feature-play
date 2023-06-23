function e(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    a = new Date().valueOf(), void 0 == n.load && (n.load = !0), void 0 == n.loadmsg && (n.loadmsg = "加载中..."), 
    n.load && wx.showLoading({
        title: n.loadmsg,
        mask: !0
    }), o(e, t, n);
}

function o(e, o, t) {
    void 0 == t.data && (t.data = {}), wx.request({
        url: n.Server + o,
        data: t.data,
        method: e,
        header: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        success: function(e) {
            t.load && wx.hideLoading();
            var o = e.data;
            0 == o.apiCode ? t.success && t.success(o) : t.error ? t.error(o) : wx.showToast({
                title: o.apiMessage,
                icon: "none",
                duration: 2e3
            });
        },
        fail: function(e) {
            t.load && wx.hideLoading(), t.fail && t.fail(e);
        },
        complete: function(e) {
            t.complete && t.complete(e.data), console.log("请求接口：" + o + "，耗时：" + (new Date().valueOf() - a) + "ms");
        }
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("wcache.js"), n = require("config.js"), a = void 0;

exports.GET = function(o, t) {
    e("GET", o, t);
}, exports.POST = function(o, t) {
    e("POST", o, t);
}, exports.INLOGIN = function(e) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    a = new Date().valueOf(), wx.login({
        success: function(a) {
            o("POST", e, {
                data: {
                    code: a.code
                },
                success: function(e) {
                    t.put("zhuci_access_token", e.data.access_token, e.data.expires_in - 20), n.success && n.success(e.data);
                },
                error: function(e) {
                    n.error ? n.error(e) : wx.showToast({
                        title: e.msg,
                        icon: "none"
                    });
                },
                complete: function(e) {
                    function o(o) {
                        return e.apply(this, arguments);
                    }
                    return o.toString = function() {
                        return e.toString();
                    }, o;
                }(function(e) {
                    n.complete && n.error(complete);
                })
            });
        }
    });
};