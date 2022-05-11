// pages/linePatRec/linePatRec.js
var linePatRec;
var rootIP;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    linePatRec=this;
    rootIP=getApp().getRootIP();
    let staff=wx.getStorageSync("staff");
    console.log("staff===="+staff)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    linePatRec.getPLTotalInfo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getPLTotalInfo:function(){
    wx.request({
      url: rootIP+"getPLTotalInfo",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        linePatRec.setData({usualPlList:data.usualPlList});
        linePatRec.setData({tempPlList:data.tempPlList});
        let e={currentTarget:{dataset:{type:1}}};
        linePatRec.showPlListByPpType(e);
        linePatRec.setData({jrxjwcl:data.jrxjwcl});
      }
    })
  },
  showPlListByPpType:function(e){
    let xjlxItem1Style;
    let xjlxItem2Style;
    let plList;
    let type=e.currentTarget.dataset.type;
    if(type=="1"){
      xjlxItem1Style="selected_item_v";
      xjlxItem2Style="unSelected_item_v";
      plList=linePatRec.data.usualPlList;
    }
    else if(type=="2"){
      xjlxItem1Style="unSelected_item_v";
      xjlxItem2Style="selected_item_v";
      plList=linePatRec.data.tempPlList;
    }
    linePatRec.setData({xjlxItem1Style:xjlxItem1Style,xjlxItem2Style:xjlxItem2Style,plList:plList});
  },
  /**
   * 扫码事件:https://blog.csdn.net/qq_29528701/article/details/117391740
   */
  scanCodeEvent: function(){
    wx.scanCode({
      //onlyFromCamera: true,// 只允许从相机扫码
      success(res){
        //console.log("扫码成功："+JSON.stringify(res))
        linePatRec.getCurrentTeamPLAASByPdaNo(res.result);
      }
    })
  },
  getCurrentTeamPLAASByPdaNo:function(pdaNo){
    wx.request({
      url: rootIP+"getCurrentTeamPLAASByPdaNo",
      method: 'POST',
      data: { pdaNo:pdaNo},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let plaas=res.data.plaas;
        let plId=plaas.plId;
        wx.redirectTo({
          url: '/pages/devAccPat/devAccPat?plId='+plId+'&pdaNo='+pdaNo+"&action=scan",
        })
      }
    })
  },
  goPage:function(e){
    let id=e.currentTarget.dataset.id;
    let page=e.currentTarget.dataset.page;
    wx.redirectTo({
      url: '/pages/'+page+'/'+page+'?plId='+id,
    })
  }
})