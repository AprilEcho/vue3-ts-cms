<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click="handleSignout">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import Localcache from '@/utils/cache'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const rouer = useRouter()
    const store = useStore()
    const name = computed(() => store.state.LoginModule.userInfo.name)
    const handleSignout = () => {
      console.log(rouer)
      Localcache.deleteCache('token')
      rouer.push('/main')
    }
    return {
      name,
      handleSignout
    }
  }
})
</script>

<style lang="less" scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    margin-left: 1px;
  }
}
</style>
