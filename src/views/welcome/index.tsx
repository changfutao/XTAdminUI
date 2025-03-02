import React, { memo } from 'react'
import styles from './index.module.less'

const welcome = memo(() => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.title}>技术栈</div>
        <div className={styles.content}>React18 + TypeScript + Ant Design5.x</div>
      </div>
      <div className={styles.right}></div>
    </div>
  )
})

export default welcome
