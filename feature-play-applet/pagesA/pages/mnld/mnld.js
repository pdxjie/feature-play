var a = getApp();

Page({
    data: {
        isFromShare: !1,
        name: "爸爸",
        city: "中国",
        ringIndex: 0,
      
        index: null,
        lsIndex: null,
        isLogin: !1,
        bgPic: "",
        userName: "",
        region: [ "福建省", "泉州市" ],
        ringList: [ "儿子我是你爸爸", "我就是你五百年后的老公", "蜡笔小新版脱掉", "哦你妈个头啊", "起床啦宝贝", "猪不会脑筋急转弯", "蚊子", "大姐姐你很无聊吗", "就不接电话", "让子弹飞葛优搞笑台词", "老公啊, 好想你啊", "老实交代", "海大富接电话", "我就静静的看着你装逼", "说你爱我吧", "诺基亚倾慕(变调)" ],
        nameList: [ "爸爸", "老公", "小新", "妈", "宝贝", "脑筋急转弯", "蚊子", "小姐姐", "接电话", "葛优", "老婆", "老实交代", "海公公", "静静", "小可爱", "诺基亚" ],
        cardCur: 0,
        swiperList: [ {
            id: 0,
            type: "image",
            url: "https://mmbiz.qpic.cn/mmbiz_png/xY2YYFRCupO1ibRvVcSwfDoK5CRUpziaGW5Ju2keY3P9Y5nCztNiaRuq3DBia1Ja58Pm8FZbJ3nRwEQGS5K1XOkwIg/0?wx_fmt=png"
        } ]
    },
    onLoad: function() {
        var a = wx.getStorageSync("userInfo");
        a ? this.setData({
            isLogin: !0,
            bgPic: a.avatarUrl.replace("/132", "/0"),
            userName: a.nickName
        }) : this.setData({
            isLogin: !1
        });
    },
    onShow: function() {},
    preview: function() {
        wx.vibrateShort();
        var a = this.data.index, e = this.data.region[0] + " " + this.data.region[1], t = this.data.lsIndex, i = "";
        i = a ? this.data.nameList[a] : "好友" + this.data.userName;
        var n = 0, s = "/pagesA/pages/ld/ld?id=" + (n = t || 0) + "&userName=" + i + "&city=" + e;
        wx.redirectTo({
            url: s
        });
    },
    PickerChange: function(a) {
        console.log(a), this.setData({
            index: a.detail.value
        });
    },
    PickerlSChange: function(a) {
        console.log(a), this.setData({
            lsIndex: a.detail.value
        });
    },
    RegionChange: function(a) {
        this.setData({
            region: a.detail.value
        });
    },
    getUserProfile: function(a) {
        wx.vibrateShort();
        var e = this;
        e.data.isLogin ? wx.showToast({
            title: "请点击下一步哦~",
            icon: "none",
            duration: 1e3
        }) : wx.getUserProfile({
            desc: "业务需要",
            success: function(a) {
               e.setData({
                    isLogin: !0,
                    bgPic: a.userInfo.avatarUrl.replace("/132", "/0"),
                    userName: a.userInfo.nickName
                });
            }
        });
    },
    onShareAppMessage: function() {
        wx.vibrateShort();
        var a = this.data.index, e = this.data.region[0] + " " + this.data.region[1], t = this.data.lsIndex, i = "";
        i = a ? this.data.nameList[a] : "好友" + this.data.userName;
        var n = 0, s = "pagesA/pages/ld/ld?id=" + (n = t || 0) + "&userName=" + i + "&city=" + e;
        return console.log(s), {
            title: "您有一个未接来电，请接听",
            path: s,
            imageUrl: "https://mmbiz.qpic.cn/mmbiz_png/xY2YYFRCupNvibDaPdUXicYFL7JiaiaUVDperd2wgoSllY2EJTQzLwc1EsiarIiceeOKu4YZHMUabzSG85gEfOjQ6qjg/0?wx_fmt=png"
        };
    },
    onShareTimeline: function() {
        return wx.vibrateShort(), {
            title: "你有一个未接来电，点击查看~",
            imageUrl: "../../images/shareImg.png"
        };
    }
});