import React, { memo, useImperativeHandle, useState, useEffect } from 'react'
import { Modal, Form, Input, Select, Upload } from 'antd'
import { User, IOption } from '@/types/api'
import type { IAction, IModalProp } from '@/types/modal'
import { getGender, addUser, editUser } from '@/api/user'
import { useStore } from '@/store'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import env from '@/config'
import { message } from '@/utils/AntdGlobal'
import type { GetProp, UploadProps } from 'antd'
import storage from '@/utils/storage'
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
const Operation = memo((props: IModalProp<User.IUser>) => {
  const [gender, setGender] = useState<IOption<number>[]>([])
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
  }
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const userStatus = useStore(state => state.userStatus)
  const [action, setAction] = useState<IAction>('add')
  // 获取性别列
  const handleSexs = async () => {
    const data = await getGender()
    setGender(data)
  }
  useImperativeHandle(props.mRef, () => {
    // 返回暴露给父组件
    return {
      open
    }
  })
  // 调用弹框显示方法
  const open = (action: IAction, data?: User.IUser) => {
    setAction(action)
    setVisible(true)
    if (action === 'edit') {
      // 给表单中所有name赋值
      form.setFieldsValue(data)
      if (data?.avatorPath) {
        setImageUrl(env.uploadPath + data?.avatorPath)
      } else {
        setImageUrl('')
      }
    }
  }
  useEffect(() => {
    handleSexs()
  }, [])
  // 确定
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      // 获取form的值
      const data = {
        ...form.getFieldsValue()
      }
      if (action === 'add') {
        await addUser(data)
        props.update('add')
      } else {
        await editUser(data)
        props.update('edit')
      }
      message.success('操作成功')
      handleCancel()
    }
  }
  // 取消
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }
  const [imageUrl, setImageUrl] = useState<string>()
  const [loading, setLoading] = useState(false)
  // 上传图像
  // 上传之前, 图片处理
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上传jpeg/png格式的图片!')
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片最大2MB!')
      return false
    }
    setLoading(true)
    return isJpgOrPng && isLt2M
  }
  // 图片上传成功以后
  const handleChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setLoading(false)
      if (info.file.response.success) {
        const { imgId, imgPath } = info.file.response.data
        console.log(imgId, imgPath)
        setImageUrl(env.uploadPath + imgPath)
        form.setFieldValue('avatorId', imgId)
      } else message.error(info.file.response.msg)
    } else if (info.file.status === 'error') {
      setLoading(false)
      message.error('服务器内部异常,请稍后再试')
    }
  }
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </button>
  )
  const headers = {
    Authorization: `Bearer ${storage.get('token')}`
  }
  return (
    <Modal
      title={action == 'add' ? '新增' : '编辑'}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText='确定'
      cancelText='取消'
    >
      <Form {...layout} name='nest-messages' form={form}>
        <Form.Item name='id' hidden={true}>
          <Input name='id' />
        </Form.Item>
        <Form.Item name='avatorId' hidden={true}>
          <Input name='id' />
        </Form.Item>
        <Form.Item name='userName' label='用户名' rules={[{ required: true, message: '请输入用户名' }]}>
          <Input disabled={action === 'edit'} />
        </Form.Item>
        <Form.Item name='nickName' label='昵称'>
          <Input />
        </Form.Item>
        <Form.Item name='phonenumber' label='手机号'>
          <Input type='number' />
        </Form.Item>
        <Form.Item name='sex' label='性别'>
          <Select options={gender} allowClear />
        </Form.Item>
        <Form.Item name='status' label='状态' rules={[{ required: true, message: '请选择状态' }]}>
          <Select options={userStatus} />
        </Form.Item>
        <Form.Item name='avator' label='头像'>
          <Upload
            name='file'
            listType='picture-circle'
            className='avatar-uploader'
            showUploadList={false}
            action={env.uploadApi}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            headers={headers}
          >
            {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default Operation
