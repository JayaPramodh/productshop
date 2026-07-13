import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/card-context';
import { findIsWishlist } from '../../utils/findIsWishlist';
import { findProductInCart } from '../../utils/findProductInCart';
import './cart.css';
import { useWishlist } from '../../context/wishlist-context';

export const CartCard = ({ product }) => {
    const imageUrl = product?.images?.[0] || 'https://via.placeholder.com/300x200?text=product';
    const title = product?.title || 'product';
    const description = product?.description || 'No description available.';
    const price = product?.price ?? 0;

    const navigate = useNavigate();

    const { cart, cartDispatch } = useCart();
    const { wishlist, wishlistDispatch } = useWishlist();

    const isAddedToCart = findProductInCart(cart, product);
    const isWishlist = findIsWishlist(wishlist, product);


    function handleAddToCart(product) {
        isAddedToCart ?
            cartDispatch({ type: 'REMOVE_FROM_CART', payload: { product } }) :
            cartDispatch({ type: 'ADD_TO_CART', payload: { product } });
    }

    function handleAddToWishlist(product) {
        isWishlist ?
            navigate('/wishlist') :
            wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: { product } });
    }

    return (
        <div className="prod-card">
            <div className='img-container'>
                <img src={imageUrl} alt="product image" className='image-contain' />
            </div>
            <div className="wishlist-card-content">
                <h2>{title}</h2>
                <h4>₹{price}</h4>
                <p>{description}</p>
                <div className="wishlist-actions d-flex-col">
                    <button type="button" onClick={() => handleAddToWishlist(product)}>
                        <span className="material-symbols-outlined">
                            {
                                isWishlist ? 'heart_check' : 'favorite'
                            }
                        </span>
                        <span>
                            {
                                isWishlist ? 'Go to Wishlist' : 'Add to wishlist'
                            }
                        </span>
                    </button>
                    <button type="button" onClick={() => handleAddToCart(product)}>
                        <span className="material-symbols-outlined">
                            {
                                isAddedToCart ? 'remove_shopping_cart' : ''
                            }
                        </span>
                        <span>
                            {
                                isAddedToCart ? 'Remove from cart' : ''
                            }
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}