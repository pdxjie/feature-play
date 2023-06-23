Component({
    properties: {
        iconSrc: {
            type: String,
            value: ""
        },
        title: {
            type: String,
            value: ""
        },
        detail: {
            type: String,
            value: ""
        },
        listBarStyle: {
            type: Object,
            value: {}
        },
        showGo: {
            type: String,
            value: "true"
        },
        textColor: {
            type: String,
            value: ""
        },
        bgColor: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        clicked: function() {
            this.triggerEvent("clicked");
        }
    }
});