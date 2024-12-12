import { Button, Form, Input, message, Table, Typography } from 'antd'
import { lazyLoad, ConfigRoute } from '@/routes'
import { useGlobalStore } from '@/store/globalStore'
import { AlertOutlined } from '@ant-design/icons'
import { IDataSource } from './DelTool'

// todo: 优化 table 的类型注解

type EditableTableProps = Parameters<typeof Table>[0]
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

export type FieldType = {
  url: string
  name: string
  path: string
}

// todo: 考虑菜单图标怎么引入，建一个图标选择器？

export default function AddTool() {
  const { routesState, updateRoutesState } = useGlobalStore()

  // 手动添加侧边栏工具
  const onFormFinish = (toolInfo: FieldType) => {
    const newToolInfo: ConfigRoute = {
      path: toolInfo.path,
      name: toolInfo.name,
      url: toolInfo.url,
      component: () => lazyLoad(toolInfo.url)
    }
    updateRoutesState([...routesState, newToolInfo])
    message.success('添加成功~')
  }

  const dataSource: IDataSource[] = [
    {
      key: 0,
      name: '英语',
      path: '/english-learn',
      url: 'https://english.chat2hub.com/',
      component: () => lazyLoad('https://english.chat2hub.com/')
    }
    // {
    //   key: 1,
    //   name: 'lemon',
    //   path: '/lemon',
    //   url: 'https://app-bph6guhsfgdbd8ds.z01.azurefd.net/webapp/#/home/scaffold',
    //   component: () =>
    //     lazyLoad('https://app-bph6guhsfgdbd8ds.z01.azurefd.net/webapp/#/home/scaffold')
    // }
  ]

  const handleAdd = (key: number) => {
    const target = dataSource.find((item) => item.key === key) as IDataSource

    const isToolExists = routesState.some(
      (item) => item.name === target.name && item.path === target.path && item.url === target.url
    )

    if (isToolExists) {
      message.warning('工具已存在~')
    } else {
      const { key, ...rest } = target
      updateRoutesState([...routesState, rest])
      message.success('添加成功~')
    }
  }

  const columns: (ColumnTypes[number] & { dataIndex: string })[] = [
    {
      title: '工具名称',
      dataIndex: 'name'
    },
    {
      title: '页面路径',
      dataIndex: 'path'
    },
    {
      title: '页面地址',
      dataIndex: 'url',
      render: (_, record) => (
        <a href={record.url} target="_blank">
          {record.url}
        </a>
      )
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => <a onClick={() => handleAdd(record.key)}>添加到侧边栏</a>
    }
  ]

  return (
    <div style={{ padding: '0 36px' }}>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFormFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="工具链接"
          name="url"
          rules={[
            {
              required: true,
              pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
              message: '请输入正确的链接~'
            }
          ]}
        >
          <Input placeholder="请输入您想要添加的工具网页链接~" />
        </Form.Item>
        <Form.Item<FieldType>
          label="工具名称"
          name="name"
          rules={[{ required: true, message: '请输入想要设置的名称~' }]}
        >
          <Input placeholder="请输入您想要最终展示的工具名称~" />
        </Form.Item>
        <Form.Item<FieldType>
          label="自定义路径"
          name="path"
          rules={[{ required: true, message: '请输入使用的访问路径~' }]}
        >
          <Input placeholder="请输入您想要使用的访问路径~" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </Form>

      <br />

      <Typography.Title level={4}>
        <AlertOutlined />
        推荐
      </Typography.Title>

      <Table bordered dataSource={dataSource} columns={columns} />
    </div>
  )
}
