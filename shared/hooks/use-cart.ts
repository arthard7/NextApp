import React from 'react';

import { CartStateItem } from '../lib/get-cart-details';
import {CartState, useCartStore} from "../store/cart";
import {CreateCartItemValues} from "../services/dto/cart.dto";
console.log('chane 3')
type ReturnProps = {
    totalAmount: number;
    items: CartStateItem[];
    loading: boolean;
    updateItemQuantity: (id: number, quantity: number) => void;
    removeCartItem: (id: number) => void;
    addCartItem: (values: CreateCartItemValues) => void;
};
console.log('com')

export const useCart = (): ReturnProps => {

    const cartState = useCartStore((state) => state);


    React.useEffect(() => {
        cartState.fetchCartItems();
    }, []);

    return cartState;
};
