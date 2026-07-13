import { Navbar } from "../../components/navbar"
import { ProductCard } from "../../components/productcard"
import { useEffect, useState } from "react"
import { getAllProducts } from "../../api/getAllProducts"
import { getAllCategories } from "../../api/getAllCategories"
import './home.css'

export const Home = () => {

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);

    useEffect(() => {
        (async () => {
            const products = await getAllProducts();
            const categories = await getAllCategories();
            setProducts(products);
            setDisplayedProducts(products);
            setCategories(categories);
        })();
    }, []);

    function handleCategoryClick(catId) {
        setCategory(catId);
        if (catId === 'all') {
            setDisplayedProducts(products);
        } else {
            setDisplayedProducts(products.filter(p => String(p.category?.id) === String(catId)));
        }
    }

    // const displayedProducts = category === 'all'
    //     ? products
    //     : products.filter((p) => String(p.category?.id) === String(category));

    function handleHTLFilter() {
        setDisplayedProducts(prev => [...prev].sort((a, b) => b.price - a.price));
    }

    function handleLTHFilter() {
        setDisplayedProducts(prev => [...prev].sort((a, b) => a.price - b.price));
    }

    function handleClearFilter() {
        setCategory('all');
        setDisplayedProducts(products);
    }

    return (
        <div className="dark-purple">
            <Navbar />
            <main className="d-flex-row flex-wrap flex-sp-even home">
                <div className="category-items d-flex-col">
                    <h2>Categories</h2>
                    <button key={0} className="categories" onClick={() => handleCategoryClick('all')}>All</button>
                    {
                        categories?.length > 0 && categories.map((cat) => (
                            <button key={cat.id} className="categories" onClick={() => handleCategoryClick(cat.id)}>{cat.name}</button>
                        ))
                    }
                </div>
                <div className="d-flex-row flex-wrap flex-sp-even product-items">
                    <div className="filter d-flex-row flex-sp-even">
                        <span><b>Filters</b></span>
                        <button onClick={() => handleHTLFilter()}>Price High to Low</button>
                        <button onClick={() => handleLTHFilter()}>Price Low to Hign</button>
                        <button onClick={() => handleClearFilter()}>Clear filter</button>
                    </div>
                    {
                        displayedProducts?.length > 0 && displayedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    }
                </div>
            </main>
        </div>
    )
}