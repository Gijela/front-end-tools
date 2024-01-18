import { useState } from 'react'
import { Col, Row, Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'
import { FileOutlined, GithubOutlined, ShrinkOutlined } from '@ant-design/icons'
import clsx from 'clsx'

import { useGlobalStore } from '@/store/globalStore'
import styles from './sidebar.module.scss'
import { ConfigRoute } from '@/router/routes'
import { fixedMenuInfo, getRealIndex, fixedMenuPaths, specialHoverIdxMap } from './config.tsx'

type SideBarProp = {
  updateHideSideBar: (flag: boolean) => void
}

type FixedMenuItemProp = {
  icon: JSX.Element
  hoverIdx: number
  handleClick: () => void
  tooltipTitle: string
}

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

  return (
    <div className={styles.sidebar}>
      {/* 动态添加的功能图标 */}
      <div className={styles.activeMenu}>
        {routesState
          .filter((item: ConfigRoute) => !fixedMenuPaths.includes(item.path))
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
        {Object.values(fixedMenuInfo).map((menuItem, index) => (
          <Row
            key={index}
            justify={'center'}
            className={clsx(styles.menu, styles.mb10, {
              [styles.activeMenuBg]: hoverMenuIdx === menuItem.idx || activeMenuIdx === menuItem.idx
            })}
            onClick={() => handleMenuSelect(menuItem.idx, menuItem.path)}
            onMouseEnter={() => setHoverMenuIdx(menuItem.idx)}
            onMouseLeave={() => setHoverMenuIdx(specialHoverIdxMap.default)}
          >
            <Tooltip placement="right" title={menuItem.toolTipMsg}>
              {menuItem.icon}
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
