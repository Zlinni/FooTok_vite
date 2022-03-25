import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import lazyPlugin from 'vue3-lazy'
import getAssetsImages from './hook/getAssetsImages'
import router from "./router"
import 'element-plus/dist/index.css'
import App from './App.vue'
import './css/index.css'
import './css/icon.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(createPinia())
app.use(lazyPlugin,{
    loading:'//wimg.588ku.com/gif620/21/04/13/0beae0bcf27aaf7b781aed54e05b3d06.gif',
    error:getAssetsImages('eye','闭眼.png')
})
app.mount('#app')