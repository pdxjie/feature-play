var t, e = require("./interopRequireDefault")(require("../../@babel/runtime/helpers/typeof")),
    n = "function" == typeof Symbol && "symbol" == (0,
        e.default)(Symbol.iterator) ? function (t) {
        return (0, e.default)(t);
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : (0,
            e.default)(t);
    };

t = function () {
    function t(t) {
        for (var e = [], n = arguments.length - 1; n-- > 0;) e[n] = arguments[n + 1];
        u.forEach(function (n, o) {
            void 0 !== e[o] && (t[n] = e[o]);
        });
    }

    function e() {
        return a || (a = wx.getSystemInfoSync()), a;
    }

    function o(t, e) {
        return t(e = {
            exports: {}
        }, e.exports), e.exports;
    }

    function r(t) {
        return function (e) {
            for (var n = [], o = arguments.length - 1; o-- > 0;) n[o] = arguments[o + 1];
            return void 0 === e && (e = {}), new Promise(function (o, r) {
                e.success = function (t) {
                    o(t);
                }, e.fail = function (t) {
                    r(t);
                }, t.apply(void 0, [e].concat(n));
            });
        };
    }

    function i(t, e) {
        return void 0 === e && (e = !1), new Promise(function (n) {
            t.draw(e, n);
        });
    }

    function c(t) {
        var e = "";
        if ("string" == typeof t) e = t;
        else
            for (var n = 0; n < t.length; n++) e += String.fromCharCode(t[n]);
        return y.encode(e);
    }
    var a = void 0,
        u = ["touchstarted", "touchmoved", "touchended"],
        d = {},
        l = {
            id: {
                default: "cropper",
                get: function () {
                    return d.id;
                },
                set: function (t) {
                    "string" != typeof t && console.error("id：" + t + " is invalid"), d.id = t;
                }
            },
            width: {
                default: 750,
                get: function () {
                    return d.width;
                },
                set: function (t) {
                    "number" != typeof t && console.error("width：" + t + " is invalid"), d.width = t;
                }
            },
            height: {
                default: 750,
                get: function () {
                    return d.height;
                },
                set: function (t) {
                    "number" != typeof t && console.error("height：" + t + " is invalid"), d.height = t;
                }
            },
            pixelRatio: {
                default: e().pixelRatio,
                get: function () {
                    return d.pixelRatio;
                },
                set: function (t) {
                    "number" != typeof t && console.error("pixelRatio：" + t + " is invalid"), d.pixelRatio = t;
                }
            },
            scale: {
                default: 2.5,
                get: function () {
                    return d.scale;
                },
                set: function (t) {
                    "number" != typeof t && console.error("scale：" + t + " is invalid"), d.scale = t;
                }
            },
            zoom: {
                default: 5,
                get: function () {
                    return d.zoom;
                },
                set: function (t) {
                    "number" != typeof t ? console.error("zoom：" + t + " is invalid") : (t < 0 || t > 10) && console.error("zoom should be ranged in 0 ~ 10"),
                        d.zoom = t;
                }
            },
            src: {
                default: "",
                get: function () {
                    return d.src;
                },
                set: function (t) {
                    "string" != typeof t && console.error("src：" + t + " is invalid"), d.src = t;
                }
            },
            cut: {
                default: {},
                get: function () {
                    return d.cut;
                },
                set: function (t) {
                    "object" !== (void 0 === t ? "undefined" : n(t)) && console.error("cut：" + t + " is invalid"),
                        d.cut = t;
                }
            },
            boundStyle: {
                default: {},
                get: function () {
                    return d.boundStyle;
                },
                set: function (t) {
                    "object" !== (void 0 === t ? "undefined" : n(t)) && console.error("boundStyle：" + t + " is invalid"),
                        d.boundStyle = t;
                }
            },
            tagIcon: {
                default: {},
                get: function () {
                    return d.tagIcon;
                },
                set: function (t) {
                    "object" !== (void 0 === t ? "undefined" : n(t)) && console.error("tagIcon" + t + " is invalid"),
                        d.tagIcon = t;
                }
            },
            onReady: {
                default: null,
                get: function () {
                    return d.ready;
                },
                set: function (t) {
                    d.ready = t;
                }
            },
            onBeforeImageLoad: {
                default: null,
                get: function () {
                    return d.beforeImageLoad;
                },
                set: function (t) {
                    d.beforeImageLoad = t;
                }
            },
            onImageLoad: {
                default: null,
                get: function () {
                    return d.imageLoad;
                },
                set: function (t) {
                    d.imageLoad = t;
                }
            },
            onBeforeDraw: {
                default: null,
                get: function () {
                    return d.beforeDraw;
                },
                set: function (t) {
                    d.beforeDraw = t;
                }
            }
        },
        f = e().windowWidth,
        s = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
        h = o(function (t, e) {
            e.isStr = function (t) {
                return "string" == typeof t;
            }, e.isNum = function (t) {
                return "number" == typeof t;
            }, e.isArr = Array.isArray, e.isUndef = function (t) {
                return void 0 === t;
            }, e.isTrue = function (t) {
                return !0 === t;
            }, e.isFalse = function (t) {
                return !1 === t;
            }, e.isFunc = function (t) {
                return "function" == typeof t;
            }, e.isObj = e.isObject = function (t) {
                return null !== t && "object" === (void 0 === t ? "undefined" : n(t));
            };
            var o = Object.prototype.toString;
            e.isPlainObject = function (t) {
                return "[object Object]" === o.call(t);
            };
            var r = Object.prototype.hasOwnProperty;
            e.hasOwn = function (t, e) {
                return r.call(t, e);
            }, e.noop = function (t, e, n) {}, e.isValidArrayIndex = function (t) {
                var e = parseFloat(String(t));
                return e >= 0 && Math.floor(e) === e && isFinite(t);
            };
        }),
        g = h.isFunc,
        p = h.isPlainObject,
        v = ["ready", "beforeImageLoad", "beforeDraw", "imageLoad"],
        x = r(wx.getImageInfo),
        m = r(wx.canvasToTempFilePath),
        y = o(function (t, e) {
            ! function (o) {
                var r = e,
                    i = t && t.exports == r && t,
                    c = "object" == (void 0 === s ? "undefined" : n(s)) && s;
                c.global !== c && c.window !== c || (o = c);
                var a = function (t) {
                    this.message = t;
                };
                (a.prototype = new Error()).name = "InvalidCharacterError";
                var u = function (t) {
                        throw new a(t);
                    },
                    d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                    l = /[\t\n\f\r ]/g,
                    f = {
                        encode: function (t) {
                            t = String(t), /[^\0-\xFF]/.test(t) && u("The string to be encoded contains characters outside of the Latin1 range.");
                            for (var e, n = t.length % 3, o = "", r = -1, i = t.length - n; ++r < i;) e = (t.charCodeAt(r) << 16) + (t.charCodeAt(++r) << 8) + t.charCodeAt(++r),
                                o += d.charAt(e >> 18 & 63) + d.charAt(e >> 12 & 63) + d.charAt(e >> 6 & 63) + d.charAt(63 & e);
                            return 2 == n ? (e = (t.charCodeAt(r) << 8) + t.charCodeAt(++r), o += d.charAt(e >> 10) + d.charAt(e >> 4 & 63) + d.charAt(e << 2 & 63) + "=") : 1 == n && (e = t.charCodeAt(r),
                                o += d.charAt(e >> 2) + d.charAt(e << 4 & 63) + "=="), o;
                        },
                        decode: function (t) {
                            var e = (t = String(t).replace(l, "")).length;
                            e % 4 == 0 && (e = (t = t.replace(/==?$/, "")).length), (e % 4 == 1 || /[^+a-zA-Z0-9\/]/.test(t)) && u("Invalid character: the string to be decoded is not correctly encoded.");
                            for (var n, o, r = 0, i = "", c = -1; ++c < e;) o = d.indexOf(t.charAt(c)), n = r % 4 ? 64 * n + o : o,
                                r++ % 4 && (i += String.fromCharCode(255 & n >> (-2 * r & 6)));
                            return i;
                        },
                        version: "0.1.0"
                    };
                if (r && !r.nodeType)
                    if (i) i.exports = f;
                    else
                        for (var h in f) f.hasOwnProperty(h) && (r[h] = f[h]);
                else o.base64 = f;
            }(s);
        }),
        b = function (t, e) {
            return void 0 === t && (t = {}), void 0 === e && (e = function () {}),
                function (t, e, n, o, r, i, a) {
                    void 0 === a && (a = function () {}), void 0 === i && (i = "png"), i = function (t) {
                        return "image/" + (t = t.toLowerCase().replace(/jpg/i, "jpeg")).match(/png|jpeg|bmp|gif/)[0];
                    }(i), /bmp/.test(i) ? function (t, e, n, o, r, i) {
                        wx.canvasGetImageData({
                            canvasId: t,
                            x: e,
                            y: n,
                            width: o,
                            height: r,
                            success: function (t) {
                                i(t, null);
                            },
                            fail: function (t) {
                                i(null, t);
                            }
                        });
                    }(t, e, n, o, r, function (t, e) {
                        var n = function (t) {
                            var e = t.width,
                                n = t.height,
                                o = e * n * 3,
                                r = o + 54,
                                i = [66, 77, 255 & r, r >> 8 & 255, r >> 16 & 255, r >> 24 & 255, 0, 0, 0, 0, 54, 0, 0, 0],
                                a = [40, 0, 0, 0, 255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255, 255 & n, n >> 8 & 255, n >> 16 & 255, n >> 24 & 255, 1, 0, 24, 0, 0, 0, 0, 0, 255 & o, o >> 8 & 255, o >> 16 & 255, o >> 24 & 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                u = (4 - 3 * e % 4) % 4,
                                d = t.data,
                                l = "",
                                f = e << 2,
                                s = n,
                                h = String.fromCharCode;
                            do {
                                for (var g = f * (s - 1), p = "", v = 0; v < e; v++) {
                                    var x = v << 2;
                                    p += h(d[g + x + 2]) + h(d[g + x + 1]) + h(d[g + x]);
                                }
                                for (var m = 0; m < u; m++) p += String.fromCharCode(0);
                                l += p;
                            } while (--s);
                            return c(i.concat(a)) + c(l);
                        }(t);
                        g(a) && a(function (t, e) {
                            return "data:" + e + ";base64," + t;
                        }(n, "image/" + i), e);
                    }) : console.error("暂不支持生成'" + i + "'类型的base64图片");
                }(t.canvasId, t.x, t.y, t.width, t.height, "bmp", e);
        },
        w = {
            touchStart: function (e) {
                var n = this,
                    o = e.touches,
                    r = o[0],
                    i = o[1];
                n.src && (t(n, !0, null, null), n.__oneTouchStart(r), e.touches.length >= 2 && n.__twoTouchStart(r, i));
            },
            touchMove: function (e) {
                var n = this,
                    o = e.touches,
                    r = o[0],
                    i = o[1];
                n.src && (t(n, null, !0), 1 === e.touches.length && n.__oneTouchMove(r), e.touches.length >= 2 && n.__twoTouchMove(r, i));
            },
            touchEnd: function (e) {
                var n = this;
                n.src && (t(n, !1, !1, !0), n.__xtouchEnd());
            }
        },
        T = function (t) {
            var e = this,
                n = {};
            return function (t, e) {
                    Object.defineProperties(t, e);
                }(e, l), Object.keys(l).forEach(function (t) {
                    n[t] = l[t].default;
                }), Object.assign(e, n, t), e.prepare(), e.attachPage(), e.createCtx(), e.observer(),
                e.cutt(), e.methods(), e.init(), e.update(), e;
        };
    return T.prototype.init = function () {
        var e = this,
            n = e.src;
        return e.version = "1.3.9", "function" == typeof e.onReady && e.onReady(e.ctx, e),
            n ? e.pushOrign(n) : e.updateCanvas(), t(e, !1, !1, !1), e.oldScale = 1, e.newScale = 1,
            e;
    }, Object.assign(T.prototype, w), T.prototype.prepare = function () {
        var t = this;
        t.attachPage = function () {
            var e = getCurrentPages(),
                n = e[e.length - 1];
            Object.defineProperty(n, "wecropper", {
                get: function () {
                    return console.warn("Instance will not be automatically bound to the page after v1.4.0\n\nPlease use a custom instance name instead\n\nExample: \nthis.mycropper = new WeCropper(options)\n\n// ...\nthis.mycropper.getCropperImage()"),
                        t;
                },
                configurable: !0
            });
        }, t.createCtx = function () {
            var e = t.id,
                n = t.targetId;
            e ? (t.ctx = t.ctx || wx.createCanvasContext(e), t.targetCtx = t.targetCtx || wx.createCanvasContext(n)) : console.error("constructor: create canvas context failed, 'id' must be valuable");
        }, t.deviceRadio = f / 750;
    }, T.prototype.observer = function () {
        var t = this;
        t.on = function (e, n) {
            return v.indexOf(e) > -1 ? g(n) && ("ready" === e ? n(t) : t["on" + function (t) {
                return t.charAt(0).toUpperCase() + t.slice(1);
            }(e)] = n) : console.error("event: " + e + " is invalid"), t;
        };
    }, T.prototype.methods = function () {
        var t = this,
            n = t.width,
            o = t.height,
            r = t.id,
            c = t.targetId,
            a = t.pixelRatio,
            u = t.cut,
            d = u.x;
        void 0 === d && (d = 0);
        var l = u.y;
        void 0 === l && (l = 0);
        var f = u.width;
        void 0 === f && (f = n);
        var s = u.height;
        void 0 === s && (s = o), t.updateCanvas = function (e) {
            if (t.croperTarget && t.ctx.drawImage(t.croperTarget, t.imgLeft, t.imgTop, t.scaleWidth, t.scaleHeight),
                g(t.onBeforeDraw) && t.onBeforeDraw(t.ctx, t), t.setBoundStyle(t.boundStyle), t.croperIcon) {
                var n = t.iconWidth,
                    o = t.iconHeight,
                    r = t.iconColor,
                    i = t.iconBorder || 0;
                if (i >= 0) {
                    var c = t.iconLeft + n / 2,
                        a = t.iconTop + o / 2,
                        u = n / 2 + i;
                    t.ctx.beginPath(), t.ctx.arc(c, a, u, 0, 2 * Math.PI, !0), t.ctx.fillStyle = r,
                        t.ctx.fill();
                }
                var d = t.localImage || t.croperIcon;
                t.ctx.drawImage(d, t.iconLeft, t.iconTop, n, o);
            }
            return t.ctx.draw(!1, e), t;
        }, t.pushOrigin = t.pushOrign = function (e) {
            return t.src = e, g(t.onBeforeImageLoad) && t.onBeforeImageLoad(t.ctx, t), x({
                src: e
            }).then(function (e) {
                var n = e.width / e.height,
                    o = f / s,
                    r = e.path;
                return 0 != r.indexOf("wx") && 0 != r.indexOf("http") && 0 != r.indexOf("/") && (r = "/" + r),
                    t.croperTarget = r, n < o ? (t.rectX = d, t.baseWidth = f, t.baseHeight = f / n,
                        t.rectY = l - Math.abs((s - t.baseHeight) / 2)) : (t.rectY = l, t.baseWidth = s * n,
                        t.baseHeight = s, t.rectX = d - Math.abs((f - t.baseWidth) / 2)), t.imgLeft = t.rectX,
                    t.imgTop = t.rectY, t.scaleWidth = t.baseWidth, t.scaleHeight = t.baseHeight, t.update(),
                    new Promise(function (e) {
                        t.updateCanvas(e);
                    });
            }).then(function () {
                g(t.onImageLoad) && t.onImageLoad(t.ctx, t);
            });
        }, t.pushIcon = function (n, o) {
            t.tagIcon = n;
            var r = e().windowWidth / 750;
            return n.pict ? x({
                src: n.pict
            }).then(function (e) {
                return t.croperIcon = e.path, t.iconLeft = n.x * r, t.iconTop = n.y * r, t.iconWidth = n.width * r,
                    t.iconHeight = n.height * r, t.iconBorder = n.border * r, t.iconColor = n.color,
                    t.localImage = n.localImage, t.update(), new Promise(function (e) {
                        t.updateCanvas(e);
                    });
            }).then(function () {
                "function" == typeof o && o();
            }) : (t.croperIcon = "", t.update(), new Promise(function (e) {
                t.updateCanvas(e);
            }).then(function () {
                "function" == typeof o && o();
            }));
        }, t.updateBoundStyle = function (e) {
            var n = t.boundStyle;
            for (var o in e) n[o] = e[o];
            return t.boundStyle = n, t.update(), new Promise(function (e) {
                t.updateCanvas(e);
            });
        }, t.removeImage = function () {
            return t.src = "", t.croperTarget = "", i(t.ctx);
        }, t.getCropperBase64 = function (t) {
            void 0 === t && (t = function () {}), b({
                canvasId: r,
                x: d,
                y: l,
                width: f,
                height: s
            }, t);
        }, t.getCropperImage = function (e, n) {
            var o = e,
                u = {
                    canvasId: r,
                    x: d,
                    y: l,
                    width: f,
                    height: s
                },
                h = function () {
                    return Promise.resolve();
                };
            return p(o) && o.original && (h = function () {
                return t.targetCtx.drawImage(t.croperTarget, t.imgLeft * a, t.imgTop * a, t.scaleWidth * a, t.scaleHeight * a),
                    u = {
                        canvasId: c,
                        x: d * a,
                        y: l * a,
                        width: f * a,
                        height: s * a
                    }, i(t.targetCtx);
            }), h().then(function () {
                p(o) && (u = Object.assign({}, u, o)), g(o) && (n = o);
                var t = u.componentContext ? [u, u.componentContext] : [u];
                return m.apply(null, t);
            }).then(function (e) {
                var o = e.tempFilePath;
                return g(n) ? n.call(t, o, null) : o;
            }).catch(function (e) {
                if (!g(n)) throw e;
                n.call(t, null, e);
            });
        }, t.getCropperIconImage = function (e, n) {
            var o = e,
                u = {
                    canvasId: r,
                    x: d,
                    y: l,
                    width: f,
                    height: s
                },
                h = function () {
                    return Promise.resolve();
                };
            return p(o) && o.original && (h = function () {
                return t.targetCtx.drawImage(t.croperTarget, t.imgLeft * a, t.imgTop * a, t.scaleWidth * a, t.scaleHeight * a),
                    u = {
                        canvasId: c,
                        x: d * a,
                        y: l * a,
                        width: f * a,
                        height: s * a
                    }, i(t.targetCtx);
            }), h().then(function () {
                p(o) && (u = Object.assign({}, u, o)), g(o) && (n = o);
                var t = u.componentContext ? [u, u.componentContext] : [u];
                return m.apply(null, t);
            }).then(function (e) {
                var o = e.tempFilePath;
                return g(n) ? n.call(t, o, null) : o;
            }).catch(function (e) {
                if (!g(n)) throw e;
                n.call(t, null, e);
            });
        };
    }, T.prototype.cutt = function () {
        var t = this,
            e = t.width,
            n = t.height,
            o = t.cut,
            r = o.x;
        void 0 === r && (r = 0);
        var i = o.y;
        void 0 === i && (i = 0);
        var c = o.width;
        void 0 === c && (c = e);
        var a = o.height;
        void 0 === a && (a = n), t.outsideBound = function (e, n) {
            t.imgLeft = e >= r ? r : t.scaleWidth + e - r <= c ? r + c - t.scaleWidth : e, t.imgTop = n >= i ? i : t.scaleHeight + n - i <= a ? i + a - t.scaleHeight : n;
        }, t.setBoundStyle = function (o) {
            void 0 === o && (o = {});
            var u = o.color;
            void 0 === u && (u = "#04b00f");
            var d = o.mask;
            void 0 === d && (d = "rgba(0, 0, 0, 0.3)");
            var l = o.lineWidth;
            if (void 0 === l && (l = 1), null != o.circle && !1 !== o.circle ? (t.ctx.beginPath(),
                    t.ctx.setFillStyle(d), t.ctx.strokeStyle = "rgba(255, 255, 255, 0)", t.ctx.moveTo(0, 0),
                    t.ctx.lineTo(r + c / 2, 0), t.ctx.lineTo(r + c / 2, i), t.ctx.arcTo(r, i, r, i + a / 2, c / 2),
                    t.ctx.lineTo(0, r + c / 2), t.ctx.lineTo(0, 0), t.ctx.moveTo(2 * r + c, 0), t.ctx.lineTo(2 * r + c, i + a / 2),
                    t.ctx.lineTo(r + c, i + a / 2), t.ctx.arcTo(r + c, i, r + c / 2, i, c / 2), t.ctx.lineTo(r + c / 2, 0),
                    t.ctx.lineTo(2 * r + c, 0), t.ctx.moveTo(0, 2 * i + a), t.ctx.lineTo(0, i + a / 2),
                    t.ctx.lineTo(r, i + a / 2), t.ctx.arcTo(r, i + a, r + c / 2, i + a, c / 2), t.ctx.lineTo(r + c / 2, 2 * i + a),
                    t.ctx.lineTo(0, 2 * i + a), t.ctx.moveTo(2 * r + c, 2 * i + a), t.ctx.lineTo(2 * r + c, i + a / 2),
                    t.ctx.lineTo(r + c, i + a / 2), t.ctx.arcTo(r + c, i + a, r + c / 2, i + a, c / 2),
                    t.ctx.lineTo(r + c / 2, 2 * i + a), t.ctx.lineTo(2 * r + c, 2 * i + a), t.ctx.fill()) : (t.ctx.beginPath(),
                    t.ctx.setFillStyle(d), t.ctx.strokeStyle = "rgba(255, 255, 255, 0)", t.ctx.fillRect(0, 0, r, n),
                    t.ctx.fillRect(r, 0, c, i), t.ctx.fillRect(r, i + a, c, n - i - a), t.ctx.fillRect(r + c, 0, e - r - c, n),
                    t.ctx.fill()), t.sudokuLine) {
                var f = t.sudokuLineWidth,
                    s = (c - 2 * f) / 3,
                    h = f / 2;
                [{
                    start: {
                        x: r + s + h,
                        y: i
                    },
                    end: {
                        x: r + s + h,
                        y: i + c
                    }
                }, {
                    start: {
                        x: r + f + 2 * s + h,
                        y: i
                    },
                    end: {
                        x: r + f + 2 * s + h,
                        y: i + c
                    }
                }, {
                    start: {
                        x: r,
                        y: i + s + h
                    },
                    end: {
                        x: r + c,
                        y: i + s + h
                    }
                }, {
                    start: {
                        x: r,
                        y: i + f + 2 * s + h
                    },
                    end: {
                        x: r + c,
                        y: i + f + 2 * s + h
                    }
                }].forEach(function (e) {
                    t.ctx.beginPath(), t.ctx.setStrokeStyle("#ffffff"), t.ctx.setLineWidth(f), t.ctx.moveTo(e.start.x, e.start.y),
                        t.ctx.lineTo(e.end.x, e.end.y), t.ctx.stroke();
                }), t.ctx.closePath();
            }
        };
    }, T.prototype.update = function () {
        var t = this;
        t.src && (t.__oneTouchStart = function (e) {
            t.touchX0 = Math.round(e.x), t.touchY0 = Math.round(e.y);
        }, t.__oneTouchMove = function (e) {
            var n, o;
            if (t.touchended) return t.updateCanvas();
            n = Math.round(e.x - t.touchX0), o = Math.round(e.y - t.touchY0);
            var r = Math.round(t.rectX + n),
                i = Math.round(t.rectY + o);
            t.outsideBound(r, i), t.updateCanvas();
        }, t.__twoTouchStart = function (e, n) {
            var o, r, i;
            t.touchX1 = Math.round(t.rectX + t.scaleWidth / 2), t.touchY1 = Math.round(t.rectY + t.scaleHeight / 2),
                o = Math.round(n.x - e.x), r = Math.round(n.y - e.y), i = Math.round(Math.sqrt(o * o + r * r)),
                t.oldDistance = i;
        }, t.__twoTouchMove = function (e, n) {
            var o = t.oldScale,
                r = t.oldDistance,
                i = t.scale,
                c = t.zoom;
            t.newScale = function (t, e, n, o, r) {
                    var i, c;
                    return i = Math.round(r.x - o.x), c = Math.round(r.y - o.y), t + .001 * n * (Math.round(Math.sqrt(i * i + c * c)) - e);
                }(o, r, c, e, n), t.newScale <= 1 && (t.newScale = 1), t.newScale >= i && (t.newScale = i),
                t.scaleWidth = Math.round(t.newScale * t.baseWidth), t.scaleHeight = Math.round(t.newScale * t.baseHeight);
            var a = Math.round(t.touchX1 - t.scaleWidth / 2),
                u = Math.round(t.touchY1 - t.scaleHeight / 2);
            t.outsideBound(a, u), t.updateCanvas();
        }, t.__xtouchEnd = function () {
            t.oldScale = t.newScale, t.rectX = t.imgLeft, t.rectY = t.imgTop;
        });
    }, T;
}, "object" === ("undefined" == typeof exports ? "undefined" : n(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (void 0).WeCropper = t();