//index.js
//获取应用实例
const app = getApp()
var qq=require("../libs/request.js")

Page({
  data:{
    navbar: ['护肤', '服装', '香水', '个人护理'],
    searchContent:"",
    currentTab: 0,
    content:0,
    musicArr:[],
    bottomHide:true,
    dataHide:true,
    // banner
    imgUrls: [
      'http:\/\/mz.djmall.xmisp.cn\/files\/banner\/20161219\/148211980641.png',
      'http:\/\/mz.djmall.xmisp.cn\/files\/banner\/20161222\/148238831285.png',
      'http:\/\/mz.djmall.xmisp.cn\/files\/banner\/20161222\/14823895573.png'
    ],
    goodslist: [
      {
        id: "001",
        imgUrl: "http://img5.imgtn.bdimg.com/it/u=2906541843,1492984080&fm=23&gp=0.jpg",
        name: "女装T恤中长款大码摆裙春夏新款",
        price: "65.00"
      },
      {
        id: "002",
        imgUrl: "http://img4.imgtn.bdimg.com/it/u=1004404590,1607956492&fm=23&gp=0.jpg",
        name: "火亮春秋季 男青年修身款圆领男士T恤",
        price: "68.00"
      },
      {
        id: "003",
        imgUrl: "http://img1.imgtn.bdimg.com/it/u=2305064940,3470659889&fm=23&gp=0.jpg",
        name: "新款立体挂脖t恤女短袖大码宽松条纹V领上衣显瘦休闲春夏",
        price: "86.00"
      },
      {
        id: "004",
        imgUrl: "http://img4.imgtn.bdimg.com/it/u=3986819380,1610061022&fm=23&gp=0.jpg",
        name: "男运动上衣春季上新品 上衣流行装青年",
        price: "119.00"
      },
      {
        id: "005",
        imgUrl: "http://img1.imgtn.bdimg.com/it/u=3583238552,3525141111&fm=23&gp=0.jpg",
        name: "时尚字母三角露胸t恤女装亮丝大码宽松不规则春夏潮",
        price: "69.00"
      },
      {
        id: "006",
        imgUrl: "http://img2.imgtn.bdimg.com/it/u=1167272381,3361826143&fm=23&gp=0.jpg",
        name: "新款立体挂脖t恤短袖大码宽松条纹V领上衣显瘦休闲春夏",
        price: "86.00"
      },
      {
        id: "007",
        imgUrl: "http://img0.imgtn.bdimg.com/it/u=789486313,2033571593&fm=23&gp=0.jpg",
        name: "时尚字母三角露胸t恤女装亮丝大码宽松不规则春夏潮",
        price: "119.00"
      },
      {
        id: "008",
        imgUrl: "http://img2.imgtn.bdimg.com/it/u=3314044863,3966877419&fm=23&gp=0.jpg",
        name: "男运动上衣春季上新品 上衣流行装青年",
        price: "69.00"
      },
    ]   

  },
  tabs:function(e){
    this.setData({
      currentTab:e.target.dataset.id
    })
  },
  add:function(e){
    var fa = false;
    var clkid=e.target.dataset.id;
    var goodslist = this.data.goodslist
    for(var i=0;i<goodslist.length;i++){
      if(goodslist[i].id==clkid){
        // console.log(goodslist[i])
        goodslist[i].times=1
        var arr=wx.getStorageSync("cart")||[];
        if(arr.length>0){
          // 循环arr，判断是否有点击的数据
          for (var j = 0; j < arr.length; j++) {
            if (arr[j].id == clkid) {
              // 存在的次数+1
              arr[j].times += 1
              fa=true;
            } 
          }
        }
          // 不存在的存进去
          if (!fa) {
            arr.unshift(goodslist[i])
            fa = false
          }
        }
      }
      try {
        wx.setStorageSync("cart", arr)
      } catch (e) {
        console.log(e)
      }
    },

  onLoad: function () {
   
  },
  // input框内数据
  search:function(e){
    // 先打印输出形参e
    // 将想要的数据保存到data中
    this.setData({
      searchContent:e.detail.value
    })
  },
  // 点击搜索事件
  find:function(){
    this.setData({
      dataHide:true,
      musicArr:[],
      content:0
    })
    this.bottom()
  },
  // 滑动到底部事件
  bottom: function () {
    var that = this;
    // 请求的次数+1
    that.setData({
      content: that.data.content + 1,
      bottomHide:false
    })
    // 请求数据（关键字，次数，条数，回调函数）
    qq.getSearchMusic(that.data.searchContent, that.data.content, 12, function (e) {
      if (e.data.song.list.length>0) {
        var arr = that.data.musicArr.concat(e.data.song.list)
        that.setData({
          musicArr: arr,
          bottomHide:true
        })
      }else{
        that.setData({
          dataHide: false,
          bottomHide:true
        })
      }
    })
  },
})
