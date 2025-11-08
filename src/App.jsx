import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './shared/pages/Root'
import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace'
import Auth from './user/pages/Auth'

function App() {

  const router = createBrowserRouter([
    { path: '/', element: <RootLayout />,
      children: [
        { index: true, element: <Users /> },
        { path: 'places/new', element: <NewPlace /> },
        { path: ':uid/places', element: <UserPlaces /> },
        { path: 'places/:placeId', element: <UpdatePlace /> }, 
        { path: 'auth', element: <Auth />
        }
      ] 
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
