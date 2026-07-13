export const cartReducer = (state, { type, payload }) => {
    switch (type) {
        case 'ADD_TO_CART': {
            const nextCart = [...state.cart, payload.product];
            return {
                ...state,
                cart: nextCart,
                totalcost: nextCart.reduce((total, product) => total + Number(product.price || 0), 0)
            };
        }
        case 'REMOVE_FROM_CART': {
            const nextCart = state.cart.filter((product) => product.id !== payload.product.id);
            return {
                ...state,
                cart: nextCart,
                totalcost: nextCart.reduce((total, product) => total + Number(product.price || 0), 0)
            };
        }
        default:
            return state;
    }
}