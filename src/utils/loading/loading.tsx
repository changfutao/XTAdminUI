import React, { memo } from 'react'
import { Spin } from 'antd'
import './loading.less'

const loading = memo(({ tip = '加载中...' }: { tip?: string }) => {
  const content = <div className='loading-content' />
  return (
    <Spin tip={tip} size={'default'}>
      {content}
    </Spin>
  )
})

export default loading
