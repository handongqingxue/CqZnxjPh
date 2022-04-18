// miniprogram/pages/devAccPatEdit/devAccPatEdit.js
var devAccPat;
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
    devAccPat=this;
    rootIP=getApp().getRootIP();
    console.log("rootIP==="+rootIP)

    //let pdaNo=options.pdaNo;
    let pdaNo="0001";
    devAccPat.setData({pdaNo:pdaNo});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    devAccPat.getPDAQrcodeInfo();
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
  getPDAQrcodeInfo:function(){
    let pdaNo=devAccPat.data.pdaNo;
    console.log("pdaNo==="+pdaNo)
    wx.request({
      url: rootIP+"getPDAQrcodeInfo",
      method: 'POST',
      data: { pdaNo:pdaNo},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        //var data = res.data;
      }
    })
  }
})