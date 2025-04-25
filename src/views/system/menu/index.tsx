import React, { memo, useEffect, useRef, useState } from 'react'
import { Form, Space, Button, Input, Select, Table, Modal } from 'antd'
import useTableScroll from '@/hook/useTableScroll'
import { useStore } from '@/store'
import styles from './index.module.less'
import { PlusOutlined } from '@ant-design/icons'
import Operation from './operation'
import { Menu } from '@/types/api'
import { IAction } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'

const menu = memo(() => {
  const [form] = Form.useForm()
  const [tableRef, tableHeight, tableWidth] = useTableScroll()
  // 查询
  const handleSearch = () => {
    getMenuListAction(form.getFieldsValue())
  }
  // 重置
  const handleReset = () => {
    form.resetFields()
    getMenuListAction(form.getFieldsValue())
  }
  // 新增
  const handleAdd = () => {
    menuRef.current?.open('add')
  }
  // 编辑
  const handleEdit = (record: Menu.IMenuEdit) => {
    menuRef.current?.open('edit', record)
  }
  // 删除
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '提示',
      content: '您确定要删除吗?',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await handleDelete(id)
        message.success('删除成功')
        getMenuListAction(form.getFieldsValue())
      }
    })
  }
  const menuList = useStore(state => state.menuList)
  const getMenuListAction = useStore(state => state.getMenuListAction)
  useEffect(() => {
    getMenuListAction(form.getFieldsValue())
  }, [])
  const menuRef = useRef<{ open: (action: IAction, data?: Menu.IMenuList) => void }>(undefined)
  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      fixed: 'left',
      width: 200
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      render(value: number) {
        switch (value) {
          case 0:
            return '目录'
          case 1:
            return '菜单'
          case 2:
            return '按钮'
        }
      },
      fixed: 'left',
      width: 100
    },
    {
      title: '前端地址',
      dataIndex: 'frontPath',
      width: 160
    },
    {
      title: '前端路由',
      dataIndex: 'component',
      width: 120
    },
    {
      title: '权限点',
      dataIndex: 'perms',
      width: 120
    },
    {
      title: '后端地址',
      dataIndex: 'path',
      width: 160
    },
    {
      title: '排序',
      dataIndex: 'sort',
      width: 80
    },
    {
      title: '是否可见',
      dataIndex: 'isVisible',
      width: 100,
      render(value: boolean) {
        return value ? '显示' : '隐藏'
      }
    },
    {
      title: '图标',
      dataIndex: 'icon',
      width: 120
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render(_, record) {
        return (
          <Space>
            <Button type='text'>新增</Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDelete(record.id)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
  return (
    <div className={styles.wrapper}>
      <Form className='search-form' layout='inline' form={form}>
        <Form.Item label='菜单名称' name='menuName'>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        <Form.Item label='是否可见' name='isVisible' style={{ width: '160px' }}>
          <Select allowClear>
            <Select.Option value='1'>显示</Select.Option>
            <Select.Option value='0'>隐藏</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={handleSearch}>
              查询
            </Button>
            <Button type='default' onClick={handleReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div ref={tableRef} className={styles.mainContent}>
        <div className={styles.tool}>
          <Space>
            <Button type='primary' icon={<PlusOutlined />} onClick={handleAdd}>
              新增
            </Button>
          </Space>
        </div>
        <Table
          rowKey='id'
          columns={columns}
          scroll={{ x: tableWidth, y: tableHeight }}
          dataSource={menuList}
          pagination={false}
        />
      </div>
      <Operation
        mRef={menuRef}
        update={(action: IAction) => {
          getMenuListAction(form.getFieldsValue())
        }}
      />
    </div>
  )
})

export default menu
