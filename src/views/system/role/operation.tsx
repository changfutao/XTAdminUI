import React, { memo, useState, useImperativeHandle, act } from 'react'
import { Modal, Form, Input, InputNumber } from 'antd'
import { IAction, IModalProp } from '@/types/modal'
import { Role } from '@/types/api'
import { add, edit } from '@/api/role'
const operation = memo((props: IModalProp<Role.IRole>) => {
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('add')
  useImperativeHandle(props.mRef, () => ({
    open
  }))
  const open = (action: IAction, data?: Role.IRole) => {
    setAction(action)
    setVisible(true)
    if (action === 'edit') {
      form.setFieldsValue(data)
    }
  }
  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const data = form.getFieldsValue()
      if (action === 'add') {
        await add(data)
      } else {
        await edit(data)
      }
      handleCancel()
      props.update(action)
    }
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm()
  return (
    <Modal
      title={action === 'add' ? '新增' : '编辑'}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} initialValues={{ sort: 0 }}>
        <Form.Item hidden={true} name='id'>
          <Input />
        </Form.Item>
        <Form.Item label='角色名称' name='name' rules={[{ required: true, message: '请输入角色名称' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='角色编码' name='code' rules={[{ required: true, message: '请输入角色编码' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='排序' name='sort' rules={[{ required: true, message: '请输入排序' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label='备注' name='remark'>
          <Input.TextArea></Input.TextArea>
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default operation
