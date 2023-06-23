module.exports = {
    Uppercase: function(e) {
        var r = [ "角", "分" ], a = [ "零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖" ], t = [ [ "元", "万", "亿" ], [ "", "拾", "佰", "仟" ] ], l = e < 0 ? "欠" : "";
        e = Math.abs(e);
        for (var o = "", p = 0; p < r.length; p++) o += (a[Math.floor(parseFloat(10 * e).toFixed(r.length - p) * Math.pow(10, p)) % 10] + r[p]).replace(/零./, "");
        for (o = o || "整", e = Math.floor(e), p = 0; p < t[0].length && e > 0; p++) {
            for (var c = "", h = 0; h < t[1].length && e > 0; h++) c = a[e % 10] + t[1][h] + c, 
            e = Math.floor(e / 10);
            o = c.replace(/(零.)*零$/, "").replace(/^$/, "零") + t[0][p] + o;
        }
        return l + o.replace(/(零.)*零元/, "元").replace(/(零.)+/g, "零").replace(/^整$/, "零元整");
    }
};