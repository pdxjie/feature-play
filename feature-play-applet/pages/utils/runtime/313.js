require("../../@babel/runtime/helpers/Arrayincludes"), require("./Arrayincludes.js");

var n = function(n) {
    return (n = n.toString())[1] ? n : "0" + n;
}, t = function(n, t) {
    var r = t.x - n.x, e = t.y - n.y;
    return Math.sqrt(r * r + e * e);
};

module.exports = {
    formatTime: function(t) {
        var r = t.getFullYear(), e = t.getMonth() + 1, o = t.getDate(), u = t.getHours(), i = t.getMinutes(), a = t.getSeconds();
        return [ r, e, o ].map(n).join("/") + " " + [ u, i, a ].map(n).join(":");
    },
    simplifyUrl: function(n) {
        for (var t = [ ".jpg_", ".png_", ".gif_" ], r = 0; r < t.length; r++) {
            var e = t[r];
            if (n.includes(e)) return n.substring(0, n.lastIndexOf("_"));
        }
        return n;
    },
    getDistance: t,
    getCenter: function(n) {
        var t = n.length;
        if (1 === t) return {
            x: Math.round(n[0].x),
            y: Math.round(n[0].y)
        };
        for (var r = 0, e = 0, o = 0; o < t; o++) r += n[o].x, e += n[o].y;
        return {
            x: Math.round(r / t),
            y: Math.round(e / t)
        };
    },
    getScale: function(n, r) {
        return (t(r[0], r[1]) - t(n[0], n[1])) / t(n[0], n[1]);
    },
    pointInPoly: function(n, t) {
        for (var r = !1, e = -1, o = t.length, u = o - 1; ++e < o; u = e) (t[e].y <= n.y && n.y < t[u].y || t[u].y <= n.y && n.y < t[e].y) && n.x < (t[u].x - t[e].x) * (n.y - t[e].y) / (t[u].y - t[e].y) + t[e].x && (r = !r);
        return r;
    },
    outsideBound: function(n, t, r, e, o, u) {
        var i = r >= 0 ? 0 : o + r - 0 <= n ? 0 + n - o : r, a = e >= 0 ? 0 : u + e - 0 <= t ? 0 + t - u : e;
        return {
            imgLeft: Math.round(i),
            imgTop: Math.round(a)
        };
    },
    shortNum: function(n) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
        return Math.round(n * t) / t;
    },
    isDotInLine: function(n, t, r) {
        var e = Math.sqrt((n.x - t.x) * (n.x - t.x) + (n.y - t.y) * (n.y - t.y));
        return Math.sqrt((n.x - r.x) * (n.x - r.x) + (n.y - r.y) * (n.y - r.y)) + Math.sqrt((t.x - r.x) * (t.x - r.x) + (t.y - r.y) * (t.y - r.y)) - e < 4;
    },
    computePolygonArea: function(n) {
        var t = n.length;
        if (t < 3) return 0;
        for (var r = n[0].y * (n[t - 1].x - n[1].x), e = 1; e < t; ++e) r += n[e].y * (n[e - 1].x - n[(e + 1) % t].x);
        return r / 2;
    },
    canMoveLine: function(n, t, r, e) {
        if ("v" == t) {
            var o = 999999, u = 0;
            return n.forEach(function(n) {
                n.y > u && (u = n.y), n.y < o && (o = n.y);
            }), o < 0 || u > e ? 0 : u - o > .1 * e;
        }
        var i = 999999, a = 0;
        return n.forEach(function(n) {
            n.x > a && (a = n.x), n.x < i && (i = n.x);
        }), i < 0 || a > r ? 0 : a - i > .1 * r;
    },
    polygonToPoints: function(n, t, r, e, o) {
        var u = "polygon(".length, i = n.length - 1, a = n.substring(u, i).split(","), c = [];
        return a.forEach(function(n, u) {
            var i = n.trim().split(" "), a = i[0].replace("%", "");
            a = Math.round(a / 100 * t) + e;
            var s = i[1].replace("%", "");
            s = Math.round(s / 100 * r) + o, c.push({
                x: a,
                y: s
            });
        }), c;
    },
    pointsToPolygon: function(n, t, r, e, o) {
        var u = "polygon(";
        return n.forEach(function(i, a) {
            var c = i.x - e, s = i.y - o, l = Math.round(c / t * 100 * 100) / 100, y = Math.round(s / r * 100 * 100) / 100;
            u += l + "% " + y + "%", a < n.length - 1 && (u += ", ");
        }), u += ")";
    },
    clipPathToPoints: function(n, t, r, e, o) {
        var u = "polygon(".length, i = n.length - 1, a = n.substring(u, i).split(","), c = [];
        return a.forEach(function(n, t) {
            var r = n.trim().split(" "), u = r[0].replace("px", "");
            u = Number(u) + e;
            var i = r[1].replace("px", "");
            i = Number(i) + o, c.push({
                x: u,
                y: i
            });
        }), c;
    },
    saveToLocal: function(n) {
        var t = n;
        wx.saveImageToPhotosAlbum({
            filePath: t,
            success: function(n) {
                wx.showToast({
                    title: "已保存到相册"
                }), wx.navigateTo({
                    url: "/pages/result/result?src=" + t
                });
            },
            fail: function(n) {
                n.errMsg.includes("cancel") || wx.showModal({
                    title: "保存失败",
                    content: "你禁用了【保存到相册】权限，需要重新授权。是否去设置？",
                    cancelText: "迟点再说",
                    confirmText: "现在设置",
                    success: function(n) {
                        n.confirm && wx.openSetting({
                            success: function(n) {}
                        });
                    }
                });
            },
            complete: function(n) {
                wx.hideLoading();
            }
        });
    }
};