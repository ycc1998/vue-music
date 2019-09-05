import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import fastclick from 'fastclick'
import './common/stylus/index.styl'
import 'swiper/dist/css/swiper.css'
import VueLazyLoad from 'vue-lazyload'

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false;


Vue.use(VueLazyLoad,{
    loading:require('./common/image/default.png')
})

fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
