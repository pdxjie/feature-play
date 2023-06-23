var t = getApp();

Component({
    options: {
        addGlobalClass: true,
        multipleSlots: true
    },
    properties: {
        bgColor: {
            type: String,
            default: ""
        },
        isCustom: {
            type: [ Boolean, String ],
            default: false
        },
        isBack: {
            type: [ Boolean, String ],
            default: false
        },
        bgImage: {
            type: String,
            default: ""
        }
    },
    data: {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        Custom: t.globalData.Custom
    },
    methods: {
        BackPage: function() {
            wx.navigateBack({
                delta: 1
            });
        },
        toHome: function() {
            wx.reLaunch({
                url: "/pages/index/index"
            });
        }
    }
});