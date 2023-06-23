var n, t = null;

Page({
    ringToneContext: null,
    timer: null,
    data: {
        ringSrc: "https://file-1258040671.cos.ap-nanjing.myqcloud.com/media/%E8%8B%B9%E6%9E%9C%E6%9D%A5%E7%94%B5%E9%93%83%E5%A3%B0.mp3",
        caller: "好友来电",
        address: "中国 北京",
        Lid: 0,
        time: "00:00",
        src: "http://sound-static.cqxcx.net/fool/son.mp3",
        fromPage: "",
        standby: !1,
        incoming: !0,
        getThrough: !1,
        autoplay: 0,
        phonetype: 0,
        hour: "00",
        minute: "00",
        second: "00",
        ringList: [ "https://file-1258040671.cos.ap-nanjing.myqcloud.com/media/0.m4a", "https://file-1258040671.cos.ap-nanjing.myqcloud.com/media/1.m4a", "https://file-1258040671.cos.ap-nanjing.myqcloud.com/media/2.m4a", "https://file-1258040671.cos.ap-nanjing.myqcloud.com/media/3.m4a", "https://file-1258040671.cos.ap-nanjing.myqcloud.com/media/4.m4a", "https://file-1258040671.cos.ap-nanjing.myqcloud.com/media/5.m4a", "https://file-1258040671.cos.ap-nanjing.myqcloud.com/media/6.m4a", "https://file-1258040671.cos.ap-nanjing.myqcloud.com/media/8.m4a", "https://file-1258040671.cos.ap-nanjing.myqcloud.com/media/9.m4a", "https://file-1258040671.cos.ap-nanjing.myqcloud.com/media/10.m4a", "https://file-1258040671.cos.ap-nanjing.myqcloud.com/media/11.m4a", "https://file-1258040671.cos.ap-nanjing.myqcloud.com/media/12.m4a", "https://file-1258040671.cos.ap-nanjing.myqcloud.com/media/13.m4a", "https://file-1258040671.cos.ap-nanjing.myqcloud.com/media/14.m4a", "https://file-1258040671.cos.ap-nanjing.myqcloud.com/media/15.m4a", "https://file-1258040671.cos.ap-nanjing.myqcloud.com/media/16.m4a" ],
        audioSrc: "https://file-1258040671.cos.ap-nanjing.myqcloud.com/media/audit.m4a"
    },
    onLoad: function(n) {
        console.log(n), wx.createInterstitialAd, this.calling();
        var t = this.data.caller, e = this.data.city, i = this.data.Lid;
        n.userName && (t = n.userName), n.city && (e = n.city), n.id && (i = n.id), this.setData({
            caller: t,
            address: e,
            Lid: i
        }), this.playLs();
    },
    playLs: function() {
        var n = this;
        n.ringToneContext = wx.createInnerAudioContext(), n.ringToneContext.src = n.data.ringSrc, 
        n.ringToneContext.play(), n.ringToneContext.onEnded(function() {
            n.playLs();
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        console.log("销毁页面"), clearInterval(this.timer), this.ringToneContext.stop();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    calling: function() {
        this.timer = setInterval(function() {
            wx.vibrateLong();
        }, 1600);
    },
    jujuePhone: function() {
        console.log("拒绝"), clearInterval(this.timer), this.ringToneContext.stop(), wx.redirectTo({
            url: "/pagesA/pages/mnld/mnld"
        });
    },
    answerPhone: function() {
        console.log("接听"), t && t.show().catch(function(n) {
            console.error(n);
        });
        var n = this;
        n.setData({
            getThrough: "show",
            phonetype: 1,
            incoming: !1
        }), clearInterval(n.timer), n.timeJiShi(), n.mediaPlay();
    },
    mediaPlay: function() {
        clearInterval(this.timer), this.ringToneContext.stop();
        var n = this.data.ringList[this.data.Lid];
        this.ringToneContext = wx.createInnerAudioContext(), this.ringToneContext.src = n, 
        this.ringToneContext.play();
    },
    stop: function() {
        clearInterval(n);
    },
    reload: function() {
        this.setData({
            hour: "00",
            minute: "00",
            second: "00"
        });
    },
    timeJiShi: function() {
        var t = this, e = t.data.hour, i = t.data.minute, a = t.data.second;
        n = setInterval(function() {
            ++a >= 60 ? (t.setData({
                second: "00"
            }), a = 0, ++i >= 60 ? (t.setData({
                minute: "00"
            }), i = 0, e++, t.setData({
                hour: e < 10 ? "0" + e : e
            })) : t.setData({
                minute: i < 10 ? "0" + i : i
            })) : t.setData({
                second: a < 10 ? "0" + a : a
            });
        }, 1e3);
    },
    rejectPhone: function(n) {
        clearInterval(this.timer), this.stop(), wx.redirectTo({
            url: "/pagesA/pages/mnld/mnld"
        });
    },
    onShareAppMessage: function() {
        wx.vibrateShort();
        var n = "pagesA/pages/ld/ld";
        return console.log(n), {
            title: "来自好友的电话，快来接吧~",
            path: n,
            imageUrl: "../../images/shareImg.png"
        };
    },
    onShareTimeline: function() {
        return wx.vibrateShort(), {
            title: "你有一个未接来电，点击查看~",
            imageUrl: "../../images/shareImg.png"
        };
    }
});