import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './shared/pages/Root'
import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'

function App() {

  const router = createBrowserRouter([
    { path: '/', element: <RootLayout />,
      children: [
        { index: true, element: <Users /> },
        { path: 'places', element: <NewPlace /> },
        { path: ':pid/places', element: <NewPlace />}
      ] 
    },
  ])

  return (
    <RouterProvider router={router}>
      
    </RouterProvider>
  )
}

export default App
