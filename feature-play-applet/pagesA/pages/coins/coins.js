var t, e;

t = getApp(), (e = wx.createInnerAudioContext()).src = "http://gddx.sc.chinaz.com/Files/DownLoad/sound1/201711/9455.wav", 
e.startTime = 1, Page({
    data: {
        motto: "抛硬币",
        ybzimg: "img/yb-z.png",
        ybfimg: "img/yb-f.png",
        ybfximg: "img/yb-f-x.png",
        retryimg: "img/retry.png",
        shareimg: "img/share.png",
        aboutimg: "img/about.png",
        ybbimg: "img/yb-b.png",
        lastRandomIndex: "",
        ztext: [ "勇敢地去追求自己想要的东西吧", "敢做就一定会成功", "抛个正面，今晚吃面", "老天在帮你，还在想什么，去做吧", "不用再想了，去做吧", "兄弟，是命躲不过", "该来的总会来的，不要怂", "一切都是最好的安排" ],
        ftext: [ "不是我怂，一切都是天意", "抛个反面，今晚不吃面", "暂时先不做这件事，明天再抛一次", "女朋友：反面，我赢了", "天不让我做，我也没办法", "偶尔偷个懒也是可以的", "遵从自己的内心", "这次不算，再来一次", "一切都是最好的安排" ],
        shareTitle: [ "很难做决定吗？抛硬币吧！", "今晚要不要吃外卖，抛硬币？", "请问我这辈子能不能发财？", "谁打扫房间，正面是我，反面是你", "起不起床全靠这个硬币了！", "据说你的好友抛了好几个正面" ],
        questionTitle: [ "我会发财吗？", "今晚吃不吃外卖？", "正面你做，反面我做！", "连着三个正面我就起床！", "要不要干？", "今年会找到心仪的那个TA吗？", "正面吃面，反面吃饭？" ],
        infoMessageArray: [ '点击下方"抛硬币"看看老天对此事的安排', "点击上面文字可以自己输入定制的问题哦" ],
        infoMessage: "",
        resultHidden: "hidden",
        retryHidden: "hidden",
        ybresultVal: -1,
        inputFocus: !1,
        firstPao: !0,
        firstInput: !0,
        resultPao: !1,
        inputValue: "",
        firstTitleHidden: "",
        firstHidden: "",
        titleHidden: "hidden",
        ybimgClass: "",
        lock: !1,
        ybimgTime: 3600,
        ybresult: {},
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        clickPre: !1
    },
    onLoad: function(e) {
        var a = this;
        t.globalData.userInfo ? this.setData({
            userInfo: t.globalData.userInfo,
            hasUserInfo: !0
        }) : this.data.canIUse ? t.userInfoReadyCallback = function(t) {
            a.setData({
                userInfo: t.userInfo,
                hasUserInfo: !0
            });
        } : wx.getUserInfo({
            success: function(e) {
                t.globalData.userInfo = e.userInfo, a.setData({
                    userInfo: e.userInfo,
                    hasUserInfo: !0
                });
            }
        });
        var i = e.resultTitle, s = e.resultContentIndex, n = 1 == e.resultCoin, r = this;
        if (e.resultYes) {
            var d = {};
            d.src = n ? r.data.ybzimg : r.data.ybfimg, d.text = "结果：" + (n ? "正" : "反"), d.content = n ? r.data.ztext[s] : r.data.ftext[s], 
            r.setData({
                inputValue: i,
                titleHidden: "心里想着你的问题" == i ? "hidden" : "",
                resultHidden: "",
                ybresult: d,
                firstHidden: "hidden",
                retryHidden: "",
                ybresultVal: n,
                ybimgClass: "",
                lock: !1,
                firstPao: !1,
                resultPao: !0
            });
        } else this.setData({
            inputValue: "心里想着你的问题"
        });
        var u = Math.round(Math.random() * (this.data.infoMessageArray.length - 1)), o = this.data.infoMessageArray[u];
        this.setData({
            infoMessage: o
        });
    },
    inputTitle: function(t) {
        if ("心里想着你的问题" == this.data.inputValue) {
            var e = Math.round(Math.random() * (this.data.questionTitle.length - 1)), a = this.data.questionTitle[e];
            this.setData({
                inputValue: "",
                inputFocus: !0,
                inputHolder: a,
                clickPre: !0
            });
        } else this.setData({
            inputFocus: !0,
            clickPre: !0
        });
    },
    titleTextBlur: function(t) {
        var e = t.detail.value, a = this.data.inputHolder;
        "" == e ? this.data.firstInput ? this.setData({
            inputValue: a,
            firstInput: !1,
            inputFocus: !1
        }) : this.setData({
            inputValue: "心里想着你的问题",
            firstInput: !0,
            inputFocus: !1
        }) : this.setData({
            inputValue: e,
            firstInput: !1,
            inputFocus: !1
        });
    },
    info: function(t) {
        wx.navigateTo({
            url: "../about/about"
        });
    },
    retry: function(t) {
        this.setData({
            resultHidden: "hidden",
            ybimgClass: "",
            titleHidden: "hidden",
            inputFocus: !1,
            inputValue: "心里想着你的问题",
            lock: !1,
            firstHidden: "",
            retryHidden: "hidden",
            firstPao: !0,
            firstInput: !0,
            ybresultVal: -1,
            resultPao: !1
        });
    },
    onShareAppMessage: function(t) {
        var e = Math.round(Math.random() * (this.data.shareTitle.length - 1)), a = this.data.shareTitle[e], i = "";
        return this.data.firstPao || (i += "?resultYes=true&resultTitle=" + this.data.inputValue + "&resultContentIndex=" + this.data.lastRandomIndex + "&resultCoin=" + (this.data.ybresultVal ? 1 : 0), 
        a = "" != this.data.inputValue ? this.data.inputValue + " 我刚刚拋了硬币，结果居然是..." : "我刚刚拋了硬币，结果居然是..."), 
        {
            title: a,
            path: "/pages/coins/coins" + i
        };
    },
    doPyb: function(t) {
        var a = this;
        if (!a.data.lock) {
            e.play(), a.setData({
                lock: !0
            }), "心里想着你的问题" == a.data.inputValue ? a.setData({
                titleHidden: "hidden"
            }) : a.setData({
                titleHidden: ""
            });
            var i = {}, s = 1 == Math.round(1 * Math.random()) + 1, n = Math.round(Math.random() * (s ? a.data.ztext.length - 1 : a.data.ftext.length - 1)), r = s ? a.data.ztext[n] : a.data.ftext[n];
            i.src = s ? a.data.ybzimg : a.data.ybfimg, i.text = "结果：" + (s ? "正" : "反"), i.content = r, 
            a.setData({
                lastRandomIndex: n,
                resultHidden: "hidden",
                ybresult: i,
                firstHidden: "hidden",
                retryHidden: "hidden",
                ybresultVal: s
            }), a.setData({
                ybimgClass: "flipped-horizontal-right-" + (s ? "z" : "f")
            }), setTimeout(function() {
                a.setData({
                    resultHidden: "",
                    ybimgClass: "",
                    lock: !1,
                    firstPao: !1,
                    resultPao: !1,
                    retryHidden: ""
                });
            }, 3200);
        }
    },
    getUserInfo: function(e) {
        t.globalData.userInfo = e.detail.userInfo, this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: !0
        });
    }
});