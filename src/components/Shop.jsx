import {useState} from 'react';
import fakeData from  './../fakeData';

const Shop = () => {
    const first_ten = fakeData.slice(0, 10);
    const [product, setProduct] = useState(first_ten);
    // console.log(product)
    return (
        <div>
            {product.map((item, index) => {
                return (
                    <div key={index}>
                        <h2>{item.name}</h2>
                        <h3>{item.price}</h3>
                    </div>
                )
            }
            )}
        </div>
    );
};

export default Shop;