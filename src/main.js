import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import sportZAPI from "@/utils/sportZAPI";
import globalMixin from "@/mixins"
import Vuelidate from 'vuelidate'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // Import the styles

const baseurl = 'http://127.0.0.1:8080'
window.sportZAPI = Vue.$sportZAPI = Vue.prototype.$sportZAPI = sportZAPI({ baseurl: baseurl, servertype: 'apiServer' });

Vue.mixin(globalMixin);
Vue.use(Vuelidate)
Vue.use(Toast);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
