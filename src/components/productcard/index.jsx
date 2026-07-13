import './prodcard.css';
import { useCart } from '../../context/card-context';
import { findProductInCart } from '../../utils/findProductInCart';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/wishlist-context';
import { findIsWishlist } from '../../utils/findIsWishlist';

export const ProductCard = ({ product }) => {

    const navigate = useNavigate();

    const imageUrl = product?.images?.[0] || 'https://via.placeholder.com/300x200?text=Product';
    const title = product?.title || 'Product';
    const description = product?.description || 'No description available.';
    const price = product?.price ?? 0;

    const { cart, cartDispatch } = useCart();
    const { wishlist, wishlistDispatch } = useWishlist();

    const isAddedToCart = findProductInCart(cart, product);
    const isWishlist = findIsWishlist(wishlist, product);

    function handleAddToCart(product) {
        isAddedToCart ?
            navigate('/cart') :
            cartDispatch({ type: 'ADD_TO_CART', payload: { product } });
    }

    function handleAddToWishlist(product) {
        isWishlist ?
        navigate('/wishlist') :
        wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: { product } });
    }

    console.log(cart);

    return (
        <div className='prod-card'>
            <div className='img-container'>
                <img src={imageUrl} alt={title} className='image-contain' />
            </div>
            <div className='card-content'>
                <h3 className='card-title'>{title}</h3>
                <p className='card-description'>{description}</p>
                <div className='card-price'>₹{price}</div>
                <div className='card-actions'>
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
                                isAddedToCart ? 'shopping_cart_checkout' : 'shopping_cart'
                            }
                        </span>
                        <span>
                            {
                                isAddedToCart ? 'Go to cart' : 'Add to cart'
                            }
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};