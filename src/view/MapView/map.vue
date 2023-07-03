<template>
  <div class="mapWrapper">
    <div class="title">四川省降雨分布</div>
    <sm-web-map :map-options="mapoptions" @load="load">
      <sm-tdt-map-switcher
        :data="{ tk: tk }"
        :collapsed="false"
      ></sm-tdt-map-switcher>
    </sm-web-map>
    <mapContent :timeInfo="this.currentTime" />
    <mapTimeLine
      :timeInfo="timeInfo"
      :map="map"
      v-if="map"
      @changeCurrentTime="changeCurrentTime"
    >
    </mapTimeLine>
  </div>
</template>

<script>
import mapContent from './mapContent.vue'
import mapTimeLine from './mapTimeLine.vue'
import { loadRainData } from '../../components/rainPontMap'
// import { Ref } from '@vue/composition-api'

export default {
  name: 'mapView',
  components: { mapContent, mapTimeLine },
  data() {
    return {
      mapoptions: {
        center: [103.24318, 30.08141],
        zoom: 6,
        style: {
          version: 8,
          sources: {
            baseLayer: {
              type: 'raster',
              tiles: [
                'https://t0.tianditu.gov.cn/img_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=img&tilematrix={z}&tilerow={y}&tilecol={x}',
              ],
              tileSize: 256,
            },
            labelLayer: {
              type: 'raster',
              tiles: [
                'https://t0.tianditu.gov.cn/cia_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=cia&tilematrix={z}&tilerow={y}&tilecol={x}',
              ],
              tileSize: 256,
            },
          },
          layers: [
            {
              id: 'baseLayer',
              type: 'raster',
              source: 'baseLayer',
              minzoom: 0,
              maxzoom: 18,
            },
            {
              id: 'labelLayer',
              type: 'raster',
              source: 'labelLayer',
              minzoom: 0,
              maxzoom: 18,
            },
          ],
        },
        renderWorldCopies: false,
      },
      tk: '1d109683f4d84198e37a38c442d68311',
      timeLineStyle: {
        color: '#EF6548',
        borderColor: '#EF6548',
      },
      dataUrl: 'http://10.45.1.179:8090/iserver/services/data-rain2/rest/data',
      sourcename: 'rain',
      map: null,
      currentTime: { dataset: 'd013008', time: ' 01-30 08:00' },
    }
  },
  created() {
    this.getTimeInfo()
  },
  computed: {
    timeInfo() {
      return this.$store.state.timeInfo
    },
  },
  watch: {},
  methods: {
    load(e) {
      this.map = e.map
      loadRainData(this.map, this.currentTime.dataset)
    },

    getTimeInfo() {
      this.$store.commit('getTimeInfo')
    },
    changeRainData(currentTime, map) {
      const layer = this.map.getStyle().layers
      console.log(layer)
      loadRainData(map, currentTime.dataset)
    },
    changeCurrentTime(data) {
      this.currentTime = data
    },
    queryRainData() {},
  },
  mounted() {
    this.queryRainData()
    // this.changeRainData(this.map, this.currentTime)
  },
}
</script>

<style scoped>
.mapWrapper {
  width: 55%;
  height: 100%;
  border-width: 0.24rem;
  border-image: url('../../image/border.png') 12 fill / 1 / 0 stretch;
  box-sizing: border-box;
  border-style: solid;
  position: relative;
}
.title {
  height: 1.2rem;
  font-size: 0.8rem;
  color: aliceblue;
  line-height: 1rem;
  text-align: center;
}
.sm-component-web-map {
  height: 95%;
}
</style>
