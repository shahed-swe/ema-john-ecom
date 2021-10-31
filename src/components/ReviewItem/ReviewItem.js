import React from 'react';
import './ReviewItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ReviewItem = (props) => {
    const { name, quantity, key, price, img } = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className="review-item">
                <h4 className="product-name">{name}</h4>
                <p>Quantity: {quantity}</p>
                <p><small>${price}</small></p>
                <br />
                <button
                    className="add-button"
                    onClick={() => props.handleRemoveProduct(key)}
                >
                    <FontAwesomeIcon icon={faTrashAlt} /> Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;