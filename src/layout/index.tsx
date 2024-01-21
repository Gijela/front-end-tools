import { Suspense, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { FloatButton } from 'antd'
import { ArrowsAltOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import clsx from 'clsx'

import styles from './index.module.scss'
import SideBar from './sidebar'
import { useGlobalStore } from '@/store/globalStore'
import { Result403, Result404, ConfigRoute } from '@/routes'

export default function App() {
  const [hideSideBar, setHideSideBar] = useState<boolean>(false)
  const [fullScreen, setFullScreen] = useState<boolean>(false)
  const { routesState } = useGlobalStore()

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
        <Routes>
          {...routesState.map((route: ConfigRoute) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Suspense>
                  <route.component />
                </Suspense>
              }
            />
          ))}
          <Route key={'home'} path={'/*'} element={<Navigate to={'home'} />} />,
          <Route
            key={'404'}
            path="/404"
            element={
              <Suspense>
                <Result404 />
              </Suspense>
            }
          />
          <Route
            key={'403'}
            path="/403"
            element={
              <Suspense>
                <Result403 />
              </Suspense>
            }
          />
          <Route path="*" key="notFound" element={<Navigate to={'404'} />} />
        </Routes>
      </div>
    </div>
  )
}
