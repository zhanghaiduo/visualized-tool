<template>
  <div class="semiCircleBox">
    <div id="circleBox">
      <div id="circleHalfBox">
        <div
          v-for="(item, index, key) in data"
          :key="key"
          class="circleItem"
          :style="
            `transform: rotate(${(index) * 18}deg); background:${
              item.total > 0 ? '#8BFEFF' : '#3C475D'
            }`
          "
        ></div>
        <div class="block"></div>
      </div>
    </div>
    <div class="dateBox">{{startTime}} — {{endTime}}</div>
  </div>
</template>
<script>
export default {
  name: "semiCircle",
  props: {
    data: {
      type: Array,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
@import "styles/config.scss";
.semiCircleBox {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .dateBox {
    width: 100%;
    position: absolute;
    bottom: 30px;
    text-align: center;
    font-size: 16px;
    color: #59a6ff;
  }

  .circleItem {
    width: 95px;
    height: 200px;
    border-radius: 0px 102px 103px 0px;
    position: absolute;
    transform-origin: 0 50%;
    // border-left: 1px dotted $background-color;
  }
  // 缩放小于1像素的线
  .circleItem:after {
    z-index: -999;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    border-left: 1px solid $background-color;
    width: 200%;
    height: 200%;
    transform-origin: 0 0;
    transform: scale(0.2);
    box-sizing: border-box;
  }
  #circleBox {
    width: 200px;
    height: 200px;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #circleHalfBox {
    clip: rect(0px 100px 200px 0px);
    width: 102px;
    height: 202px;
    // border-left: 1px solid red;
    transform: rotate(-90deg);
    overflow: hidden;
    position: relative;
    top: -35px;
    .block {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: $background-color;
      position: absolute;
      z-index: 1;
      left: -60px;
      top: 40px;
    }
  }
}
</style>
