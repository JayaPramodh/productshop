import { Navbar } from "../../components/navbar";
import { useWishlist } from "../../context/wishlist-context";
import { WishlistCard } from "../../components/wishlistcard";

export const Wishlist = () => {

    const { wishlist } = useWishlist();

    return (
        <div>
            <Navbar />
            <main>
                <h3>Wishlist</h3>
                <div className="d-flex-row flex-wrap gap-4 flex-sp-even overflow-feat">
                {wishlist.length > 0 ?
                    wishlist.map((wish) => <WishlistCard key={wish.id} wish={wish} />) :
                    <p>No products in wishlist</p>
                }
                </div>
            </main>
        </div>
    )
}