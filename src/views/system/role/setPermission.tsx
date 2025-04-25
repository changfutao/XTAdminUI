import React, { memo, useEffect, useImperativeHandle, useState } from 'react'
import { Form, Modal, Tree } from 'antd'
import { IModalNormalProp } from '@/types/modal'
import { getMenusByRoleId } from '@/api/menu'
import { setRoleMenus } from '@/api/role'
import { Menu, Role } from '@/types/api'
import { message } from '@/utils/AntdGlobal'
const setPermission = memo((props: IModalNormalProp<Role.IRoleMenuInput>) => {
  const handleOk = async () => {
    await setRoleMenus({ roleId, permissionIds: selectedIds })
    handleCancel()
    props.update()
    message.success('设置权限成功')
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [roleName, setRoleName] = useState('')
  const [roleId, setRoleId] = useState(0)
  const [visible, setVisible] = useState(false)
  const [menuList, setMenuList] = useState<Menu.IMenuList[]>([])
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  useEffect(() => {
    if (roleId !== 0) getMenus()
  }, [roleId])
  const getMenus = async () => {
    const roleMenu = await getMenusByRoleId(roleId)
    setMenuList(roleMenu.menus)
    setSelectedIds(roleMenu.menuIds)
  }
  const onCheck = (_, item: any) => {
    setSelectedIds(item.checkedNodes.filter(a => a.children == null).map(a => a.id))
  }
  const open = (data?: Role.IRoleMenuInput) => {
    setRoleName(data?.roleName || '')
    setVisible(true)
    setRoleId(data?.roleId || 0)
  }
  useImperativeHandle(props.mRef, () => ({
    open
  }))

  return (
    <Modal title='设置权限' okText='确定' open={visible} cancelText='取消' onOk={handleOk} onCancel={handleCancel}>
      <Form labelCol={{ span: 4 }}>
        <Form.Item label='角色名称'>{roleName}</Form.Item>
        <Form.Item label='权限列表'>
          {menuList.length > 0 && (
            <Tree
              checkable
              onCheck={onCheck}
              checkedKeys={selectedIds}
              defaultExpandAll={true}
              fieldNames={{ title: 'menuName', key: 'id', children: 'children' }}
              treeData={menuList}
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default setPermission
