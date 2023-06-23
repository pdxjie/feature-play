function e(e) {
    if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
        if (Array.isArray(e) || (e = function(e, n) {
            if (!e) return;
            if ("string" == typeof e) return t(e, n);
            var r = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === r && e.constructor && (r = e.constructor.name);
            if ("Map" === r || "Set" === r) return Array.from(r);
            if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return t(e, n);
        }(e))) {
            var n = 0, r = function() {};
            return {
                s: r,
                n: function() {
                    return n >= e.length ? {
                        done: !0
                    } : {
                        done: !1,
                        value: e[n++]
                    };
                },
                e: function(e) {
                    throw e;
                },
                f: r
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o, a, i = !0, u = !1;
    return {
        s: function() {
            o = e[Symbol.iterator]();
        },
        n: function() {
            var e = o.next();
            return i = e.done, e;
        },
        e: function(e) {
            u = !0, a = e;
        },
        f: function() {
            try {
                i || null == o.return || o.return();
            } finally {
                if (u) throw a;
            }
        }
    };
}

// function t(e, t) {
//     (null == t || t > e.length) && (t = e.length);
//     for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
//     return r;
// }

function t(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r;
}


function u(t) {
    var n, r = 0, o = e(t);
    try {
        for (o.s(); !(n = o.n()).done; ) {
            n.value;
            r++;
        }
    } catch (e) {
        o.e(e);
    } finally {
        o.f();
    }
    return r;
}

function c(t, n) {
    var r, o = n % u(t), a = 0, i = e(t);
    try {
        for (i.s(); !(r = i.n()).done; ) {
            var c = r.value;
            if (o === a) return c;
            a++;
        }
    } catch (e) {
        i.e(e);
    } finally {
        i.f();
    }
}

var s = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "(", ")", "[", "]", "{", "}", "<", ">", "*", "&", "^", "%", "$", "#", "@", "!", "~", "`", "+", "-", "=", "_", "|", "\\", "'", '"', ";", ":", ".", ",", "?", "/", " ", "（", "）", "【", "】", "《", "》", "“", "”" ], l = [ "０", "１", "２", "３", "４", "５", "６", "７", "８", "９", "ａ", "ｂ", "ｃ", "ｄ", "ｅ", "ｆ", "ｇ", "ｈ", "ｉ", "ｊ", "ｋ", "ｌ", "ｍ", "ｎ", "ｏ", "ｐ", "ｑ", "ｒ", "ｓ", "ｔ", "ｕ", "ｖ", "ｗ", "ｘ", "ｙ", "ｚ", "Ａ", "Ｂ", "Ｃ", "Ｄ", "Ｅ", "Ｆ", "Ｇ", "Ｈ", "Ｉ", "Ｊ", "Ｋ", "Ｌ", "Ｍ", "Ｎ", "Ｏ", "Ｐ", "Ｑ", "Ｒ", "Ｓ", "Ｔ", "Ｕ", "Ｖ", "Ｗ", "Ｘ", "Ｙ", "Ｚ", "︵", "︶", "︻", "︼", "︷", "︸", "︽", "︾", "＊", "＆", "︿", "％", "＄", "＃", "＠", "！", "～", "｀", "＋", "－", "＝", "＿", "｜", "＼", "＇", "＂", "；", "：", "。", "，", "？", "／", "　", "︵", "︶", "︻", "︼", "︽", "︾", "『", "』" ];

function f(e) {
    for (var t = 0; t < s.length; t++) if (e == s[t]) {
        e = l[t];
        break;
    }
    return e;
}


module.exports = {
getStrArr: function(e, t) {
    for (var n = [], r = 0, o = 0; o < e.length; o++) {
        var a = e[o], i = t.substring(r, a.index);
        "" != i && n.push({
            value: i,
            isSmile: !1
        }), "" != (i = t.substring(a.index, a.lastIndex)) && n.push({
            value: i,
            isSmile: !0
        }), o === e.length - 1 && "" != (i = t.substring(a.lastIndex)) && n.push({
            value: i,
            isSmile: !1
        }), r = a.lastIndex;
    }
    return n;
},
getWordSize: u,
getFullChar: function(e, t) {
    return f(c(e, t));
}
};