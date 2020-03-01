<template>
  <div class="passBox">
    <div class="title2 boxTitle">通道<div class="right"><resetTime :time="frequency.channel" model="channel"/></div></div>
    <div class="passItem" v-for="(item, index, key) in channel" :key="key">
      <div
        class="passItemBox"
        v-warn="{ warnLevel: item.warnLevel, show: item.warnLevel }"
      >
        <div class="title">{{ item.name }}</div>
        <div>
          <semiCircle :data="item.list" :startTime="item.startTime" :endTime="item.endTime"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import semiCircle from "components/common/semiCircle";
import resetTime from "components/common/resetTime";
import { mapState } from "vuex";
export default {
  name: "Center",
  components: {
    semiCircle,
    resetTime
  },
  computed: {
    ...mapState({
      channel: state => state.data.result.channel,
      frequency: state => state.data.result.frequency
    })
  }
};
</script>
<style lang="scss">
@import "styles/config.scss";
.passBox {
  background: $background-color;
  margin: 8px;
  padding:8px;
  overflow: hidden;
  font-size: 18px;
  .boxTitle {
    margin: 8px 0 8px 8px;
  }
  .passItem {
    float: left;
    width: 25%;
    .passItemBox {
      height: 216px;
      border: 1px solid #3c475d;
      padding: 15px;
      margin: 8px;
    }
  }
}
</style>
