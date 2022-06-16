import { Module } from 'vuex'
import { ISystemState } from './type'
import { IRootState } from '@/store/type'
import { getPageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUserCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'user':
            return state.usersList
          case 'role':
            return state.roleList
        }
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, playload: any) {
      const pageName = playload.pageName
      let pageUrl = ''
      switch (pageName) {
        case 'user':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
      }
      const pageResult = await getPageListData(pageUrl, playload.queryInfo)

      const { list, totalCount } = pageResult.data
      commit(
        `change${pageName.replace(pageName[0], pageName[0].toUpperCase())}List`,
        list
      )
      commit(
        `change${pageName.replace(
          pageName[0],
          pageName[0].toUpperCase()
        )}Count`,
        totalCount
      )
    }
  }
}
export default systemModule
