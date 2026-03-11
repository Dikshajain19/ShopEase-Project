import { useState, useEffect } from 'react'
import {ProductList,ProductDetail} from "./pages"
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import NavBar from "./components/NavBar"
import CartPage  from './pages/CartPage'

import React from 'react'
import CheckoutPage from './pages/CheckoutPage'

const App = () => {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/products' element={<ProductList/>}/>
        <Route path='/product/:id' element={<ProductDetail/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
