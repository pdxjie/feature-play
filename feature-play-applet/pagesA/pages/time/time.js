Page({
    data: {
        navbarData: {
            page: "not",
            title: "手机计时器",
            backgroundColor: "#0082dc",
            textColor: "#fff",
            capsule: {
                showCapsule: !0,
                capsuleColor: "#fff"
            }
        },
        hours: "00",
        minute: "00",
        second: "00",
        intervarID: "",
        k: "",
        q: ""
    },

    onLoad: function (a) {
       
      },
      showinte:function(){
      
      },
    onShareAppMessage: function() {},
    kaishi: function() {
        var a = this, t = a.data.second, e = a.data.minute, n = a.data.hours;
        a.setData({
            k: "display:none",
            q: "display:none"
        }), a.data.intervarID = setInterval(function() {
            ++t >= 60 && (t = 0, ++e >= 60 && (e = 0, ++n < 10 ? a.setData({
                hours: "0" + n
            }) : a.setData({
                hours: n
            })), e < 10 ? a.setData({
                minute: "0" + e
            }) : a.setData({
                minute: e
            })), t < 10 ? a.setData({
                second: "0" + t
            }) : a.setData({
                second: t
            });
        }, 1e3);
        
    },
    tingzhi: function() {
        clearInterval(this.data.intervarID), this.setData({
            k: "display:hidden",
            q: "display:hidden"
        });
        wx.showModal({
            title: "提示",
            content: "停止计时",
            showCancel: !1,
            cancelText: "否",
            confirmText: "好的",
       
        });
    },
    qingchu: function() {
        this.setData({
            hours: "00",
            minute: "00",
            second: "00",
            intervarID: ""
        });
        wx.showModal({
            title: "提示",
            content: "清除成功",
            showCancel: !1,
            cancelText: "否",
            confirmText: "好的",
        });
    }
});