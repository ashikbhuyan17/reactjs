import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    // local storage takhe data gulu nibo
    const [cart, setCart] = useState([])
    const removeProduct = (productKey) => {
        console.log('remove', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }
    useEffect(() => {
        const savedCart = getDatabaseCart()
        console.log("savedCart", savedCart);
        // for get keys
        const productKey = Object.keys(savedCart)
        console.log("productKey", productKey);

        // for get quantity
        const cartProducts = productKey.map(key => {
            // savedCart[key]
            // key er madhome fakeData takhe all data niye asbo
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = savedCart[key]
            return product

        })
        console.log("quantity", cartProducts);
        setCart(cartProducts)
        // or for get values
        // const productKey = Object.values(savedCart)
    }, [])
    return (
        <div className="twin-container">

            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem key={pd.key} removeProduct={removeProduct} product={pd}></ReviewItem>)
                }

            </div>
            <div className="cart-container">
                <h4>this is cart</h4>
            </div>
        </div>
    );
};

export default Review;