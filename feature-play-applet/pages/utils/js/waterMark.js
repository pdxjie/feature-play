!function() {
    function t(t) {
        return i = e(i, t = t || {}), n = wx.createCanvasContext(i.id), r();
    }
    function e(t, e) {
        for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
        return t;
    }
    function r() {
        return new Promise(function(t) {
            n.setGlobalAlpha(1), n.scale(1, 1), n.drawImage(i.imgUrl, 0, 0, i.width, i.height), 
            n.setFillStyle(i.color), n.setFontSize(i.size), n.rotate(Math.PI / 180 * i.rotate), 
            n.setGlobalAlpha(i.opacity), 1 > i.scale && n.scale(i.scale, i.scale), function() {
                var t = i.xSpace, e = i.ySpace, r = i.text.length, a = i.size + e, l = i.size * r + t, o = .72 * (i.width + i.height);
                1 > i.scale && (o /= i.scale);
                for (var c = i.yStart; c < o + a; c += a) for (var s = i.xStart; s < o + l; s += l) n.fillText(i.text, s, c);
            }(), n.draw(), t();
        });
    }
    function a(t) {
        return n.clearRect(0, 0, i.width, i.height), i = e(i, t = t || {}), r();
    }
    var i = {
        text: "watermark",
        rotate: 15,
        xSpace: 20,
        ySpace: 20,
        size: 20,
        xStart: -50,
        yStart: 20,
        opacity: .2,
        color: "#000",
        width: 500,
        height: 500,
        imgUrl: "",
        id: "",
        parent: null
    }, n = null;
    module.exports = function() {
        return {
            mark: t,
            reRendering: a
        };
    };
}();