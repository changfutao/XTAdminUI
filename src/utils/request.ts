import axios, { AxiosError } from 'axios'
import storage from './storage'
import env from '@/config'
import { IResult, IConfig } from '@/types/api'
import { message } from '@/utils/AntdGlobal'
import { showLoading, hideLoading } from '@/utils/loading';
const instance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_API,
  timeout: 8000,
  timeoutErrorMessage: '请求超时, 请稍后再试',
  withCredentials: false, // 表示跨域请求时是否需要使用凭证,当为true时,服务器必须配置CROS
  headers: {
    icode: ''
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    if(config.showLoading)
      showLoading()
    const token = storage.get('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    if (env.mock) {
      config.baseURL = env.mockApi
    } else {
      config.baseURL = env.baseApi
    }
    return {
      ...config
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const data: IResult = response.data
    hideLoading()
    if(!data.success) {
      if(response.config.showError) {
        message.error(data.msg)
        return Promise.reject(data)
      } else {
        return Promise.resolve(data)
      }
    }
    // if (!data.success) {
    //   message.error(data.msg)
    //   storage.remove('token')
    //   location.href = '/login?callback=' + encodeURIComponent(location.href)
    // } else if (data) {
    //   if (response.config.showError === false) {
    //     return Promise.resolve(data)
    //   } else {
    //     message.error(data.msg)
    //     return Promise.reject(data)
    //   }
    // }
    return data.data
  },
  error => {
    hideLoading()
    return Promise.reject(error.message)
  }
)

export default {
  get<T>(url: string, params?: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
    return instance.get(url, { params, ...options })
  },
  post<T>(url: string, data?: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
    return instance.post(url, data, options)
  }
}
