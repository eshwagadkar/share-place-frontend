import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './shared/pages/Root'
import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace'

function App() {

  const router = createBrowserRouter([
    { path: '/', element: <RootLayout />,
      children: [
        { index: true, element: <Users /> },
        { path: ':uid/places', element: <UserPlaces /> },
        { path: 'places/new', element: <NewPlace /> },
        { path: 'places/:placeId', element: <UpdatePlace /> }
      ] 
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
