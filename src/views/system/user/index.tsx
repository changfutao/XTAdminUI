import React, { memo, useEffect, useState, useRef } from 'react'
import { Form, Button, Input, Space, Table, Select, Tag, Modal } from 'antd'
import type { TableProps } from 'antd'
import type { User, IPageInput } from '@/types/api'
import { getPage, delUser } from '@/api/user'
import useTableScroll from '@/hook/useTableScroll'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import Operation from './operation'
import { IAction } from '@/types/modal'
import { useStore } from '@/store'
import { useAntdTable } from 'ahooks'
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
          search.submit()
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
        search.submit()
      }
    })
  }
  // 列表列
  const columns: TableProps<User.IUser>['columns'] = [
    {
      title: '序号',
      // dataIndex: 'key',
      // key: 'key',
      width: 80,
      render: (value, record, index) => {
        return <span>{index + 1}</span>
      }
    },
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

  const [tableRef, tableHeight] = useTableScroll()
  const [total, setTotal] = useState(0)
  // 搜索
  const handleSearch = () => {
    search.submit()
  }
  // 重置
  const handleReset = () => {
    form.resetFields()
    search.submit()
  }
  // 获取用户列表数据
  const getUserList = ({ current, pageSize }: { current: number; pageSize: number }) => {
    const values = form.getFieldsValue()
    const pageInput: IPageInput = {
      currentPage: current,
      pageSize: pageSize,
      filter: {
        ...values
      }
    }
    return getPage(pageInput).then(res => {
      setTotal(res.total)
      return {
        total: res.total,
        list: res.list
      }
    })
  }

  const { tableProps, search, refresh } = useAntdTable(getUserList, { form })
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
          scroll={{ y: tableHeight }}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: userIds,
            onChange: (selectedRowKeys: React.Key[]) => {
              setUserIds(selectedRowKeys as number[])
            }
          }}
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
        mRef={userRef}
        update={(action: IAction) => {
          if (action === 'add') search.submit()
          else refresh()
        }}
      />
    </div>
  )
})

export default user
