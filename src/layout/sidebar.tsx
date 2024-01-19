import { useEffect, useState } from 'react'
import { Col, Row, Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'
import { FileOutlined, GithubOutlined, ShrinkOutlined } from '@ant-design/icons'
import clsx from 'clsx'

import { useGlobalStore } from '@/store/globalStore'
import styles from './sidebar.module.scss'
import { ConfigRoute, fixedSideBarRoutes } from '@/router/routes'

type SideBarProp = {
  updateHideSideBar: (flag: boolean) => void
}

type FixedMenuItemProp = {
  icon: JSX.Element
  hoverIdx: number
  handleClick: () => void
  tooltipTitle: string
}

// hover 显示背景的特殊值
const specialHoverIdxMap = {
  default: -1, // 默认值，所有都不 hover
  hideSide: -2, // 隐藏侧边栏
  github: -3 // github
}

const fixedMenuPath = fixedSideBarRoutes.map((item) => item.path)

export default function SideBar({ updateHideSideBar }: SideBarProp) {
  const { activeMenuIdx, handleClickMenu, routesState } = useGlobalStore()
  const [hoverMenuIdx, setHoverMenuIdx] = useState<number>(specialHoverIdxMap.default)

  const navigate = useNavigate()

  const handleMenuSelect = (idx: number, path: string) => {
    handleClickMenu(idx)
    navigate(path)
  }

  // 新开标签页的工具图标，抽离公共逻辑渲染
  const FixedMenuItem = ({ icon, hoverIdx, handleClick, tooltipTitle }: FixedMenuItemProp) => {
    return (
      <Row
        justify={'center'}
        className={clsx(styles.menu, styles.mb10, {
          [styles.activeMenuBg]: hoverMenuIdx === hoverIdx
        })}
        onClick={handleClick}
        onMouseEnter={() => setHoverMenuIdx(hoverIdx)}
        onMouseLeave={() => setHoverMenuIdx(specialHoverIdxMap.default)}
      >
        <Tooltip placement="right" title={tooltipTitle}>
          {icon}
        </Tooltip>
      </Row>
    )
  }

  // 将过滤掉的 fixMenu route 个数重新加回来
  const getRealIndex = (idx: number) => idx + fixedSideBarRoutes.length

  // 设置初始值：从 url 中获取路径判断 hoverMenuIdx, activeMenuIdx 初始值
  useEffect(() => {
    const pathname = window.location.pathname
    if (pathname === '/') return
    if (fixedMenuPath.includes(pathname)) {
      const idx = fixedMenuPath.indexOf(pathname)
      setHoverMenuIdx(idx)
      handleClickMenu(idx)
    } else {
      const filteredRoutes = routesState.filter((item) => !fixedMenuPath.includes(item.path))
      const index = filteredRoutes.findIndex((item) => item.path === pathname)
      if (index !== -1) {
        setHoverMenuIdx(getRealIndex(index))
        handleClickMenu(getRealIndex(index))
      }
    }
  }, [])

  return (
    <div className={styles.sidebar}>
      {/* 动态添加的功能图标 */}
      <div className={styles.activeMenu}>
        {routesState
          .filter((item: ConfigRoute) => !fixedMenuPath.includes(item.path))
          .map((item: ConfigRoute, index: number) => (
            <Row
              key={getRealIndex(index)}
              className={clsx(styles.menu, styles.mb10, {
                [styles.activeMenuBg]:
                  hoverMenuIdx === getRealIndex(index) || activeMenuIdx === getRealIndex(index)
              })}
              onClick={() => handleMenuSelect(getRealIndex(index), item.path)}
              onMouseEnter={() => setHoverMenuIdx(getRealIndex(index))}
              onMouseLeave={() => setHoverMenuIdx(specialHoverIdxMap.default)}
            >
              <Col
                span={24}
                className={clsx(styles.fs24, styles.textCenter)}
                style={{ marginTop: 10 }}
              >
                {item.icon || <FileOutlined />}
              </Col>
              <Col span={24} className={styles.textCenter} style={{ marginTop: '-5px' }}>
                {item.name}
              </Col>
            </Row>
          ))}
      </div>

      {/* 固定功能图标 */}
      <div className={styles.fixedMenu}>
        {/* 不新开标签页 */}
        {fixedSideBarRoutes.map((fixMenu, index) => (
          <Row
            key={index}
            justify={'center'}
            className={clsx(styles.menu, styles.mb10, {
              [styles.activeMenuBg]: hoverMenuIdx === index || activeMenuIdx === index
            })}
            onClick={() => handleMenuSelect(index, fixMenu.path)}
            onMouseEnter={() => setHoverMenuIdx(index)}
            onMouseLeave={() => setHoverMenuIdx(specialHoverIdxMap.default)}
          >
            <Tooltip placement="right" title={fixMenu.name}>
              {fixMenu.icon}
            </Tooltip>
          </Row>
        ))}
        {/* 新开标签页 */}
        <FixedMenuItem
          icon={<ShrinkOutlined style={{ fontSize: '26px' }} />}
          hoverIdx={specialHoverIdxMap.hideSide}
          handleClick={() => updateHideSideBar(true)}
          tooltipTitle={'隐藏菜单栏'}
        />
        <FixedMenuItem
          icon={<GithubOutlined className={styles.fs24} />}
          hoverIdx={specialHoverIdxMap.github}
          handleClick={() => window.open('https://github.com/Gijela/Desktop-Tools', '_blank')}
          tooltipTitle={'GitHub'}
        />
      </div>
    </div>
  )
}
