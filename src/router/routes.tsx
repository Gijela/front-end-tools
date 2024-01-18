import { lazy, LazyExoticComponent, Suspense } from 'react'
import { BellOutlined, HomeFilled, PlusCircleFilled } from '@ant-design/icons'
import Home from '../pages/home'

export interface ConfigRoute {
  path: string
  name: string
  component: LazyExoticComponent<() => JSX.Element> | (() => JSX.Element)
  icon?: JSX.Element
  isChild?: boolean // 是子页面
  isNotMenu?: boolean // 在菜单
  children?: ConfigRoute[]
}

export const Result403 = lazy(() => import('../pages/403'))
export const Result404 = lazy(() => import('../pages/404'))

const IframeTemplate = lazy(() => import('@/pages/iframeTemplate'))

// 基于 url 懒加载组件
export const lazyLoad = (url: string) => {
  return (
    <Suspense>
      <IframeTemplate url={url} />
    </Suspense>
  )
}

const routes: ConfigRoute[] = [
  {
    path: '/home',
    name: '首页',
    component: Home,
    icon: <HomeFilled style={{ fontSize: '20px' }} />
  },
  {
    path: '/addTool',
    name: '添加工具',
    component: lazy(() => import('../pages/addTool')),
    icon: <PlusCircleFilled style={{ fontSize: 24 }} />
  },
  {
    path: '/help',
    name: '帮助',
    component: lazy(() => import('../pages/help')),
    icon: <BellOutlined style={{ fontSize: 24 }} />
  }
]

//! 后续有子页面可能会用到 (/father/son)
// export const menuRoutes: ConfigRoute[] = routes.filter((item) => !item.isNotMenu && !item.isChild)

export default routes
