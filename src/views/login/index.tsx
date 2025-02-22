import React, { memo } from 'react'
import './index.less'
import { Button, Form, Input, FieldType } from 'antd'

const Login = memo(() => {
  const onFinish = () => {}
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
          <Form.Item<FieldType>
            placeholder='请输入用户名'
            name='username'
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
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
