import React from 'react';

const Cart = (props) => {
    const cart = props.cart;

    const totalPrice = cart.reduce((totalPrice, product) => totalPrice + product.price * (product.quantity || 1), 0);

    let shipping = 0;
    if (totalPrice > 35) {
        shipping = 0;
    }
    else if (totalPrice > 15) {
        shipping = 4.99;
    }
    else if (totalPrice > 0) {
        shipping = 12.99;
    }

    const formatNumber = number => {
        const precision = number.toFixed(2);
        return Number(precision);
    }

    const tax = formatNumber(totalPrice / 10);
    const grandTotal = (totalPrice + shipping + tax)

    return (
        <div>
            <h3>Order Summery </h3>
            <h5>Items ordered: {cart.length}</h5>
            <p>Product Price {formatNumber(totalPrice)}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax + VAT: {tax}</small></p>
            <p>Total Price: {formatNumber(grandTotal)}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;