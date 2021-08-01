import './Cart.css';
import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart)

    const total = cart.reduce((total, prd) => total + prd.price,0)

    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    if(total > 15){
        shipping= 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }

    const tax = total / 10;
    return (
        <div>
            <h3>This is cart</h3>
            <h5>Order Summery: {cart.length}</h5>
            <p>Product Price: {total.toFixed(2)}</p>
            <p>Shipping Cost: <small>{shipping.toFixed(2)}</small></p>
            <p><small>Tax: {tax.toFixed(2)}</small></p>
            <p>Total Price: {(total + shipping + tax).toFixed(2)}</p>
        </div>
    );
};

export default Cart;