import React, { memo, useEffect, useState, useRef } from 'react'
import { Form, Button, Input, Space, Tag, Table } from 'antd'
import type { TableProps } from 'antd'
import styles from './index.module.less'
type LayoutType = Parameters<typeof Form>[0]['layout']
const user = memo(() => {
  const [form] = Form.useForm()
  const [formLayout] = useState<LayoutType>('inline')
  interface DataType {
    key: string
    name: string
    age: number
    address: string
    tags: string[]
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      )
    }
  ]

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    },
    {
      key: '4',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    },
    {
      key: '5',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    },
    {
      key: '5',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ]
  return (
    <div className={styles.wrapper}>
      <Form className='search-form' layout={formLayout} form={form}>
        <Form.Item label='用户名' name='userName'>
          <Input />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary'>查询</Button>
            <Button type='primary'>重置</Button>
          </Space>
        </Form.Item>
      </Form>
      <div className={styles.mainContent}>
        <div className={styles.tool}>
          <Space>
            <Button>新增</Button>
            <Button>导入</Button>
            <Button>导出</Button>
          </Space>
        </div>
        <Table<DataType> columns={columns} dataSource={data} scroll={{ y: `calc(100vh - 369px)` }} />
      </div>
    </div>
  )
})

export default user
