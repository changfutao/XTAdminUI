import React, { memo } from 'react'
import { Layout, Menu, Watermark } from 'antd'
import { DesktopOutlined, WindowsOutlined, UserOutlined } from '@ant-design/icons'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import styles from './index.module.less'
const { Content, Sider } = Layout
const LayoutFC = memo(() => {
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
  return (
    <Watermark content='ross'>
      <Layout className={styles.container}>
        <Sider breakpoint='lg' collapsedWidth='0'>
          <div className='demo-logo-vertical' />
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} items={items} />
        </Sider>
        <Layout>
          <NavHeader />
          <Content style={{ margin: '24px 16px 0' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360
              }}
            >
              content
            </div>
          </Content>
          <NavFooter />
        </Layout>
      </Layout>
    </Watermark>
  )
})

export default LayoutFC
