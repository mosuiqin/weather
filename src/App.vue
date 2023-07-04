<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from './view/Home.vue'

export default {
  name: 'App',
  components: {
    Home,
  },

}
</script>

<style scoped>
#app{
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: #000;
  width: 100%;
  height: 100%;
}
</style>
