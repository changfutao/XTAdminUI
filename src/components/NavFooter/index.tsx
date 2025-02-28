import React, { memo } from 'react'
import styles from './index.module.less'

const NavFooter = memo(() => {
  return <div className={styles.container}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</div>
})

export default NavFooter
