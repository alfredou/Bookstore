import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import Bookdetails from './pages/BookDetails'
import { Profile } from './pages/Profile'
import { UserCart } from './pages/UserCart'
import { Navbar } from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { BookContextProvider } from './context/DataBooksContext'
import PrivateRoute from './helpers/privateroute'
import Login from './components/Login'
import Register from './components/Register'
import { AuthContextProvider } from './context/AuthContext'
import CheckoutSuccess from './components/CheckoutSucess'

function App() {

  return (
    <AuthContextProvider>
      <BookContextProvider>
        <ShoppingCartProvider>
          <div className='container'>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/books/:id' element={<Bookdetails />} />
              <Route path='/success' element={<CheckoutSuccess />} />
              <Route path='/users/:id' element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              {/*<Route path='/checkout/:id' element={<UserCart />} />*/}
            </Routes>
          </div>
        </ShoppingCartProvider >
      </BookContextProvider>
    </AuthContextProvider>
  )
}

export default App