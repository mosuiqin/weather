<template>
  <div class="mapWrapper">
    <div class="title">四川省降雨分布</div>
    <sm-web-map :map-options="mapoptions" @load="load">
      <sm-tdt-map-switcher
        :data="{ tk: tk }"
        :collapsed="false"
      ></sm-tdt-map-switcher>
    </sm-web-map>
    <mapContent/>
    <mapTimeLine
      :timeInfo="timeInfo"
      :map="map"
      v-if="map"
    >
    </mapTimeLine>
  </div>
</template>

<script>
import mapContent from './mapContent.vue'
import mapTimeLine from './mapTimeLine.vue'
import { loadRainData } from '../../components/rainPontMap'

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
    }
  },
  created() {
    this.getTimeInfo()
  },
  computed: {
    timeInfo() {
      return this.$store.state.timeInfo
    },
    currentTime(){
      return this.$store.state.currentTime
    }
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
      loadRainData(map, currentTime.dataset)
    },
  },
  mounted() {},
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
