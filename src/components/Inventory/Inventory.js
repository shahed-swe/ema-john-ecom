import React from 'react';

const Inventory = () => {

    const handleAddProduct = () => {
        const product = {};
        fetch('http://localhost:5000/addProduct', {
            method: 'POST',
            headers: {'content-type': 'application/json', 
        },
        body: JSON.stringify(product)
        })
    }

    return(
        <div>
        <h1>This is Inventory Page</h1>

        <form action="">
            <p><span> Name: </span><input type="text"></input></p>
            <p><span> Price: </span><input type="text"></input></p>
            <p><span> Quantity: </span><input type="text"></input></p>
            <p><span> Product Image: </span><input type="file"></input></p>
        <button onClick={handleAddProduct}>Add Product</button>
        </form>
       
        </div>
    )
}

export default Inventory;