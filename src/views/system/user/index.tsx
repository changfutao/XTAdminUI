import React, { memo, useEffect, useState } from 'react'
import { Form, Button, Input, Space, Table, Select } from 'antd'
import type { TableProps } from 'antd'
import type { IOption, IPageInfo, IResult, IResultData, User } from '@/types/api'
import { getPage, getUserStatus } from '@/api/user'
import useTableScrollHeight from '@/hook/useTableScrollHeight'
import styles from './index.module.less'
type LayoutType = Parameters<typeof Form>[0]['layout']
const user = memo(() => {
  const [form] = Form.useForm()
  const [formLayout] = useState<LayoutType>('inline')

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
      dataIndex: 'sex'
    },
    {
      title: '状态',
      dataIndex: 'status'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size='small'>
          <Button type='text'>编辑</Button>
          <Button type='text' danger>
            删除
          </Button>
        </Space>
      )
    }
  ]
  const [tableRef, tableHeight] = useTableScrollHeight()
  const [data, setData] = useState<User.IUser[]>([])
  const [total, setTotal] = useState(0)
  const [pageInfo, setPageInfo] = useState<IPageInfo>({ current: 1, pageSize: 10 })
  const handleSearch = () => {
    getUserList()
  }
  const handleReset = () => {
    form.resetFields()
  }
  const getUserList = async () => {
    const paramsData = form.getFieldsValue()
    // await getPage()
  }
  const [userStatus, setUserStatus] = useState<IOption<number>[]>()
  const handleUserStatus = async () => {
    const data = await getUserStatus()
    setUserStatus(data)
  }
  useEffect(() => {
    // setData(infos)
    // setTotal(infos.length)
    getUserList()
    handleUserStatus()
  }, [pageInfo.current, pageInfo.pageSize])
  return (
    <div className={styles.wrapper}>
      <Form className='search-form' layout={formLayout} form={form}>
        <Form.Item label='用户名' name='userName'>
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item label='状态' name='status'>
          <Select options={userStatus}></Select>
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
            <Button>新增</Button>
            <Button>导入</Button>
            <Button>导出</Button>
          </Space>
        </div>
        <Table<User.IUser>
          columns={columns}
          dataSource={data}
          scroll={{ y: tableHeight }}
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
    </div>
  )
})

export default user
