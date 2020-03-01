<template>
  <div class="resetBox">
    <div class="title2 resetTitle" @click.stop="showModel">
      {{title}}
      <img class="dowmImg" src="~images/dowm.svg" />
      <span class="timeBox">{{time}}s</span>
    </div>
    <div class="resetModel" v-if="show">
      <div class="title2">刷新频率</div>
      <div class="inputBox">
        <el-input v-model="timeVal" @keyup.enter.native="sub"></el-input>
        <span class="s">s</span>
      </div>
    </div>
  </div>
</template>
<script>
import { postFrequency } from "api/index";
import { mapMutations } from "vuex";
export default {
  name: "resetTime",
  props: {
    time: {
      type: Number,
      default: 60 //默认60S显示来看的，和home组件定时器一致
    },
    title: {
      type: String,
      default: "刷新"
    },
    model: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      timeVal: "",
      show: false
    };
  },
  watch: {
    time(val, oldval) {
      this.timeVal = val;
      console.log(val, oldval);
    }
  },
  methods: {
    async sub() {
      const data = await postFrequency({
        model: this.model,
        frequency: this.timeVal
      });
      if (data.code === "0000") {
        this.$message({
          message: data.msg,
          type: "success"
        });
        this.setOtherData({ key: "reload", val: new Date() });
        this.show = false;
      }
      console.log(data);
    },
    showModel() {
      this.timeVal = this.time;
      this.show = !this.show;
    },
    ...mapMutations({
      setOtherData: "data/setOtherData"
    })
  }
};
</script>
<style lang="scss">
@import "styles/config.scss";
.resetBox {
  position: relative;
}
.resetTitle {
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.timeBox {
  font-size: 16px;
  color: #8bfeff;
  margin-left: 6px;
}
.resetModel {
  text-align: center;
  background: $border-color;
  padding: 16px;
  position: absolute;
  z-index: 999;
  left: -30px;
  .title2 {
    font-size: 14px;
  }

  .inputBox {
    position: relative;
    .el-input__inner {
      width: 84px;
      height: 32px;
      background: none;
      border: 1px solid #b3b3b3;
      border-radius: 0;
      color: #8bfeff;
      text-align: center;
    }
    .s {
      position: absolute;
      right: 10px;
      top: 7px;
      color: #8bfeff;
      font-size: 14px;
    }
  }
}
</style>
