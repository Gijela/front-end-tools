import { useEffect, useState } from 'react'
import { createGlobalStore } from 'hox'
import { ConfigRoute, lazyLoad, menuRoutes } from '@/routes'
import { FieldType } from '@/pages/setting/AddTool'

export const [useGlobalStore, getGlobalStore] = createGlobalStore(() => {
  const [activeMenuIdx, setActiveMenuIdx] = useState<number>(0)
  const [routesState, setRoutesState] = useState<ConfigRoute[]>(menuRoutes)

  const handleClickMenu = (idx: number) => setActiveMenuIdx(idx)

  const updateRoutesState = (newRoutes: ConfigRoute[]) => {
    setRoutesState(newRoutes)
    // 将动态生成的路由保存到本地。(routes.tsx 中已配置的不需要保存到本地)
    localStorage.setItem(
      'dynamicalRoutesInfo',
      JSON.stringify(
        newRoutes.filter((item) => !menuRoutes.map((menu) => menu.path).includes(item.path))
      )
    )
  }

  useEffect(() => {
    // 将本地存储的工具添加到侧边栏
    const localToolString = localStorage.getItem('dynamicalRoutesInfo')
    const localToolsInfo = localToolString ? JSON.parse(localToolString) : []

    const localTools: ConfigRoute[] = localToolsInfo.map((item: FieldType) => ({
      path: item.path,
      name: item.name,
      url: item.url,
      component: () => lazyLoad(item.url)
    }))
    updateRoutesState([...routesState, ...localTools])
  }, [])

  return {
    activeMenuIdx,
    handleClickMenu,
    routesState,
    updateRoutesState
  }
})
