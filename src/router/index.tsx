import { createBrowserRouter, Navigate } from 'react-router-dom'
import Welcome from '@/views/welcome'
import Login from '@/views/login'
import Forbidden from '@/views/403'
import NotFound from '@/views/404'
import Layout from '@/layout'
import Dashboard from '@/views/dashboard'
import User from '@/views/system/user'
import Dept from '@/views/system/dept'
import Menu from '@/views/system/menu'
import Role from '@/views/system/role'
import AuthLoader from './AuthLoader'
const router = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    id: 'layout',
    element: <Layout />,
    loader: AuthLoader,
    children: [
      { path: '/welcome', element: <Welcome /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/user', element: <User /> },
      { path: '/role', element: <Role /> },
      { path: '/dept', element: <Dept /> },
      { path: '/menu', element: <Menu /> }
    ]
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
