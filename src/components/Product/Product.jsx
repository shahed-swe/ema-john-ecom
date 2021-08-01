import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    // console.log(props.product)
    const {name, img, seller, stock, price} = props.product
    return (
        
        <div className="products">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4><br/>
                <p>by:{seller}</p>
                <p>Stock: {stock}</p>
                <p>Price: {price}$</p>
                <button className="cart-button" onClick={() => props.handleProduct(props.product)}>
                    <FontAwesomeIcon icon={faCartPlus} /> 
                    add to cart
                </button>
            </div>
            
        </div>
    );
};

export default Product;