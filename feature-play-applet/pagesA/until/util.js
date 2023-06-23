var e = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
};

module.exports = {
    formatTime: function(t) {
        var r = t.getFullYear(), n = t.getMonth() + 1, a = t.getDate(), s = t.getHours(), u = t.getMinutes(), o = t.getSeconds();
        return [ r, n, a ].map(e).join("/") + " " + [ s, u, o ].map(e).join(":");
    },
    formatDate: function(t) {
        return [ t.getFullYear(), t.getMonth() + 1, t.getDate() ].map(e).join("-");
    },
    getShuxiang: function(e) {
        var t, r = [ "鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪" ];
        for (t = 0; t <= 11 && e != r[t]; t++) ;
        return [ "鼠🐭", "牛🐮", "虎🐯", "兔🐰", "龙🐲", "蛇🐍", "马🐴", "羊🐏", "猴🐵", "鸡🐔", "狗🐶", "猪🐷" ][t];
    },
    getXingzuo: function(e, t) {
        return "♑魔羯♒水瓶♓双鱼♈白羊♉金牛♊双子♋巨蟹♌狮子♍处女♎天秤♏天蝎♐射手♑魔羯".substr(3 * e - (t < [ 20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22 ][e - 1] ? 3 : 0), 3);
    },
    getDays: function(e, t) {
        var r = Date.parse(e), n = Date.parse(t), a = parseInt((n - r) / 864e5);
        return a <= 0 && (a = Math.abs(a)), a;
    },
    getNiceLover: function(e, t, r) {
        e = parseInt(e);
        var n = (t = parseInt(t)) + (r = parseInt(r)), a = [ null ], s = null;
        for (s = 1; s <= 12; s++) n += 12, (1 == s || 3 == s || 5 == s || 7 == s || 8 == s || 10 == s || 12 == s) && n > 31 && (n = parseInt(.3 * (n - .8 * r))), 
        (4 == s || 6 == s || 9 == s || 11 == s) && n > 30 && (n = parseInt(.4 * (n - .6 * r))), 
        2 == s && n > 29 && (n = parseInt(.4 * (n - .4 * r))), a[s - 1] = s + "月" + n + "日";
        return 1997 == e && 1 == t && 29 == r && ((a = [ null ])[0] = "❤️你唯一的真命天子一定是1997年2月28日（丁丑年正月廿二）出生的！🥰"), 
        a;
    },
    getGoodFriends: function(e, t, r) {
        e = parseInt(e);
        var n = (t = parseInt(t)) + (r = parseInt(r)), a = [ null ], s = null;
        for (s = 1; s <= 12; s++) n += 12, (1 == s || 3 == s || 5 == s || 7 == s || 8 == s || 10 == s || 12 == s) && n > 31 && (n = parseInt(.4 * (n - .6 * r))), 
        (4 == s || 6 == s || 9 == s || 11 == s) && n > 30 && (n = parseInt(.3 * (n - .8 * r))), 
        2 == s && n > 29 && (n = parseInt(.4 * (n - .6 * r))), a[s - 1] = s + "月" + n + "日";
        return 1997 == e && 1 == t && 29 == r && ((a = [ null ])[0] = "❤️你唯一的真命天子一定是1997年2月28日（丁丑年正月廿二）出生的！🥰"), 
        a;
    },
    getLoveMatch: function(e, t, r, n, a, s) {
        var u = parseInt(e) + parseInt(t) + parseInt(r) + parseInt(n) + parseInt(a) + parseInt(s);
        if (4054 == u) return 100;
        for (u -= 3804, u = parseInt(u / t * a), u /= 3.5, u += parseInt(r) + parseInt(s); u <= 70; ) u += 21;
        for (;u > 100; ) u *= .9;
        return parseInt(u);
    },
    getNextBirthday: function(e, t, r, n, a) {
        var s = null;
        return t > n ? s = Number(e) + 1 + "-" + n + "-" + a : t == n ? r > a ? s = Number(e) + 1 + "-" + n + "-" + a : r <= a && (s = e + "-" + n + "-" + a) : s = e + "-" + n + "-" + a, 
        s;
    },
    getWeek: function(e) {
        var t = new Date(Date.parse(e)).getDay();
        switch (t) {
          case 0:
            t = "日";
            break;

          case 1:
            t = "一";
            break;

          case 2:
            t = "二";
            break;

          case 3:
            t = "三";
            break;

          case 4:
            t = "四";
            break;

          case 5:
            t = "五";
            break;

          case 6:
            t = "六";
        }
        return t;
    }
};