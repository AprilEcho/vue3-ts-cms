<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      pageName="role"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <el-tree
        ref="elTreeRef"
        :data="menus"
        :props="{ children: 'children', label: 'name' }"
        node-key="id"
        show-checkbox
        @check="handleChekChange"
      >
      </el-tree>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick } from 'vue'
import { useStore } from '../../../../store'
import { menuMapLeafKeys } from '../../../../utils/map-menus'
import pageContent from '../../../../components/page-content'
import pageSearch from '../../../../components/page-search'
import PageModal from '../../../../components/page-modal'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'
import { usePageModal } from '../../../../hooks/use-page-modal'
import { ElTree } from 'element-plus'

export default defineComponent({
  name: 'role',
  components: {
    pageSearch,
    pageContent,
    PageModal
  },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, handleNewData, handleEditData, defaultInfo] =
      usePageModal(undefined, editCallback)

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleChekChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageModalRef,
      handleNewData,
      handleEditData,
      defaultInfo,
      menus,
      otherInfo,
      handleChekChange,
      elTreeRef
    }
  }
})
</script>

<style scoped></style>
