<template>
  <div style="overflow:hidden">
    <div class="itemBox tradeBox">
      <div class="title">
        交易总数
        <div class="right">
          <resetTime :time="frequency.order_total" model="order_total" />
        </div>
      </div>
      <p class="tip">
        <span class="total">■</span>总数
        <span class="err">■</span>失败
      </p>
      <div class="chartBox">
        <lineChart
          :xAxisData="orderTotalData.obj1.xAxisData"
          :chartObj="orderTotalData.obj1"
          :showXsplitLine="false"
        />
      </div>
    </div>
    <div
      class="itemBox smsBox"
      v-warn="{
        warnLevel: smsDataObj.obj1.warnLevel,
        show: smsDataObj.obj1.warnLevel
      }"
    >
      <div class="title2">
        短信
        <div class="right">
          <resetTime :time="frequency.sms" model="sms" />
        </div>
      </div>
      <div class="chartBox">
        <div class="chartTitle">发送异常</div>
        <lineChart
          :xAxisData="smsDataObj.obj1.xAxisData"
          :chartObj="smsDataObj.obj1"
          height="200px"
        />
      </div>
      <div class="chartBox">
        <div class="chartTitle">异常占比趋势</div>
        <lineChart
          :xAxisData="smsDataObj.obj2.xAxisData"
          :chartObj="smsDataObj.obj2"
          :yAxisMax="100"
          height="200px"
        />
      </div>
    </div>
    <div
      class="itemBox callbackBox"
      v-warn="{
        warnLevel: callbackObj.obj1.warnLevel,
        show: callbackObj.obj1.warnLevel
      }"
    >
      <div class="title2">
        回调
        <div class="right">
          <resetTime :time="frequency.callback" model="callback" />
        </div>
      </div>
      <div class="chartBox">
        <div class="chartTitle">发送异常</div>
        <lineChart
          :xAxisData="callbackObj.obj1.xAxisData"
          :chartObj="callbackObj.obj1"
          height="200px"
        />
      </div>
      <div class="chartBox">
        <div class="chartTitle">异常占比趋势</div>
        <lineChart
          :xAxisData="callbackObj.obj2.xAxisData"
          :chartObj="callbackObj.obj2"
          :yAxisMax="100"
          height="200px"
        />
      </div>
    </div>
  </div>
