import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './product.css';

const Product = (props) => {
	// console.log(props.product);
	const { name, img, seller, price, stock, key, category, star, starCount } = props.product;
	return (
		<div className="product">
			<div>
				<img src={img} alt="product-img" />
			</div>
			<div className="product-list">
				<h4 className="product-name">
					<Link to={'/product/' + key}>{name}</Link>
				</h4>
                
				<p>
					{star} <FontAwesomeIcon icon={faStar} style={{ color: 'orange' }} /> based on {starCount} reviews.
				</p>
				<p>
					<small>category: {category} </small>
				</p>
				<p>
					<small>by: {seller} </small>
				</p>
				<p>${price}</p>
				<p>
					<small>Only {stock} left in stock - Order soon</small>
				</p>
				{props.showAddToCart === true && (
					<button className="add-button" onClick={() => props.handleAddProduct(props.product)}>
						<FontAwesomeIcon icon={faShoppingCart} /> Add to cart
					</button>
				)}
			</div>
		</div>
	);
};

export default Product;
