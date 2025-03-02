import React, { memo } from 'react'
import { Menu, MenuProps } from 'antd'
import { DesktopOutlined, WindowsOutlined, UserOutlined } from '@ant-design/icons'
import styles from './index.module.less'
const SideMenu = memo(() => {
  const items = [
    {
      key: '1',
      icon: <DesktopOutlined />,
      label: '工作台'
    },
    {
      key: '2',
      icon: <WindowsOutlined />,
      label: '系统管理',
      children: [
        {
          key: '3',
          icon: <UserOutlined />,
          label: '用户管理'
        }
      ]
    }
  ]
  const onClick: MenuProps['onClick'] = e => {
    console.log('click', e)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img className={styles.img} src='/imgs/logo.png' />
        <div className={styles.title}>时代快运</div>
      </div>
      <Menu theme='dark' mode='inline' onClick={onClick} defaultSelectedKeys={['1']} items={items} />
    </div>
  )
})

export default SideMenu
