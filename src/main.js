import Vue from 'vue'
import App from './App.vue'

import VueiClient from '@supermap/vue-iclient-mapboxgl';
import store from './store/index'



import './style/base.css'

Vue.config.productionTip = false


Vue.use(VueiClient);


new Vue({
  
  store,
  render: h => h(App),
}).$mount('#app')