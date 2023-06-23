Component({
    properties: {
        item: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    watch: {
        item: {
            handler: function(e) {
                console.log("val", e);
            },
            deep: !0
        }
    },
    data: {
        pageMax: 1,
        pageInput: "",
        showPageInput: !1
    },
    methods: {
        previewImage: function(e) {
            var t = e.currentTarget.dataset.image;
            this.triggerEvent("preview", t);
        },
        retry: function(e) {
            var t = e.currentTarget.dataset.id;
            this.triggerEvent("retry", t);
        }
    }
});