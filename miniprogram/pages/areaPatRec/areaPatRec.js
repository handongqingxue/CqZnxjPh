// miniprogram/pages/areaPatRec/areaPatRec.js
var areaPatRec;
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
    areaPatRec=this;
    rootIP=getApp().getRootIP();
    let plId=1;
    areaPatRec.setData({plId:plId});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    areaPatRec.getPAList();
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
  getPAList:function(){
    let plId=areaPatRec.data.plId;
    wx.request({
      url: rootIP+"getPAList",
      method: 'POST',
      data: { plId:plId},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let plName=data.plName;
        let paList=data.paList;
        areaPatRec.setData({plName:plName,paList:paList});
      }
    })
  }
})