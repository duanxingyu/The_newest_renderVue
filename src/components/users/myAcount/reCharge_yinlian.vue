<template>
  <div>
    <form name="pay_form" method="post"  :action="this.$store.state.yinlian_url" >
      <input type="hidden" id="accessType" name="accessType" :value="this.$store.state.yinlian.accessType">
      <input type="hidden" id="bizType" name="bizType" :value="this.$store.state.yinlian.bizType">
      <input type="hidden" id="channelType" name="channelType" :value="this.$store.state.yinlian.channelType">
      <input type="hidden" id="currencyCode" name="currencyCode" :value="this.$store.state.yinlian.currencyCode">
      <input type="hidden" id="encoding" name="encoding" :value="this.$store.state.yinlian.encoding">
      <input type="hidden" id="merId" name="merId" :value="this.$store.state.yinlian.merId">
      <input type="hidden" id="signature" name="signature" :value="this.$store.state.yinlian.signature">
      <input type="hidden" id="signMethod" name="signMethod" :value="this.$store.state.yinlian.signMethod">
      <input type="hidden" id="txnSubType" name="txnSubType" :value="this.$store.state.yinlian.txnSubType">
      <input type="hidden" id="txnType" name="txnType" :value="this.$store.state.yinlian.txnType">
      <input type="hidden" id="version" name="version" :value="this.$store.state.yinlian.version">
      <input type="hidden" id="backUrl" name="backUrl" :value="this.$store.state.yinlian.backUrl">
      <input type="hidden" id="certId" name="certId" :value="this.$store.state.yinlian.certId">
      <input type="hidden" id="frontUrl" name="frontUrl" :value="this.$store.state.yinlian.frontUrl">
      <input type="hidden" id="orderId" name="orderId" :value="this.$store.state.yinlian.orderId">
      <input type="hidden" id="txnAmt" name="txnAmt" :value="this.$store.state.yinlian.txnAmt">
      <input type="hidden" id="txnTime" name="txnTime" :value="this.$store.state.yinlian.txnTime">
      <input v-show="show" id="submit" type="submit"   onclick="submit" value="提交"/>
    </form>
  </div>

</template>

<script>

    export default {
      name: "yinlian",
      data(){
          return{
            show:false
          }

      },

      mounted(){
        document.getElementById("submit").click();
      },
    }

</script>

<style scoped>

</style>
