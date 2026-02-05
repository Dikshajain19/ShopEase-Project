import { useState, useEffect } from 'react'
import {ProductList,ProductDetail} from "./pages"
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

import React from 'react'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/product/:id' element={<ProductDetail/>}/>
      </Routes>
    </Router>
  )
}

export default App
