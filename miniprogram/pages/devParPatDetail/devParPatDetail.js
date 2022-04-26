// pages/devParPat/devParPatDetail.js
var devParPatDetail;
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
    devParPatDetail=this;
    rootIP=getApp().getRootIP();
    serverRootIP=getApp().getServerRootIP();

    let plId=options.plId;
    let pdaNo=options.pdaNo;
    let pdpId=options.pdpId;
   /*
    let plId=1;
    let pdaNo=1;
    let pdpId=1;
    */
    devParPatDetail.setData({plId:plId,pdaNo:pdaNo,pdpId:pdpId,serverRootIP:serverRootIP});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    devParPatDetail.getPDPInfo();
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
    let pdpId=devParPatDetail.data.pdpId;
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
        devParPatDetail.setData({pdp:pdp,dppr:dppr});
        if(dppr.photoUrl1!=null)
          devParPatDetail.setPhoto(1,serverRootIP+dppr.photoUrl1);
        if(dppr.photoUrl2!=null)
          devParPatDetail.setPhoto(2,serverRootIP+dppr.photoUrl2);
        if(dppr.photoUrl3!=null)
          devParPatDetail.setPhoto(3,serverRootIP+dppr.photoUrl3);
        devParPatDetail.setPhotoLocation();
        if(dppr.videoUrl1!=null)
          devParPatDetail.setVideo(serverRootIP+dppr.videoUrl1);
      }
    })
  },
  setPhoto:function(num,url){
    switch (num) {
      case 1:
        devParPatDetail.setData({photoUrl1:url});
        break;
      case 2:
        devParPatDetail.setData({photoUrl2:url});
        break;
      case 3:
        devParPatDetail.setData({photoUrl3:url});
        break;
    }
  },
  setVideo:function(url){
    devParPatDetail.setData({videoUrl1:url});
  },
  setPhotoLocation:function(){
    let item1Style="item1Style";
    let item2Style="item2Style";
    let item3Style="item3Style";
    let data=devParPatDetail.data;
    let photoUrl1=data.photoUrl1;
    let photoUrl2=data.photoUrl2;
    let photoUrl3=data.photoUrl3;
    if(photoUrl1!=null&photoUrl2!=null&photoUrl3!=null)
      devParPatDetail.setData({item1Style:item1Style,item2Style:item2Style,item3Style:item3Style});
    else if(photoUrl1!=null&photoUrl2!=null&photoUrl3==null)
      devParPatDetail.setData({item1Style:item1Style,item2Style:item2Style});
    else if(photoUrl1!=null&photoUrl2==null&photoUrl3==null)
      devParPatDetail.setData({item1Style:item1Style});
    else if(photoUrl1==null&photoUrl2!=null&photoUrl3!=null)
      devParPatDetail.setData({item2Style:item1Style,item3Style:item2Style});
    else if(photoUrl1==null&photoUrl2!=null&photoUrl3==null)
      devParPatDetail.setData({item2Style:item1Style});
  },
  goPage:function(e){
    let plId=devParPatDetail.data.plId;
    let pdaNo=devParPatDetail.data.pdaNo;
    let page=e.currentTarget.dataset.page;
    wx.redirectTo({
      url: '/pages/'+page+'/'+page+'?plId='+plId+'&pdaNo='+pdaNo,
    })
  }
})