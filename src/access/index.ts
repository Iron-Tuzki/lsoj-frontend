import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

// 鉴权
router.beforeEach(async (to, from, next) => {
  let loginUser = store.state.user.loginUser;
  // 获取登录信息
  if (!loginUser || !loginUser.userRole || loginUser.userRole === ACCESS_ENUM.NOT_LOGIN ) {
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }
  // 需要登录的页面
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    if (!loginUser || !loginUser.userRole || loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
      next("/user/login?redirect=${to.fullPath}");
      return;
    }
  }
  if (!checkAccess(loginUser, needAccess)) {
    next("/noAuth");
    return;
  }
  next();
});
