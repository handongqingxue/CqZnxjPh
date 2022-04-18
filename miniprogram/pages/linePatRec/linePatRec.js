// pages/linePatRec/linePatRec.js
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  /**
   * 扫码事件:https://blog.csdn.net/qq_29528701/article/details/117391740
   */
  scanCodeEvent1: function(){
    wx.scanCode({
      //onlyFromCamera: true,// 只允许从相机扫码
      success(res){
        //console.log("扫码成功："+JSON.stringify(res))
        wx.redirectTo({
          url: '/pages/devAccPat/devAccPat?pdaNo='+res.result,
        })
      }
    })
  }
})