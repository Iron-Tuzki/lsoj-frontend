// initial state
import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "lanshu",
      userRole: "admin"
    },
  }),
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
  actions: {
    async getLoginUser({ commit, state }, payload) {
      // 从远程请求获取登录信息
      commit("updateUser", payload);
    },
  },
} as StoreOptions<any>;
