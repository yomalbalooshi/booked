import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.querySelector('#root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
