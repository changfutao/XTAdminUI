import request from '@/utils/request'
import { Role, IPageInput, IResultData } from '@/types/api'
/**
 * 角色分页
 * @param data
 * @returns
 */
export const getPage = (data: IPageInput<string>) => {
  return request.post<IResultData<Role.IRole>>('/role/getpage', data)
}
/**
 * 新增
 * @param data
 * @returns
 */
export const add = (data: Role.IRole) => {
  return request.post('/role/add', data)
}
/**
 * 编辑
 * @param data
 * @returns
 */
export const edit = (data: Role.IRole) => {
  return request.post('/role/edit', data)
}
/**
 * 删除
 */
export const delRole = (id: number) => {
  return request.post('/role/delete', { ids: [id] })
}
/**
 * 设置角色菜单列表
 * @param data
 * @returns
 */
export const setRoleMenus = (data: Role.IRoleMenuList) => {
  return request.post('/role/SetPermission', data)
}
