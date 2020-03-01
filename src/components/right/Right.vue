<template>
  <div class="rightBox">
    <div class="itemBox time">
      <div class="time1">{{ dateObj.YMD }}</div>
      <div class="time2">{{ dateObj.HMS }}</div>
    </div>
    <div v-for="(item, index, key) in serverData" :key="key">
      <div class="itemBox" v-if="item" v-warn="{ warnLevel: item.warnLevel, show: item.warnLevel }">
        <!-- 牛逼了 遍历对象  顺序乱就乱了 ，index还尼玛不是数字 ，后端返回垃圾关联数组-->
        <div class="title">{{item.serverName}} <div v-if="index === 'dna'" class="right"><resetTime :time="frequency.server" model="server"/></div></div>
        <div>
          <div class="ylBox">
            <div class="serverTitle">银联</div>
            <div class="serverBox">
              <span
                v-for="(epsItem, index, key) in item.eps"
                :key="key"
                :class="`server yl ${epsItem.status === 1 ? '' : 'error'}`"
              ></span>
            </div>
          </div>
          <div class="ltBox">
            <div class="serverTitle">联通</div>
            <div class="serverBox">
              <span
                v-for="(unItem, index, key) in item.un"
                :key="key"
                :class="`server lt ${unItem.status === 1 ? '' : 'error'}`"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapState } from "vuex";
import resetTime from "components/common/resetTime";
export default {
  name: "Right",
  computed: {
    ...mapState({
      serverData: state => state.data.result.serverData,
      frequency: state =>  state.data.result.frequency
    })
  },
  components: {
    resetTime
  },
  data() {
    return {
      dateObj: {
        YMD: "--",
        HMS: "--"
      },
      timer: null
    };
  },
  created() {
    this.getTime();
  },
  methods: {
    getTime() {
      this.timer = setInterval(() => {
        this.dateObj.YMD = moment(new Date()).format("YYYY-MM-DD");
        this.dateObj.HMS = moment(new Date())
          .format("YYYY-MM-DD  HH:mm:ss")
          .split("  ")[1];
      }, 1000);
    }
  }
};
</script>
<style lang="scss">
@import "styles/config.scss";
.rightBox {
  .title {
    margin-bottom: 24px;
  }
}
.time.itemBox {
  text-align: center;
  .time1 {
    margin-top: 8px;
    opacity: 0.6;
    font-size: 16px;
    color: #fff;
  }
  .time2 {
    margin: 24px 0 8px 0;
    font-size: 32px;
    color: #8bfeff;
    line-height: 32px;
  }
}
.server {
  padding: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-left: 8px;
  background-size: cover;
}
.server.yl {
  background-image: url(~images/yl.svg);
}
.server.lt {
  background-image: url(~images/lt.svg);
}
.server.error {
  background-image: url(~images/error.svg);
}
.ylBox,
.ltBox {
  display: flex;
  .serverTitle {
    width: 40px;
  }
  .serverBox {
    flex: 1;
  }
}
.ylBox {
  margin-bottom: 24px;
}
</style>
