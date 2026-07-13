export const findIsWishlist = (wishlist, product) => {
    return Boolean(product && wishlist?.some((wlp) => wlp.id === product.id));
}