var  a = "";

Page({
    data: {
        hex: [ {
            name: "B",
            value: "二进制"
        }, {
            name: "O",
            value: "八进制"
        }, {
            name: "D",
            value: "十进制",
            checked: "true"
        }, {
            name: "H",
            value: "十六进制"
        } ],
        dele: "",
        num0: 0,
        num1: 1,
        num2: 2,
        num3: 3,
        num4: 4,
        num5: 5,
        num6: 6,
        num7: 7,
        num8: 8,
        num9: 9,
        numT: "00",
        numA: "a",
        numB: "b",
        numC: "c",
        numD: "d",
        numE: "e",
        numF: "f",
        numTwo: "two",
        numEight: "eight",
        numTen: "ten",
        numSixteen: "six",
        numdo: ".",
        clear: "clear",
        screenData: "0",
        screenStr: "0",
        zh: "十进制数：",
        code: "D",
        number: ""
    },
    btnClick: function(e) {
        var t = e.target.id;
        if (t == this.data.dele) {
            if (0 == (n = this.data.screenData)) return;
            "" != (n = n.substring(0, n.length - 1)) && "-" != n || (n = 0), a = n, this.setData({
                screenData: n
            });
        } else if (t == this.data.clear) this.setData({
            screenData: "0",
            screenStr: "0",
            zh: "十进制数：",
            code: "D",
            number: "",
            hex: [ {
                name: "B",
                value: "二进制"
            }, {
                name: "O",
                value: "八进制"
            }, {
                name: "D",
                value: "十进制",
                checked: "true"
            }, {
                name: "H",
                value: "十六进制"
            } ]
        }), a = ""; else {
            var n, s = this.data.screenData;
            if ((n = 0 == s ? t : s + t).length > 25) return void this.setData({
                screenData: "overflow"
            });
            this.setData({
                screenData: n,
                screenStr: n
            }), a = n;
        }
    },
    radioChange: function(e) {
        var t = e.detail.value, n = this.data.zh;
        if (0 != this.data.screenData || "0" != this.data.screenData) this.toTen(), this.setData({
            screenStr: n + a
        }), "B" == t ? this.toBinary() : "O" == t ? this.toOctonary() : "D" == t ? this.toTenhex() : "H" == t && this.toHexadecimal(); else {
            var s = "十进制数： ";
            "B" == t ? s = "二进制数： " : "O" == t ? s = "八进制数： " : "D" == t ? s = "十进制数： " : "H" == t && (s = "十六进制数： "), 
            console.log(t), this.setData({
                code: t,
                zh: s
            });
        }
    },
    toTen: function() {
        var e, t = a;
        console.log(a), console.log(t), "B" == this.data.code ? e = parseInt(t, 2) : "O" == this.data.code ? e = parseInt(t, 8) : "H" == this.data.code ? (e = parseInt(t, 16), 
        console.log(e)) : "D" == this.data.code && (e = t), this.setData({
            number: e
        });
    },
    toBinary: function() {
        for (var e = this.data.number, a = new Array(), t = "", n = 0; ;n++) {
            if (!(e / 2 >= 1)) {
                a[n] = 1;
                break;
            }
            a[n] = e % 2, e = parseInt(e / 2);
        }
        for (n = a.length; n > 0; n--) t += a[n - 1];
        this.setData({
            screenData: t
        });
    },
    toOctonary: function() {
        for (var e = this.data.number, a = [], t = ""; e > 0; ) a.push(e % 8), e = parseInt(e / 8);
        for (;a.length > 0; ) t += a.pop();
        this.setData({
            screenData: t
        });
    },
    toTenhex: function() {
        this.setData({
            screenData: this.data.number
        });
    },
    toHexadecimal: function() {
        var e = this.data.number, a = 15, t = e, n = -1, s = "", i = "0x";
        do {
            switch (++n, t &= a) {
              case 10:
                t = "A";
                break;

              case 11:
                t = "B";
                break;

              case 12:
                t = "C";
                break;

              case 13:
                t = "D";
                break;

              case 14:
                t = "E";
                break;

              case 15:
                t = "F";
            }
            s += t, t = e >>>= 4;
        } while (e);
        do {
            i += s[n];
        } while (n--);
        s = n = t = a = e, this.setData({
            screenData: i
        });
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        return {
            title: "进制转换工具",
            path: "/pagesA/pages/mm/mm",
  
        };
    },
    onShareTimeline: function() {
        return {
            title: "进制转换工具",
            query: "/pagesA/pages/mm/mm",
           
        };
    }
});