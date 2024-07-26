'use server'


import {CheckoutFormValues} from "@/app/shared/components/shared/checkout/schema/checkoutFormSchema";
import {prisma} from "../../prisma/prisma-client";

export async function createOrder(data: CheckoutFormValues) {
    console.log(data)

    await prisma.order.create({
        data: {
            fullName: data.firstName + ' ' + data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            comment: data.comment
        }
    })
}