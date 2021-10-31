import { faShoppingBag, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import loader from '../../images/loader.gif';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/cart';
import { useAuth } from '../Login/useAuth';
import ReviewItem from '../ReviewItem/ReviewItem';


const Review = () => {
	const [ cart, setCart ] = useState([]);

	const [ loading, setLoading ] = useState(true);

	const auth = useAuth();

	const handlePlaceOrder = () => {
		// After proceed Checkout
		setCart([]);
		processOrder();
	};

	const handleRemoveProduct = (productKey) => {
		// console.log('remove clicked', productKey);
		const newCart = cart.filter((item) => item.key !== productKey); //expect select item , store others items
		setCart(newCart);
		removeFromDatabaseCart(productKey);
	};

	useEffect(() => {
		//cart
		const savedCart = getDatabaseCart();
		const productKeys = Object.keys(savedCart);

		fetch('https://stormy-plateau-95863.herokuapp.com/productsByKeys', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(productKeys)
		})
			.then((res) => res.json())
			.then((data) => {
				const cartProducts = productKeys.map((key) => {
					const product = data.find((productItem) => productItem.key === key);
					product.quantity = savedCart[key];
					return product;
				});
				// console.log(cartProducts);
				setCart(cartProducts);
				setLoading(false);
			});
	}, []);

	return (
		<div className="shop-container">
			<div className="product-container">
				{loading ? (
					<img src={loader} width="80%" alt="loader" />
				) : (
					cart.map((productElement) => (
						<ReviewItem
							key={productElement.key}
							product={productElement}
							handleRemoveProduct={handleRemoveProduct}
						/>
					))
				)}

				{!cart.length && (
					<h1>
						Yor cart is empty. <a href="/"> Keep shopping</a>
					</h1>
				)}
			</div>
			<div className="cart-container">
				<Cart cart={cart}>
					<Link to="/shipment">
						{auth.user ? (
							<button className="add-button">
								<FontAwesomeIcon icon={faShoppingBag} /> Proceed Checkout
							</button>
						) : (
							<button className="add-button">
								<FontAwesomeIcon icon={faSignInAlt} /> Login to Proceed
							</button>
						)}
					</Link>
				</Cart>
			</div>
		</div>
	);
};

export default Review;
