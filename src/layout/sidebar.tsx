import { Col, Row, Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  BellOutlined,
  FileOutlined,
  GithubOutlined,
  PlusCircleFilled,
  ShrinkOutlined
} from '@ant-design/icons'
import clsx from 'clsx'

import { useGlobalStore } from '@/store/globalStore'
import styles from './sidebar.module.scss'
import { menuRoutes, ConfigRoute } from '@/router/routes'

type SideBarProp = {
  updateHideSideBar: (flag: boolean) => void
}

// 底部固定的功能图标(不新开标签页面)配置信息
export const fixedMenuInfo = {
  // 这里的属性名字需要和 routes.tsx 中的 path 相同
  addTool: {
    idx: 0,
    path: '/addTool'
  },
  help: {
    idx: 1,
    path: '/help'
  }
}

const fixedMenuPaths = Object.values(fixedMenuInfo).map((item) => item.path)

export default function SideBar({ updateHideSideBar }: SideBarProp) {
  const { activeMenuIdx, handleClickMenu } = useGlobalStore()
  const navigate = useNavigate()

  const handleMenuSelect = (idx: number, path: string) => {
    handleClickMenu(idx)
    navigate(path)
  }

  return (
    <div className={styles.sidebar}>
      {/* 动态添加的功能图标 */}
      <div className={styles.activeMenu}>
        {menuRoutes
          .filter((item: ConfigRoute) => !fixedMenuPaths.includes(item.path))
          .map((item: ConfigRoute, index: number) => (
            <Row
              key={index + Object.keys(fixedMenuInfo).length}
              className={clsx(styles.menu, {
                [styles.activeMenuBg]: activeMenuIdx === index + Object.keys(fixedMenuInfo).length
              })}
              onClick={() => handleMenuSelect(index + Object.keys(fixedMenuInfo).length, item.path)}
            >
              <Col
                span={24}
                className={clsx(styles.fs24, styles.textCenter)}
                style={{ marginTop: 10 }}
              >
                {item.icon || <FileOutlined />}
              </Col>
              <Col span={24} className={styles.textCenter} style={{ marginTop: '-10px' }}>
                {item.name}
              </Col>
            </Row>
          ))}
      </div>

      {/* 固定功能图标 */}
      <div className={styles.fixedMenu}>
        <Row
          justify={'center'}
          className={clsx(styles.menu, {
            [styles.activeMenuBg]: activeMenuIdx === fixedMenuInfo.addTool.idx
          })}
          onClick={() => handleMenuSelect(fixedMenuInfo.addTool.idx, fixedMenuInfo.addTool.path)}
        >
          <Tooltip placement="right" title={'添加工具'}>
            <PlusCircleFilled className={styles.fs24} />
          </Tooltip>
        </Row>
        <Row
          justify={'center'}
          className={clsx(styles.menu, {
            [styles.activeMenuBg]: activeMenuIdx === fixedMenuInfo.help.idx
          })}
          onClick={() => handleMenuSelect(fixedMenuInfo.help.idx, fixedMenuInfo.help.path)}
        >
          <Tooltip placement="right" title={'帮助'}>
            <BellOutlined className={styles.fs24} />
          </Tooltip>
        </Row>
        <Row justify={'center'} className={clsx(styles.menu)}>
          <Tooltip placement="right" title={'隐藏菜单栏'}>
            <ShrinkOutlined style={{ fontSize: '26px' }} onClick={() => updateHideSideBar(true)} />
          </Tooltip>
        </Row>
        <Row justify={'center'} className={clsx(styles.menu)}>
          <GithubOutlined
            className={styles.fs24}
            onClick={() => window.open('https://github.com/Gijela/Desktop-Tools', '_blank')}
          />
        </Row>
      </div>
    </div>
  )
}
