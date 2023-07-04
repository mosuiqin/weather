<template>
  <div class="wrapper">
    <mapView  />
    <div class="left">
      <rainMap />
      <rainChart  />
    </div>
  </div>
</template>

<script>
import mapView from './MapView/map.vue'
import rainChart from './rainChart.vue'
import rainMap from './rainMap.vue'
export default {
  name: 'Home',
  components: { mapView, rainChart, rainMap },
  data() {
    return {
      // CurrentTime: 11,
    }
  },
  computed: {
    
  },
  methods: {
    // transferCurrentTime(data) {
    //   this.CurrentTime = data
    //   console.log(this.CurrentTime)
    // },
  },
}
</script>

<style scoped>
.wrapper {
  height: 98%;
  width: 99%;
  display: flex;
  margin: 0.5%;
}
.left {
  width: 44.5%;
  height: 100%;
  margin-left: 0.5%;
  display: flex;
  flex-direction: column;
}
</style>
