<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize"; // echarts theme
require("echarts/theme/macarons");

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "110%"
    },
    height: {
      type: String,
      default: "300px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    xAxisData: {
      type: Array,
      required: true
    },
    chartObj: {
      type: Object,
      required: true
    },
    showXsplitLine: {
      type: Boolean,
      default: () => true
    },
    // Y轴最大值，设置最大比例100%的
    yAxisMax: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartObj: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartObj);
    },
    setOptions(data = {}) {
      this.chart.setOption({
        xAxis: {
          //   type: "category",
          splitLine: {
            show: this.showXsplitLine,
            lineStyle: {
              // 属性lineStyle（详见lineStyle）控制线条样式
              color: ["#3C475D"],
              width: 1
            },
            type: "solid"
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#596372",
              fontSize: 8
            }
          },
          data: this.xAxisData,
          axisLine: {
            lineStyle: {
              color: "#596372"
            },
            fontSize: 36
          }
        },
        yAxis: {
          max: this.yAxisMax,
          min: 0,
          splitLine: {
            // 分隔线
            // show: true, // 默认显示，属性show控制显示与否
            // onGap: null,
            lineStyle: {
              // 属性lineStyle（详见lineStyle）控制线条样式
              color: ["#3C475D"],
              width: 1,
              type: "solid"
            }
          },
          splitArea: {
            show: false
            // areaStyle: {
            // 属性areaStyle（详见areaStyle）控制区域样式
            // color: ["#3C475D", "#282D3B"]
            // }
          },
          axisLabel: {
            formatter: data.showScale ? "{value}%" : "{value}",
            textStyle: {
              color: "#596372",
              fontSize: 8
            }
          },
          axisLine: {
            lineStyle: {
              color: "#596372"
            }
          }
        },
        series: data.series
      });
    }
  }
};
</script>
