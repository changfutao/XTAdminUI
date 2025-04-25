import request from '@/utils/request'
import { User, IResultData, IOption } from '@/types/api'
/**
 * 获取用户分页
 * @param data
 * @returns
 */
export const getPage = (data: any) => {
  return request.post<IResultData>('user/getpage', data)
}
/**
 * 获取用户状态
 * @returns
 */
export const getUserStatus = () => {
  return request.get<IOption<number>[]>('user/getUserStatus')
}
/**
 * 获取性别
 * @returns
 */
export const getGender = () => {
  return request.get<IOption<number>[]>('user/getSexs')
}
/**
 * 新增
 * @param data
 * @returns
 */
export const addUser = (data: User.IUser) => {
  return request.post('user/add', data)
}
/**
 * 修改
 * @param data
 * @returns
 */
export const editUser = (data: User.IUser) => {
  return request.post('user/edit', data)
}
/**
 * 批量删除
 * @param ids
 * @returns
 */
export const delUser = (ids: number[]) => {
  return request.post('user/delete', { ids })
}
/**
 * 获取所有用户
 */
export const getAllUser = () => {
  return request.get<IOption[]>('/user/getAllUser')
}
