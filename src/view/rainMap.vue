<template>
  <div class="rainMapWrapper">
    <div class="text">
      <span class="city">城市:</span>
      <select
        class="rainSelect"
        id="rainSelect"
        v-model="selectOption"
        @change="handleSelectChange"
      >
        <option :value="item" v-for="item of city" :key="item">
          {{ item }}
        </option>
      </select>
      <span class="maxCity">{{ maxCounty }}</span>
      <span class="maxValue">{{ maxValue.toFixed(2) }}</span>
      <span class="minCity">{{ minCounty }}</span>
      <span class="minValue">{{ minValue.toFixed(2) }}</span>
    </div>
    <div class="rainmap" id="rainmap"></div>
  </div>
</template>

<script>
// import mapboxgl from '@supermap/vue-iclient-mapboxgl/static/libs/mapboxgl/mapbox-gl-enhance'
import echarts from 'echarts'

export default {
  name: 'rainMap',
  data() {
    return {
      map: null,
      city: null,
      maxCounty: '锦江区',
      maxValue: 0.5,
      minCounty: '成华区',
      minValue: 0.1,
      selectOption: '成都市',
      data: null, //存储选中的市区雨量值
      lon: null,
      lat: null,
    }
  },
  computed: {
    currentTime() {
      return this.$store.state.currentTime
    },
  },
  watch: {
    currentTime() {
      this.getCountyData(this.selectOption)
      this.init(this.selectOption)
    },
  },
  beforeCreate() {},
  methods: {
    // 获取市区
    getCityData() {
      import(`../data/city.json`).then((res) => {
        this.city = res.default.map((item) => item.city)
        this.lon = res.default.map((item) => item.lon)
        this.lat = res.default.map((item) => item.lat)
      })
    },
    // 初始化地图
    init(selectOption) {
      // this.map = new mapboxgl.Map({
      //   container: 'rainmap',
      //   center: [104.04318, 30.68141],
      //   zoom: 8,
      //   style: {
      //     version: 8,
      //     sources: {
      //       rainLayer: {
      //         type: 'raster',
      //         tiles: [
      //           'http://10.45.1.179:8090/iserver/services/map-rain/rest/maps/%E5%8C%BA%E5%8E%BF%E7%95%8C/zxyTileImage.png?z={z}&x={x}&y={y}',
      //         ],
      //         tileSize: 256,
      //       },
      //     },
      //     layers: [
      //       {
      //         id: 'rainLayer',
      //         type: 'raster',
      //         source: 'rainLayer',
      //         minzoom: 0,
      //         maxzoom: 18,
      //       },
      //     ],
      //   },
      // })
      const Rchart = echarts.init(document.getElementById('rainmap'))
      let index
      let latLon = [103.901251, 30.76586221]
      if (this.city) {
        index = this.city.findIndex((item) => item == selectOption)
        latLon = [this.lon[index], this.lat[index]]
      }
      import('../data/区县界_R.json')
        .then((res) => {
          const datajson = res.default
          // 引入地图
          echarts.registerMap('sichuan', datajson)
          const chartdata = this.data.map((item) => {
            return { value: item.avg, name: item.county }
          })
          const option = {
            backgroundColor: 'transprent',
            tooltip: {
              formatter: '{b}:{c}',
            },
            geo: {
              map: 'sichuan',
              zoom: 7,
              // 开启地图漫游
              roam: true,
              center: latLon,
              label:{
                show:true}
            },
            // 设置色带
            visualMap: {
              min: 0,
              max: 0.5,
              text: ['High', 'Low'],
              calculable: true,
              inRange: {
                color: [
                '#f7fbff' ,'#deebf7','#c6dbef','#9ecae1' ,'#6baed6', '#4292c6' 
                ],
              },
            },
            series: [
              {
                type: 'map',
                // // 绑定地图
                // map: 'sichuan',
                coordinateSystem: 'geo',
                // 指定geo组件
                geoIndex: 0,
                data: chartdata,
              },
            ],
          }
          Rchart.setOption(option)
        })
        .catch((err) => {
          throw err
        })
    },

    // 获取当前日期的区县最大最小值
    getCountyData(selectOption) {
      const dataset = this.currentTime.dataset
      import(`../data/qx${dataset.slice(1, 7)}.json`)
        .then((res) => {
          this.testdata = res.default
          this.data = res.default.filter((item) => item.city === selectOption)
          const avgData = this.data.map((item) => item.avg)
          this.maxValue = Math.max(...avgData)
          this.minValue = Math.min(...avgData)
          const maxIndex = avgData.findIndex((item) => this.maxValue == item)
          this.maxCounty = this.data[maxIndex].county
          const minIndex = avgData.findIndex((item) => this.minValue == item)
          this.minCounty = this.data[minIndex].county
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 下拉框选项改变
    handleSelectChange() {
      this.getCountyData(this.selectOption)
      this.init(this.selectOption)
    },
  },
  mounted() {
    this.getCityData()
    this.getCountyData(this.selectOption)
    this.init(this.selectOption)
  },
}
</script>

<style scoped>
.rainMapWrapper {
  width: 100%;
  height: 49.5%;
  border-width: 0.24rem;
  border-image: url('../image/border.png') 12 fill / 1 / 0 stretch;
  box-sizing: border-box;
  border-style: solid;
}
.rainmap {
  height: 89%;
  width: 98%;
  background-color: #fff;
  margin-left: 0.5%;
}
.text {
  margin: 0.2rem 0 0.2rem 1rem;
  color: #fff;
  font-size: 0.4rem;
}
.rainSelect {
  color: #666;
}
span {
  margin-right: 0.4rem;
}
.maxCity {
  margin-left: 0.6rem;
}
.maxValue {
  color: rgb(134, 221, 134);
}
.minValue {
  color: rgb(224, 142, 142);
}
</style>
