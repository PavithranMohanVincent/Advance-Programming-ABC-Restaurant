import React from 'react'
import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import StoreContextProvider from './components/StoreContext/StoreContext.js'
import './index.css'

ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>

  </BrowserRouter>



)
