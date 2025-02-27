// 定义axios AxiosRequestConfig 这样的话不会覆盖原有的AxiosRequestConfig
import axios from 'axios';
declare module 'axios' {
    interface AxiosRequestConfig {
        showLoading?: boolean
        showError?: boolean
    }
}