import { createApp } from 'vue'
import { globalRegister } from './global'

import routeApp from './App.vue'
import router from './router'
import store from './store'

import './service/axios_demo'

const app = createApp(routeApp)

//注册element-plus组件
app.use(globalRegister)

app.use(router)
app.use(store)
app.mount('#app')

console.log(process.env.VUE_APP_BASE_URL)
