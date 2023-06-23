Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.safeEncode = exports.decode = exports.encode = exports.saveLog = exports.buildTask = exports.completeTask = exports.interstitial_ad = exports.news_banner_ad = exports.detail_banner_ad = void 0;

var t = require("ajax.js"), e = t.ajax, a = t.appId, r = (t.serverUrl, t.ajax_without_loading), o = require("md5.js").md5, n = getApp();

exports.detail_banner_ad = "adunit-625a2f2664575e38";

exports.news_banner_ad = "adunit-625a2f2664575e38";

exports.interstitial_ad = "adunit-af7837e830ae9773";

exports.completeTask = function() {
    var t = n.globalData.current_task, a = Date.now(), r = null != arguments[0] ? arguments[0] : function() {
        console.log("任务同步结束");
    };
    console.log("outer任务同步结束"), console.log(n.globalData);
    var d = o(t.channel + t.userId + t.taskId + a + "23slja!af#").toLowerCase();
    e({
        url: "https://api.dianxiao.feedadx.com/dianxiao/mp/task/complete",
        method: "POST",
        data: {
            extra: n.globalData.extra,
            channel: t.channel,
            userId: t.userId,
            taskId: t.taskId,
            timestamp: a,
            sign: d
        }
    }).then(function(e) {
        0 === e.data.code && (t.syncTask = !0), r(e.data);
    }).catch(function(e) {
        t.syncTask = !1, r(e);
    });
};

exports.buildTask = function(t) {
    var e = JSON.parse(s(decodeURIComponent(t))), a = e.taskInfo;
    return n.globalData.ori_task_info = a, a.userId = e.userId, a.channel = e.channel, 
    a.taskAttribute = JSON.parse(a.taskAttribute), a.taskAttribute.duration = null == a.taskAttribute.duration ? 60 : a.taskAttribute.duration, 
    a.taskAttribute.adSlot && (a.taskAttribute.adSlot.interval = null == a.taskAttribute.adSlot.interval ? 2 : a.taskAttribute.adSlot.interval), 
    a.syncTask = null, a.clickedCount = 0, a.hideSeconds = 0, a.hideTime = !1, a.timestamp = Date.now(), 
    n.globalData.current_task = a, a;
};

exports.saveLog = function(t, e, o, n, d) {
    r({
        url: "https://api.bless.feedadx.com/user/task/saveLog",
        method: "POST",
        header: {
            appId: a,
            openId: t
        },
        data: {
            unionId: e,
            param: o,
            response: n,
            type: d
        }
    });
};

var d = function(t) {
    return i.encode(t);
};

exports.encode = d;

var s = function(t) {
    return i.decode(t);
};

exports.decode = s;

exports.safeEncode = function(t) {
    return d(t).replace(/[\+=\/]/g, function(t) {
        switch (t) {
          case "+":
            return ".";

          case "=":
            return "-";

          case "/":
            return "_";
        }
    });
};

var i = new function() {
    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    this.encode = function(a) {
        var r, o, n, d, s, i, c, u = "", l = 0;
        for (a = e(a); l < a.length; ) d = (r = a.charCodeAt(l++)) >> 2, s = (3 & r) << 4 | (o = a.charCodeAt(l++)) >> 4, 
        i = (15 & o) << 2 | (n = a.charCodeAt(l++)) >> 6, c = 63 & n, isNaN(o) ? i = c = 64 : isNaN(n) && (c = 64), 
        u = u + t.charAt(d) + t.charAt(s) + t.charAt(i) + t.charAt(c);
        return u;
    }, this.decode = function(e) {
        var r, o, n, d, s, i, c = "", u = 0;
        for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); u < e.length; ) r = t.indexOf(e.charAt(u++)) << 2 | (d = t.indexOf(e.charAt(u++))) >> 4, 
        o = (15 & d) << 4 | (s = t.indexOf(e.charAt(u++))) >> 2, n = (3 & s) << 6 | (i = t.indexOf(e.charAt(u++))), 
        c += String.fromCharCode(r), 64 != s && (c += String.fromCharCode(o)), 64 != i && (c += String.fromCharCode(n));
        return c = a(c);
    };
    var e = function(t) {
        t = t.replace(/\r\n/g, "\n");
        for (var e = "", a = 0; a < t.length; a++) {
            var r = t.charCodeAt(a);
            r < 128 ? e += String.fromCharCode(r) : r > 127 && r < 2048 ? (e += String.fromCharCode(r >> 6 | 192), 
            e += String.fromCharCode(63 & r | 128)) : (e += String.fromCharCode(r >> 12 | 224), 
            e += String.fromCharCode(r >> 6 & 63 | 128), e += String.fromCharCode(63 & r | 128));
        }
        return e;
    }, a = function(t) {
        for (var e = "", a = 0, r = 0, o = 0, n = 0; a < t.length; ) (r = t.charCodeAt(a)) < 128 ? (e += String.fromCharCode(r), 
        a++) : r > 191 && r < 224 ? (o = t.charCodeAt(a + 1), e += String.fromCharCode((31 & r) << 6 | 63 & o), 
        a += 2) : (o = t.charCodeAt(a + 1), n = t.charCodeAt(a + 2), e += String.fromCharCode((15 & r) << 12 | (63 & o) << 6 | 63 & n), 
        a += 3);
        return e;
    };
}();