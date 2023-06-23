module.exports = function(r, t) {
    var e = [], n = !0, l = !1, o = void 0;
    try {
        for (var u, a = r[Symbol.iterator](); !(n = (u = a.next()).done) && (e.push(u.value), 
        !t || e.length !== t); n = !0) ;
    } catch (r) {
        l = !0, o = r;
    } finally {
        try {
            n || null == a.return || a.return();
        } finally {
            if (l) throw o;
        }
    }
    return e;
};