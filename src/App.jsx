import React, {Suspense} from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingSpinner from './shared/components/UI/LoadingSpinner'

const RootLayout = React.lazy(() => import('./shared/pages/Root'))
const Users = React.lazy(() => import('./user/pages/Users'))
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'))
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'))
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'))
const Auth = React.lazy(() => import('./user/pages/Auth'))

function App() {
  
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  // Base child routes (always accessible)
  const childRoutes = [
    { index: true, element: <Users /> },
    { path: ':uid/places', element: <UserPlaces /> },
    { path: 'auth', element: <Auth /> }
  ]
  
  // Conditionally add protected routes
  if (isLoggedIn) {
    childRoutes.push(
      { path: 'places/new', element: <NewPlace /> },
      { path: 'places/:placeId', element: <UpdatePlace /> }
    )
    
     // Default redirect for authenticated users for any invalid routes
    childRoutes.push({ path: '*', element: <Navigate to="/" replace /> })
  } else {
    // Default redirect for logged-out users for any invalid routes
    childRoutes.push({ path: '*', element: <Navigate to="/auth" replace /> })
  }

  const router = createBrowserRouter([
    { path: '/', element: <RootLayout />,
      children: childRoutes 
    },
  ])

  return (
    <Suspense fallback={<div className='center'><LoadingSpinner asOverlay /></div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
