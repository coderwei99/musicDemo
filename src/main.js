import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router'
import store from './store'
import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/lib/theme-chalk/display.css';
import AudioPlayer from '@liripeng/vue-audio-player'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'
import "./assets/base-css/normalize.css"


createApp(App).use(ElementPlus).use(store).use(router).use(AudioPlayer).mount('#app')
