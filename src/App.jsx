import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import MainWrapper from './layouts/MainWrapper'
import Login from './views/auth/Login'
import Logout from './views/auth/Logout'
import Register from './views/auth/Register'
import StoreHeader from './views/base/StoreHeader'
import StoreFooter from './views/base/StoreFooter'

function App() {
  return (
    <BrowserRouter>
      <StoreHeader />
      <Routes>
        <Route path="/" element={<h1>Homepage</h1>} />
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
      <StoreFooter />
    </BrowserRouter>
  )
}

export default App
