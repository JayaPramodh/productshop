import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Cart } from './pages/cart';
import { Wishlist } from './pages/wishlist';
import { AuthLogin } from './pages/authlogin';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/wishlist' element={<Wishlist />} />
      <Route path='/login' element={<AuthLogin />} />
    </Routes>
  )
}

export default App
