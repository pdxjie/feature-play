var e = require("../until/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.isDef = function(e) {
    return null != e;
}, exports.isObj = function(e) {
    var n = (0, t.default)(e);
    return null !== e && ("object" === n || "function" === n);
}, exports.isNumber = function(e) {
    return /^\d+$/.test(e);
}, exports.range = function(e, t, n) {
    return Math.min(Math.max(e, t), n);
}, exports.nextTick = function(e) {
    setTimeout(function() {
        e();
    }, 1e3 / 30);
}, exports.getSystemInfoSync = function() {
    null == n && (n = wx.getSystemInfoSync());
    return n;
};

var t = e(require("../until/typeof"));

var n = null;