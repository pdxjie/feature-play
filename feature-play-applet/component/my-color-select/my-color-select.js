Component({
    properties: {
        title: {
            type: String,
            value: ""
        },
        colorList: {
            type: Array,
            value: []
        },
        showModal: {
            type: Number,
            value: 0
        },
        isShowModal: {
            type: Boolean,
            value: false
        }
    },
    data: {
        isShowModal: false,
        isGoingClose: false,
        timer: null
    },
    methods: {
        chooseColor: function(t) {
            var o = t.currentTarget.dataset.idx;
            this.triggerEvent("chooseColor", o), this.closeModal();
        },
        closeModal: function() {
            var t = this;
            t.setData({
                isGoingClose: true
            }), t.data.timer && clearTimeout(t.data.timer), t.data.timer = setTimeout(function() {
                t.setData({
                    isShowModal: false,
                    isGoingClose: false
                });
            }, 300);
        }
    }
});