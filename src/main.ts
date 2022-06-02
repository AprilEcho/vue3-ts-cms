import { createApp } from 'vue'
import { globalRegister } from './global'

import routeApp from './App.vue'
import router from './router'
import store from './store'

import hyRequest from './service'

const app = createApp(routeApp)

//注册element-plus组件
app.use(globalRegister)

app.use(router)
app.use(store)
app.mount('#app')

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

hyRequest
  .get<DataType>({
    url: '/home/multidata',
    // showLoading: true,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('单独请求的config')
        return config
      }
    }
  })
  .then((res) => {
    console.log(res)
  })
