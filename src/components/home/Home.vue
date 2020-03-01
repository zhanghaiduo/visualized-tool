<template>
  <div class="containBox">
    <div class="allLeftBox">
      <Left />
    </div>
    <div class="allRight">
      <div class="topBox">
        <div class="centerBox">
          <Center />
        </div>
        <div class="rightBox">
          <Right />
        </div>
      </div>
      <div class="footerBox">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getServerData,
  getChannel,
  getOrderTotalData,
  getSmsData,
  getCallback,
  getDisney,
  getMerchantTotal,
  // postFrequency,
  getFrequency
} from "api/index";
import Left from "components/left/Left";
import Center from "components/center/Center";
import Right from "components/right/Right";
import Footer from "components/footer/Footer";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Home",
  components: {
    Left,
    Center,
    Right,
    Footer
  },
  computed: {
    ...mapState({
      frequency: state => {
        return state.data.result.frequency;
      },
      reload: state => {
        return state.data.other.reload;
      }
    })
  },
  watch: {
    reload(val, oldval) {
      console.log("修改时间重刷", val, "上次刷新", oldval);
      this.getDataInit();
    }
  },
  created() {
    // 第一次进来初始化数据
    this.getDataInit();
  },
  methods: {
    //默认个60S，要不后端返回0的就坑爹了
    async startTimer() {
      this.getDataHandle({
        type: "serverData",
        time: 1000 * this.frequency.server,
        func: getServerData
      });
      this.getDataHandle({
        type: "channel",
        time: 1000 * this.frequency.channel,
        func: getChannel
      });
      this.getDataHandle({
        type: "smsData",
        time: 1000 * this.frequency.sms,
        func: getSmsData
      });
      this.getDataHandle({
        type: "callback",
        time: 1000 * this.frequency.callback,
        func: getCallback
      });
      this.getDataHandle({
        type: "orderTotalData",
        time: 1000 * this.frequency.order_total,
        func: getOrderTotalData
      });
      this.getDataHandle({
        type: "merchantTotal",
        time: 1000 * this.frequency.merchant_guangfeng,
        func: getMerchantTotal
      });
      this.getDataHandle({
        type: "disney",
        time: 1000 * this.frequency.disney,
        func: getDisney
      });
    },
    async getDataInit() {
      //
      getServerData().then(res => {
        this.setData({ key: "serverData", val: res.data });
      });
      getChannel().then(res => {
        this.setData({ key: "channel", val: res.data });
      });
      getOrderTotalData().then(res => {
        this.setData({ key: "orderTotalData", val: res.data });
      });
      getSmsData().then(res => {
        this.setData({ key: "smsData", val: res.data });
      });
      getCallback().then(res => {
        this.setData({ key: "callback", val: res.data });
      });
      getMerchantTotal().then(res => {
        this.setData({ key: "merchantTotal", val: res.data });
      });
      getDisney().then(res => {
        this.setData({ key: "disney", val: res.data });
      });

      const frequency = await getFrequency();
      this.setData({ key: "frequency", val: frequency.data || {} });

      // 开始定时轮询
      this.startTimer();
    },
    async getDataHandle({ type, time, func }) {
      clearInterval(this[`${type}timer`]);
      this[`${type}timer`] = setInterval(
        () => {
          func().then(res => {
            this.setData({ key: type, val: res.data });
          });
          console.log(type, time && !isNaN(time) ? time : 60000);
        },
        time && !isNaN(time) ? time : 60000 //默认个60S，要不后端乱返回的就坑爹了
      );
    },
    ...mapMutations({
      setData: "data/setData"
    })
  }
};
</script>

<style lang="scss">
@import "styles/config.scss";
.containBox {
  display: flex;
  padding: 8px;
  .allRight {
    flex: 1;
    display: flex;
    flex-direction: column;
    .topBox {
      display: flex;
      .centerBox {
        flex: 1;
      }
    }
    .footerBox {
      width: calc(100%);
      margin-top: 8px;
    }
  }
  .allLeftBox,
  .rightBox {
    width: 318px;
  }
  .itemBox {
    background: $background-color;
    margin: 8px 8px 16px 8px;
    padding: 15px;
  }
}
</style>
