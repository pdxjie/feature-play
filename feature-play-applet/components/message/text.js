Component({
    properties: {
        text: {
            type: String,
            default: ""
        }
    },
    methods: {
        onCopySuccess: function() {
            app.util.message("已复制");
        },
        onCopyError: function() {
            app.util.message("已复制", "error");
        },
        trim: function(e) {
            return e.replace(/(^\s*)|(\s*$)/g, "");
        }
    }
});