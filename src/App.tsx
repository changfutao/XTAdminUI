import { ConfigProvider, App as AntdApp } from 'antd'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './App.less'
import AntdGloabl from '@/utils/AntdGlobal'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0094ff'
        }
      }}
    >
      <AntdApp>
        <AntdGloabl />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
