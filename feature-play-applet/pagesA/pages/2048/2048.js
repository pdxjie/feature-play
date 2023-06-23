//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    score: 0,
    maxscore: 0,
    startx: 0,
    starty: 0,
    endx:0,
    endy:0,
    direction:'',
    numbers:[[0,0,2,2],[0,2,4,0],[0,4,0,0],[0,0,0,0]],
    modalHidden: true,
  },
  onLoad: function () {
    //调用API从本地缓存中获取数据
    var maxscore = wx.getStorageSync('maxscore')
    if(!maxscore) maxscore = 0
    this.setData({
      maxscore:maxscore
      })
  },
  storeScore:function(){
      console.log(this.data.maxscore, this.data.score)
      if(this.data.maxscore < this.data.score){
      this.setData({
        maxscore:this.data.score
        })
        wx.setStorageSync('maxscore', this.data.maxscore)
      }
  },
  tapStart: function(event){
    this.setData({
      startx: event.touches[0].pageX,
      starty: event.touches[0].pageY
      })
  },
  tapMove: function(event){
    this.setData({
      endx: event.touches[0].pageX,
      endy: event.touches[0].pageY
      })
  },
  tapEnd: function(event){
    var heng = (this.data.endx) ? (this.data.endx - this.data.startx) : 0;
    var shu = (this.data.endy) ? (this.data.endy - this.data.starty) : 0;
    console.log(heng, shu);
    if(Math.abs(heng) > 5 || Math.abs(shu) > 5){
      var direction = (Math.abs(heng) > Math.abs(shu)) ? this.computeDir(1, heng):this.computeDir(0, shu);
      this.setData({
        startx:0,
        starty:0,
        endx:0,
        endy:0
      })
      this.mergeAll(direction) && this.randInsert();
    }
  },
  computeDir: function(heng, num){
    if(heng) return (num > 0) ? 'right' : 'left';
    return (num > 0) ? 'bottom' : 'top';
  },

  mergeAll: function(dir){
    this.checkGame();
    switch(dir){
      case 'left':
        return this.mergeleft();
        break;
      case 'right':
        return this.mergeright();
        break;
      case 'top':
        return this.mergetop();
        break;
      case 'bottom':
        return this.mergebottom();
        break;
      default:
    }
  },

  //左划
  mergeleft: function(){
    var change = false;
    var arr = this.data.numbers;
    
    for(var i = 0; i < 4; i++){
      //merge first
      for(var j = 0; j < 3; j++){
        if(arr[i][j] == 0) continue;
        for(var k = 1; k < 4-j; k++){
          if(arr[i][j] != 0 && arr[i][j+k] != 0){
            if(arr[i][j] != arr[i][j+k]) break;   //不相同则直接跳过
            arr[i][j] = arr[i][j] *2;
            arr[i][j+k] = 0;
            change = true;
            this.setData({
            score: this.data.score + arr[i][j]/2
            })
            break;
          }
        }
      }
      //movemove
      for(var j = 0; j < 3; j++){
        if(arr[i][j] == 0){
          for(var k = 1; k < 4-j; k++){
            if(arr[i][j+k] != 0){
              arr[i][j] = arr[i][j+k];
              arr[i][j+k] = 0;
              change = true;
              break;
            }
          }
        }
      }
    }
    this.setData({
          numbers:arr
          })
    this.storeScore()
    return change
  },
  //右滑
  mergeright: function(){
    var change = false
    var arr = this.data.numbers;
    
    for(var i = 0; i < 4; i++){
      //merge first
      for(var j = 3; j > 0; j--){
        if(arr[i][j] == 0) continue;
        for(var k = 1; k <= j; k++){
          if(arr[i][j] != 0 && arr[i][j-k] != 0){
            if(arr[i][j] != arr[i][j-k]) break;
            arr[i][j] = arr[i][j] *2;
            arr[i][j-k] = 0;
            change = true;
            this.setData({
            score: this.data.score + arr[i][j]/2
            })
            break;
          }
        }
      }
      //movemove
      for(var j = 3; j > 0; j--){
        if(arr[i][j] == 0){
          for(var k = 1; k <= j; k++){
            if(arr[i][j-k] != 0){
              arr[i][j] = arr[i][j-k];
              arr[i][j-k] = 0;
              change = true;
              break;
            }
          }
        }
      }
    }
    this.setData({
          numbers:arr
          })
    this.storeScore()
    return change
  },
  //下划
  mergebottom: function(){
    var change = false
    var arr = this.data.numbers;
    
    for(var i = 0; i < 4; i++){
      //merge first
      for(var j = 3; j > 0; j--){
        if(arr[j][i] == 0) continue;
        for(var k = 1; k <= j; k++){
          if(arr[j][i] != 0 && arr[j-k][i] != 0){
            if(arr[j][i] != arr[j-k][i]) break;
            arr[j][i] = arr[j][i] *2;
            arr[j-k][i] = 0;
            change = true
            this.setData({
            score: this.data.score + arr[j][i]/2
            })
            break;
          }
        }
      }
      //movemove
      for(var j = 3; j > 0; j--){
        if(arr[j][i] == 0){
          for(var k = 1; k <= j; k++){
            if(arr[j-k][i] != 0){
              arr[j][i] = arr[j-k][i];
              arr[j-k][i] = 0;
              change = true
              break;
            }
          }
        }
      }
    }
    this.setData({
          numbers:arr
          })
    this.storeScore()
    return change
  },
  //上滑
  mergetop: function(){
    var change = false
    var arr = this.data.numbers;
    
    for(var i = 0; i < 4; i++){
      //merge first
      for(var j = 0; j < 3; j++){
        if(arr[j][i] == 0) continue;
        for(var k = 1; k < 4-j; k++){
          if(arr[j][i] != 0 && arr[j+k][i] != 0){
            if(arr[j][i] != arr[j+k][i]) break;
            arr[j][i] = arr[j][i] *2;
            arr[j+k][i] = 0;
            change = true
            this.setData({
            score: this.data.score + arr[j][i]/2
            })
            break;
          }
        }
      }
      //movemove
      for(var j = 0; j < 3; j++){
        if(arr[j][i] == 0){
          for(var k = 1; k < 4-j; k++){
            if(arr[j+k][i] != 0){
              arr[j][i] = arr[j+k][i];
              arr[j+k][i] = 0;
              change = true
              break;
            }
          }
        }
      }
    }
    this.setData({
          numbers:arr
          })
    this.storeScore()
    return change
  },
  //随机插入
  randInsert: function(){
    var arr = this.data.numbers
    //随机2或4
    num = Math.random() < 0.8 ? 2 : 4
    //计算随机位置
    var zeros = [];
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        if(arr[i][j] == 0){
            zeros.push([i, j]);
        }
      }
    }
    var position = zeros[Math.floor(Math.random() * zeros.length)];
    arr[position[0]][position[1]] = num
    this.setData({
      numbers:arr
      })
    //this.checkGame()
  },
  checkGame: function(){
    var arr = this.data.numbers
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        if(arr[i][j] == 0) return;
      }
    }
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        if(arr[i][j] == arr[i+1][j] || arr[i][j] == arr[i][j+1]) return;
      }
    }
        
    for(var j = 0; j < 3; j++){
      if(arr[3][j] == arr[3][j+1]) return;
      if(arr[j][3] == arr[j+1][3]) return;
    }
    this.setData({
      modalHidden: false,
    })
  },
  modalChange:function(){
    this.setData({
      score: 0,
      numbers:[[0,0,2,2],[0,2,4,0],[0,4,0,0],[0,0,0,0]],
      modalHidden: true,
    })
  },
  modalCancle:function(){
    this.setData({
      modalHidden: true,
    })
  },
  onShareAppMessage: function() {
    return {
        title: "我拿到2048分，看看你能玩几分？",
        path: "/pagesA/pages/2048/2048",
       
    };
},
})
