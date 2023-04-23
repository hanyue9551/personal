import { Request, InterceptorHooks, ExpandAxiosResponse } from "./axiosApi";

const transform: InterceptorHooks = {
  requestInterceptor(config) {
    const token = "tokenKey";
    if (token) {
      config!.headers!.Authorization = token;
    }
    console.log("1", config);
    return config;
  },
  requestInterceptorCatch(err) {
    console.log("2", err);
    return Promise.reject(err);
  },
  responseInterceptor(result) {
    const res = result as ExpandAxiosResponse;
    console.log("3", res);
    const SUCCESS_CODE = 1;
    if (res.status !== 200) return Promise.reject(res);
    if (res.data.code !== SUCCESS_CODE) return Promise.reject(res.data);
    return res.data;
  },
  responseInterceptorCatch(err) {
    const mapErrorStatus = new Map([
      [400, "请求方式错误"],
      [401, "请重新登录"],
      [403, "拒绝访问"],
      [404, "请求地址错误"],
      [500, "服务器出错"],
    ]);
    const message =
      mapErrorStatus.get(err.response.status) || "请求出错, 请稍后再试";
    console.log("4", message);
    return Promise.reject(err.response);
  },
};

export const request = new Request({
  interceptorHooks: transform,
});
