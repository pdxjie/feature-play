!function() {
    getApp();
    var t = null, a = wx.createInnerAudioContext();
    Page({
        data: {
            wxchar: !1,
            tianjia: !0,
            moli: 0,
            ymoli: 0,
            molick: 0,
            riqi: null,
            guan: !0,
            x: 100,
            y: 400,
            yaoyiyao: {},
            touzigeshu: 5,
            dicePoints: [ 1, 1, 1, 1, 1, 1 ],
            diceTypes: [ 1, 1, 1, 1, 1, 1 ],
            diceSrcs: [ "", "", "", "", "", "" ],
            diceStyles: [ "", "", "", "", "", "" ],
            rule: 0,
            suourl: "/pagesB/pages/imgg/suo.png",
            issuo: 1,
            // gaizi: "pagesB/pages/imgg/gaizhi1.png",
            gaidi: "http://touzi.115xy.com/shaizi/toudi1.png",
            shaizi: [ "", "", "", "", "", "" ],
            shaiziweizhi: [ "", "", "", "", "", "" ],
            showMore: !1,
            swiperCurrent: 0,
            indicatorDots: !1,
            autoplay: !0,
            interval: 1e4,
            duration: 800,
            circular: !1
        },
        suo: function() {
            this.data.issuo ? this.suogai() : this.kaigai();
        },
        lingqu: function() {
            wx.setStorageSync("shu", Math.ceil(6 * Math.random())), this.setData({
                molick: 1
            });
        },
        wxcharguan: function() {
            this.setData({
                wxchar: !1
            });
        },
        wxchar: function() {
            this.setData({
                wxchar: !0
            });
        },
        gbtj: function() {
            this.setData({
                tianjia: !1
            }), wx.setStorageSync("tianjia", "false");
        },
        buling: function() {
            this.setData({
                molick: 0
            });
        },
        gameplay: function() {
            wx.navigateTo({
                url: "/pages/gameplay/gameplay"
            });
        },
        kaigai: function() {
            this.setData({
                suourl: "/pagesB/pages/imgg/suo.png",
                issuo: !0
            });
        },
        suogai: function() {
            this.setData({
                suourl: "/pagesB/pages/imgg/suozong.png",
                issuo: !1
            });
        },
        shezhi: function() {
            wx.reLaunch({
                url: "/pagesB/pages/zsz/sz"
            });
        },
       
        bindbackmusic: function() {
            (a = wx.createInnerAudioContext()).autoplay = !0, a.loop = !1, 
            a.src = "/pagesB/pages/zsz/touzhi.mp3", 
            a.onPlay(function() {
                console.log("开始");
            }), a.onError(function(t) {
                console.log(t.errMsg), console.log(t.errCode);
            });
        },
        bofangdonghua: function() {
            var t = wx.createAnimation({
                duration: 70
            });
            t.translate(15, -15).step().translate(-15, 15).step().translate(15, -15).step().translate(-15, 15).step().translate(15, -15).step().translate(-15, 15).step().translate(15, -15).step().translate(-15, 15).step().translate(0).step(), 
            this.setData({
                yaoyiyao: t.export(),
                x: 100,
                y: 400
            });
        },
        yao: function() {
            this.bindbackmusic(), this.bofangdonghua(), this.suogai(), this.shengchan();
            var t = this;
            setTimeout(function() {
                t.kaigai();
            }, 800);
        },
        symoli: function() {
            for (var t = [], a = [], e = [], i = [], o = 0; o < this.data.touzigeshu; o++) {
                if (o <= 2) t[o] = wx.getStorageSync("shu"); else if (3 == o) {
                    for (n = 0; n < 2; n++) t[o] = wx.getStorageSync("shu");
                    t[o] = 1;
                } else if (4 == o) {
                    for (n = 0; n < 2; n++) t[o] = wx.getStorageSync("shu");
                    t[o] = Math.ceil(6 * Math.random());
                } else if (5 == o) {
                    for (var n = 0; n < 3; n++) t[o] = wx.getStorageSync("shu");
                    t[o] = Math.ceil(6 * Math.random());
                }
                a[o] = Math.ceil(8 * Math.random()), i[o] = "/pagesB/pages/imgg/touzi/touzi" + t[o] + "-" + a[o] + ".png", 
                a[o], e[o] = "display:inline;";
            }
            for (o = 0; o < 6 - this.data.touzigeshu; o++) {
                var s = Math.floor(Math.random() * (i.length + 1));
                i.splice(s, 0, ""), e.splice(s, 0, "display:none;");
            }
            this.setData({
                shaiziweizhi: e,
                shaizi: i
            });
        },
        shengchan: function() {
            for (var t = [], a = [], e = [], i = [], o = 0; o < this.data.touzigeshu; o++) t[o] = Math.ceil(6 * Math.random()), 
            a[o] = Math.ceil(8 * Math.random()), i[o] = "/pagesB/pages/imgg/touzi/touzi" + t[o] + "-" + a[o] + ".png", 
            a[o], e[o] = "display:inline;";
            for (o = 0; o < 6 - this.data.touzigeshu; o++) {
                var n = Math.floor(Math.random() * (i.length + 1));
                i.splice(n, 0, ""), e.splice(n, 0, "display:none;");
            }
            this.setData({
                shaiziweizhi: e,
                shaizi: i
            });
        },
      
        
        onLoad: function() {
      
            var r = wx.getStorageSync("touzigeshu");
            r && this.setData({
                touzigeshu: r
            });
        },
        onShareAppMessage: function() {
            return {
                title: "KTV，酒吧，聚会喝酒神器摇骰子",
                path: "/pagesB/pages/zsz/zsz",
            };
        },
        onShareTimeline: function(t) {
            return {
                title: "喝酒神器摇骰子",
                query: "/pagesB/pages/zsz/zsz"
            };
        }
    });
}();