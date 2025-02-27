import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import MainWrapper from './layouts/MainWrapper'
import Login from './views/auth/Login'
import Logout from './views/auth/Logout'
import Register from './views/auth/Register'
import ForgotPassword from './views/auth/ForgotPassword'
import StoreHeader from './views/base/StoreHeader'
import StoreFooter from './views/base/StoreFooter'
import PageNotFound from './views/base/PageNotFound'

function App() {
  return (
    <BrowserRouter>
      <StoreHeader />
      <MainWrapper>
      <Routes>
        <Route path='/' element={<h1>Homepage</h1>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      </MainWrapper>
      <StoreFooter />
    </BrowserRouter>
  )
}

export default App
