<template>
  <div class="completeCircleBox" :style="`transform:scale(${scale})`">
    <div id="circleBox" :style="`${isChild ? 'left:-36px;top:-36px' : ''}`">
      <div>
        <div id="left">
          <div v-for="(item, index, key) in data" :key="key">
            <div
              class="circle-left"
              :style="
                `transform: rotate(${index * 7.5}deg); background:${
                  item === 1
                    ? successColor
                    : item === 2
                    ? errColor
                    : defaultColor
                }`
              "
              v-if="index < 24"
            ></div>
          </div>
        </div>
        <div id="right">
          <div v-for="(item, index, key) in data" :key="key">
            <div
              class="circle-right"
              :style="
                `transform: rotate(${(index - 25) * 7.5}deg); background:${
                  item === 1
                    ? successColor
                    : item === 2
                    ? errColor
                    : defaultColor
                }`
              "
              v-if="index > 24 && index < 49"
            ></div>
          </div>
        </div>
        <div class="block" :style="`width:${scale==1?62:58}px;height:${scale==1?62:58}px;left:${scale==1?5:7}px;top:${scale==1?5:7}px`">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "completeCircle",
  props: {
    data: {
      type: Array,
      // required: true,
      default: () => []
    },
    successColor: {
      type: String,
      default: "#90FF84"
    },
    errColor: {
      type: String,
      default: "#FB5756"
    },
    defaultColor: {
      type: String,
      default: "#3c475d"
    },
    scale: {
      type: String,
      default: "1"
    },
    isChild: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
@import "styles/config.scss";
.completeCircleBox {
  #left,
  #right {
    clip: rect(0px 36px 72px 0px);
    position: absolute;
    // width: 36px;
    // height: 72px;
  }
  #right {
    left: 36px;
  }
  #circleBox {
    position: relative;
    left: 25px;
    top: -10px;
  }

  .circle-left,
  .circle-right {
    width: 36px;
    height: 72px;
    border-radius: 0px 72px 72px 0px;
    position: absolute;
    transform-origin: 0 50%;
  }
  .circle-right {
    z-index: 1;
  }
  .circle-left {
    border-radius: 72px 0px 0px 72px;
    transform-origin: 100% 50%;
  }
  .block {
    // width: 62px;
    // height: 62px;
    border-radius: 50%;
    background: $background-color;
    position: absolute;
    z-index: 1;
    // left: 5px;
    // top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #fff;
  }
}
</style>
