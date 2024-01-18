import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'

export default function Page403() {
  return (
    <Result
      status='403'
      title='403'
      subTitle='抱歉，你无权访问此页面'
      extra={
        <Link to='/'>
          <Button type='primary'>返回首页</Button>
        </Link>
      }
    />
  )
}
