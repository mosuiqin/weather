<template>
  <div class="rainMapWrapper">
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
    }
  },
  methods: {
    init() {
      this.map = new mapboxgl.Map({
        container: 'rainmap',
        center: [104.04318, 30.68141],
        zoom: 10,
        style: {
          version: 8,
          sources: {
            rainLayer: {
              type: 'raster',
              tiles: [
                'https://iserver.supermap.io/iserver/services/map-china400/rest/maps/ChinaDark/zxyTileImage.png?z={z}&x={x}&y={y}',
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
  },
  mounted() {
    this.init()
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
  height: 100%;
  width: 100%;
  background-color: #fff;
}
</style>
