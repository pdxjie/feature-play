Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var a = {
    tg: "甲乙丙丁戊己庚辛壬癸",
    dz: "子丑寅卯辰巳午未申酉戌亥",
    number: "一二三四五六七八九十",
    year: "🐭鼠🐮牛🐯虎🐰兔🐲龙🐍蛇🐴马🐑羊🐵猴🐔鸡🐶狗🐷猪",
    month: "正二三四五六七八九十冬腊",
    monthadd: [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ],
    calendar: [ 2635, 333387, 1701, 1748, 267701, 694, 2391, 133423, 1175, 396438, 3402, 3749, 331177, 1453, 694, 201326, 2350, 465197, 3221, 3402, 400202, 2901, 1386, 267611, 605, 2349, 137515, 2709, 464533, 1738, 2901, 330421, 1242, 2651, 199255, 1323, 529706, 3733, 1706, 398762, 2741, 1206, 267438, 2647, 1318, 204070, 3477, 461653, 1386, 2413, 330077, 1197, 2637, 268877, 3365, 531109, 2900, 2922, 398042, 2395, 1179, 267415, 2635, 661067, 1701, 1748, 398772, 2742, 2391, 330031, 1175, 1611, 200010, 3749, 527717, 1452, 2742, 332397, 2350, 3222, 268949, 3402, 3493, 133973, 1386, 464219, 605, 2349, 334123, 2709, 2890, 267946, 2773, 592565, 1210, 2651, 395863, 1323, 2707, 265877 ]
}, r = function(r) {
    var t, e, n, o, u, l, d, c, h, f, i;
    new Date();
    if (r ? (r = r.split("-"), t = parseInt(r[0]), e = r[1] - 1, n = parseInt(r[2])) : (t = (r = new Date()).getFullYear(), 
    e = r.getMonth(), n = r.getDate()), t < 1900 || t > 2030) return {};
    var g = !1, s = t;
    for (s < 1900 && (s += 1900), o = 365 * (s - 1921) + Math.floor((s - 1921) / 4) + a.monthadd[e] + n - 38, 
    t % 4 == 0 && e > 1 && o++, u = 0; ;u++) {
        for (l = d = a.calendar[u] < 4095 ? 11 : 12; l >= 0; l--) {
            if (o <= 29 + (c = a.calendar[u] >> l & 1)) {
                g = !0;
                break;
            }
            o = o - 29 - c;
        }
        if (g) break;
    }
    return h = 1921 + u, f = d - l + 1, i = o, 12 == d && (f == Math.floor(a.calendar[u] / 65536) + 1 && (f = 1 - f), 
    f > Math.floor(a.calendar[u] / 65536) + 1 && f--), f < 10 && (f = "0" + f), i < 10 && (i = "0" + i), 
    {
        lunarYear: h,
        lunarMonth: f,
        lunarDay: i
    };
}, t = function(r) {
    if (r.lunarDay) {
        var t = {}, e = r.lunarYear, n = r.lunarMonth, o = r.lunarDay;
        t.tg = a.tg.charAt((e - 4) % 10), t.dz = a.dz.charAt((e - 4) % 12);
        var u = (e - 4) % 12 * 3;
        return t.year = a.year.slice(u, u + 3), t.month = n < 1 ? "(闰)".concat(a.month.charAt(-n - 1)) : a.month.charAt(n - 1), 
        t.day = o < 11 ? "初" : o < 20 ? "十" : o < 30 ? "廿" : "三十", o % 10 == 0 && 10 != o || (t.day += a.number.charAt((o - 1) % 10)), 
        t;
    }
}, e = {
    getLunarDate: r,
    getLunarDateString: t
};

exports.default = e, module.exports = {
    getLunarDate: r,
    getLunarDateString: t
};