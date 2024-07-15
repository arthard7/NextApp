import {create} from "zustand";
import {Api} from "../services/api-client";
import {CartStateItem, getCartDetails} from "../lib/get-cart-details";
import {removeCartItem} from "../services/cart";



export interface CartState {
    loading: boolean
    totalAmount: number
    items: CartStateItem[],
    error: boolean,

    /* получение товаров в корзине*/
    fetchCartItems: () => Promise<void>,

    /* запрос на обновление количества товара*/
    updateItemQuantity: (id: number, quantity: number) => Promise<void>,

    /* запрос на добавление количества товара*/
    addCartItem: (values: any) => Promise<void>,

    /* Запрос на удаление товара из корзины */
    removeCartItem: (id: number) => Promise<void>,

    /* очистка корзины */
    clearCart: () => Promise<void>,
}


export const useCartStore = create<CartState>((set) => ({
    items: [],
    loading: false,
    totalAmount: 0,
    error: false,


    fetchCartItems: async () => {

        try {
            set({loading: true, error: false})
            const data = await Api.cart.fetchCart()
            console.log(data, 'data fetchCartItems')
            set(getCartDetails(data))
        } catch (e) {

            console.error(e)
            set({error: true})

        } finally {
            set({loading: false})
        }

    },


    updateItemQuantity: async (id: number, quantity: number) => {


        try {
            set({loading: true, error: false})
            const data = await Api.cart.updateItemQuantity(id, quantity)
            console.log(data, 'data fetchCartItems')
            set(getCartDetails(data))
        } catch (e) {

            console.error(e)
            set({error: true})

        } finally {
            set({loading: false})
        }


    },

    addCartItem: async () => {




    },
    removeCartItem: async (id: number) => {


        try {
            set({loading: true, error: false})
            const data = await Api.cart.removeCartItem(id)
            console.log(data, 'data fetchCartItems')
            set(getCartDetails(data))
        } catch (e) {

            console.error(e)
            set({error: true})

        } finally {
            set({loading: false})
        }



    },
    clearCart: async () => {
    },
}))


















