import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import load from '../../images/load.gif';
import Product from '../Product/Product';

const ProductDetail = () => {
	const { productKey } = useParams();
	const [ product, setProduct ] = useState([]);

	useEffect(
		() => {
			fetch('https://stormy-plateau-95863.herokuapp.com/product/' + productKey)
				.then((res) => res.json())
				.then((data) => {
					setProduct(data);
				});
		},
		[ productKey ]
	);

	// const product = fakeData.find(item => item.key === productKey);
	return (
		<div>
			{product.length === 0 ? (
				<img src={load} width="60%" alt="load" />
			) : (
                <>
				<div style={{ width: '70%', float: 'left' }}>
					<h1>Product details of: {productKey}</h1>
					<Product showAddToCart={false} product={product} />
                    </div>
					<div style={{ paddingTop: '150px'}}>
						{product.features.map((feature) => (
							<p key={Math.random()}>
								{feature.description} : {feature.value}
							</p>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default ProductDetail;
