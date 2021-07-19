import Vue from 'vue/dist/vue.js';
import App from './App'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/black-green-light.css'

Vue.config.productionTip = false
Vue.use(VueMaterial)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})