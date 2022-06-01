<template>
  <div class="app">
    <h2>{{ $store.state.name }}</h2>
    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link>
    <router-view />
    <el-button>hhh</el-button>
    <el-input />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'App',
  setup() {
    const $store = useStore()
    return {
      $store
    }
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
