<template>
  <div class="smTime">
    <sm-time-line
      v-bind="timeLineProps"
      :data="data"
      style="width: 100%"
      @timelinechanged="changed"
      @timelineplaychanged="changed"
      background="rgba(138, 134, 134, 0.8)"
    ></sm-time-line>
  </div>
</template>

<script>
import { changeRainPointMap } from '../../components/changeRainPointMap'
export default {
  name: 'mapTimeLine',
  props: ['timeInfo', 'map'],
  data() {
    return {
      timeLineProps: {
        // 动态播放
        autoPlay: true,
        playInterval: 3000,
        lineStyle: {
          color: '#8C8C8C',
          width: 2,
          type: 'solid',
        },
        label: {
          color: 'white',
        },
      },
    }
  },
  computed: {
    data() {
      return this.timeInfo.map((item) => item.time)
    },
  },
  methods: {
    changed(e) {
      // 获取当前日期
      const currentTime = this.timeInfo[e.currentIndex]
      this.$store.commit('changeCurrentTime', currentTime)
      // 加载雨量图
      changeRainPointMap(this.map, currentTime.dataset)
    },
  },
  mounted() {},
}
</script>

<style scoped>
.smTime {
  position: absolute;
  bottom: 0.2rem;
  left: 0.2rem;
  width: 98%;
}
</style>
