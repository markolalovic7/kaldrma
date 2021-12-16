import React, { createContext, useEffect } from 'react';

export const CartContext = createContext<any | null>(null);

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');

export const CartProvider = (props: any) => {
    //
    const [cart, setCart] = React.useState(cartFromLocalStorage);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            <div>{props.children}</div>
        </CartContext.Provider>
    );
};
