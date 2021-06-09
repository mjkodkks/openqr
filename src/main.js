import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jsQR from "jsqr";
import 'windi.css'
import VueGtag from "vue-gtag-next";

const app = createApp(App)
// install any js lib
app.provide('jsQR', jsQR)

// init google analytic
app.use(VueGtag, {
    property: {
      id: process.env.VUE_APP_GTAG
    }
  });
// init app to #app
app.use(store).use(router).mount('#app')
