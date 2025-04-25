import request from '@/utils/request'
import { Auth } from '@/types/api'
/**
 * 登录
 * @param data
 * @returns
 */
export const login = (data: Auth.LoginInput) => {
  return request.post<string>('auth/login', data)
}
/**
 * 获取用户权限信息
 * @returns 
 */
export const getUserInfoAndMenus = () => {
  return request.post<Auth.IMenuPerms>('auth/getUserInfoAndMenus')
}
