import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/card-context.jsx'
import { WishlistProvider } from './context/wishlist-context.jsx'
import { AuthProvider } from './context/login-context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
