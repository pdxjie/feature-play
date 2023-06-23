Component({
    properties: {
        iconSrc: {
            type: String,
            value: "/images/common/text.png"
        },
        showIcon: {
            type: String,
            value: "false"
        },
        type: {
            type: String,
            value: "medium"
        },
        text: {
            type: String,
            value: ""
        },
        buttonStyle: {
            type: Object,
            value: {}
        },
        openType: {
            type: String
        }
    },
    data: {},
    methods: {
        btnClick: function() {
            this.triggerEvent("btnClick");
        },
        btnLongpress: function() {
            this.triggerEvent("btnLongpress");
        },
        button: function() {
            var t = {};
            return "big" == this.properties.type ? Object.assign(t, {
                width: "720rpx"
            }, this.properties.buttonStyle) : "nice" == this.properties.type ? Object.assign(t, {
                width: "530rpx"
            }, this.properties.buttonStyle) : "medium" == this.properties.type ? Object.assign(t, {
                width: "352.5rpx"
            }, this.properties.buttonStyle) : "small" == this.properties.type ? Object.assign(t, {
                width: "230rpx"
            }, this.properties.buttonStyle) : Object.assign(t, this.properties.buttonStyle);
        }
    }
});