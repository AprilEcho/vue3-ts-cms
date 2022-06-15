import { createApp } from 'vue'
import { globalRegister } from './global'
import routeApp from './App.vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import store, { setupStore } from './store'

const app = createApp(routeApp)

//注册element-plus组件
app.use(globalRegister)

setupStore()
app.use(router).use(store).mount('#app')
