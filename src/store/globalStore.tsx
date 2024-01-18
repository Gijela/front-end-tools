import { useState } from 'react'
import { createGlobalStore } from 'hox'
import { fixedMenuInfo } from '@/layout/sidebar'

export const [useGlobalStore, getGlobalStore] = createGlobalStore(() => {
  const [activeMenuIdx, setActiveMenuIdx] = useState<number>(0 + Object.keys(fixedMenuInfo).length)

  const handleClickMenu = (idx: number) => setActiveMenuIdx(idx)

  return {
    activeMenuIdx,
    handleClickMenu
  }
})
