Component({
    properties: {
        bgColor: {
            type: String,
            value: "#292929"
        },
        iconSrc: {
            type: String,
            value: ""
        },
        showIcon: {
            type: String,
            value: "false"
        },
        showDelete: {
            type: String,
            value: "true"
        },
        type: {
            type: String,
            value: "text"
        },
        placeholder: {
            type: String,
            value: ""
        },
        inputValue: {
            type: String,
            value: ""
        },
        inputStyle: {
            type: Object,
            value: {}
        },
        autofocus: {
            type: String,
            value: "false"
        },
        maxlength: {
            type: Number,
            value: 9999999
        }
    },
    data: {
        inputValue: "",
        delShow: false
    },
    methods: {
        onChange: function(e) {
            var t = e.detail.value, a = e.detail.cursor;
            null == t || 0 === t.length ? this.setData({
                delShow: false
            }) : this.setData({
                delShow: true
            });
            var l = {
                value: t,
                cursor: a
            };
            this.triggerEvent("onChange", l);
        },
        del: function() {
            this.setData({
                delShow: false,
                inputValue: ""
            });
        }
    }
});