import { create } from 'zustand'
import { getUserStatus } from '@/api/user'
import { getDeptTreeData } from '@/api/dept'
import { getMenuTreeData } from '@/api/menu'
import { IOption, Dept, Menu, Auth } from '@/types/api'
import { getUserInfoAndMenus } from '@/api/auth'
export const useStore = create<{
  token: string
  setToken: (token: string) => void
  userStatus: IOption<number>[]
  getUserStatus: () => void
  deptList: Dept.IDeptList[]
  getDeptListAction: (data: Dept.IDeptInput) => void
  menuList: Menu.IMenuList[]
  getMenuListAction: (data: Menu.IMenuInput) => void
  userInfo: Auth.IMenuPerms
  getUserInfoAction: () => void
}>(set => ({
  token: '',
  setToken: token => set({ token }),
  userStatus: [],
  getUserStatus: async () => {
    const data = await getUserStatus()
    set({ userStatus: data })
  },
  deptList: [],
  getDeptListAction: async (data: Dept.IDeptInput) => {
    const deptList = await getDeptTreeData(data)
    set({ deptList })
  },
  menuList: [],
  getMenuListAction: async (data: Menu.IMenuInput) => {
    const menuList = await getMenuTreeData(data)
    set({ menuList })
  },
  userInfo: {},
  getUserInfoAction: async () => {
    const userInfo = await getUserInfoAndMenus()
    set({ userInfo })
  }
}))
