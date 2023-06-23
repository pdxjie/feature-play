getApp(), Page({
    data: {},
    onLoad: function(a) {},
    clickUrl: function() {
        wx.setClipboardData({
            data: "",
            success: function(a) {
                wx.hideToast();
            }
        });
    },
    clickQQ: function() {
        wx.setClipboardData({
            data: "1809613180",
            success: function(a) {
                wx.hideToast();
            }
        });
    }
});