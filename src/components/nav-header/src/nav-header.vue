<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? ' el-icon-s-fold' : ' el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <breadcrumb :breadcrumb="Breadcrumb" />
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import Breadcrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
export default defineComponent({
  components: {
    UserInfo,
    Breadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const store = useStore()
    const Breadcrumb = computed(() => {
      const userMenu = store.state.LoginModule.userMenus
      const route = useRoute()
      return pathMapBreadcrumbs(userMenu, route.path)
    })
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return {
      isFold,
      handleFoldClick,
      Breadcrumb
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
