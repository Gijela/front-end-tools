import { Suspense } from 'react'
import { Navigate, Route } from 'react-router-dom'
import routes, { ConfigRoute, Result403, Result404 } from './routes'

function getRoutes(): React.ReactElement[] {
  return routes.map((route: ConfigRoute) => {
    const { path } = route
    return (
      <Route
        key={path}
        path={path}
        element={
          <Suspense>
            <route.component />
          </Suspense>
        }
      />
    )
  })
}

export const routesElements = [
  ...getRoutes(),
  <Route key={'home'} path={'/'} element={<Navigate to={'home'} />} />,
  <Route
    key={'404'}
    path="/404"
    element={
      <Suspense>
        <Result404 />
      </Suspense>
    }
  />,
  <Route
    key={'403'}
    path="/403"
    element={
      <Suspense>
        <Result403 />
      </Suspense>
    }
  />,
  <Route path="*" key="notFound" element={<Navigate to={'404'} />} />
]
