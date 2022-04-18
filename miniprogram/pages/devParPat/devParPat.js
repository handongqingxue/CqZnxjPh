// miniprogram/pages/devParPat/devParPat.js
var devParPat;
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
    devParPat=this;
    rootIP=getApp().getRootIP();

    //let pdpId=options.pdpId;
    let pdpId=1;
    devParPat.setData({pdpId:pdpId});
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
      data: { id:pdpId},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let pdp=data.pdp;
        devParPat.setData({plName:pdp.plName,paName:pdp.paName,pdName:pdp.pdName,name:pdp.name,unit:pdp.unit});
      }
    })
  }
})