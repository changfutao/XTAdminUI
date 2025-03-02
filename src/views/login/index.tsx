import React, { memo } from 'react'
import './index.less'
import { Button, Form, Input, App } from 'antd'
import { login } from '@/api/auth'
import { Auth } from '@/types/api'
import storage from '@/utils/storage'
import { useAuthStore } from '@/store'

const Login = memo(() => {
  const { message } = App.useApp()
  const setToken = useAuthStore(state => state.setToken)
  const onFinish = (values: Auth.LoginInput) => {
    login(values).then(res => {
      storage.set('token', res)
      setToken(res)
      message.success('登录成功')
      const params = new URLSearchParams(location.search)
      const callback = params.get('callback') || '/welcome'
      location.href = callback
    })
  }
  return (
    <div className='login'>
      <div className='login-wrapper'>
        <div className='title'>系统登录</div>
        <Form
          name='basic'
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item<Auth.LoginInput>
            placeholder='请输入用户名'
            name='username'
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Auth.LoginInput>
            placeholder='请输入密码'
            name='password'
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type='primary' htmlType='submit' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
})

export default Login
