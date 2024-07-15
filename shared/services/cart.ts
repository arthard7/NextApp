import {axiosInstance} from "./axios";
import {CartDTO} from "../dto/cart.dto";
import {prisma} from "../../prisma/prisma-client";

export const fetchCart = async (): Promise<CartDTO>  => {

    return (await axiosInstance.get<CartDTO>('/cart')).data

}
export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
    const {data} = await axiosInstance.patch<CartDTO>('/cart/' + itemId, {quantity})
    return data
}



export const removeCartItem = async (itemId: number): Promise<CartDTO> => {
    const {data} = await axiosInstance.delete<CartDTO>('/cart/' + itemId, )
    return  data
}


