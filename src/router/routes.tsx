import { lazy, LazyExoticComponent, Suspense } from 'react'
import { HomeFilled, SettingOutlined } from '@ant-design/icons'
import Home from '@/pages/home'
import { settingMenuItems } from '@/pages/setting'

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

// sidebar 固定按钮 route
export const fixedSideBarRoutes: ConfigRoute[] = [
  {
    path: '/setting/*',
    name: '添加工具',
    component: lazy(() => import('../pages/setting')),
    icon: <SettingOutlined style={{ fontSize: 24 }} />,
    children: settingMenuItems.map((item) => {
      return {
        path: `/setting/${item.key}`,
        name: item.label,
        component: lazy(() => import(`@/pages/setting/${item.key}.tsx`)),
        isChild: true
      } as ConfigRoute
    })
  }
]

const routes: ConfigRoute[] = [
  ...fixedSideBarRoutes.flatMap((item) => (item.children ? [item, ...item.children] : item)),
  {
    path: '/home',
    name: '首页',
    component: Home,
    icon: <HomeFilled style={{ fontSize: '20px' }} />
  }
]

export const menuRoutes: ConfigRoute[] = routes.filter((item) => !item.isChild)

export default routes
