import { Module } from 'vuex'
import { ISystemState } from './type'
import { IRootState } from '@/store/type'
import { getPageListData } from '@/service/main/system/system'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUserCount(state, usersCount: number) {
      state.usersCount = usersCount
    }
  },
  actions: {
    async getPageListAction({ commit }, playload: any) {
      const pageResult = await getPageListData(playload.url, playload.queryInfo)
      const { list, totalCount } = pageResult.data
      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    }
  }
}
export default systemModule
