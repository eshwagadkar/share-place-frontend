import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import RootLayout from './shared/pages/Root'
import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace'
import Auth from './user/pages/Auth'
import { useSelector } from 'react-redux'

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
    <RouterProvider router={router} />
  )
}

export default App
