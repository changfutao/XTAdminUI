// 接口类型定义
export interface IResult<T = any> {
  success: boolean
  data: T
  msg: string
}

export interface IConfig {
  showLoading?: boolean
  showError?: boolean
}

export namespace Auth {
  export interface LoginInput {
    userName: string
    password: string
  }
}
