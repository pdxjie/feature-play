Page({
    data: {
        array: [ "5%", "6%", "7%", "8%", "9%", "10%", "11%", "12%" ],
        n: 0,
        num: "",
        gongji: !0,
        shebao: !0,
        result: 0,
        tax: 0,
        social: 0,
        pub: 0,
        yibao: 0,
        yangbao: 0,
        shibao: 0
    },
    salarys: function(a) {
        var t = a.detail.value;
        return t.length >= 2 && (t.slice(0, 1) == t.slice(1, 2) && "0" == t.slice(0, 1) ? t = 0 : "0" == t.slice(0, 1) && "0" != t.slice(1, 2) && (t = parseInt(t))), 
        this.setData({
            num: t
        }), this.cal(), t;
    },
    gongjichange: function(a) {
        if (this.setData({
            gongji: a.detail.value
        }), "" != this.data.num) if (1 == this.data.gongji) this.cal(); else {
            this.setData({
                yibao: parseInt(.02 * this.data.num),
                yangbao: parseInt(.08 * this.data.num),
                shibao: parseInt(.005 * this.data.num),
                social: parseInt(.02 * this.data.num) + parseInt(.08 * this.data.num) + parseInt(.005 * this.data.num)
            });
            var t = this.data.num - (parseInt(.02 * this.data.num) + parseInt(.08 * this.data.num) + parseInt(.005 * this.data.num)), s = this.shuishou(t);
            this.setData({
                tax: parseInt(s)
            }), this.setData({
                pub: 0,
                result: parseInt(this.data.num - this.data.tax - this.data.social)
            });
        }
    },
    shebaochange: function(a) {
        if (this.setData({
            shebao: a.detail.value
        }), "" != this.data.num) if (1 == this.data.shebao) this.cal(); else {
            this.setData({
                pub: parseInt(this.data.num * parseInt(this.data.array[this.data.n]) / 100)
            });
            var t = this.data.num - parseInt(this.data.num * parseInt(this.data.array[this.data.n]) / 100), s = this.shuishou(t);
            this.setData({
                tax: parseInt(s)
            }), this.setData({
                social: 0,
                result: parseInt(this.data.num - this.data.tax - this.data.pub)
            });
        }
    },
    changenum: function(a) {
        this.setData({
            n: a.detail.value
        }), this.cal();
    },
    cal: function() {
        if ("" != this.data.num) if (1 == this.data.gongji) if (1 == this.data.shebao) {
            this.setData({
                pub: parseInt(this.data.num * parseInt(this.data.array[this.data.n]) / 100),
                yibao: parseInt(.02 * this.data.num),
                yangbao: parseInt(.08 * this.data.num),
                shibao: parseInt(.005 * this.data.num),
                social: parseInt(.02 * this.data.num) + parseInt(.08 * this.data.num) + parseInt(.005 * this.data.num)
            });
            var a = this.data.num - (parseInt(.02 * this.data.num) + parseInt(.08 * this.data.num) + parseInt(.005 * this.data.num)) - parseInt(this.data.num * parseInt(this.data.array[this.data.n]) / 100), t = this.shuishou(a);
            this.setData({
                tax: parseInt(t)
            }), this.setData({
                result: parseInt(this.data.num - this.data.tax - this.data.social - this.data.pub)
            });
        } else {
            this.setData({
                pub: parseInt(this.data.num * parseInt(this.data.array[this.data.n]) / 100)
            });
            var s = this.data.num - parseInt(this.data.num * parseInt(this.data.array[this.data.n]) / 100), i = this.shuishou(s);
            this.setData({
                tax: parseInt(i)
            }), this.setData({
                result: parseInt(this.data.num - this.data.tax - this.data.social - this.data.pub)
            });
        } else if (1 == this.data.shebao) {
            this.setData({
                yibao: parseInt(.02 * this.data.num),
                yangbao: parseInt(.08 * this.data.num),
                shibao: parseInt(.005 * this.data.num),
                social: parseInt(.02 * this.data.num) + parseInt(.08 * this.data.num) + parseInt(.005 * this.data.num)
            });
            var n = this.data.num - (parseInt(.02 * this.data.num) + parseInt(.08 * this.data.num) + parseInt(.005 * this.data.num)), e = this.shuishou(n);
            this.setData({
                tax: parseInt(e)
            }), this.setData({
                result: parseInt(this.data.num - this.data.tax - this.data.social)
            });
        } else {
            var h = this.data.num, u = this.shuishou(h);
            this.setData({
                tax: parseInt(u)
            }), this.setData({
                result: parseInt(this.data.num - this.data.tax)
            });
        } else this.setData({
            result: 0
        });
    },
    shuishou: function(a) {
        return a <= 5e3 ? 0 : 5e3 < a && a <= 8e3 ? .03 * (a - 5e3) : 8e3 < a && a <= 17e3 ? .1 * (a - 5e3) - 210 : 17e3 < a && a <= 3e4 ? .2 * (a - 5e3) - 1410 : 3e4 < a && a <= 4e4 ? .25 * (a - 5e3) - 2660 : 4e4 < a && a <= 6e4 ? .3 * (a - 5e3) - 4410 : 6e4 < a && a < 85e3 ? .35 * (a - 5e3) - 7160 : .4 * (a - 5e3) - 15160;
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});