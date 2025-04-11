// 接口类型定义
export interface IResult<T = any> {
  success: boolean
  data: T
  msg: string
}

export interface IResultData<T = any> {
  total: number
  list: T
}

export interface IOption<T = any> {
  value: T
  label: string
}

export interface IPageInfo {
  current: number
  pageSize?: number
}

export interface IConfig {
  showLoading?: boolean
  showError?: boolean
}

export interface IPageInput<T = any> {
  currentPage: number
  pageSize: number,
  filter: T
}

export namespace Auth {
  export interface LoginInput {
    userName: string
    password: string
  }
}

export namespace User {
  export interface IUser {
    id?: number
    userName: string
    nickName?: string
    phonenumber?: string
    status: string
    sex?: string,
    avatorId?: number,
    avatorPath?: string 
  }
}
