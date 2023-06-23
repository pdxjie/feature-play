Component({
    properties: {
        pid: {
            type: Number,
            value: 0,
            observer: function(t) {
                var i = this;
                t && this.setData({
                    animate: true
                }, function() {
                    i.setData({
                        translateX: 0
                    });
                });
            }
        }
    },
    data: {
        translateX: 0,
        animate: false
    },
    methods: {
        handleTouchStart: function(t) {
            var i = this;
            this.setData({
                animate: false
            }, function() {
                i.touchStartX = t.touches[0].pageX, i.touchStartY = t.touches[0].pageY, i.startX = i.data.translateX, 
                i.direction = null;
            });
        },
        handleTouchMove: function(t) {
            this.touchMoveX = t.touches[0].pageX, this.touchMoveY = t.touches[0].pageY, this.moveX = this.touchMoveX - this.touchStartX, 
            Math.abs(this.touchMoveY - this.touchStartY) > Math.abs(this.moveX) ? this.direction = "Y" : (this.direction = "X", 
            0 === this.startX && this.moveX > 0 || this.startX === -this.actionWidth && this.moveX < 0 || (Math.abs(this.moveX) >= this.actionWidth ? (this.moveX = this.moveX < 0 ? -this.actionWidth : this.actionWidth, 
            this.setData({
                translateX: this.moveX
            })) : this.setData({
                translateX: this.touchMoveX - this.touchStartX + this.startX
            })));
        },
        handleTouchEnd: function(t) {
            var i = this;
            if ("X" === this.direction) {
                var a = 0;
                a = this.moveX + this.startX >= 0 ? 0 : this.moveX + this.startX <= -this.actionWidth ? -this.actionWidth : 0 === this.startX && Math.abs(this.moveX) < this.actionWidth / 2 || this.startX === -this.actionWidth && Math.abs(this.moveX) > this.actionWidth / 2 ? 0 : -this.actionWidth, 
                this.setData({
                    animate: true
                }, function() {
                    i.setData({
                        translateX: a
                    });
                });
            }
        },
        handleAction: function(t) {
            var i = t.currentTarget.dataset;
            this.triggerEvent("action", {
                type: i.type,
                id: this.data.pid
            }), this.setData({
                translateX: 0
            });
        }
    },
    ready: function() {
        this.actionWidth = 60;
    }
});