export function findProductInCart(cart, product) {
    return product && cart?.find((cartProduct) => product.id === cartProduct.id);
}