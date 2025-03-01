import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import UserData from './views/plugin/UserData'
import CartID from './views/plugin/cartID'
import apiInstance from './utils/axios'

import Home from './views/shop/Home'
import MainWrapper from './layouts/MainWrapper'
import Login from './views/auth/Login'
import Logout from './views/auth/Logout'
import Register from './views/auth/Register'
import ForgotPassword from './views/auth/ForgotPassword'
import CreatePassword from './views/auth/CreatePassword'
import StoreHeader from './views/base/StoreHeader'
import StoreFooter from './views/base/StoreFooter'
import PageNotFound from './views/base/PageNotFound'
import ProductDetail from './views/shop/ProductDetail'
import { CartContext } from './views/plugin/Context'
import Cart  from './views/shop/Cart'

function App() {

  const [cartCount, setCartCount] = useState()
  const userData = UserData()
  let cart_id = CartID()
  const axios = apiInstance

  useEffect(() => {
    const url = userData?.user_id ? `cart-list/${cart_id}/${userData?.user_id}/` : `cart-list/${cart_id}/`;
    axios.get(url).then((res) => {
        setCartCount(res.data.length)
    });
  }, [])

  return (
    <CartContext.Provider value={[cartCount, setCartCount]} >
      <BrowserRouter>
        <StoreHeader />
          <MainWrapper>
            <Routes>
              <Route path='/' element={<Home />} />

              {/* Authentication routes */}
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path="/create-new-password" element={<CreatePassword />} />

              {/* Store routes */}
              <Route path='/detail/:slug' element={<ProductDetail />} />
              <Route path='/cart' element={<Cart />} />

              {/* 404 page */}
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </MainWrapper>
        <StoreFooter />
      </BrowserRouter>
    </CartContext.Provider>
  )
}

export default App
