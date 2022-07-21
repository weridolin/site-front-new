import axios from 'axios';
import type {
    AxiosResponse,
    AxiosRequestConfig,
    AxiosInstance,
} from 'axios';

import { useAuthStore } from 'src/store/user'

import { CONFIG } from 'src/config'


const axiosInstance = axios.create(
    {
        baseURL: `${CONFIG.API_HOST}`,
        timeout:5*60*1000
    }
)


export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
}

export interface BaseResponse {
    message: string,
    code: number,
    app_code: number,
    status: number,
    data:any
}


// 定义 AXIOS 拦截器
interface InterceptorHooks {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    requestInterceptorCatch?: (error: any) => any;
    responseInterceptor?: (response: AxiosResponse) => AxiosResponse;
    responseInterceptorCatch?: (error: any) => any;
}

// 扩展 AxiosRequestConfig
interface AxiosRequestConfigPlus extends AxiosRequestConfig {
    interceptorHooks?: InterceptorHooks;
    showingLoading?:boolean;
    requiredLogin?:boolean
}

export type RequestParams = Omit<
    AxiosRequestConfigPlus, 
    "body" | "method" | "query" | "path" //去掉 "body" | "method" | "query" | "path",这些特殊指定 
>;



export class ApiBase {

    public config:AxiosRequestConfigPlus;
    protected client:AxiosInstance=axiosInstance ;


    constructor(options:AxiosRequestConfigPlus){
        this.config = options;
        // this.setupInterceptor()
    }

    public setupInterceptor(): void {
        this.client.interceptors.request.use(
            this.config.interceptorHooks?
                this.config.interceptorHooks.requestInterceptor
                ? this.config.interceptorHooks.requestInterceptor
                : function (config) {
                    console.log(">>> 默认请求拦截器")
                    return config;
                }
            :function (config) {
                console.log(">>> 默认请求拦截器")
                return config;
            },

            this.config.interceptorHooks?
                this.config.interceptorHooks.requestInterceptorCatch
                ?this.config.interceptorHooks.requestInterceptorCatch
                :function (error) {
                    console.log(">>> 默认请求出错拦截器")
                    return Promise.reject(error);
                }
            :function (error) {
                    console.log(">>> 默认请求出错拦截器")
                    return Promise.reject(error);
                }   
        )
        this.client.interceptors.response.use(
            this.config.interceptorHooks?
                this.config.interceptorHooks.responseInterceptor
                ? this.config.interceptorHooks.responseInterceptor
                :function (response) {
                    // 2xx 范围内的状态码都会触发该函数。
                    // 对响应数据做点什么
                    console.log(">>> 默认响应拦截")
                    return response;
                }
            :function (response) {
                    // 2xx 范围内的状态码都会触发该函数。
                    // 对响应数据做点什么
                    console.log(">>> 默认响应拦截")
                    return response;
            },
            this.config.interceptorHooks?
                this.config.interceptorHooks.responseInterceptorCatch
                ? this.config.interceptorHooks.responseInterceptorCatch
                :function (error) {
                    console.log(">>> 默认响应错误拦截")
                    // 2xx 范围内的状态码都会触发该函数。
                    // 对响应数据做点什么
                    return error;
                }
            :function (error) {
                    // 超出 2xx 范围的状态码都会触发该函数。
                    // 对响应错误做点什么
                    console.log(">>> 默认响应错误拦截")
                    return Promise.reject(error);
            }
        )
    
    }
    

    // 类型参数的作用，T决定AxiosResponse实例中data的类型
    request<T = any>(config: AxiosRequestConfigPlus ): Promise<T> {
        if (config.requiredLogin){
            config.headers={"Authorization":`Bearer ${useAuthStore().tokens?.accessToken}`}
        }
        return new Promise((resolve, reject) => {
            this.client
            .request<any, AxiosResponse<T>>(config)
            .then((res) => {
                console.log(">>> 获取请求响应",res)
                resolve(res.data);
            })
            .catch((err) => {
                console.log(">>> 获取请求响应异常",err)
                reject(err);
            });
    });
    }

    get<T = any>(config: AxiosRequestConfigPlus): Promise<T> {
        return this.request({ method: 'GET',...config});
    }

    post<T = any>(config: AxiosRequestConfigPlus ): Promise<T> {
        return this.request({method: 'POST',...config });
    }

    delete<T = any>(config: AxiosRequestConfigPlus ): Promise<T> {
        return this.request({ method: 'DELETE', ...config });
    }

    patch<T = any>(config: AxiosRequestConfigPlus ): Promise<T> {
        return this.request({method: 'PATCH', ...config });
    }
    put<T = any>(config: AxiosRequestConfigPlus ): Promise<T> {
        return this.request({method: 'PUT' , ...config});
    }

    }


//         /**
//    * 响应拦截
//    */
//     axiosInstance.interceptors.response.use(
//         function (response) {
//             // 对响应数据做点什么
//             console.log(">>>正常response拦截")
//             return response.data;
//         },

//         function (error) {
//             console.log(">>>异常response拦截")
//         // 对响应错误做点什么
//             switch (error.response?.status) {
//                 case 400:
//                     error.message = '请求错误(400)';
//                     break;
//                 case 401:
//                     error.message = '未授权(401)';
//                     break;
//                 case 403:
//                     error.message = '拒绝访问(403)';
//                     break;
//                 case 404:
//                     error.message = '请求出错(404)';
//                     break;
//                 case 408:
//                     error.message = '请求超时(408)';
//                     break;
//                 case 500:
//                     error.message = '服务器错误(500)';
//                     break;
//                 case 501:
//                     error.message = '服务未实现(501)';
//                     break;
//                 case 502:
//                     error.message = '网络错误(502)';
//                     break;
//                 case 503:
//                     error.message = '服务不可用(503)';
//                     break;
//                 case 504:
//                     error.message = '网络超时(504)';
//                     break;
//                 case 505:
//                     error.message = 'HTTP版本不受支持(505)';
//                     break;
//                 default:
//                     error.message = `连接出错(${error.response?.status})!`;
//             }
//             // Toast.fail(error.message);
//             return Promise.reject(error);
//         },
//         );
    
