Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.promiseApi = function(r) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : wx;
    return new Promise(function(i, u) {
        return r.apply(o, [ e(e({}, n), {}, {
            success: i,
            fail: u
        }) ].concat(t));
    });
}, exports.promisify = exports.promisify_wxAPI = void 0;

var e = require("../../@babel/runtime/helpers/objectSpread2");

exports.promisify_wxAPI = function(r) {
    return function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : wx;
        return new Promise(function(i, u) {
            return r.apply(o, [ e(e({}, n), {}, {
                success: i,
                fail: u
            }) ].concat(t));
        });
    };
};

exports.promisify = function(e) {
    return function() {
        for (var r = arguments.length, n = new Array(r), t = 0; t < r; t++) n[t] = arguments[t];
        return new Promise(function(r, t) {
            return e.apply(void 0, n.concat([ function(e, n) {
                return e ? t(e) : r(n);
            } ]));
        });
    };
};