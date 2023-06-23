Page({
    data: {
        rvalue: 0,
        gvalue: 0,
        bvalue: 0,
        color16: "000000",
        colors: "#000000"
    },
    changered: function(t) {
        var a = t.detail.value.toString(16), e = this.data.gvalue.toString(16), l = this.data.bvalue.toString(16);
        (a + "").length < 2 && (a = "0" + a), (e + "").length < 2 && (e = "0" + e), (l + "").length < 2 && (l = "0" + l), 
        this.setData({
            rvalue: t.detail.value,
            colors: "#" + a + e + l,
            color16: a + e + l
        });
    },
    changegreen: function(t) {
        var a = this.data.rvalue.toString(16), e = t.detail.value.toString(16), l = this.data.bvalue.toString(16);
        (a + "").length < 2 && (a = "0" + a), (e + "").length < 2 && (e = "0" + e), (l + "").length < 2 && (l = "0" + l), 
        this.setData({
            gvalue: t.detail.value,
            colors: "#" + a + e + l,
            color16: a + e + l
        });
    },
    changeblue: function(t) {
        var a = this.data.rvalue.toString(16), e = this.data.gvalue.toString(16), l = t.detail.value.toString(16);
        (a + "").length < 2 && (a = "0" + a), (e + "").length < 2 && (e = "0" + e), (l + "").length < 2 && (l = "0" + l), 
        this.setData({
            bvalue: t.detail.value,
            colors: "#" + a + e + l,
            color16: a + e + l
        });
    },
    inputcolor: function(t) {
        if ("#" == t.detail.value.substr(0, 1) && 7 == t.detail.value.length) {
            var a = t.detail.value.slice(1, 3), e = t.detail.value.slice(3, 5), l = t.detail.value.slice(5, 7);
            try {
                a = parseInt(a, 16), e = parseInt(e, 16), l = parseInt(l, 16), this.setData({
                    rvalue: a,
                    gvalue: e,
                    bvalue: l,
                    colors: t.detail.value
                });
            } catch (t) {}
        }
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});