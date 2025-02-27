import React, { memo } from 'react'
import request from '@/utils/request'

const welcome = memo(() => {
  const handleClick = () => {
    request.post('/login', { username: 'ross', password: '123456' }).then(res => {
      // eslint-disable-next-line no-console
      console.log(res)
    })
  }
  return (
    <div>
      <h2>welcome</h2>
      <button onClick={handleClick}>Click</button>
    </div>
  )
})

export default welcome
