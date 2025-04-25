import request from '@/utils/request';
import type { Dept } from '@/types/api';
/**
 * 获取部门树
 * @param data 
 * @returns 
 */
export const getDeptTreeData = (data: Dept.IDeptInput) => {
  return request.post<Dept.IDeptList[]>('/department/GetDepartmentTreeData',data)
}
/**
 * 新增部门
 * @param data 
 */
export const addDept =(data: Dept.IDeptAddInput)=>{
    request.post('/department/addDept',data)
}
/**
 * 编辑部门
 * @param data 
 */
export const editDept = (data: Dept.IDeptEditInput) => {
    request.post('/department/editDept', data)
}
/**
 * 删除部门
 * @param id 
 */
export const deleteDept = (id: number) =>{
  return request.get('/department/deleteDept', {id})
}
