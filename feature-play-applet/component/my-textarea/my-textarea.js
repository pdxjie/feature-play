Component({
    properties: {
        iconSrc: {
            type: String,
            value: ""
        },
        Height: {
            type: Number,
            value: 500
        },
        placeholder: {
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
        },
        inputValue: {
            type: String,
            value: ""
        }
    },
    data: {
        inputValue: "",
        showDelete: false
    },
    methods: {
        areaInput: function(e) {
            var t = e.detail.value;
            null == t || 0 === t.length ? this.setData({
                showDelete: false
            }) : this.setData({
                showDelete: true
            }), this.setData({
                inputValue: t
            }), this.triggerEvent("areaInput", this.data.inputValue);
        },
        areaDelete: function() {
            this.setData({
                showDelete: false,
                inputValue: ""
            });
        }
    }
});