import { Auth } from "@/types/api";
/**
 * 菜单路径
 * @param list 
 * @returns 
 */
export const getMenuPath = (list: Auth.IMenu[]): string[] => {
    return list.reduce((result: string[], item: Auth.IMenu) => {
        return result.concat(Array.isArray(item.children) && item.menuType === 0 ? getMenuPath(item.children) : item.frontPath || '')
    } ,[])
}