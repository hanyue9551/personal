import axios, { AxiosInterceptorOptions } from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

type BaseApiResponse<T> = {
  code: number;
  message: string;
  result: T;
};

interface ExpandAxiosRequestConfig<T = any> extends AxiosRequestConfig<T> {
  interceptorHooks?: InterceptorHooks;
}

interface ExpandInternalAxiosRequestConfig<T = any>
  extends InternalAxiosRequestConfig<T> {
  interceptorHooks?: InterceptorHooks;
}

export interface ExpandAxiosResponse<T = any, D = any>
  extends AxiosResponse<T, D> {
  config: ExpandInternalAxiosRequestConfig<D>;
}

export interface InterceptorHooks {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (
    response: AxiosResponse
  ) => AxiosResponse | Promise<AxiosResponse>;
  responseInterceptorCatch?: (error: any) => any;
}

export class Request {
  private instance: AxiosInstance;

  private axiosConfig: ExpandAxiosRequestConfig = {
    baseURL: "http://127.0.0.1:3000",
    timeout: 5000,
  };

  private interceptorHooks?: InterceptorHooks;

  constructor(config: ExpandAxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.axiosConfig, config));
    this.interceptorHooks = config.interceptorHooks;
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      this.interceptorHooks?.requestInterceptor,
      this.interceptorHooks?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptorHooks?.responseInterceptor,
      this.interceptorHooks?.responseInterceptorCatch
    );
  }

  public request(config: ExpandAxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T = any>(
    url: string,
    config?: ExpandAxiosRequestConfig
  ): Promise<AxiosResponse<BaseApiResponse<T>>> {
    return this.instance.get(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: ExpandAxiosRequestConfig
  ): Promise<T> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: ExpandAxiosRequestConfig
  ): Promise<T> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: ExpandAxiosRequestConfig
  ): Promise<T> {
    return this.instance.delete(url, config);
  }
}
