const shareUtil = require('../../utils/shareUtil.js');
const app = getApp();
let imgUrl=app.globalData.imgUrl
Page({
    data: {
        width: 0,
        height: 0,
        coefficient: 56.3,
        imgUrl:imgUrl
    },
    onLoad: function(e) {
        var t = this;
        wx.getStorage({
            key: "coefficient",
            success: function(e) {
                t.setData({
                    coefficient: e.data
                });
            }
        }), 
        wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    width: e.windowWidth,
                    height: e.screenHeight - 90
                }), t.drawRuler(e.windowWidth, e.screenHeight - 90, t.data.coefficient);
            }
        });
    },
    drawRuler: function(e, t, i) {
        for (var a = t / i + 1, n = wx.createCanvasContext("ruler", this), s = 0; s < 2; s++) {
            1 == s && (n.translate(e, t), n.rotate(180 * Math.PI / 180)), n.setStrokeStyle("#292929"), 
            n.setLineWidth(1);
            for (var o = 0; o < a; o++) {
                var r = 10 + o * i;
                n.save(), n.moveTo(0, r), n.lineTo(30, r), n.setFontSize(10), n.setTextBaseline("middle"), 
                n.setFillStyle("#292929"), n.fillText(o, 35, r), n.moveTo(0, r + i / 2), n.lineTo(20, r + i / 2), 
                n.restore();
                for (var c = 0; c < 10; c++) 4 != c && (n.save(), n.moveTo(0, r + (c + 1) * i / 10), 
                n.lineTo(10, r + (c + 1) * i / 10), n.restore());
            }
            n.stroke();
        }
        n.draw();
    },
    changeCoefficient: function(e) {
        this.setData({
            coefficient: e.detail.value
        }), 
        wx.setStorage({
            key: "coefficient",
            data: e.detail.value
        }), 
        this.drawRuler(this.data.width, this.data.height, e.detail.value);
    },
    reset: function(e) {
        this.setData({
            coefficient: 56.3
        }), 
        wx.setStorage({
            key: "coefficient",
            data: 56.3
        }), 
        this.drawRuler(this.data.width, this.data.height, 56.3);
    },
    onShareAppMessage:shareUtil.shareConfig,
    onShareTimeline:shareUtil.shareConfig,
});