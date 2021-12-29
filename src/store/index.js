import {
  createStore
} from 'vuex'
import auth from './modules/auth'
import transaction from './modules/transaction'
import fund from './modules/fund'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    transaction,
    fund
  }
})