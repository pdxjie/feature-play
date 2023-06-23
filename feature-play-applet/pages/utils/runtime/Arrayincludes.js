require("../../@babel/runtime/helpers/Arrayincludes"), Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
    value: function(r, e) {
        if (null == this) throw new TypeError('"this" is null or not defined');
        var t = Object(this), i = t.length >>> 0;
        if (0 == i) return !1;
        for (var n, u, a = 0 | e, o = Math.max(0 <= a ? a : i - Math.abs(a), 0); o < i; ) {
            if ((n = t[o]) === (u = r) || "number" == typeof n && "number" == typeof u && isNaN(n) && isNaN(u)) return !0;
            o++;
        }
        return !1;
    }
});