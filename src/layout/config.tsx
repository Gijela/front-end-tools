import { BellOutlined, PlusCircleFilled } from "@ant-design/icons"

// sidebar底部固定的功能图标信息
export const fixedMenuInfo = {
  // 这里的属性名字需要和 routes.tsx 中的 path 相同
  addTool: {
    idx: 0,
    path: '/addTool',
    toolTipMsg: '添加工具',
    icon: <PlusCircleFilled style={{ fontSize: 24 }} />
  },
  help: {
    idx: 1,
    path: '/help',
    toolTipMsg: '帮助',
    icon: <BellOutlined style={{ fontSize: 24 }} />
  }
}

// 底部不新开标签页的图标对应的页面path
export const fixedMenuPaths = Object.values(fixedMenuInfo).map((item) => item.path)

// 加上底部不新开标签页工具个数
export const getRealIndex = (idx: number) => idx + Object.keys(fixedMenuInfo).length

// hover 时的特殊图标索引枚举
export const specialHoverIdxMap = {
  'default': -1,
  'hideSide': -2,
  'github': -3
}
