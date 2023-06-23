Component({
    properties: {
        title: {
            type: String,
            value: ""
        },
        actionList: {
            type: Array,
            value: []
        },
        showPanel: {
            type: Number,
            value: 0
        },
        isShowPanel: {
            type: Boolean,
            value: false
        }
    },
    data: {
        isShowPanel: false
    },
    methods: {
        choose: function(e) {
            var t = e.currentTarget.dataset.idx;
            "undefined" != t && null != t || (t = 1), this.setData({
                isShowPanel: false
            }), this.triggerEvent("choose", t);
        },
        closePanel: function() {
            this.setData({
                isShowPanel: false
            });
        }
    }
});