</template>
<script>
import lineChart from "components/common/chart/LineChart";
import resetTime from "components/common/resetTime";
import echarts from "echarts";
import { mapState } from "vuex";
export default {
  name: "Left",
  components: {
    lineChart,
    resetTime
  },
  computed: {
    ...mapState({
      frequency: state => state.data.result.frequency,
      orderTotalData: state => {
        const data = state.data.result.orderTotalData.list;
        const warnLevel = state.data.result.orderTotalData.warnLevel || 0;
        const arr1 = []; //异常
        const arr2 = []; //总数
        const xAxisData = []; //X轴文字
        data.forEach(v => {
          arr1.push(v.fail);
          arr2.push(v.total);
          xAxisData.push(v.time);
        });
        return {
          obj1: {
            warnLevel,
            xAxisData,
            series: [
              {
                data: arr1,
                type: "line",
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: "#FB5555"
                    }
                  }
                },
                areaStyle: {
                  normal: {
                    //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                      {
                        offset: 0,
                        color: "#FB5555"
                      },
                      {
                        offset: 0.5,
                        color: "rgba(251,85,85,0.5)"
                      },
                      {
                        offset: 1,
                        color: "rgba(251,85,85,0.00)"
                      }
                    ])
                  }
                }
              },
              {
                data: arr2,
                type: "line",
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: "#90FF84"
                    }
                  }
                },
                areaStyle: {
                  normal: {
                    //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                    color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
                      {
                        offset: 0,
                        color: "#90FF84"
                      },
                      {
                        offset: 0.5,
                        color: "rgba(144,255,132,0.5)"
                      },
                      {
                        offset: 1,
                        color: "rgba(144,255,132,0)"
                      }
                    ])
                  }
                }
              }
            ]
          }
        };
      },
      smsDataObj: state => {
        console.log(state);

        const data = state.data.result.smsData.list;
        const warnLevel = state.data.result.smsData.warnLevel || 0;
        const arr1 = []; //异常
        const arr2 = []; //占比
        const xAxisData = []; //X轴文字
        data.forEach(v => {
          arr1.push(v.fail + v.sending);
          arr2.push(
            `${(v.total === 0 ? 0 : (v.fail + v.sending) / v.total).toFixed(2) *
              100}`
          );
          xAxisData.push(v.endTime);
        });
        return {
          obj1: {
            warnLevel,
            xAxisData,
            series: [
              {
                data: arr1,
                type: "line",
                itemStyle: {
                  normal: {
                    lineStyle: {
                      // 系列级个性化折线样式
                      width: 2,
                      type: "solid",
                      color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        {
                          offset: 0,
                          color: "#54FFEB"
                        },
                        {
                          offset: 1,
                          color: "#62C9EF"
                        }
                      ]) //线条渐变色
                    }
                  }
                }
                // areaStyle: {
                //   // color: "#90FF84"
                // }
              }
            ]
          },
          obj2: {
            xAxisData,
            showScale: true,
            series: [
              {
                data: arr2,
                type: "line",
                itemStyle: {
                  normal: {
                    lineStyle: {
                      // 系列级个性化折线样式
                      width: 2,
                      type: "solid",
                      color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        {
                          offset: 0,
                          color: "#FFF58B"
                        },
                        {
                          offset: 1,
                          color: "#FB5555"
                        }
                      ]) //线条渐变色
                    }
                  }
                }
                // areaStyle: {
                //   color: "#FB5756"
                // }
              }
            ]
          }
        };
      },
      callbackObj: state => {
        const data = state.data.result.callback.list;
        const warnLevel = state.data.result.callback.warnLevel || 0;
        const arr1 = []; //异常
        const arr2 = []; //占比
        const xAxisData = []; //X轴文字
        data.forEach(v => {
          arr1.push(v.fail + v.queueing);
          arr2.push(
            `${(v.total === 0 ? 0 : (v.fail + v.queueing) / v.total).toFixed(
              2
            ) * 100}`
          );
          xAxisData.push(v.endTime);
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
                      // 系列级个性化折线样式
                      width: 2,
                      type: "solid",
                      color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        {
                          offset: 0,
                          color: "#54FFEB"
                        },
                        {
                          offset: 1,
                          color: "#62C9EF"
                        }
                      ]) //线条渐变色
                    }
                  }
                }
                // areaStyle: {
                //   // color: "#90FF84"
                // }
              }
            ]
          },
          obj2: {
            xAxisData,
            showScale: true,
            series: [
              {
                data: arr2,
                type: "line",
                itemStyle: {
                  normal: {
                    lineStyle: {
                      // 系列级个性化折线样式
                      width: 2,
                      type: "solid",
                      color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        {
                          offset: 0,
                          color: "#FFF58B"
                        },
                        {
                          offset: 1,
                          color: "#FB5555"
                        }
                      ]) //线条渐变色
                    }
                  }
                }
                // areaStyle: {
                //   color: "#FB5756"
                // }
              }
            ]
          }
        };
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
.tradeBox {
  height: 270px;
  position: relative;
  .tip {
    position: absolute;
    right: 24px;
    top: 30px;
    font-size: 12px;
    .total {
      color: #90ff84;
      font-size: 18px;
      margin-right: 8px;
    }
    .err {
      color: $error;
      font-size: 18px;
      margin-left: 22px;
      margin-right: 8px;
    }
  }
}
.smsBox,
.callbackBox {
  height: 328px;
}
.callbackBox {
  margin-bottom: 0px !important;
}
.chartBox {
  position: relative;
  bottom: 15px;
  height: 160px;
  .chartTitle {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 25px;
    font-size: 18px;
    color: #ffffff;
  }
}
</style>
