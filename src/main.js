import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jsQR from "jsqr";
import 'windi.css'

const app = createApp(App)
// install any js lib
app.provide('jsQR', jsQR)
// init app to #app
app.use(store).use(router).mount('#app')
