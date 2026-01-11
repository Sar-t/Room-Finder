import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import  Login from './Components/Login.jsx'
import { Provider } from 'react-redux'
import Signup from './Components/Signup.jsx'
import Home from './Pages/Home.jsx'
import Verify from './Pages/Verify.jsx'
import AddProperty from './Pages/AddProperty.jsx'
import AuthLayout from './Components/AuthLayout.jsx'
import SearchResults from './Pages/SearchResults.jsx'
import PropertyDetails from './Pages/PropertyDetails.jsx'
import DeleteProperty from './Pages/DeleteProperty.jsx'
import EditProperty from './Pages/EditProperty.jsx'
import MyProperties from './Pages/MyProperties.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/verify",
        element: <Verify />
      },
      {
        path: "/add-property",
        element: <AuthLayout protectedRoute={true}><AddProperty /></AuthLayout>
      },
      {
        path: "/search",
        element: <AuthLayout><SearchResults /></AuthLayout>
      },{
        path: "/property/:id",
        element: <AuthLayout><PropertyDetails /></AuthLayout>
      },
      {
        path: "/property/:id/delete/",
        element: <AuthLayout><DeleteProperty /></AuthLayout>
      },
      {
        path: "/property/:id/edit/",
        element: <AuthLayout><EditProperty /></AuthLayout>
      },
      {
        path: "/property/me",
        element: <AuthLayout><MyProperties /></AuthLayout>
      }
    ]
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
