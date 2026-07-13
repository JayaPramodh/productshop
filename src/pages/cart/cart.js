import productshopsvg from '../../assets/ProductShop.svg';

const RAZORPAY_SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';

const loadRazorpayScript = () => new Promise((resolve, reject) => {
    if (window.Razorpay) {
        resolve();
        return;
    }

    const existingScript = document.getElementById('razorpay-script');
    if (existingScript) {
        existingScript.addEventListener('load', resolve, { once: true });
        existingScript.addEventListener('error', () => reject(new Error('Failed to load Razorpay script')), { once: true });
        return;
    }

    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = RAZORPAY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay script'));
    document.body.appendChild(script);
});

export const openRazorpayCheckout = async ({ amount, email, onSuccess }) => {
    await loadRazorpayScript();

    const options = {
        key: 'rzp_test_TCzeDgih1qh2L8',
        amount: Math.round(amount * 100),
        currency: 'INR',
        name: 'ProductShop',
        description: 'Test Transaction',
        image: productshopsvg,
        handler: function (response) {
            if (typeof onSuccess === 'function') {
                onSuccess(response);
            }
        },
        prefill: {
            email: email || ''
        },
        notes: {
            address: email || ''
        },
        theme: {
            color: '#3399cc'
        }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
};