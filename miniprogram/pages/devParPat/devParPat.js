// miniprogram/pages/devParPat/devParPat.js
var devParPat;
var rootIP;
var serverRootIP;
var ptId=1;
var psId=1;

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
    devParPat=this;
    rootIP=getApp().getRootIP();
    serverRootIP=getApp().getServerRootIP();

    //let pdpId=options.pdpId;
    let pdpId=1;
    devParPat.setData({pdpId:pdpId,serverRootIP:serverRootIP});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    devParPat.getPDPInfo();
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
  getPDPInfo:function(){
    let pdpId=devParPat.data.pdpId;
    wx.request({
      url: rootIP+"getPDPInfo",
      method: 'POST',
      data: { id:pdpId,ptId:ptId},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let pdp=data.pdp;
        let dppr=data.dppr;
        devParPat.setData({pdp:pdp,dppr:dppr});
      }
    })
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="pdpVal_inp"){
      let dppr=devParPat.data.dppr;
      dppr.paramValue=e.detail.value;
      devParPat.setData({dppr:dppr});
    }
    else if(e.currentTarget.id=="pdpMemo_inp"){
      let dppr=devParPat.data.dppr;
      dppr.paramMemo=e.detail.value;
      devParPat.setData({dppr:dppr});
    }
  },
  takePhoto:function(){
    wx.chooseImage({
      //count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("res.tempFilePaths==="+res.tempFilePaths)
        devParPat.setData({tempFilePaths:res.tempFilePaths});
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        /*
        devParPat.setData({
          tempFilePaths:res.tempFilePaths
        })
        */
      }
    })
  },
  takeVideo:function(){
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
      }
    })
  },
  save:function(){
    let paramIfExce;
    let paramValue=devParPat.data.dppr.paramValue;
    let warnDown=devParPat.data.pdp.warnDown;
    let warnUp=devParPat.data.pdp.warnUp;
    if(paramValue>=warnDown&paramValue<=warnUp)
      paramIfExce=false;
    else
      paramIfExce=true;
    let paramMemo=devParPat.data.dppr.paramMemo;
    let plId=devParPat.data.pdp.plId;
    let paId=devParPat.data.pdp.paId;
    let pdaId=devParPat.data.pdp.pdaId;
    let pdpId=devParPat.data.pdp.id;
    let tempFilePaths=devParPat.data.tempFilePaths;
    console.log("plId==="+plId)
    console.log("paId==="+paId)
    console.log("pdaId==="+pdaId)
    console.log("pdpId==="+pdpId)
    console.log("tempFilePaths==="+tempFilePaths)
    console.log(tempFilePaths.split(","));
    return false;

    wx.request({
      url: rootIP+"saveDevParPatRec",
      method: 'POST',
      data: { paramIfExce:paramIfExce,paramValue:paramValue,paramMemo:paramMemo,plId:plId,paId:paId,pdaId:pdaId,pdpId:pdpId,ptId:ptId,psId:psId},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
      }
    })
  },
  uploadFile:function(fileNum){
    let pdpId=devParPat.data.pdp.id;
    wx.uploadFile({
      url: rootIP+'uploadFile', //仅为示例，非真实的接口地址
      filePath: tempFilePaths[fileNum-1],
      name: 'file',
      formData:{fileNum:fileNum,pdpId:pdpId,ptId:ptId},
      /*
      formData:{
        paramIfExce:paramIfExce,paramValue:paramValue,paramMemo:paramMemo,plId:plId,paId:paId,pdaId:pdaId,pdpId:pdpId,ptId:ptId,psId:psId
      },
      */
      success: function(res){
        var data = res.data
        //do something
      }
    })
  },
  goPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/devParPat/devParPat?pdpId='+id,
    })
  }
})