// initial state
import { StoreOptions } from "vuex";
import {UserControllerService} from "../../generated";
import ACCESS_ENUM from "@/access/accessEnum";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
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
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRoel: ACCESS_ENUM.NOT_LOGIN
        })
      }
    },
  },
} as StoreOptions<any>;
