import {useState} from 'react';
import fakeData from  './../fakeData';
import './../App.css';
import Product from './Product/Product';
import Cart from './Cart/Cart';


const Shop = () => {
    const first_ten = fakeData.slice(0, 10);
    const [product, setProduct] = useState(first_ten);
    const [cart, setCart] = useState([]);
    // console.log(product)

    const handleProduct = (product) => {
        console.log(product)
        const newCart = [...cart, product];
        setCart(newCart);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                <div className="prod-list">
                    {product.map(item => {
                        return <Product handleProduct={handleProduct} product={item}/>
                    })}
                </div>
                
            </div>
            <div className="cart-container">
                <Cart cart={cart}/>
            </div>
        </div>
    );
};

export default Shop;