<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-module
      :modalConfig="modalConfigRef"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></page-module>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import pageSearch from '../../../../components/page-search'
import pageContent from '../../../../components/page-content'
import PageModule from '../../../../components/page-modal'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { usePageSearch } from '../../../../hooks/usePageSearch'

import { usePageModal } from '../../../../hooks/use-page-modal'

import { useStore } from '../../../../store'
export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    pageContent,
    PageModule
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    const store = useStore()
    // store.dispatch('getInitialDataAction')

    // 计算属性 解决接口异步延迟的问题 数据更改重新计算
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    const [pageModalRef, handleNewData, handleEditData, defaultInfo] =
      usePageModal(newCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modalConfigRef,
      pageModalRef,
      handleNewData,
      handleEditData,
      defaultInfo
    }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
