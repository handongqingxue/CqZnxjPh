// miniprogram/pages/devParPat/devParPatSave.js
var devParPatSave;
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
    devParPatSave=this;
    rootIP=getApp().getRootIP();
    serverRootIP=getApp().getServerRootIP();
    
    let plId=options.plId;
    let pdaNo=options.pdaNo;
    let pdpId=options.pdpId;
    /*
    let plId=1;
    let pdaNo="0001";
    let pdpId=1;
    */
    let startTime=devParPatSave.getNowTime();
    devParPatSave.setData({plId:plId,pdaNo:pdaNo,pdpId:pdpId,startTime:startTime,serverRootIP:serverRootIP});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    devParPatSave.getPDPInfo();
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
    let pdpId=devParPatSave.data.pdpId;
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
        console.log("plId----"+pdp.plId)
        let dppr=data.dppr;
        devParPatSave.setData({pdp:pdp,dppr:dppr});
        if(dppr.photoUrl1!=null)
          devParPatSave.setPhoto(1,serverRootIP+dppr.photoUrl1);
        if(dppr.photoUrl2!=null)
          devParPatSave.setPhoto(2,serverRootIP+dppr.photoUrl2);
        if(dppr.photoUrl3!=null)
          devParPatSave.setPhoto(3,serverRootIP+dppr.photoUrl3);
        devParPatSave.setPhotoLocation();
        if(dppr.videoUrl1!=null)
          devParPatSave.setVideo(serverRootIP+dppr.videoUrl1);
      }
    })
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="pdpVal_inp"){
      let dppr=devParPatSave.data.dppr;
      dppr.paramValue=e.detail.value;
      devParPatSave.setData({dppr:dppr});
    }
    else if(e.currentTarget.id=="pdpExceInfo_inp"){
      let dppr=devParPatSave.data.dppr;
      dppr.paramExceInfo=e.detail.value;
      devParPatSave.setData({dppr:dppr});
    }
    else if(e.currentTarget.id=="pdpMemo_inp"){
      let dppr=devParPatSave.data.dppr;
      dppr.paramMemo=e.detail.value;
      devParPatSave.setData({dppr:dppr});
    }
  },
  radioChange:function(e){
    let value=e.detail.value;
    let dppr=devParPatSave.data.dppr;
    if(value==1)
      dppr.paramIfExce=true;
    else
      dppr.paramIfExce=false;
    devParPatSave.setData({dppr:dppr});
  },
  takePhoto:function(){
    wx.chooseImage({
      //count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("res.tempFilePaths==="+res.tempFilePaths)
        devParPatSave.setData({tempPhotoPaths:res.tempFilePaths});
        
        let tempFilePaths=res.tempFilePaths;
        let data=devParPatSave.data;
        for(let i=0;i<tempFilePaths.length;i++){
          if(data.photoUrl1==null)
            devParPatSave.setPhoto(1,res.tempFilePaths[i]);
          if(data.photoUrl2==null)
            devParPatSave.setPhoto(2,res.tempFilePaths[i]);
          if(data.photoUrl3==null)
            devParPatSave.setPhoto(3,res.tempFilePaths[i]);
        }
        devParPatSave.setPhotoLocation();
      }
    })
  },
  takeVideo:function(){
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        let tempFilePath=res.tempFilePath;
        console.log(tempFilePath)
        devParPatSave.setData({tempVideoPath:tempFilePath});
        let data=devParPatSave.data;
        if(data.videoUrl1==null)
          devParPatSave.setVideo(tempFilePath);
      }
    })
  },
  save:function(){
    let paramIfExce;
    let type=devParPatSave.data.pdp.type;
    let paramValue=devParPatSave.data.dppr.paramValue;
    let warnDown=devParPatSave.data.pdp.warnDown;
    let warnUp=devParPatSave.data.pdp.warnUp;
    if(type==1){
      if(paramValue>=warnDown&paramValue<=warnUp)
        paramIfExce=false;
      else
        paramIfExce=true;
    }
    else{
      paramIfExce=devParPatSave.data.dppr.paramIfExce;
    }
    let paramExceInfo=devParPatSave.data.dppr.paramExceInfo;
    let paramMemo=devParPatSave.data.dppr.paramMemo;
    let plId=devParPatSave.data.pdp.plId;
    let paId=devParPatSave.data.pdp.paId;
    let pdaId=devParPatSave.data.pdp.pdaId;
    let pdpId=devParPatSave.data.pdp.id;
    let tempPhotoPaths=devParPatSave.data.tempPhotoPaths;
    console.log("paramIfExce==="+paramIfExce)
    console.log("plId==="+plId)
    console.log("paId==="+paId)
    console.log("pdaId==="+pdaId)
    console.log("pdpId==="+pdpId)
    console.log("tempPhotoPaths==="+tempPhotoPaths)
    let tempPhotoPathLength=0;
    if(tempPhotoPaths!=undefined){
      tempPhotoPathLength=tempPhotoPaths.length;
      console.log(tempPhotoPathLength);
    }

    let paramData={};
    paramData.paramIfExce=paramIfExce;
    if(type==1)
      paramData.paramValue=paramValue;
    else
      paramData.paramExceInfo=paramExceInfo;
    paramData.paramMemo=paramMemo;
    paramData.plId=plId;
    paramData.paId=paId;
    paramData.pdaId=pdaId;
    paramData.pdpId=pdpId;
    paramData.ptId=ptId;
    paramData.psId=psId;
    paramData.startTime=devParPatSave.data.startTime;
    //{ paramIfExce:paramIfExce,paramExceInfo:paramExceInfo,paramMemo:paramMemo,plId:plId,paId:paId,pdaId:pdaId,pdpId:pdpId,ptId:ptId,psId:psId}
    wx.request({
      url: rootIP+"saveDevParPatRec",
      method: 'POST',
      data: paramData,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        if(tempPhotoPathLength>0)
          devParPatSave.uploadPhoto(0);
        else
          devParPatSave.goBack();
      }
    })
  },
  uploadPhoto:function(index){
    let pdpId=devParPatSave.data.pdp.id;
    let tempPhotoPaths=devParPatSave.data.tempPhotoPaths;
    wx.uploadFile({
      url: rootIP+'uploadFile', //仅为示例，非真实的接口地址
      filePath: tempPhotoPaths[index],
      name: 'file',
      formData:{fileNum:index+1,pdpId:pdpId,ptId:ptId},
      success: function(res){
        var data = res.data
        let tempPhotoPathLength=devParPatSave.data.tempPhotoPaths.length;
        index++;
        if(index<tempPhotoPathLength)
          devParPatSave.uploadPhoto(index);
        else{
          let tempVideoPath=devParPatSave.data.tempVideoPath;
          if(tempVideoPath==undefined)
            devParPatSave.goBack();
          else
            devParPatSave.uploadVideo();
        }
      }
    })
  },
  uploadVideo:function(){
    let pdpId=devParPatSave.data.pdp.id;
    let tempVideoPath=devParPatSave.data.tempVideoPath;
    wx.uploadFile({
      url: rootIP+'uploadFile', //仅为示例，非真实的接口地址
      filePath: tempVideoPath,
      name: 'file',
      formData:{fileNum:4,pdpId:pdpId,ptId:ptId},
      success: function(res){
        devParPatSave.goBack();
      }
    })
  },
  deletePhoto:function(e){
    let num=e.currentTarget.dataset.num;
    switch (num) {
      case "1":
        devParPatSave.setData({photoUrl1:null});
        break;
      case "2":
        devParPatSave.setData({photoUrl2:null});
        break;
      case "3":
        devParPatSave.setData({photoUrl3:null});
        break;
    }
    devParPatSave.setPhotoLocation();
  },
  deleteVideo:function(){
    devParPatSave.setData({videoUrl1:null});
  },
  setPhoto:function(num,url){
    switch (num) {
      case 1:
        devParPatSave.setData({photoUrl1:url});
        break;
      case 2:
        devParPatSave.setData({photoUrl2:url});
        break;
      case 3:
        devParPatSave.setData({photoUrl3:url});
        break;
    }
  },
  setVideo:function(url){
    devParPatSave.setData({videoUrl1:url});
  },
  setPhotoLocation:function(){
    let item1Style="item1Style";
    let item2Style="item2Style";
    let item3Style="item3Style";
    let data=devParPatSave.data;
    let photoUrl1=data.photoUrl1;
    let photoUrl2=data.photoUrl2;
    let photoUrl3=data.photoUrl3;
    if(photoUrl1!=null&photoUrl2!=null&photoUrl3!=null)
      devParPatSave.setData({item1Style:item1Style,item2Style:item2Style,item3Style:item3Style});
    else if(photoUrl1!=null&photoUrl2!=null&photoUrl3==null)
      devParPatSave.setData({item1Style:item1Style,item2Style:item2Style});
    else if(photoUrl1!=null&photoUrl2==null&photoUrl3==null)
      devParPatSave.setData({item1Style:item1Style});
    else if(photoUrl1==null&photoUrl2!=null&photoUrl3!=null)
      devParPatSave.setData({item2Style:item1Style,item3Style:item2Style});
    else if(photoUrl1==null&photoUrl2!=null&photoUrl3==null)
      devParPatSave.setData({item2Style:item1Style});
  },
  getNowTime:function(){
    let date=new Date();
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    let dateOfMonth=date.getDate();
    let hour=date.getHours();
    let minute=date.getMinutes();
    let second=date.getSeconds();
    return year+"-"+(month<10?"0"+month:month)+"-"+(dateOfMonth<10?"0"+dateOfMonth:dateOfMonth)+" "+(hour<10?"0"+hour:hour)+":"+(minute<10?"0"+minute:minute)+":"+(second<10?"0"+second:second);
  },
  goBack:function(){
    let eJS={currentTarget:{dataset:{page:"devAccPat"}}};
    devParPatSave.goPage(eJS);
  },
  goPage:function(e){
    let plId=devParPatSave.data.plId;
    let pdaNo=devParPatSave.data.pdaNo;
    let page=e.currentTarget.dataset.page;
    console.log("plId????"+plId)
    wx.redirectTo({
      url: '/pages/'+page+'/'+page+'?plId='+plId+'&pdaNo='+pdaNo,
    })
  }
})