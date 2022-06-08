import { createApp } from 'vue'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'
import routeApp from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
const app = createApp(routeApp)

//注册element-plus组件
app.use(globalRegister)

app.use(router)
app.use(store)

setupStore()

app.mount('#app')
