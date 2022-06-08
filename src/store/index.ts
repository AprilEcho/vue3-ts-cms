import { createStore, Store, useStore as useVuexStore } from 'vuex'
import LoginModule from './login/login'
import { IRootState, IStoreType } from './type'
const store = createStore<IRootState>({
  state() {
    return {
      name: 'llz',
      age: 18
    }
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: { LoginModule }
})
export function setupStore() {
  store.dispatch('LoginModule/loadLocalLogin')
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
