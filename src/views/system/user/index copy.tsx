import React, { memo, useEffect, useState, useRef } from 'react'
import { Form, Button, Input, Space, Table, Select, Tag, Modal } from 'antd'
import type { TableProps } from 'antd'
import type { IPageInfo, User, IPageInput } from '@/types/api'
import { getPage, delUser } from '@/api/user'
import useTableScrollHeight from '@/hook/useTableScroll'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import Operation from './operation'
import { IAction } from '@/types/modal'
import { useStore } from '@/store'
type LayoutType = Parameters<typeof Form>[0]['layout']
const user = memo(() => {
  const [form] = Form.useForm()
  const [formLayout] = useState<LayoutType>('inline')
  const userRef = useRef<{
    open: (type: IAction, data?: User.IUser) => void
  }>(undefined)
  const userStatus = useStore(state => state.userStatus)
  const getUserStatus = useStore(state => state.getUserStatus)
  useEffect(() => {
    getUserStatus()
  }, [])
  const [userIds, setUserIds] = useState<number[]>([])
  // 编辑
  const handleEdit = (data: User.IUser) => {
    userRef.current?.open('edit', data)
  }
  // 删除
  const handleDelete = (data: User.IUser) => {
    if (data.id) {
      Modal.confirm({
        title: '删除确认',
        content: <span>您确定要删除吗?</span>,
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          await delUser([data.id!])
          getUserList()
        }
      })
    }
  }
  // 批量删除
  const handleBatchDelete = () => {
    Modal.confirm({
      title: '删除确认',
      content: <span>您确定要批量删除吗?</span>,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await delUser(userIds)
        getUserList()
      }
    })
  }
  // 列表列
  const columns: TableProps<User.IUser>['columns'] = [
    {
      title: '用户名',
      dataIndex: 'userName'
    },
    {
      title: '昵称',
      dataIndex: 'nickName'
    },
    {
      title: '手机号',
      dataIndex: 'phonenumber'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render: (sex: number) => <span>{sex === 0 ? '男' : sex === 1 ? '女' : '未知'}</span>
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: number) => {
        let statusName = ''
        let color = 'green'
        switch (status) {
          case 0:
            statusName = '在职'
            break
          case 1:
            statusName = '锁定'
            color = 'gray'
            break
          case 2:
            statusName = '离职'
            color = 'red'
            break
          default:
            break
        }
        return <Tag color={color}>{statusName}</Tag>
      }
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action', // 设置了dataIndex时, 那么val是当前列的值; record就是当前行的值
      render: (val, record: User.IUser) => (
        <Space size='small'>
          <Button type='text' onClick={e => handleEdit(record)}>
            编辑
          </Button>
          <Button type='text' danger onClick={e => handleDelete(record)}>
            删除
          </Button>
        </Space>
      )
    }
  ]
  const [tableRef, tableHeight] = useTableScrollHeight()
  const [users, setUsers] = useState<User.IUser[]>([])
  const [total, setTotal] = useState(0)
  const [pageInfo, setPageInfo] = useState<IPageInfo>({ current: 1, pageSize: 10 })
  // 搜索
  const handleSearch = () => {
    getUserList()
  }
  // 重置
  const handleReset = () => {
    form.resetFields()
    getUserList()
  }
  // 获取用户列表数据
  const getUserList = async () => {
    const values = form.getFieldsValue()
    const pageInput: IPageInput = {
      currentPage: pageInfo.current,
      pageSize: pageInfo.pageSize,
      filter: {
        ...values
      }
    }
    const data = await getPage(pageInput)
    setUsers(data.list)
    setTotal(data.total)
  }
  useEffect(() => {
    getUserList()
  }, [pageInfo.current, pageInfo.pageSize])
  // 新增
  const handleAdd = () => {
    userRef.current?.open('add')
  }

  return (
    <div className={styles.wrapper}>
      <Form className='search-form' layout={formLayout} form={form}>
        <Form.Item label='用户名' name='userName'>
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item label='状态' name='status'>
          <Select style={{ width: 120 }} options={userStatus} placeholder='请选择状态' allowClear></Select>
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
            <Button type='primary' danger icon={<DeleteOutlined />} onClick={handleBatchDelete}>
              批量删除
            </Button>
            <Button>导入</Button>
            <Button>导出</Button>
          </Space>
        </div>
        <Table<User.IUser>
          rowKey='id'
          columns={columns}
          dataSource={users}
          scroll={{ y: tableHeight }}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: userIds,
            onChange: (selectedRowKeys: React.Key[]) => {
              setUserIds(selectedRowKeys as number[])
            }
          }}
          pagination={{
            position: ['bottomRight'],
            current: pageInfo.current,
            pageSize: pageInfo.pageSize,
            pageSizeOptions: [10, 20, 30, 40, 50],
            total: total,
            showTotal: total => {
              return `共${total}条`
            },
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: (page, pageSize) => {
              setPageInfo({ current: page, pageSize })
            }
          }}
        />
      </div>
      <Operation
        mRef={userRef}
        update={(current: number | undefined) => {
          if (current) setPageInfo({ current: current, pageSize: pageInfo.pageSize })
          getUserList()
        }}
      />
    </div>
  )
})

export default user
