<template>
  <div class="rainChartWrapper">
    <div class="rainChart" id="rainChart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'rainChart',
  data() {
    return {
      data: null,
    }
  },
  computed: {
    currentTime() {
      return this.$store.state.currentTime
    },
  },
  watch: {
    currentTime() {
      this.getChartData(this.currentTime.dataset)
    },
  },
  methods: {
    getChartData(dataset) {
      import(`../data/city${dataset.slice(1, 7)}.json`).then((res) => {
        this.data = res.default
        const city = this.data.map((item) => item.city.slice(0, 2))
        const avgData = this.data.map((item) => item.avg)
        if (city && avgData) {
          const rchart = echarts.init(
            document.getElementById('rainChart'),
            'dark'
          )
          const option = {
            tooltip: {
              trigger: 'item',
              formatter: '{b}:{c}',
            },
            xAxis: {
              type: 'category',
              data: city,
              axisLabel: {
                color: '#fff',
                show: true,
                rotate: 54,
                fontsize: 10,
              },
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                color: '#fff',
              },
              axisLine: {
                color: 'red',
              },
            },
            series: [
              {
                data: avgData,
                type: 'bar',
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#fff' },
                    { offset: 0.5, color: '#9ecae1' },
                    { offset: 1, color: '#08306b' },
                  ]),
                },
              },
            ],
            backgroundColor: 'transparent',
          }
          option && rchart.setOption(option)
        }
      })
    },
  },
  mounted() {
    this.getChartData(this.currentTime.dataset)
  },
}
</script>

<style scoped>
.rainChartWrapper {
  width: 100%;
  height: 49.5%;
  margin-top: 1%;
  border-width: 0.24rem;
  border-image: url('../image/border.png') 12 fill / 1 / 0 stretch;
  box-sizing: border-box;
  border-style: solid;
}
.rainChart {
  width: 100%;
  height: 100%;
}
</style>
