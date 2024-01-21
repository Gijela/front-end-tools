import { useState } from 'react'
import { Popconfirm, Table, message } from 'antd'
import { useGlobalStore } from '@/store/globalStore'
import { ConfigRoute, menuRoutes } from '@/router/routes'

type EditableTableProps = Parameters<typeof Table>[0]

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

interface IDataSource extends ConfigRoute {
  key: number
}

export default function DelTool() {
  const { routesState, updateRoutesState } = useGlobalStore()

  const [dataSource, setDataSource] = useState<IDataSource[]>(
    routesState
      .filter((item) => !menuRoutes.map((menu) => menu.path).includes(item.path))
      .map((item, idx) => ({
        key: idx,
        name: item.name,
        path: item.path,
        url: item.url,
        component: item.component
      }))
  )

  const handleDelete = (key: number) => {
    const filterRoutes = routesState.filter((item) =>
      menuRoutes.map((menu) => menu.path).includes(item.path)
    )
    const filterData = dataSource.filter((item) => item.key !== key)
    setDataSource(filterData)
    updateRoutesState([...filterRoutes, ...filterData.map(({ key, ...rest }) => rest)])
    message.success('删除成功~')
  }

  const columns: (ColumnTypes[number] & { dataIndex: string })[] = [
    {
      title: '侧边栏名称',
      dataIndex: 'name'
    },
    {
      title: '路径',
      dataIndex: 'path'
    },
    {
      title: '地址',
      dataIndex: 'url'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => (
        <Popconfirm title="确定要删除吗?" onConfirm={() => handleDelete(record.key)}>
          <a>删除</a>
        </Popconfirm>
      )
    }
  ]

  return (
    <div style={{ padding: '0 36px' }}>
      <Table bordered dataSource={dataSource} columns={columns} />
    </div>
  )
}
