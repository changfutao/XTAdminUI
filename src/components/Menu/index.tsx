import React, { memo, useEffect, useState } from 'react'
import { useNavigate, useLocation, useRouteLoaderData } from 'react-router-dom'
import { Menu, MenuProps } from 'antd'
import * as Icons from '@ant-design/icons'
import type { Auth } from '@/types/api'

import styles from './index.module.less'
const SideMenu = memo(() => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const data: any = useRouteLoaderData('layout')
  type MenuItem = Required<MenuProps>['items'][number]
  type getMenuItem = (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ) => MenuItem
  const getItem: getMenuItem = (label, key, icon, children) => {
    return {
      label,
      key,
      icon,
      children
    } as MenuItem
  }
  const createIcon = (name?: string) => {
    if (!name) return <></>
    const customerIcons: { [key: string]: any } = Icons
    const icon = customerIcons[name]
    if (!icon) return <></>
    return React.createElement(icon)
  }
  const getTreeMenu = (menuList: Auth.IMenu[], treeList: MenuItem[] = []) => {
    menuList.forEach((item, index) => {
      if (item.children) {
        treeList.push(
          getItem(item.menuName, item.frontPath || index, createIcon(item.icon), getTreeMenu(item.children))
        )
      } else {
        return treeList.push(getItem(item.menuName, item.frontPath || index, createIcon(item.icon)))
      }
    })
    return treeList
  }
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const onClick: MenuProps['onClick'] = ({ key }) => {
    setSelectedKeys([key])
    navigate(key)
  }
  const getMenuInfo = async () => {
    const treeMenuList = getTreeMenu(data.menuList)
    setMenuList(treeMenuList)
  }
  const navigateToWelcome = () => {
    setSelectedKeys(['welcome'])
    navigate('/welcome')
  }
  useEffect(() => {
    getMenuInfo()
    setSelectedKeys([pathname])
  }, [])
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo} onClick={navigateToWelcome}>
        <img className={styles.img} src='/imgs/logo.png' />
        <div className={styles.title}>时代快运</div>
      </div>
      <Menu theme='dark' mode='inline' onClick={onClick} selectedKeys={selectedKeys} items={menuList} />
    </div>
  )
})

export default SideMenu
