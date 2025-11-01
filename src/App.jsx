import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './shared/pages/Root'
import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
function App() {

  const router = createBrowserRouter([
    { path: '/', element: <RootLayout />,
      children: [
        { index: true, element: <Users /> },
        { path: 'places', element: <NewPlace /> },
        { path: ':uid/places', element: <UserPlaces /> }
      ] 
    },
  ])

  return (
    <RouterProvider router={router}>
      
    </RouterProvider>
  )
}

export default App
