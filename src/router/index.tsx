import { createBrowserRouter, Navigate } from 'react-router-dom'
import Welcome from '@/views/welcome'
import Login from '@/views/login'
const router = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    path: '/welcome',
    element: <Welcome />
  },
  {
    path: '/login',
    element: <Login />
  }
]

export default createBrowserRouter(router)
