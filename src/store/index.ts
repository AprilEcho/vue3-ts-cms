import { createStore, Store, useStore as useVuexStore } from 'vuex'
import LoginModule from './login/login'
import system from './main/system/system'
import { IRootState, IStoreType } from './type'
import { getPageListData } from '@/service/main/system/system'
const store = createStore<IRootState>({
  state() {
    return {
      name: 'llz',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 获取部门 角色列表数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data

      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      const menuResult = await getPageListData('/menu/list', {})

      const { list: menuList } = menuResult.data

      // 保存角色 部门数据 角色权限
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  getters: {},
  modules: { LoginModule, system }
})
export function setupStore() {
  store.dispatch('LoginModule/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
