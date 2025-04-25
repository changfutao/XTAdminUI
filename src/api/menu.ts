import { Menu } from '@/types/api'
import request from '@/utils/request'
/**
 * 获取菜单树
 * @param data
 * @returns
 */
export const getMenuTreeData = (data: Menu.IMenuInput) => {
  return request.post<Menu.IMenuList[]>('/menu/getMenuTreeData', data)
}
/**
 * 获取菜单树(除了按钮)
 * @returns
 */
export const getMenuTreeDataExceptButton = () => {
  return request.get<Menu.IMenuList[]>('/menu/GetMenuTreeDataExceptButton')
}
/**
 * 新增菜单
 * @param data
 * @returns
 */
export const addMenu = (data: Menu.IMenuAdd) => {
  return request.post('/menu/addMenu', data)
}
/**
 * 编辑菜单
 * @param data
 * @returns
 */
export const editMenu = (data: Menu.IMenuEdit) => {
  return request.post('/menu/editMenu', data)
}
/**
 * 删除菜单
 * @param id
 * @returns
 */
export const deleteMenu = (id: number) => {
  return request.get('/menu/deleteMenu', { id })
}
/**
 * 根据角色Id获取菜单列表
 */
export const getMenusByRoleId = (roleId: number) => {
  return request.get<Menu.IRoleMenuTree>('/menu/getMenusByRoleId', { roleId })
}
