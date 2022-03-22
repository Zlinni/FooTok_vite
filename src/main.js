import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import router from "./router"
import 'element-plus/dist/index.css'
import App from './App.vue'
import './css/index.css'
import './css/icon.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(createPinia())
app.mount('#app')