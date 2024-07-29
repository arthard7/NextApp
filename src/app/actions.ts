'use server'


import {CheckoutFormValues} from "@/app/shared/components/shared/checkout/schema/checkoutFormSchema";
import {prisma} from "../../prisma/prisma-client";
import {cookies} from "next/headers";
import {$Enums} from ".prisma/client";
import OrderStatus = $Enums.OrderStatus;
import {createPayment, sendEmail} from "../../shared/lib";
import {PayOrderTemplate} from "@/app/shared/components/shared";

export async function createOrder(data: CheckoutFormValues) {

    try {

        const cookieStore = cookies()

        const cartToken = cookieStore.get('cartToken')?.value

        if (!cartToken) {
            throw new Error('Cart token not found')
        }
        /*
        * Находим корзину по токену
        * */
        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            },
            where: {
                token: cartToken,
            }
        })

        /*
        * Если корзина пустая, то возвращаем ошибку
        * */

        if (!userCart) {

            throw new Error('Cart not found')

        }

        if (userCart?.totalAmount === 0) {

            throw new Error('Cart is empty')

        }

        /*
               * Создаём заказ
               * */

        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items)
            }
        })

        /*
        * Очищаем totalAmount корзины
        *
        * */


        await prisma.cart.update({
            where: {
                id: userCart.id
            },
            data: {

                totalAmount: 0
            }
        })
        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id
            }
        })


        const paymentData = await createPayment({
            amount: order.totalAmount,
            description: `Next pizza / оплатите заказ # ${order.id}`,
            orderId: order.id
        })

        if (!paymentData) {
            throw new Error('Payment data not found')
        }


        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {

                paymentId: paymentData.id


            },
        })

        const paymentUrl = paymentData.confirmation.confirmation_url


        await sendEmail(data.email, `Next pizza / оплатите заказ # + ${order.id}`, PayOrderTemplate({
            orderId: order.id,
            totalAmount: order.totalAmount,
            paymentUrl
        }))


        return paymentUrl

    } catch (e) {

        console.error('[CreateOrder] Server error', e)

    }


}

