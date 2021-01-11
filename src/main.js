import Vue from 'vue'
import App from './App.vue'

import YmapPlugin from 'vue-yandex-maps'

const settings = {
  apiKey: '4c954668-1707-45a9-8220-b0b787685f36',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1',
}

Vue.use(YmapPlugin, settings)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
