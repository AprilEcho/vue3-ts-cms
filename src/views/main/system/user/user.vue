<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <div class="content">
      <hy-table
        :listData="userList"
        :propList="propList"
        :showIndexColumn="showIndexColumn"
        :showSelectColumn="showSelectColumn"
        :title="title"
      >
        <template #headerHandler>
          <el-button type="primary" size="medium">新建用户</el-button>
        </template>
        <template #status="scope">
          <el-button
            size="mini"
            :type="scope.row.enable ? 'success' : 'danger'"
          >
            {{ scope.row.enable ? '启用' : '禁用' }}
          </el-button>
        </template>
        <template #createAt="scope">
          <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
        </template>
        <template #updateAt="scope">
          <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
        </template>
        <template #handler>
          <div class="handle-btns">
            <el-button icon="el-icon-edit" size="mini" type="text"
              >编辑</el-button
            >
            <el-button icon="el-icon-delete" size="mini" type="text"
              >删除</el-button
            >
          </div>
        </template>
      </hy-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import pageSearch from '../../../../components/page-search'
import { searchFormConfig } from './config/search.config'
import hyTable from '@/base-ui/table'
export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    hyTable
  },
  setup() {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      url: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() => store.state.system.usersList)

    const title = '用户列表'

    const userCount = computed(() => store.state.system.usersCount)

    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'realname', label: '真实姓名', minWidth: '100' },
      { prop: 'cellphone', label: '手机号码', minWidth: '120' },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '250',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '250',
        slotName: 'updateAt'
      },
      { label: '操作', minWidth: '120', slotName: 'handler' }
    ]

    const showIndexColumn = true
    const showSelectColumn = true

    return {
      searchFormConfig,
      userList,
      propList,
      showIndexColumn,
      showSelectColumn,
      title
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
