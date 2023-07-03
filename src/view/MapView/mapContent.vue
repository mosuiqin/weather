<template>
  <div class="mapContent">
    <div class="mapContent_time">{{ timeInfo.time }}</div>
    <div class="mapContent_maxmin">
      <div class="mapContent_max">
        <img src="../../image/green.png" class="mapContent_max_img" />
        <div class="mapContent_max_city">{{ maxCity.slice(0, 2) }}</div>
        <div class="mapContent_max_value">{{ maxvalue.toFixed(2) }}</div>
      </div>

      <div class="mapContent_min">
        <img src="../../image/red.png" class="mapContent_min_img" />
        <div class="mapContent_min_city">{{ minCity.slice(0, 2) }}</div>
        <div class="mapContent_min_value">{{ minvalue.toFixed(2) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mapContent',
  props: ['timeInfo'],
  data() {
    return {
      maxCity: '成都市',
      maxvalue: 0.17,
      minCity: '甘孜藏族自治州',
      minvalue: 0,
    }
  },
  watch: {
    'timeInfo.dataset'() {
      this.getData()
    },
  },
  methods: {
    getData() {
      const dataset = this.timeInfo.dataset
      console.log(dataset)
      import(`../../data/city${dataset.slice(1, 7)}.json`).then((res) => {
        const avgData = []
        for (let item in res.default) {
          avgData.push(res.default[item].avg)
        }
        this.maxvalue = Math.max(...avgData)
        let maxindex = avgData.findIndex((item) => {
          return this.maxvalue == item
        })
        this.maxCity = res.default[maxindex].city

        this.minvalue = Math.min(...avgData)
        let minindex = avgData.findIndex((item) => {
          return this.minvalue == item
        })
        this.minCity = res.default[minindex].city
      })
    },
  },
  mounted() {
    this.getData(this.$props.timeInfo.dataset)
    console.log(this.$props.timeInfo.dataset)
  },
}
</script>

<style scoped>
.mapContent {
  position: absolute;
  top: 2rem;
  right: 0.4rem;
  background-color: rgba(138, 134, 134, 0.8);
  border-radius: 0.2rem;
  color: rgb(243, 240, 240);
  text-align: center;
  font-size: 0.3rem;
  padding: 0.1rem;
}
.mapContent_time {
  font-size: 0.3rem;
  text-align: left;
  font-weight: lighter;
}
.mapContent_maxmin {
  display: flex;
}
.mapContent_max {
  margin-right: 0.2rem;
}
.mapContent_max_img,
.mapContent_min_img {
  height: 0.3rem;
  width: 1.4rem;
}
.mapContent_max_city,
.mapContent_min_city {
  font-weight: bold;
}
.mapContent_max_value {
  color: rgb(134, 221, 134);
}
.mapContent_min_value {
  color: rgb(224, 142, 142);
}
</style>
