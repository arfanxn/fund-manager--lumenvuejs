import {
  createStore
} from 'vuex'
import auth from './modules/auth'
import userFund from './modules/userFund'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    userFund
  }
})