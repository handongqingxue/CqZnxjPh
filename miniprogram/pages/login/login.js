// miniprogram/pages/login/login.js
var login;
var rootIP;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobNumber:'13608977126'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    login=this;
    rootIP=getApp().getRootIP();
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
  checkInfo:function(){
    if(login.checkJobNumber()){
      login.login();
    }
  },
  login:function(){
    let jobNumber=login.data.jobNumber;
    wx.request({
      url: rootIP+"login",
      data:{jobNumber:jobNumber},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        if(status=="ok"){
          wx.setStorageSync("staff",data.staff);
          wx.setStorageSync("patrolTeam",data.patrolTeam);
          wx.redirectTo({
            url: '/pages/linePatCen/linePatCen',
          })
        }
        else{
          wx.showToast({
            title: '登录失败',
          })
        }
      }
    })
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="jobNumber_inp"){
      let jobNumber=login.data.jobNumber;
      jobNumber=e.detail.value;
      login.setData({jobNumber:jobNumber});
    }
  },
  focusJobNumber:function(){
    let jobNumber=login.data.jobNumber;
    if(jobNumber=="工号不能为空"){
      login.setData({jobNumber:''});
    }
  },
  checkJobNumber:function(){
    let jobNumber=login.data.jobNumber;
    if(jobNumber==""||jobNumber==null||jobNumber=="工号不能为空"){
      login.setData({jobNumber:'工号不能为空'});
      return false;
    }
    else{
      return true;
    }
  }
})