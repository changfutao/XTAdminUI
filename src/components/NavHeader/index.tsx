import React, { memo } from 'react'
import { MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Switch, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import storage from '@/utils/storage'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store'

const NavHeader = memo(() => {
  const navigate = useNavigate()
  const setToken = useStore(state => state.setToken)
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '2') {
      storage.remove('token')
      setToken('')
      navigate('/login')
    }
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>邮箱: Jack@qq.com</span>
    },
    {
      key: '2',
      label: <span>退出</span>
    }
  ]
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <MenuFoldOutlined />
        <Breadcrumb items={[{ title: '首页' }, { title: '工作台' }]} />
      </div>
      <div className={styles.right}>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' />

        <Dropdown menu={{ items, onClick }} placement='bottomLeft'>
          <span className={styles.title}>Ross</span>
        </Dropdown>
      </div>
    </div>
  )
})

export default NavHeader
