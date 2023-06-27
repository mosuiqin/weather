<template>
  <div class="mapWrapper">
    <div class="title">四川省降雨分布</div>
    <sm-web-map :map-options="mapoptions">
      <sm-tdt-map-switcher
        :data="{ tk: tk }"
        :collapsed="false"
      ></sm-tdt-map-switcher>
    </sm-web-map>
  </div>
</template>

<script>
import netcdfjs from 'netcdfjs';
export default {
  name: 'mapView',
  data() {
    return {
      mapoptions: {
        center: [104.04318, 30.68141],
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
    }
  },
  mounted() {
    const xhr=new XMLHttpRequest()
    xhr.open('get','../data/index_2D_201712042000.nc',true)
    xhr.responseType='arraybuffer'
    xhr.onload=()=>{
      const data=new Uint8Array(xhr.response)
      const ncfile=new netcdfjs(data)
      console.log(ncfile);
    }
  },
}
</script>

<style scoped>
.mapWrapper {
  width: 55%;
  height: 100%;
  border-width: 0.24rem;
  border-image: url('../image/border.png') 12 fill / 1 / 0 stretch;
  box-sizing: border-box;
  border-style: solid;
}
.title {
  height: 1.2rem;
  font-size: 0.8rem;
  color: aliceblue;
  line-height: 1rem;
  text-align: center;
  font-family: 'MicrosoftYaHei';
}
.sm-component-web-map {
  height: 95%;
}
</style>
