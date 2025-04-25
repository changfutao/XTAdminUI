// 接口类型定义
export interface IResult<T = any> {
  success: boolean
  data: T
  msg: string
}

export interface IResultData<T = any> {
  total: number
  list: T
}

export interface IOption<T = any> {
  value: T
  label: string
}

export interface IPageInfo {
  current: number
  pageSize?: number
}

export interface IConfig {
  showLoading?: boolean
  showError?: boolean
}

export interface IPageInput<T = any> {
  currentPage: number
  pageSize: number
  filter: T
}

export namespace Auth {
  export interface LoginInput {
    userName: string
    password: string
  }
  export interface IMenu {
    menuName: string
    parentId?: number
    icon?: string
    frontName?: string
    frontPath?: string
    component?: string
    path?: string
    isFrame?: boolean
    isVisible: boolean
    menuType: number
    perms?: string
    children?: IMenu[]
  }
  export interface IMenuButton {
    menus: IMenu[]
    buttons: string[]
  }
  export interface IMenuPerms {
    userName?: string
    nickName?: string
    menuPerms?: IMenuButton
  }
}

export namespace User {
  export interface IUser {
    id?: number
    userName: string
    nickName?: string
    phonenumber?: string
    status: string
    sex?: string
    avatorId?: number
    avatorPath?: string
  }
}

export namespace Role {
  export interface IRole {
    id?: number
    name: string
    code: string
    remark?: string
    createdTime?: string
  }
  export interface IRoleMenuInput {
    roleId: number
    roleName: string
  }
  export interface IRoleMenuList {
    roleId: number
    permissionIds: number[]
  }
}

export namespace Dept {
  export interface IDeptList {
    id: number
    deptName: string
    parentId: number
    createdTime?: string
    leaderId?: number
    leaderName?: string
  }
  export interface IDeptInput {
    deptName: string
  }
  export interface IDeptAddInput {
    deptName: string
    parentId: number
    leaderId?: number
  }
  export interface IDeptEditInput extends IDeptAddInput {
    id: number
  }
}

export namespace Menu {
  export interface IMenuList {
    id: number
    menuName: string
    parentId?: number
    icon?: string
    frontName?: string
    frontPath?: string
    component?: string
    path?: string
    isFrame: boolean
    isVisible: boolean
    menuType: number
    perms?: string
    children?: IMenuList[]
  }
  export interface IMenuInput {
    menuName?: string
    isVisible?: number
  }
  export interface IMenuAdd {
    menuName: string
    parentId?: number
    icon?: string
    frontName?: string
    frontPath?: string
    component?: string
    isFrame: boolean
    isVisible: boolean
    menuType: number
    perms?: string
    path?: string
  }
  export interface IMenuEdit extends IMenuAdd {
    id: number
  }
  export interface IRoleMenuTree {
    menus: IMenuList[]
    menuIds: number[]
  }
}
