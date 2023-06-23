Component({
    properties: {
        title: {
            type: String,
            value: ""
        },
        text: {
            type: String,
            value: ""
        },
        iconSrc: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        copyText: function() {
            var t = this.properties.text;
            t && wx.setClipboardData({
                data: t,
                success: function(t) {
                    wx.showToast({
                        title: "已复制",
                        icon: "none"
                    });
                }
            });
        },
        custom: function() {
            this.triggerEvent("custom");
        }
    }
});