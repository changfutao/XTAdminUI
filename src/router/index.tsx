import { createBrowserRouter, Navigate } from 'react-router-dom'
import Welcome from '@/views/welcome'
import Login from '@/views/login'
import Forbidden from '@/views/403'
import NotFound from '@/views/404'
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
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  },
  {
    path: '/403',
    element: <Forbidden />
  },
  {
    path: '/404',
    element: <NotFound />
  }
]

export default createBrowserRouter(router)
