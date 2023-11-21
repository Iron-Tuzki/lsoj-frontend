import ACCESS_ENUM from "@/access/accessEnum";

/**
 *
 * @param loginUser 登录用户
 * @param curPageNeedAccess 当前页面需要的权限
 */
const checkAccess = (loginUser: any, curPageNeedAccess = ACCESS_ENUM.NOT_LOGIN) => {
    const role = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
    if (curPageNeedAccess === ACCESS_ENUM.NOT_LOGIN) {
        return true;
    }
    // 需要用户登录才能访问
    if (curPageNeedAccess === ACCESS_ENUM.USER) {
        if (role === ACCESS_ENUM.NOT_LOGIN) {
            return false;
        }
    }
    if (curPageNeedAccess === ACCESS_ENUM.ADMIN) {
        if (role !== ACCESS_ENUM.ADMIN) {
            return false;
        }
    }

    return true;
};

export default checkAccess;
