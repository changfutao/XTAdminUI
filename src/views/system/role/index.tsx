import React, { memo, useRef, useState } from 'react'
import { Form, Input, Button, Space, Table, Modal } from 'antd'
import useTableScroll from '@/hook/useTableScroll'
import { PlusOutlined } from '@ant-design/icons'
import { getPage, delRole } from '@/api/role'
import { useAntdTable } from 'ahooks'
import styles from './index.module.less'
import { IPageInput, IResultData, Role } from '@/types/api'
import Operation from './operation'
import SetPermission from './setPermission'
import { IAction } from '@/types/modal'
const role = memo(() => {
  const [form] = Form.useForm()
  const [tableRef, tableHeight] = useTableScroll()
  const [total, setTotal] = useState(0)
  const mRef = useRef<{ open: (action: IAction, data?: Role.IRole) => void }>(undefined)
  const permissionRef = useRef<{ open: (data?: Role.IRoleMenuInput) => void }>(undefined)
  const handleAdd = () => {
    mRef.current?.open('add')
  }
  const handleEdit = (record: Role.IRole) => {
    mRef.current?.open('edit', record)
  }
  const handleDel = (id: number) => {
    Modal.confirm({
      title: '提示',
      content: '您确定要删除吗?',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await delRole(id)
        refresh()
      }
    })
  }
  const handlePermission = (record: Role.IRole) => {
    permissionRef.current?.open({ roleId: record.id || 0, roleName: record.name })
  }
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '角色编码',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      key: 'createdTime'
    },
    {
      title: '操作',
      // dataIndex: 'action', // 有dataIndex, 那么render第一个参数为undefine
      key: 'action',
      render(record: Role.IRole) {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' onClick={() => handlePermission(record)}>
              设置权限
            </Button>
            <Button type='text' danger onClick={() => handleDel(record.id || 0)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }): Promise<IResultData> => {
    const formData = form.getFieldsValue()
    const data: IPageInput = {
      currentPage: current,
      pageSize,
      filter: formData
    }
    return getPage(data).then(res => {
      setTotal(res.total)
      return {
        list: res.list,
        total: res.total
      }
    })
  }
  const { tableProps, search, refresh } = useAntdTable(getTableData, { form })
  return (
    <div className={styles.wrapper}>
      <Form className='search-form' form={form} layout='inline'>
        <Form.Item name='name' label='角色名称'>
          <Input />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={search.submit}>
              查询
            </Button>
            <Button type='default' onClick={search.reset}>
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
          columns={columns}
          scroll={{ y: tableHeight }}
          rowKey='id'
          {...tableProps}
          pagination={{
            position: ['bottomRight'],
            pageSizeOptions: [10, 20, 30, 40, 50],
            total: total,
            showTotal: total => {
              return `共${total}条`
            },
            showSizeChanger: true,
            showQuickJumper: true
          }}
        />
      </div>
      <Operation
        mRef={mRef}
        update={(action: IAction) => {
          if (action === 'add') {
            search.submit()
          } else {
            refresh()
          }
        }}
      />
      <SetPermission mRef={permissionRef} update={search.submit}></SetPermission>
    </div>
  )
})

export default role
