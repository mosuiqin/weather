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
import mapboxgl from '@supermap/vue-iclient-mapboxgl/static/libs/mapboxgl/mapbox-gl-enhance'

export default {
  name: 'rainMap',
  data() {
    return {
      map: null,
      city: [],
      maxCounty: '锦江区',
      maxValue: 0.5,
      minCounty: '成华区',
      minValue: 0.1,
      selectOption: '成都市',
      data: null, //存储选中的市区雨量值
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
    },
  },
  methods: {
    // 初始化地图
    init() {
      this.map = new mapboxgl.Map({
        container: 'rainmap',
        center: [104.04318, 30.68141],
        zoom: 8,
        style: {
          version: 8,
          sources: {
            rainLayer: {
              type: 'raster',
              tiles: [
                'http://10.45.1.179:8090/iserver/services/map-rain/rest/maps/%E5%8C%BA%E5%8E%BF%E7%95%8C/zxyTileImage.png?z={z}&x={x}&y={y}',
              ],
              tileSize: 256,
            },
          },
          layers: [
            {
              id: 'rainLayer',
              type: 'raster',
              source: 'rainLayer',
              minzoom: 0,
              maxzoom: 18,
            },
          ],
        },
      })
    },
    // 获取市区
    getCityData(dataset) {
      import(`../data/city${dataset.slice(1, 7)}.json`).then((res) => {
        this.city = res.default.map((item) => item.city)
      })
    },
    // 获取当前日期的区县最大最小值
    getCountyData(selectOption) {
      const dataset = this.currentTime.dataset
      import(`../data/qx${dataset.slice(1, 7)}.json`)
        .then((res) => {
          this.data = res.default.filter((item) => item.city === selectOption)
          const avgData = this.data.map((item) => item.avg)
          this.maxValue = Math.max(...avgData)
          this.minValue = Math.min(...avgData)
          const maxIndex = avgData.findIndex((item) => {
            return this.maxValue == item
          })
          this.maxCounty = this.data[maxIndex].county
          const minIndex = avgData.findIndex((item) => this.minValue == item)
          this.minCounty = this.data[minIndex].county
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleSelectChange() {
      this.getCountyData(this.selectOption)
    },
    // 加载区县雨量到地图
    loadCountyDataMap(map) {
      console.log(map);
    },
  },
  mounted() {
    this.init()
    this.getCityData(this.currentTime.dataset)
    this.getCountyData(this.selectOption)
    this.loadCountyDataMap(this.map)
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
