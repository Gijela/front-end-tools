import { Menu } from 'antd'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import { fixedSideBarRoutes } from '@/router/routes'

import styles from './index.module.scss'
import { Suspense, useEffect } from 'react'

type MenuItem = {
  key: string
  label: string
  icon: JSX.Element
}

export const settingMenuItems: MenuItem[] = [
  //! 把子组件的path存放到key中，所以 key 的值必须和跳转的文件名字一样，如 addTool 对应的是 addTool.tsx
  {
    key: 'AddTool',
    label: '增加侧边栏工具',
    icon: <PlusCircleOutlined />
  },
  {
    key: 'DelTool',
    label: '删除侧边栏工具',
    icon: <MinusCircleOutlined />
  }
]

export default function Setting() {
  const navigate = useNavigate()

  useEffect(() => {
    const subPathName = window.location.pathname.split('/setting')[1]
    if (subPathName === '/*' || subPathName === '') {
      navigate('/setting/' + settingMenuItems[0].key)
    }
  }, [])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subMenus}>
          <Menu
            defaultSelectedKeys={[
              window.location.pathname === '/setting/*' || window.location.pathname === '/setting'
                ? settingMenuItems[0].key
                : window.location.pathname.split('/setting/')[1]
            ]}
            items={settingMenuItems}
            style={{
              background: 'none',
              border: 'none',
              height: '100%',
              overflowY: 'auto'
            }}
            onClick={({ key }) => navigate('/setting/' + key)}
          />
        </div>
        <div className={clsx(styles.formContainer)}>
          <Routes>
            {...fixedSideBarRoutes
              .filter((item) => item.children)
              .flatMap((fatherRoute) =>
                fatherRoute.children?.map((subRoute) => {
                  const subRealPathArr = subRoute.path.split('/')
                  return (
                    <Route
                      key={subRoute.path}
                      path={subRealPathArr[subRealPathArr.length - 1]}
                      element={
                        <Suspense>
                          <subRoute.component />
                        </Suspense>
                      }
                    />
                  )
                })
              )}
          </Routes>
        </div>
      </div>
    </>
  )
}
