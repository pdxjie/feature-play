getApp();

var t = null;

Page({
    data: {
        cptype:"",
        formats: [ "jpg", "png"],
        formatIndex: 1,
        src:"../../images/alipay_format.jpeg",
        type:"format"
    },

        onLoad: function(a) {

            var that = this;
           getApp().showADlist().then(function() {
              var e = wx.getStorageSync("adlist");
              
              that.setData({
                appConfig: e
            })
              that.showinte();
         
        
            })
          },
        showinte:function(){
            var that = this;
            let InterstitialAd;
            if (that.data.appConfig.ad.wxinter) {
              if (wx.createInterstitialAd) {
                InterstitialAd = wx.createInterstitialAd({
                  adUnitId: that.data.appConfig.ad.wxinter
                })
                InterstitialAd.onLoad(() => {})
                InterstitialAd.offClose();
                InterstitialAd.offError();
                InterstitialAd.onError((err) => {})
                InterstitialAd.onClose(() => {})
              }
              // 在适合的场景显示插屏广告
              if (InterstitialAd) {
                if (that.data.appConfig.ad.insetgp == 1) {
                  that.inadset = setInterval(() => {
                    InterstitialAd.show().catch((err) => {
                      console.error(err)
                    })
                  }, that.data.appConfig.ad.wxinsettime*1000)
                } else {
                  setTimeout(() => {
                    InterstitialAd.show().catch((err) => {
                      console.error(err)
                    })
                  },  that.data.appConfig.ad.wxinsettime*1000)
                }
              }
            } 
          },
  
   

    save: function() {
        wx.saveImageToPhotosAlbum({
            filePath: this.data.cpimgpaht,
            success: function() {
                wx.showModal({
                    title:'提示',
                    content: "保存成功，请前往相册查看"
                });
            }
        });
    },

    chooseImage: function() {
        var t = this;
       wx.chooseImage({
             count: 1, 
            success: function(e) {
             var img=   e.tempFiles[0].path;
             console.log(e)
             wx.showLoading({
                title: '安全检测中...',
              });
             wx.uploadFile({
                    filePath: img,
                    name: "file",
                success: function (res) {
                    wx.hideLoading()
                    wx.showToast({
                      title: "图片检测完成",
                      icon: "none",
                      duration: 1500
                    });
                  
                    t.setData({
                        src: img,
                    });
                    t.getinfo(img)
              
                },
                fail: function (err) {
                  wx.showToast({
                    title: "上传失败",
                    icon: "none",
                    duration: 2000
                  })
                },
                complete: function (result) {
                  console.log(result.errMsg)
                }
              })


               
            }
        });
    },
    onShareAppMessage: function(t) {
        return this.setData({
            shared: !0,
            showTip: !1
        }), {
            title: "图片照片转换",
            path: "/pagesA/pages/indexgs/index",
            imageUrl: "https://i.loli.net/2020/11/05/nUC9P58Iesmu14V.png"
        };
    },
    compressImage: function(t, e) {
        console.log(t)
        if(e=="../../image/alipay_format.jpeg")
        {
            wx.showModal({
                 title:'提示',
                 content:"请选择图片后再操作！",
                showCancel: !1,
            }); 
        }else{
        wx.showLoading({
            title: "转换中..."
        });

        var i = this;
        wx.getImageInfo({
            src: e,
            success: function(e) {
                var a = e.width, s = e.height;
                i.setData({
                    cWidth: a,
                    cHeight: s
                });
                var o = wx.createCanvasContext("canvas",this);
                 o.drawImage(e.path, 0, 0, a, s),
                 o.draw(false, setTimeout(function() {
                    wx.canvasToTempFilePath({
                        canvasId: "canvas",
                        destWidth: a,
                        destHeight: s,
                        fileType: t,
                        quality: i.data.quality,
                        success: function(t) {
                            wx.hideLoading();
                            var e = t.tempFilePath;
                            i.setData({
                                cpimgpaht: e,
                            }),
                            wx.showModal({
                                title:'提示',
                                content: "图片转换格式成功，请点击下方保存",
                                showCancel: !1,
                            });
                        },
                        fail: function(t) {
                            console.log(t.errMsg);
                        }
                    });
                }, 100));
            },
            fail: function(t) {
                console.log(t.errMsg);
            }
        });
    }
    },
    getinfo: function(t) {
        var e = this;
        wx.getImageInfo({
            src: t,
            success: function(i) {
                wx.getFileInfo({
                    filePath: t,
                    success: function(a) {
                        e.setData({
                            cptype: i.type,
                        })
                        console.log(i.type)
                    }
                });
            }
        });
    },
    bindOptionsChange: function(t) {
        var i = this.data.formats[t.detail.value];
        this.setData({
            quality: 1
        }), this.compressImage(i, this.data.src);
    },

});