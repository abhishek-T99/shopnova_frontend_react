import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import UserData from './views/plugin/UserData'
import CartID from './views/plugin/cartID'
import apiInstance from './utils/axios'

import Home from './views/shop/Home'
import MainWrapper from './layouts/MainWrapper'
import PrivateRoute from './layouts/PrivateRoute'
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
import Checkout from './views/shop/Checkout'
import PaymentSuccess from './views/shop/PaymentSuccess'
import Invoice from './views/shop/Invoice'
import Search from './views/shop/Search'
import Account from './views/customer/Accounts'

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
              <Route path='/cart/' element={<Cart />} />
              <Route path="/checkout/:order_oid" element={<PrivateRoute><Checkout /></PrivateRoute>} />
              <Route path="/payment-success/:order_oid/" element={<PaymentSuccess />} />
              <Route path="/invoice/:order_oid/" element={<Invoice />} />
              <Route path="/search" element={<Search />} />

              {/* Customer Routes */}
              <Route path="/customer/account/" element={<PrivateRoute><Account /></PrivateRoute>} />
              {/* <Route path="/customer/orders/" element={<PrivateRoute><Orders /></PrivateRoute>} />
              <Route path="/customer/order/detail/:order_oid/" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
              <Route path="/customer/wishlist/" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
              <Route path="/customer/notifications/" element={<PrivateRoute><Notifications /></PrivateRoute>} />
              <Route path="/customer/settings/" element={<PrivateRoute><Settings /></PrivateRoute>} /> */}

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
