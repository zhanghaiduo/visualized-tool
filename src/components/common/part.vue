<template>
  <div class="partBox">
    <div class="partBlockBox">
      <div class="yTitle">失败</div>
      <div class="itemBlock" v-for="(item, index, key) in data" :key="key">
        <div class="block">
          <div
            v-for="(item1, index, key) in item.list"
            :key="key"
            class="blockChild"
            :style="{ width: `${(item.list.length * 100) / item.list.length}%` }"
            :class="{ error: item1 === 2 }"
          ></div>
        </div>
      </div>
    </div>
    <div class="partBlockBox">
      <div class="yTitle">其他</div>
      <div class="itemBlock" v-for="(item, index, key) in data" :key="key">
        <div class="block">
          <div
            v-for="(item1, index, key) in item.list"
            :key="key"
            class="blockChild"
            :style="{ width: `${(item.list.length * 100) / item.list.length}%` }"
            :class="{ warning: item1 === 3 }"
          ></div>
        </div>
      </div>
    </div>
    <div class="partBlockBox">
      <div class="yTitle">成功</div>
      <div class="itemBlock" v-for="(item, index, key) in data" :key="key">
        <div class="block">
          <div
            v-for="(item1, index, key) in item.list"
            :key="key"
            class="blockChild"
            :style="{ width: `${(item.list.length * 100) / item.list.length}%` }"
            :class="{ success: item1 === 1 }"
          ></div>
        </div>
      </div>
    </div>
     <div class="partBlockBox" style="height:10px;">
      <div class="yTitle" style="width:24px"></div>
      <div class="itemBlock" v-for="(item, index, key) in data" :key="key">
        <div class="block xTitle">
         <div class="blockTime">{{item.time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "part",
  props: {
    data: {
      type: Array,
      // required: true,
      default: () => [
        // {
        //   list: [
        //    1,2,3
        //   ],
        //   time: "01:00"
        // },
         // {
        //   list: [
        //    1,2,3
        //   ],
        //   time: "01:00"
        // },
      ]
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
@import "styles/config.scss";
.partBox {
  width: 320px;
  .partBlockBox {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    .yTitle {
      font-size: 12px;
      margin-right: 8px;
    }
    .itemBlock:nth-last-child(1) {
      border-right: 1px solid #3c475d;
    }
    .itemBlock {
      font-size: 12px;
      border-left: 1px solid #3c475d;
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .block {
        width: 100%;
        height: 10px;
        background: #3c475d;
        display: flex;
      }
      .xTitle {
        background: none;
      }
      .blockTime{
        width: 0px;
        transform:scale(.85)
      }
    }
  }
  .warning {
    background: $warning !important;
  }
  .success {
    background: $success !important;
  }
  .error {
    background: $error !important;
  }
}
</style>
