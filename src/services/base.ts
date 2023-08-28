import axios, { AxiosError } from 'axios'
import type {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosInstance,
} from 'axios'

import { useAuthStore } from 'src/store/user'
// const {updateUserInfo,updateToken} = useAuthStore()
import { CONFIG } from 'src/config'
import { ElMessage } from 'element-plus'
import {router} from 'src/router'
import {SiteApis} from "src/services/api"

const axiosInstance = axios
.create(
  {
    baseURL: `${CONFIG.API_HOST}`,
    timeout: 5 * 60 * 1000,
  },
)

// 刷新TOKEN返回类型
export interface refreshTokenResponse {
  code: string,
  msg: string,
  data: {
      access_token: string,
      refresh_token: string,
  }
}

// 是否正在刷新token
let isRefreshToken = false
// 重试队列，每一项将是一个待执行的函数形式
let requests: any[] = []
// 定义拦截器
axiosInstance.interceptors.response.use(
  response => {
    // 正常响应时的拦截
    return response
  },
  error => {
    // 出现异常时的拦截
    console.log('默认的异常拦截器', isRefreshToken)
    if (error.response.status == 401 && !error.config.url.includes(SiteApis.usercenter.refreshToken.url)) {
      // 只有在非刷新Token的接口时才需要重新刷新TOKEN
      // 如果调用了刷新TOKEN接口后出现401,说明refresh token,此时不应该再去刷新Token
      console.log(useAuthStore().isLogin.value, useAuthStore().tokens?.refreshToken)
      if (useAuthStore().isLogin.value && useAuthStore().tokens?.refreshToken) {
        if (!isRefreshToken) {
          isRefreshToken = true
          console.log('刷新token....')
          return axiosInstance.request<refreshTokenResponse, any>({
            method: 'post',
            url: SiteApis.usercenter.refreshToken.url,
            headers: {
              "Authorization": `Bearer ${useAuthStore().tokens?.refreshToken}`,
            }
            ,
          }).then((res) => {
            useAuthStore().updateToken(res.data.access_token, useAuthStore().tokens?.refreshToken as string)
            console.log('刷新token成功', res)
            // 已经刷新了token，将所有队列中的请求进行重试
            requests.forEach(cb => cb(res.data.access_token))
            requests = []
            // 重新发送请求
            const config = error.config
            config.headers = { Authorization: `Bearer ${useAuthStore().tokens?.accessToken}` }
            isRefreshToken = false
            return axiosInstance(config)
          }, err => {
            if (err.config.url.includes(SiteApis.usercenter.refreshToken.url)) {
              console.log('刷新token失效', err)
              // 调用刷新token接口时出现401 说明refresh token过期,
              // 否则为 this.client.request(config) 抛出的异常,
              // 为啥 this.client.request(config) 抛出的异常会被 catch到
              ElMessage.info('登录已经过期,请重新登录')
              useAuthStore().clearAuthInfo()
              router.replace({
                path:"/login",
                query:{redirect:router.currentRoute.value.fullPath}
              })
            }
            isRefreshToken = false
            return Promise.reject(err)
          })
        } else {
          // 正在刷新token，将返回一个未执行resolve的promise
          return new Promise(resolve => {
            // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
            requests.push((token: any) => {
              error.config.headers.Authorization = `bearer ${token}`
              error.config.headers['Content-Type'] = 'application/json;charset=UTF-8'
              resolve(axiosInstance(error.config))
            })
          })
        }
      } else {
        useAuthStore().clearAuthInfo()
        ElMessage.error('请先登录')
        console.log(router.currentRoute.value.fullPath)
        router.replace({
          path:"/login",
          query:{redirect:router.currentRoute.value.fullPath}
        })
        return Promise.reject(error)
      }
    }
    if (error.response.status == 403) {
      ElMessage.error('当前登录的账号没有权限!')
      return Promise.reject(error)
    }
    return Promise.reject(error)
  },
)

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

export interface BaseResponse {
  message: string
  code: number
  app_code: number
  status: number
  data: any
}

export interface BasePaginationResponse{
  count: number
  next: string
  previous: null
  results: any
  last_page:number
}



// 定义 AXIOS 拦截器
// interface InterceptorHooks {
//     userRequestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
//     useRequestErrorInterceptor?: (error: any) => Promise<any>;
//     useResponseInterceptor?: (response: AxiosResponse) => AxiosResponse;
//     useResponseErrorInterceptor?: (error: any) => Promise<any>;
// }

// 扩展 AxiosRequestConfig
interface AxiosRequestConfigPlus extends AxiosRequestConfig {
  // interceptorHooks?: InterceptorHooks;
  // showingLoading?:boolean;
  requiredLogin?: boolean
}

export type RequestParams = Omit<
AxiosRequestConfigPlus,
'body' | 'method' | 'query' | 'path' // 去掉 "body" | "method" | "query" | "path",这些特殊指定
>

export class ApiBase {
  public config: AxiosRequestConfigPlus
  protected client: AxiosInstance = axiosInstance

  constructor (options: AxiosRequestConfigPlus) {
    this.config = options
  }

  // 类型参数的作用，T决定AxiosResponse实例中data的类型
  request<T = any>(config: AxiosRequestConfigPlus): Promise<T> {
    if (config.requiredLogin) {
      config.headers = { Authorization: `Bearer ${useAuthStore().tokens?.accessToken}` }
    }
    return new Promise((resolve, reject) => {
      this.client
        .request<any, AxiosResponse<T>>(config)
        .then((res) => {
          // console.log(">>> 获取请求响应",res)
          resolve(res.data)
        })
        .catch((err) => {
          // console.log(">>> 获取请求响应异常",err)
          reject(err.response)
        })
    })
  }

  get<T = any>(config: AxiosRequestConfigPlus): Promise<T> {
    return this.request({ method: 'GET', ...config })
  }

  post<T = any>(config: AxiosRequestConfigPlus): Promise<T> {
    return this.request({ method: 'POST', ...config })
  }

  delete<T = any>(config: AxiosRequestConfigPlus): Promise<T> {
    return this.request({ method: 'DELETE', ...config })
  }

  patch<T = any>(config: AxiosRequestConfigPlus): Promise<T> {
    return this.request({ method: 'PATCH', ...config })
  }

  put<T = any>(config: AxiosRequestConfigPlus): Promise<T> {
    return this.request({ method: 'PUT', ...config })
  }
}
