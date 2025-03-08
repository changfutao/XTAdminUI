import request from '@/utils/request';
import { User, IResultData, IOption } from '@/types/api';
/**
 * 获取用户分页
 * @param data 
 * @returns 
 */
export const getPage = (data: User.IUserPageParams) => {
    return request.post('user/getpage', data)
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
export const getSexs = () => {
    return request.get('user/getSexs')
}