import { faSearchDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import loading from '../../images/loading.gif';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/cart';
import Product from '../Product/Product';
import './Shop.css';
const _ = require("lodash");  

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');

    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(_.shuffle(data)))
    // }, [])

    useEffect(() => {
        fetch('https://stormy-plateau-95863.herokuapp.com/products?search='+search)
            .then(res => res.json())
            .then(data => setProducts(_.shuffle(data)))
    }, [search])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        console.log(savedCart);
        const productKeys = Object.keys(savedCart);

        fetch('https://stormy-plateau-95863.herokuapp.com/productsByKeys', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then( res => res.json())
        .then( data => {
            setCart(data)
        })

        // if (products.length > 0) {
        //     const previousCart = productKeys.map(existingKey => {
        //         const product = products.find(productItem => productItem.key === existingKey);
        //         // console.log(existingKey, savedCart[existingKey]);
        //         product.quantity = savedCart[existingKey];
        //         return product;
        //     })
        //     setCart(previousCart);
        // }
    }, [ ])

    const handleSearch = event => {
        setSearch(event.target.value);
    }

    const handleAddProduct = (product) => {
        // console.log(newCart);
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(productItem => productItem.key === toBeAddedKey);
        let count = 1;
        let newCart;

        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(productItem => productItem.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }

        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }


    return (
        <div className='shop-container'>
            <div className='product-container'>
                <input type="text" onBlur={handleSearch} className="product-search" placeholder="Search Product" />
                {
                    products.slice(0, 30).map(productItem => <Product
                        key={productItem.key}
                        handleAddProduct={handleAddProduct}
                        showAddToCart={true}
                        product={productItem}>
                    </Product>)
                }
                {
                   products.length === 0 && <img src={loading} alt="loading" style={{marginLeft: '100px'}}></img> 
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review"><button className="add-button">
                        <FontAwesomeIcon icon={faSearchDollar} /> Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;