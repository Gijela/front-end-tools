import { useEffect, useState } from 'react'
import { createGlobalStore } from 'hox'
import { fixedMenuInfo } from '@/layout/config.tsx'
import routes, { ConfigRoute, lazyLoad } from '@/router/routes'
import { FieldType } from '@/pages/addTool'

export const [useGlobalStore, getGlobalStore] = createGlobalStore(() => {
  const [activeMenuIdx, setActiveMenuIdx] = useState<number>(0 + Object.keys(fixedMenuInfo).length)
  const [routesState, setRoutesState] = useState<ConfigRoute[]>(routes)

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
