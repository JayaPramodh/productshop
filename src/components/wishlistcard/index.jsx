import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/card-context';
import { findIsWishlist } from '../../utils/findIsWishlist';
import { findProductInCart } from '../../utils/findProductInCart';
import './wishlistcard.css';
import { useWishlist } from '../../context/wishlist-context';

export const WishlistCard = ({wish}) => {
    const imageUrl = wish?.images?.[0] || 'https://via.placeholder.com/300x200?text=product';
    const title = wish?.title || 'wish';
    const description = wish?.description || 'No description available.';
    const price = wish?.price ?? 0;

    const navigate = useNavigate();

    const {cart, cartDispatch } = useCart();
    const {wishlist, wishlistDispatch} = useWishlist();

    const isAddedToCart = findProductInCart(cart, wish);
    const isWishlist = findIsWishlist(wishlist, wish);
    

    function handleAddToCart(product) {
        isAddedToCart ?
            navigate('/cart') :
            cartDispatch({ type: 'ADD_TO_CART', payload: { product } });
    }

    function handleAddToWishlist(product) {
        wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: { product } });
    }

    return (
        <div className="prod-card">
            <div className='img-container'>
                <img src={imageUrl} alt="product image" className='image-contain' />
            </div>
            <div className="wishlist-card-content">
                <h2>{title}</h2>
                <p>{description}</p>
                <div className="wishlist-actions">
                    <button type="button" onClick={() => handleAddToWishlist(wish)}>
                        <span className="material-symbols-outlined">heart_broken</span>
                        <span>Remove from wishlist</span>
                    </button>
                    <button type="button" onClick={() => handleAddToCart(wish)}>
                        <span className="material-symbols-outlined">
                            {isAddedToCart ? 'shopping_cart_checkout' : 'shopping_cart'}
                        </span>
                        <span>{isAddedToCart ? 'Go to cart' : 'Add to cart'}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}