import { useNavigate } from 'react-router-dom';
import productshopsvg from '../../assets/ProductShop.svg';
import { useAuth } from '../../context/login-context';

export const Navbar = () => {

    const navigate = useNavigate();

    const { token, authDispatch } = useAuth();

    const handleProfileClick = () => {
        if(token) {
            authDispatch({
                type: 'LOGOUT',
            });
            localStorage.setItem('email', JSON.stringify(""));
            localStorage.setItem('password', JSON.stringify(""));
            localStorage.setItem('token', JSON.stringify(""));
            navigate('/login');
        }
        else
           navigate('/login');
    }

    return (
        <header className='d-flex-row flex-sp-btw bg-grey-orange'>
            <h3 className='pd-top-10px dark-purple ptr-cursor' onClick={() => navigate("/")}>
                <img src={productshopsvg} alt='PS Icon' className='icon' />
                ProductShop
            </h3>
            <div>
                <button className='mg-8 ptr-cursor' onClick={() => navigate('/wishlist')}>
                    <div>
                        <span className="material-symbols-outlined">
                            favorite
                        </span>
                    </div>
                    <div>
                        Wishlist
                    </div>
                </button>
                <button className='mg-8 ptr-cursor' onClick={() => navigate('/cart')}>
                    <div>
                        <span className="material-symbols-outlined">
                            shopping_cart
                        </span>
                    </div>
                    <div>
                        Cart
                    </div>
                </button>
                <button className='mg-8 ptr-cursor' onClick={handleProfileClick}>
                    <div>
                        <span className="material-symbols-outlined">
                            account_circle
                        </span>
                    </div>
                    <div>
                        {
                            token ? 'Logout' : 'Login'
                        }
                    </div>
                </button>
            </div>
        </header>
    );
}