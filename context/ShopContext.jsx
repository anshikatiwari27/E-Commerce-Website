import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setcartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:5000/allproducts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then(data => setAll_Product(data))
            .catch(error => console.error('Fetch error:', error));
            if(localStorage.getItem('auth-token')){
                fetch('http://localhost:5000/getcart',{
                    method:'POST',
                    headers:{
                        Accept:'application/form-data',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-type':'application/json',

                     },
                     body:"",
                }).then((response)=>response.json())
                .then((data)=>setcartItems(data));
            }
    }, []);

    const addToCart = (itemId) => {
        setcartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:5000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId })
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Add to cart error:', error));
        }
    }

    const removeFromCart = (itemId) => {
        setcartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:5000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId })
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Add to cart error:', error));

        }
    }

    const gettotalcartamt = () => {
        let totalamt = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find(product => product.id === Number(item))
                totalamt += itemInfo.new_price * cartItems[item];
            }
        }
        return totalamt;
    }

    const gettotalcartitems = () => {
        let totalitem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalitem += cartItems[item];
            }
        }
        return totalitem;
    }

    const contextValue = { gettotalcartitems, gettotalcartamt, all_product, cartItems, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
