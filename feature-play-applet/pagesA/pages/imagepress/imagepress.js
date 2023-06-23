var e = require("../../until/index"),
    t = null,
    a = null;

Page({
    data: {
        size: 0,
        compressedSize: 0,
        compressedSrc: "",
        imageInfo: {},
        quality: 1,
        targetSize: 0,
        compressedPath: "",
        exif: {},
        isShowImageInfo: !1,
        width: 340,
        height: 340,
        compressing: !1,
        isShowTips: !0,
        isShowSetting: !1,
        originImageSrc: "",
        isShareing: !1,
        isAdSuccess: !1
    },
    onLoad: function (y) {
        var e = this;
        getApp().showADlist().then(function() {
            var b = wx.getStorageSync("adlist");
          e.setData({
              appConfig: b
          })
          e.showinte();
          console.log(b.token)
          wx.createRewardedVideoAd && ((t = wx.createRewardedVideoAd({
            adUnitId: b.ad.wxreward
        })).onClose(function(t) {
            t && t.isEnded ? wx.saveImageToPhotosAlbum({
                filePath: e.data.compressedSrc,
                success: function() {
                    e.showToast("保存成功！");
                }
            }) : wx.showToast({
                title: "保存失败！",
                icon: "none",
                duration: 3e3
            });
        }), t.onLoad(function() {
            console.log("onLoad event emit");
        }), t.offClose(function (t) {}), 
        t.onError(function(t) {
            console.log("onError event emit", t), 
            wx.saveImageToPhotosAlbum({
                filePath: e.data.compressedSrc,
                success: function() {
                    e.showToast("保存成功！");
                }
            });
        }))
     
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
    chooseImage: function () {
        var e = this;
        wx.chooseImage({
            count: 9,
            sizeType: ["original"], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ["album", "camera"],
            success: function (t) {
                var tempFilePaths = t.tempFilePaths[0]
                wx.showLoading({
                  title: '安全检测中...',
                });
                wx.uploadFile({
                    filePath: tempFilePaths,
                    name: "file",
                    success: function (res) {
                      wx.hideLoading()
                            wx.showToast({
                                title: "图片检测完成",
                                icon: "none",
                                duration: 1500
                            });
                            e.setData({
                                compressedSrc: "",
                                isShowTips: !1,
                                imageInfo: {},
                                compressedSize: 0,
                                originImageSrc: t.tempFilePaths[0]
                            }, function () {
                            
                                var s = t.tempFilePaths[0];
                                e.getExifInfo(s, "size"), e.drawAndCompressImage(s);
                            });
                       
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
    drawAndCompressImage: function (e) {
        var t = this;
        wx.getImageInfo({
            src: e,
            success: function (a) {
                t.setData({
                    imageInfo: a
                });
                var s = 340,
                    i = 340;
                a.width > a.height && (i = parseInt(340 * a.height / a.width)), a.width < a.height && (s = parseInt(340 * a.width / a.height)),
                    t.setData({
                        width: s,
                        height: i
                    }, function () {
                        var a = wx.createCanvasContext("myCanvas");
                        a.clearRect(0, 0, s, i), a.setFontSize(20), a.drawImage(e, 0, 0, s, i), a.draw(!1, function () {
                            setTimeout(function () {
                                t.compressImage(1);
                            }, 0);
                        });
                    });
            }
        });
    },
    compressImage: function (e) {
        var t = this;
        wx.canvasToTempFilePath({
            canvasId: "myCanvas",
            quality: e,
            fileType: "jpg",
            destWidth: t.data.imageInfo.width,
            destHeight: t.data.imageInfo.height,
            success: function (e) {
                t.setData({
                    compressedPath: e.tempFilePath,
                    compressing: !0
                }, function () {
                    t.getExifInfo(e.tempFilePath, "compressedSize");
                });
            },
            fail: function (e) {
                this.showToast("压缩失败！" + e.errMsg);
            }
        });
    },
    getExifInfo: function (t, a) {
        var s = this;
        wx.getFileSystemManager().readFile({
            filePath: t,
            success: function (i) {
                if ("size" === a) wx.getImageInfo({
                    src: t,
                    success: function (t) {
                        s.setData({
                            exif: "gif" !== t.type ? e.load(i.data) : {},
                            size: Math.floor(i.data.byteLength / 1024),
                            targetSize: Math.floor(i.data.byteLength / 1024 * .7)
                        });
                    }
                });
                else if (i.data.byteLength / 1024 > s.data.targetSize && s.data.quality > .05) {
                    var o = s.data.quality - .05;
                    s.setData({
                        quality: o
                    }, function () {
                        s.compressImage(o);
                    });
                } else s.setData({
                    compressedSrc: s.data.compressedPath,
                    compressedSize: Math.floor(i.data.byteLength / 1024),
                    quality: 1,
                    compressing: !1
                });
            }
        });
    },
    handlePreviewCompressImage: function () {
        wx.previewImage({
            current: this.data.compressedSrc,
            urls: [this.data.originImageSrc, this.data.compressedSrc],
            showmenu: !1
        });
    },
    handlePreviewOriginImage: function () {
        var e = this.data.compressedSrc ? [this.data.originImageSrc, this.data.compressedSrc] : [this.data.originImageSrc];
        wx.previewImage({
            current: this.data.originImageSrc,
            urls: e,
            showmenu: !1
        });
    },
    saveCompressedImage: function () {
        var e = this;
        //e.showAd();
        wx.getSetting({
            success: function (t) {
               
                wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function () {
                          wx.saveImageToPhotosAlbum({
                            filePath: e.data.compressedSrc,
                            success: function() {
                                e.showToast("保存成功！");
                            }
                        });
                    },
                    fail: function () {
                        e.setData({
                            isShowSetting: !0
                        });
                    }
                });
            }
        });
    },
    showAd: function() {
      console.log(e)
        // wx.showToast({
        //     title: "观看广告保存图片",
        //     icon: "none"
        // }),
        //  setTimeout(function() {
        //     t.show().catch(function() {
        //         t.load().then(function() {
        //             return t.show();
        //         });
        //     });
        // }, 1500);
        wx.showModal({
            title: "提示",
            content: this.data.appConfig.ad.vadts,
            cancelText: "取消",
            confirmText: "看一下吧",
            success: function(o) {
                o.confirm ? t && (t.show().catch(function() {
                    t.load().then(function() {
                        return t.show();
                    }).catch(function(t) {
                        wx.saveImageToPhotosAlbum({
                            filePath: e.data.compressedSrc,
                            success: function() {
                                e.showToast("保存成功！");
                            }
                        });
                    });
                }), t.onClose(function(t) {
                  if (!t) return
                  t.offClose()
                    t && t.isEnded || void 0 === t ? wx.saveImageToPhotosAlbum({
                        filePath: e.data.compressedSrc,
                        success: function() {
                            e.showToast("保存成功！");
                        }
                    }): wx.showToast({
                        title: "您放弃了使用该功能",
                        icon: "none"
                    });
                })) : o.cancel && wx.showToast({
                    title: "期待下次您的使用",
                    icon: "none"
                });
            }
        });
    },
    showToast: function (e, t) {
        wx.showToast({
            title: e,
            icon: t ? "loading" : "success"
        });
    },
    handleDetail: function () {
        this.setData({
            isShowImageInfo: !this.data.isShowImageInfo
        });
    },
    handleSliderChange: function (e) {
        var t = this;
        this.setData({
            targetSize: e.detail.value,
            compressedSrc: "",
            compressedSize: 0
        }, function () {
            t.data.targetSize !== t.data.size && (0 === t.data.targetSize ? t.setData({
                quality: .01
            }, function () {
                t.compressImage(.01);
            }) : t.compressImage(1));
        });
    },
    handleClickSticker: function () {
        var e = this.data.targetSize === this.data.size;
        if (this.data.compressedSrc || e) {
            var t = this;
            wx.navigateTo({
                url: "../sticker/sticker",
                success: function (a) {
                    a.eventChannel.emit("acceptDataFromOpenerPage", {
                        compressedPath: e ? t.data.originImageSrc : t.data.compressedSrc,
                        width: t.data.width,
                        height: t.data.height,
                        imageInfo: t.data.imageInfo
                    });
                }
            });
        } else this.showToast("等等，马上就好", !0);
    },
    openSetting: function () {
        var e = this;
        wx.openSetting({
            withSubscriptions: !0,
            success: function (t) {
                t.authSetting["scope.writePhotosAlbum"] && e.setData({
                    isShowSetting: !1
                });
            }
        });
    },
    onShareAppMessage: function () {
        return {
            title: "欢迎使用图片压缩助手",
            path: "/pagesA/pages/imagepress/imagepress",
        };
    },
    handleShare: function () {
        var e = this;
        this.data.isShareing || this.setData({
            isShareing: !0
        }, function () {
            wx.showToast({
                title: "长按图片，发送给朋友",
                icon: "none"
            }), setTimeout(function () {
                wx.previewImage({
                    current: e.data.compressedSrc,
                    urls: [e.data.compressedSrc],
                    showmenu: !1
                }), e.setData({
                    isShareing: !1
                });
            }, 600);
        });
    },
    onShareTimeline: function () {
        return {};
    }
});