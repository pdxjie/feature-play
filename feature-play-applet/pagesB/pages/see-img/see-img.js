var e = getApp();

require("../../utils/request.js");

Page({
    data: {
        isIPX: e.isIPX,
        imgsrc: "",
        sys: wx.getSystemInfoSync()
    },
    onLoad: function(e) {
        var t = this, s = t.data, i = s.isIPX, a = s.customStyle;
        if (e.src) {
            var o = e.src.split("q70")[0].slice(-4), n = decodeURIComponent(e.src.replace(o, "w1080"));
            -1 != n.indexOf("mi-img") && (n = n.replace("mi-img", "xiaomi")), t.setData({
                imgsrc: n
            });
        }
        i ? t.setData({
            customStyle: a + "top:88rpx;"
        }) : t.setData({
            customStyle: a + "top:40rpx;"
        });
    },
    inSeeImg: function() {
        var e = this.data.imgsrc;
        wx.previewImage({
            current: e,
            urls: [ e ]
        });
    },
    inToPage: function() {
        wx.navigateTo({
            url: "/pagesB/pages/index/index"
        });
    },
    inDowmImg: function(e) {
        var t = this.data.imgsrc;
        wx.showLoading({
            title: "保存中...",
            mask: !0
        }), wx.getImageInfo({
            src: "https://" + t.replace(t.split(".market")[0], "f6"),
            success: function(e) {
                wx.hideLoading();
                var t = e.path;
                wx.saveImageToPhotosAlbum({
                    filePath: e.path,
                    success: function(e) {
                        wx.showToast({
                            title: "保存成功",
                            icon: "none"
                        });
                    },
                    fail: function(e) {
                        wx.hideLoading(), wx.showModal({
                            content: "授权后才能下载到本地，是否重新授权？",
                            success: function(e) {
                                e.confirm && wx.openSetting({
                                    success: function(e) {
                                        e.authSetting["scope.writePhotosAlbum"] && wx.saveImageToPhotosAlbum({
                                            filePath: t,
                                            success: function(e) {
                                                wx.showToast({
                                                    title: "保存成功",
                                                    icon: "none"
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function() {
        var e = this.data.imgsrc;
        return {
            title: "这张壁纸喜不喜欢？",
            imageUrl: e,
            path: "pagesB/pages/see-img/see-img?src=" + encodeURIComponent(e)
        };
    }
});