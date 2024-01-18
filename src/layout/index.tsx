import { useState } from 'react'
import { Routes } from 'react-router-dom'
import { FloatButton } from 'antd'
import { ArrowsAltOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import clsx from 'clsx'

import styles from './index.module.scss'
import SideBar from './sidebar'
import { routesElements } from '@/router'

export default function App() {
  const [hideSideBar, setHideSideBar] = useState<boolean>(false)
  const [fullScreen, setFullScreen] = useState<boolean>(false)

  return (
    <div
      className={clsx(styles.container, {
        [styles.fullScreen]: hideSideBar && !fullScreen,
        [styles.noFullScreen]: !hideSideBar && !fullScreen
      })}
    >
      {!hideSideBar ? (
        <SideBar updateHideSideBar={(flag: boolean) => setHideSideBar(flag)} />
      ) : (
        <FloatButton.Group style={{ right: 28, zIndex: 1001 }}>
          <FloatButton
            tooltip={fullScreen ? '退出全屏' : '进入全屏'}
            icon={fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            onClick={() => setFullScreen(!fullScreen)}
          />
          <FloatButton
            tooltip={'显示菜单栏'}
            icon={<ArrowsAltOutlined />}
            onClick={() => {
              setHideSideBar(false)
              setFullScreen(false)
            }}
          />
        </FloatButton.Group>
      )}

      <div className={styles.dashBoard}>
        <Routes>{routesElements}</Routes>
      </div>
    </div>
  )
}
