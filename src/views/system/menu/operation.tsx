import React, { memo, useState, useImperativeHandle, useEffect } from 'react'
import { Modal, Form, Input, Radio, TreeSelect, InputNumber } from 'antd'
import type { IAction, IModalProp } from '@/types/modal'
import { Menu } from '@/types/api'
import type { CheckboxGroupProps } from 'antd/es/checkbox'
import type { RadioChangeEvent } from 'antd'
import { message } from '@/utils/AntdGlobal'
import { getMenuTreeDataExceptButton, addMenu, editMenu } from '@/api/menu'
const operation = memo((props: IModalProp<Menu.IMenuList>) => {
  const [form] = Form.useForm()
  const options: CheckboxGroupProps<number>['options'] = [
    { label: '目录', value: 0 },
    { label: '菜单', value: 1 },
    { label: '按钮', value: 2 }
  ]
  const [menuType, setMenuType] = useState<number>(0)

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setMenuType(value)
  }

  const visibleOptions: CheckboxGroupProps<boolean>['options'] = [
    { label: '可见', value: true },
    { label: '隐藏', value: false }
  ]
  useImperativeHandle(props.mRef, () => ({
    open
  }))
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>()
  const open = (action: IAction, data?: Menu.IMenuList) => {
    setVisible(true)
    setAction(action)
    if (data) {
      form.setFieldsValue(data)
    }
  }

  const handleSumbit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      if (action === 'add') {
        await addMenu(form.getFieldsValue())
        props.update('add')
      } else {
        await editMenu(form.getFieldsValue())
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
  const [menus, setMenus] = useState<Menu.IMenuList[]>([])
  const handleGetMenuTreeDataExceptButton = async () => {
    const data = await getMenuTreeDataExceptButton()
    setMenus(data)
  }
  useEffect(() => {
    handleGetMenuTreeDataExceptButton()
  }, [])
  return (
    <Modal
      title='操作'
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleSumbit}
      onCancel={handleCancel}
      width={800}
    >
      <Form form={form} labelCol={{ span: 4 }} labelAlign='right'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='父级菜单' name='parentId'>
          <TreeSelect allowClear treeData={menus} fieldNames={{ label: 'menuName', value: 'id' }} />
        </Form.Item>
        <Form.Item label='菜单名称' name='menuName' rules={[{ required: true, message: '请输入菜单名称' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='菜单类型' name='menuType' initialValue={menuType}>
          <Radio.Group options={options} onChange={onChange} optionType='button' buttonStyle='solid' />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => {
            return form.getFieldValue('menuType') === 2 ? (
              <Form.Item label='权限点' name='perms' labelCol={{ span: 4 }}>
                <Input />
              </Form.Item>
            ) : (
              <>
                <Form.Item label='前端路由' name='component' labelCol={{ span: 4 }}>
                  <Input />
                </Form.Item>
                <Form.Item label='前端地址' name='frontPath' labelCol={{ span: 4 }}>
                  <Input />
                </Form.Item>
                <Form.Item label='图标' name='icon' labelCol={{ span: 4 }}>
                  <Input />
                </Form.Item>
              </>
            )
          }}
        </Form.Item>
        <Form.Item label='后端地址' name='path'>
          <Input />
        </Form.Item>
        <Form.Item label='是否可见' name='isVisible' initialValue={true} labelCol={{ span: 4 }}>
          <Radio.Group options={visibleOptions} optionType='button' buttonStyle='solid' />
        </Form.Item>
        <Form.Item label='排序' name='sort'>
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default operation
