import React, { memo, useState, useImperativeHandle, useEffect } from 'react'
import { Modal, Form, Input, TreeSelect, Select } from 'antd'
import type { IAction, IModalProp } from '@/types/modal'
import type { Dept, IOption } from '@/types/api'
import { useStore } from '@/store'
import { addDept, editDept } from '@/api/dept'
import { getAllUser } from '@/api/user'
import { message } from '@/utils/AntdGlobal'

const operation = memo((props: IModalProp<Dept.IDeptList | { parentId: number }>) => {
  const deptList = useStore(state => state.deptList)
  // 参数一: 指定的useRef, 参数二: 需要向外暴露的方法
  useImperativeHandle(props.mRef, () => ({
    open
  }))
  const open = (action: IAction, data?: Dept.IDeptList | { parentId: number }) => {
    if (data) {
      form.setFieldsValue(data)
    }
    setAction(action)
    setVisible(true)
  }
  const [users, setUsers] = useState<IOption[]>([])
  const getUsers = async () => {
    const data = await getAllUser()
    setUsers(data)
  }
  useEffect(() => {
    getUsers()
  }, [])
  const [form] = Form.useForm()
  const [action, setAction] = useState<IAction>()
  const [visible, setVisible] = useState(false)
  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      if (action === 'add') {
        await addDept(form.getFieldsValue())
        props.update('add')
      } else {
        await editDept(form.getFieldsValue())
        props.update('edit')
      }
      message.success('操作成功')
      handleCancel()
    }
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  return (
    <Modal
      title={action === 'add' ? '新增' : '编辑'}
      okText='确定'
      cancelText='取消'
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }}>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='父级部门' name='parentId'>
          <TreeSelect
            showSearch
            allowClear
            treeData={deptList}
            fieldNames={{ label: 'deptName', value: 'id' }}
            placeholder='请选择父级部门'
          ></TreeSelect>
        </Form.Item>
        <Form.Item label='部门名称' name='deptName' rules={[{ required: true, message: '请输入部门名称' }]}>
          <Input placeholder='部门名称' />
        </Form.Item>
        <Form.Item label='负责人' name='leaderId'>
          <Select options={users} />
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default operation
