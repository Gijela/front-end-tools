import { useState } from 'react'
import { createGlobalStore } from 'hox'
import { fixedMenuInfo } from '@/layout/config.tsx'
import routes, { ConfigRoute } from '@/router/routes'

export const [useGlobalStore, getGlobalStore] = createGlobalStore(() => {
  const [activeMenuIdx, setActiveMenuIdx] = useState<number>(0 + Object.keys(fixedMenuInfo).length)
  const [routesState, setRoutesState] = useState<ConfigRoute[]>(routes)

  const handleClickMenu = (idx: number) => setActiveMenuIdx(idx)
  const updateRoutesState = (newRoutes: ConfigRoute[]) => setRoutesState(newRoutes)

  return {
    activeMenuIdx,
    handleClickMenu,
    routesState,
    updateRoutesState
  }
})
