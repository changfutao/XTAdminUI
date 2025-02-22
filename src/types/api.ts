// 接口类型定义
export interface Result<T = any> {
  code: number
  data: T
  msg: string
}
