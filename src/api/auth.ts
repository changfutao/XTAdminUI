import request from '@/utils/request'
import { Auth } from '@/types/api'
/**
 * 登录
 * @param data
 * @returns
 */
export const login = (data: Auth.LoginInput) => {
  return request.post('auth/login', data)
}
