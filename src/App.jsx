import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
//import Bookdetails from './pages/BookDetails'
//import { Profile } from './pages/Profile'
//import { UserCart } from './pages/UserCart'
import { Navbar } from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { BookContextProvider } from './context/DataBooksContext'
const Login = lazy(()=> import('./components/Login'))
const Register = lazy(()=> import('./components/Register'))
const Bookdetails = lazy(()=> import('./pages/BookDetails'))
const Orders = lazy(()=> import('./pages/Orders'))
const ErrorRoute = lazy(()=> import('./components/ErrorRoute'))
const CheckoutSuccess = lazy(()=> import('./components/CheckoutSucess'))
const Profile = lazy(()=> import('./pages/Profile'))
const ProtectedRoute = lazy(()=> import('./components/ProtectedRoute'))
//import Login from './components/Login'
//import Register from './components/Register'
import { AuthContextProvider } from './context/AuthContext'
//import CheckoutSuccess from './components/CheckoutSucess'
//import Orders from './pages/Orders'
//import ProtectedRoute from './components/ProtectedRoute'
//import ErrorRoute from './components/ErrorRoute'

function App() {

  return (
    <AuthContextProvider>
      <BookContextProvider>
        <ShoppingCartProvider>
          <div className='container'>
            <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/books/:id' element={<Bookdetails />} />
              <Route element={<ProtectedRoute redirectTo='/login'/>}>
                <Route path='/user/profile' element={<Profile />} />
                <Route path='/order/:id' element={<Orders />} />
                <Route path='/success' element={<CheckoutSuccess />} />
              </Route>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='*' element={<ErrorRoute />} />
              {/*<Route path='/checkout/:id' element={<UserCart />} />*/}
            </Routes>
          </Suspense>
          </div>
        </ShoppingCartProvider >
      </BookContextProvider>
    </AuthContextProvider>
  )
}

export default App
