<template>
  <div class="box">
    <div class="container">
<div style="margin-bottom: 50px">
  <div style="float: left">
    <h3 >润德收银台</h3>
  </div>
  <div style="float: right">
    <h4 >应付金额&nbsp;&nbsp;<strong style="color: #f56c6c;">{{this.$store.state.weixin.price}}</strong>&nbsp;&nbsp;元</h4>
  </div>

</div>


      <div  class="container_title">
        <h2>微信支付</h2>
      </div>

      <div >
        <!--<div class="codeImg">-->
          <img :src="this.$store.state.weixin.name" width="350px" height="350px" class="image">

        <!--</div>-->
        <!--<div class="phone-bg">-->
          <img src="../../../../static/phone-bg.png" width="300px" height="350px">
        <!--</div>-->

      </div>
     <div class="container_scan" >
       <span >请使用微信扫一扫</span><br/>
       <span>扫描二维码进行支付</span>
     </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "re-charge_weixin",
    data() {
      return {
        currentDate: new Date()
      };
    },
    created() {

    },

  }
</script>

<style scoped>

.container{
  margin-left: 10%;
  margin-top: 50px;
  text-align:center;
  width: 780px;
  height: 520px;
  padding: 20px 20px;
  /*border:1px solid #cccccc;*/
  -webkit-box-shadow: 1px 1px 1px 2px #cccccc;
  -moz-box-shadow: 1px 1px 1px 2px #cccccc;
  box-shadow: 1px 1px 1px 2px #cccccc;
}
.container_title{
  font-size: 18px;
}
.container_scan{
  z-index: -1;
  height: 60px;
  width:700px;
  background-color: #f56c6c;
  line-height: 28px;
  color: #ffffff;
  margin-left: 62px;
  text-align: center;
}
</style>
