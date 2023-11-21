// initial state
import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "lanshu",
      role: "notlogin"
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
      commit("updateUser", { username: "lanshu" });
    },
  },
} as StoreOptions<any>;
