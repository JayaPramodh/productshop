import { useNavigate } from "react-router-dom";
import { CartCard } from "../../components/cart";
import { CartSummary } from "../../components/cartsummary";
import { Navbar } from "../../components/navbar";
import { useCart } from "../../context/card-context";
import { useAuth } from "../../context/login-context";
import { openRazorpayCheckout } from './cart';
import './cart.css';

export const Cart = () => {

    const { cart, totalcost } = useCart();
    const { token, email } = useAuth();

    const navigate = useNavigate();

    const handlePay = async () => {
        if (!token) {
            navigate('/login');
            return;
        }

        if (cart.length === 0) {
            return;
        }

        try {
            await openRazorpayCheckout({
                amount: totalcost,
                email,
                onSuccess: (response) => {
                    alert(`Payment successful: ${response.razorpay_payment_id}`);
                }
            });
        } catch (error) {
            console.error(error);
            alert('Unable to initialize payment right now.');
        }
    };



    return (
        <div>
            <Navbar />
            <h3>My CART</h3>
            <div className="d-flex-row">
                <div className="d-flex-row flex-sp-even flex-wrap cart-list overflow-feat">
                    {
                        cart.length > 0 ?
                            cart.map((product) => <CartCard key={product.id} product={product} />) :
                            <p>Cart is empty</p>
                    }
                </div>
                <div className="cart-summary overflow-feat">
                    <h3>Cart Summary</h3>
                    <div>
                        {
                            cart.length > 0 ?
                                cart.map((product) => <CartSummary key={product.id} product={product} />) :
                                'No items to display'
                        }
                    </div>
                    <div className="d-flex-row flex-sp-btw bold">
                        <span style={{ flex: "7" }}>Total</span><span style={{ flex: "1" }}>|</span> <span style={{ flex: "2" }}>₹{totalcost}</span>
                    </div>
                    <div style={{textAlign: "center"}}>
                        {
                            token ? 
                            <button id="rzp-button1" onClick={handlePay}>Pay</button> :
                            <button onClick={() => navigate('/login')}>Login to continue</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}