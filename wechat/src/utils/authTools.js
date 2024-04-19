/**
 * 微信授权登录
 */
import {
  AuthControllerRegister,
  AuthControllerWeChatLogin,
  AuthControllerGetWeChatPhoneNumber,
  AuthControllerWeChatLoginRefresh,
  AuthControllerWeChatLoginRegistration,
  AuthControllerLoginOpenId
} from "@/api/AuthControllerApi.js";
import {
  saveToken,
  deleteToken,
  tokenIsOk,
  getUserInfoByStorage,
  setUserInfoByStorage,
} from "./authToken";
import { userLoginOpenIdState, userLoginLastTime } from "@/utils/state.js";
export function weChatLogin() {
  // 获取code，后台换取openId，查询是否有会员
  // 有会员则返回登录成功，及accessToken;
  // 无会员则返回登录失败，返回openId，需要授权登录
  return new Promise((resolve, reject) => {
    // #ifdef MP-WEIXIN
    uni.login({
      provider: "weixin",
      async success(res) {
        const { code } = res;
        console.log(code);
        const { data
        // } = await AuthControllerWeChatLogin(code);
        } = await AuthControllerWeChatLoginRegistration(code);
        // } = await AuthControllerLoginOpenId('oxa9H48mid6f_pwREfCrCgV-K9Wc');
        console.log(data);
        if (data.status == 1) {
          // 登录成功
          saveToken(data.data);
          userLoginLastTime.set();
        } else {
          userLoginOpenIdState.set(data.data);
          deleteToken();
          toLoginPage();
        }
        resolve(data);
      },
    });
    // #endif
  });
}
export function weChatLoginRefresh() {
  // 获取code，后台换取openId，查询是否有会员
  // 有会员则返回登录成功，及accessToken;
  // 无会员则返回登录失败，返回openId，需要授权登录
  return new Promise(async (resolve, reject) => {
    const { data } = await AuthControllerWeChatLoginRefresh();
    if (data.status == 1) {
      // 刷新成功
      saveToken(data.data);
      console.log("获取刷新token", data.data);
    }
    resolve(data);
  });
}
/**
 * 跳转登录授权页
 */
export function toLoginPage() {
  const { route } = getCurrentPages().pop();
  //   console.log("------------当前页面位置", route);
  if (!["pages/auth/login"].includes(route)) {
    setTimeout(() => {
      /**
       * 首次进入系统，ios端会出现无法加载login的情况，
       * 顾用timeout让跳转在所有事件队列（应该包含页面加载事件）执行完以后再执行跳转
       */
      uni.navigateTo({
        url: "/pages/auth/login"
      });
    }, 100);
  }
}
export function registerMember(avatarUrl, nickName) {
  // 当登录失败时，用登录失败的openId，及用户授权获取的用户信息，来进行会员注册
  return new Promise(async (resolve, reject) => {
    uni.showLoading({
      title: "登录中",
    });
    const { data } = await AuthControllerRegister({
      openId: userLoginOpenIdState.get(),
      userName: nickName,
      avatar: avatarUrl,
      sex: 0,
    });
    uni.hideLoading();
    if (data.status == 1) {
      saveToken(data.data);
    }
    resolve(data);
  });
}
export async function getPhoneNumber(code) {
  // 获取用户电话号码
  if (tokenIsOk()) {
    const { data } = await AuthControllerGetWeChatPhoneNumber(code);
    if (data.status == 1) {
      const userInfo = getUserInfoByStorage();
      if (userInfo) {
        console.log(userInfo);
        userInfo.phoneNumber = data.data;
        setUserInfoByStorage(userInfo);
      }
    } else {
      uni.showToast({
        icon: "error",
        title: data.message,
      });
    }
    return data;
  } else {
    uni.showToast({
      title: "请先登录",
      icon: "error",
    });
    return;
  }
}
