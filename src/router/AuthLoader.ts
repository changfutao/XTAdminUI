import { getMenuPath } from '@/utils'
import { getUserInfoAndMenus } from '@/api/auth'
export default async function AuthLoader() {
  const userInfo = await getUserInfoAndMenus()
  const menuPathList = getMenuPath(userInfo.menuPerms?.menus || [])
  return {
    buttonList: userInfo.menuPerms?.buttons || [],
    menuList: userInfo.menuPerms?.menus || [],
    menuPathList,
    userName: userInfo.userName
  }
}
