import axios, { AxiosError } from 'axios'
import storage from './storage'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
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
    const token = storage.get('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    if (import.meta.env.VITE_MOCK === 'true') {
      config.baseURL = import.meta.env.VITE_MOCK_API
    } else {
      config.baseURL = import.meta.env.VITE_BASE_API
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
instance.interceptors.response.use(response => {
  const data = response.data
  // if (data.code === 500001) {
  // } else if (data.code != 0) {
  // }
  return data.data
})

export default {
  get<T>(url: string, params?: object): Promise<T> {
    return instance.get(url, { params })
  },
  post<T>(url: string, data?: object): Promise<T> {
    return instance.post(url, data)
  }
}
