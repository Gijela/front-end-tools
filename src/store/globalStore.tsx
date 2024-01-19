import { useEffect, useState } from 'react'
import { createGlobalStore } from 'hox'
import { ConfigRoute, lazyLoad, menuRoutes } from '@/router/routes'
import { FieldType } from '@/pages/setting/AddTool'

export const [useGlobalStore, getGlobalStore] = createGlobalStore(() => {
  const [activeMenuIdx, setActiveMenuIdx] = useState<number>(0)
  const [routesState, setRoutesState] = useState<ConfigRoute[]>(menuRoutes)

  const handleClickMenu = (idx: number) => setActiveMenuIdx(idx)
  const updateRoutesState = (newRoutes: ConfigRoute[]) => setRoutesState(newRoutes)

  useEffect(() => {
    // 将本地存储的工具添加到侧边栏
    const localToolString = localStorage.getItem('addToolInfo')
    const localToolsInfo = localToolString ? JSON.parse(localToolString) : []

    const localTools: ConfigRoute[] = localToolsInfo.map((item: FieldType) => ({
      path: item.path,
      name: item.name,
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
