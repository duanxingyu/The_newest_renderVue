<template>
  <div class="box">
    <el-alert class="alert"
              title="订单已生成,请扫码支付"
              type="success" closable
              :description="'您的订单号为：'+this.$store.state.weixin.payment_uid"
              show-icon>
    </el-alert>
    <div class="container">
      <div style="margin-bottom: 50px">
        <div style="float: left">
          <h3>RenderG收银台</h3>
        </div>
        <div style="float: right">
          <h4>应付金额&nbsp;&nbsp;<strong style="color: #f56c6c;">{{this.$store.state.weixin.price}}</strong>&nbsp;&nbsp;元
          </h4>
        </div>

      </div>


      <div class="container_title">
        <h2>微信支付</h2>
      </div>

      <div>
        <!--<div class="codeImg">-->
        <img :src="this.$store.state.weixin.name" width="350px" height="350px" class="image">

        <!--</div>-->
        <!--<div class="phone-bg">-->
        <img src="../../../../static/phone-bg.png" width="300px" height="350px">
        <!--</div>-->

      </div>
      <div class="container_scan">
        <span>请使用微信扫一扫</span><br/>
        <span>扫描二维码进行支付</span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {Loading} from 'element-ui'


  export default {
    name: "re-charge_weixin",
    data() {
      return {
        currentDate: new Date()
      };
    },

    mounted() {

      this.getData();

    },
    methods: {

      // getStatus() {
      //   var interval=null;
      //   var url = this.HOST + this.$store.state.weixin.get_status_url;
      //     this.$axios.post(url, {
      //     payment_uid: this.$store.state.weixin.payment_uid
      //   }).then(res => {
      //      console.log(res);
      //     if (res.data.status === 1) {
      //       clearInterval(interval);
      //       window.location.href = this.$store.state.weixin.return_url
      //     }
      //
      //   }).catch(error => {
      //     console.log(error);
      //   })
      //   interval = setInterval(3000);
      // },
      getData() {

        var instance = this.$axios.create();
        instance.interceptors.request.use(config => {
          let loading = Loading.service({});
          loading.close();


          return config;
        });
        instance.interceptors.response.use(response => {
          let loading = Loading.service({});
          loading.close();
          return response;
        })

        var interval = null;
        this.getStatus();
        interval = setInterval(() => {
          this.getStatus()
        }, 3000);
        console.log(interval);
      },
      getStatus() {
        var url = this.HOST + this.$store.state.weixin.get_status_url;
        var _this = this

        _this.$axios.get(url, {
          params: {
            payment_uid: _this.$store.state.weixin.payment_uid
          }
        }).then(res => {
          if (res.data.status === 1) {
            clearInterval(interval);
            window.location.href = _this.$store.state.weixin.return_url
          }
          console.log(res);
        }).catch(error => {
          console.log(error);
        });
      }

    }
  }
</script>

<style scoped>

  .container {
    margin-left: 10%;
    margin-top: 30px;
    text-align: center;
    width: 780px;
    height: 520px;
    padding: 20px 20px;
    /*border:1px solid #cccccc;*/
    -webkit-box-shadow: 1px 1px 1px 2px #cccccc;
    -moz-box-shadow: 1px 1px 1px 2px #cccccc;
    box-shadow: 1px 1px 1px 2px #cccccc;
  }

  .container_title {
    font-size: 18px;
  }

  .container_scan {
    z-index: -1;
    height: 60px;
    width: 700px;
    background-color: #f56c6c;
    line-height: 28px;
    color: #ffffff;
    margin-left: 62px;
    text-align: center;
  }

  .alert {
    width: 820px;
    font-size: 18px;
    margin-left: 10%;
    margin-top: 30px;
  }
</style>
