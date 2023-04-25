import { Request, InterceptorHooks, ExpandAxiosResponse } from "./axiosApi";

const transform: InterceptorHooks = {
  requestInterceptor(config) {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InhuaGoiLCJpYXQiOjE2ODIzNzM5MTcsImV4cCI6MTY4MjM3NzUxN30.RFrYWeop4ZmS00mypuuUGmQsnRkvy4wZFKMEjEPhf1k";
    // 只有后台管理页验证token
    if (config.url?.includes("/management")) {
      if (token) {
        config!.headers!.Authorization = "Bearer " + token;
      }
    }
    console.log("请求:    ", config);
    return config;
  },
  requestInterceptorCatch(err) {
    console.log("请求错误:    ", err);
    return Promise.reject(err);
  },
  responseInterceptor(result) {
    const res = result as ExpandAxiosResponse;
    console.log("响应:    ", res);
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
    console.log("响应错误:    ", err, message);
    return Promise.reject(err.response);
  },
};

export const request = new Request({
  interceptorHooks: transform,
});
