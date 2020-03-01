<template>
  <div class="FooterItem">
    <div class="title">
      迪士尼
      <span class="dateBox">0:00 — 23:59</span>
      <div class="right">
        <resetTime :time="frequency.disney" model="disney" />
      </div>
    </div>
    <div class="FooterItemBlock" v-for="(item, index, key) in disney" :key="key">
      <div
        class="FooterItemBox"
        v-warn="{
        warnLevel:item.warnLevel,
        show:item.warnLevel
      }"
      >
        <div class="progressBox">
          <!-- 如果有总数显示总数 -->
          <completeCircle :data="item.data.total" v-if="item.showTypes&&item.showTypes.includes(3)">
            <span v-if="!item.showTypes.includes(1)">{{item.name}}</span>
            <completeCircle
              v-if="item.showTypes.includes(1)"
              :data="item.data.in"
              scale="0.7"
              isChild
              successColor="#59A6FF"
            >{{item.name}}</completeCircle>
          </completeCircle>
          <!-- 如果有外卡显示外卡 -->
          <completeCircle
            :data="item.data.out"
            v-else-if="item.showTypes&&item.showTypes.includes(2)"
          >
            <span v-if="!item.showTypes.includes(1)">{{item.name}}</span>
            <completeCircle
              v-if="item.showTypes.includes(1)"
              :data="item.data.in"
              scale="0.7"
              isChild
              successColor="#59A6FF"
            >{{item.name}}</completeCircle>
          </completeCircle>
          <!-- 如果只有内卡显示内卡 -->
          <completeCircle :data="item.data.in" v-else>{{item.name}}</completeCircle>
        </div>
        <div class="itemBottom">
          <p class="blockBox">
            <span class="block out">■</span>外卡
          </p>
          <p class="blockBox">
            <span class="block in">■</span>内卡
          </p>
          <p class="blockBox">
            <span class="block err">■</span>失败
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import completeCircle from "components/common/completeCircle";
import resetTime from "components/common/resetTime";
import { mapState } from "vuex";
export default {
  name: "FooterA",
  computed: {
    ...mapState({
      disney: state => state.data.result.disney,
      frequency: state => state.data.result.frequency
    })
  },
  components: {
    completeCircle,
    resetTime
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
@import "styles/config.scss";
.FooterItem {
  background: $background-color;
  padding: 16px 8px 8px 8px;
  margin: 0 8px;
  overflow: hidden;
  .title {
    margin-left: 8px;
    margin-right: 8px;
  }
  .dateBox {
    font-size: 16px;
    color: #59a6ff;
    margin-left: 8px;
  }
  .FooterItemBlock {
    float: left;
    width: 20%;
    .FooterItemBox {
      height: 120px;
      position: relative;
      border: 1px solid #3c475d;
      margin: 8px;
      .itemBottom {
        transform: scale(0.85);
        width: 100%;
        position: absolute;
        top: 80px;
        text-align: center;
        font-size: 12px;
        display: flex;
        .blockBox {
          flex: 1;
          .block {
            font-size: 18px;
            margin-right: 2px;
          }
          .in {
            color: #59a6ff;
          }
          .out {
            color: #90ff84;
          }
          .err {
            color: #fb5756;
          }
        }
      }
    }
    .progressBox {
      width: 100%;
      position: absolute;
      top: 25px;
      left: 8px;
    }
  }
}
</style>
