<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleNewClick"
          >新建用户</el-button
        >
      </template>
      <template #status="scope">
        <el-button size="mini" :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            icon="el-icon-edit"
            size="mini"
            type="text"
            @click="handleEditClick"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            icon="el-icon-delete"
            size="mini"
            type="text"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <template
        v-for="item in otherPropSlots"
        :key="item.props"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import hyTable from '../../../base-ui/table'
import { usePermission } from '../../../hooks/use-permission'
export default defineComponent({
  components: {
    hyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['editBtnClick', 'newBtnClick'],
  setup(props, { emit }) {
    const store = useStore()
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) {
        return
      }
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )
    getPageData()

    //获取其他动态插槽
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }

    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    const handleNewClick = () => {
      emit('newBtnClick')
    }

    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      handleDeleteClick,
      handleEditClick,
      handleNewClick
    }
  }
})
</script>

<style scoped></style>
