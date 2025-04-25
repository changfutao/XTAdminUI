import React, { memo, useEffect, useRef } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Form, Input, Space, Button, Table, Modal, message } from 'antd'
import { deleteDept } from '@/api/dept'
import type { Dept } from '@/types/api'
import type { IAction } from '@/types/modal'
import { useStore } from '@/store'
import styles from './index.module.less'
import useTableScroll from '@/hook/useTableScroll'
import Operation from './operation'
const dept = memo(() => {
  const deptList = useStore(state => state.deptList)
  const getDeptListAction = useStore(state => state.getDeptListAction)
  const [form] = Form.useForm()
  const handleSearch = () => {
    getDeptList()
  }
  const handleReset = () => {
    form.resetFields()
    getDeptList()
  }
  const handleAdd = () => {
    operationRef.current?.open('add')
  }
  const handleChildAdd = (parentId: number) => {
    operationRef.current?.open('add', { parentId })
  }
  const handleEdit = (record: Dept.IDeptList) => {
    operationRef.current?.open('edit', record)
  }
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '提示',
      content: '您确定要删除吗?',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await deleteDept(id)
        message.success('删除成功')
        getDeptList()
      }
    })
  }
  const columns = [
    { title: '部门名称', dataIndex: 'deptName' },
    { title: '部门负责人', dataIndex: 'leaderName' },
    { title: '创建时间', dataIndex: 'createdTime' },
    {
      title: '操作',
      render: (_, record: Dept.IDeptList) => (
        <Space size='middle'>
          <Button type='text' onClick={() => handleChildAdd(record.id)}>
            新增
          </Button>
          <Button type='text' onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type='text' danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      )
    }
  ]
  // useRef 是 mRef类型(RefObject)
  const operationRef = useRef<{ open: (action: IAction, data?: Dept.IDeptList | { parentId: number }) => void }>(
    undefined
  )
  const [tableRef, tableHeight] = useTableScroll()
  useEffect(() => {
    getDeptList()
  }, [])
  const getDeptList = async () => {
    await getDeptListAction(form.getFieldsValue())
  }
  return (
    <div className={styles.wrapper}>
      <Form className='search-form' layout='inline' form={form}>
        <Form.Item label='部门名称' name='deptName'>
          <Input placeholder='部门名称' />
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
        <Table rowKey='id' columns={columns} scroll={{ y: tableHeight }} dataSource={deptList} pagination={false} />
      </div>
      <Operation
        mRef={operationRef}
        update={(action: IAction) => {
          getDeptList()
        }}
      />
    </div>
  )
})

export default dept
