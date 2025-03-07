import React, { memo } from 'react'
import { Layout, Watermark } from 'antd'
import { Outlet } from 'react-router-dom'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Menu from '@/components/Menu'
import styles from './index.module.less'
const { Sider } = Layout
const LayoutFC = memo(() => {
  return (
    <Watermark content='ross'>
      <Layout>
        <Sider breakpoint='lg' collapsedWidth='0'>
          <Menu />
        </Sider>
        <Layout>
          <NavHeader />
          <div className={styles.content}>
            <div className={styles.wrapper}>
              <Outlet></Outlet>
            </div>
            <NavFooter />
          </div>
        </Layout>
      </Layout>
    </Watermark>
  )
})

export default LayoutFC
