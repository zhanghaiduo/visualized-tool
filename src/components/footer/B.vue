<template>
  <div class="FooterItemB">
    <div class="title">广丰<div class="right"><resetTime :time="frequency.merchant_guangfeng" model="merchant_guangfeng"/></div></div>
    <div class="FooterItemBox">
      <div class="chartBox">
        <div class="chartTitle">交易总数趋势</div>
        <lineChart
          :xAxisData="totalSeries.obj1.xAxisData"
          :chartObj="totalSeries.obj1"
          :showXsplitLine="false"
          height="200px"
        />
      </div>
    </div>
    <!-- 后端不知道012怎么返回，先取告警等级 -->
    <div class="FooterItemBox channelBox">
      <div class="chartTitle">回调异常</div>
      <el-progress
        :class="`animated  ${callbackCount.warnLevel > 0? 'bounce' : ''} ${callbackCount.warnLevel > 1? 'infinite' : ''}`"
        :color=" `${callbackCount.warnLevel > 0 ? '#F04864' : '#90FF84'}`"
        type="circle"
        :percentage="100"
        :stroke-width="14"
        :width="88"
        :show-text="false"
      ></el-progress>
    </div>
    <div class="FooterItemBox resultBox">
      <div class="chartTitle">交易结果趋势</div>
      <part :data="payStateSeries" />
    </div>
  </div>
</template>
<script>
import lineChart from "components/common/chart/LineChart";
import resetTime from "components/common/resetTime";
import part from "components/common/part";
import { mapState } from "vuex";
export default {
  name: "FooterB",
  components: {
    lineChart,
    part,
    resetTime
  },
  computed: {
    ...mapState({
      frequency: state => state.data.result.frequency,
      totalSeries: state => {
        const data = state.data.result.merchantTotal.totalSeries.list;
        const warnLevel = state.data.result.smsData.warnLevel || 0;
        const arr1 = []; //总数
        const xAxisData = []; //X轴文字
        data.forEach(v => {
          arr1.push(v.total);
          xAxisData.push(v.time); 
        });
        return {
          obj1: {
            xAxisData,
            warnLevel,
            series: [
              {
                data: arr1,
                type: "line",
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: "#62C9EF"
                    }
                  }
                }
              }
            ]
          }
        };
      },
      callbackCount: state => {
        return state.data.result.merchantTotal.callbackCount;
      },
      payStateSeries: state => {
        return state.data.result.merchantTotal.payStateSeries;
      }
    })
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
@import "styles/config.scss";
svg path:first-child {
  stroke: #90ff84;
}
.FooterItemB {
  background: $background-color;
  padding: 17px 8px 8px 8px;
  margin: 0 8px;
  overflow: hidden;
  .title {
    margin-left: 8px;
  }
  .FooterItemBox {
    height: 120px;
    // margin-left: 24px;
    float: left;
    .chartBox {
      width: 275px;
    }
    .chartTitle {
      text-align: center;
      color: #b3b3b3;
      font-size: 12px;
      // margin:12px 0;
    }
  }
  .channelBox,
  .resultBox {
    padding: 8px;
    margin: 0 24px;
    .chartTitle {
      margin-bottom: 16px;
    }
    .el-progress__text {
      font-size: 18px !important;
      color: #fff;
    }
  }
  .resultBox {
    padding: 8px 0;
    margin: 0;
    .chartTitle {
      margin-bottom: 6px;
    }
  }
}
</style>
