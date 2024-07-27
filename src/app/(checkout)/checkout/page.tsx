'use client'
import React from "react";
import {FormProvider, SubmitHandler, useForm,} from "react-hook-form"
import {Container, Title} from "@/app/shared/components/shared";
import {useCart} from "../../../../shared/hooks";
import {CheckoutSidebar} from "@/app/shared/components/shared/checkoutSidebar";
import {zodResolver} from "@hookform/resolvers/zod";
import {CheckoutAddressForm, CheckoutCart, CheckoutPersonalInfo} from "@/app/shared/components/shared/checkout";
import {
    checkoutFormSchema,
    CheckoutFormValues
} from "@/app/shared/components/shared/checkout/schema/checkoutFormSchema";
import {cn} from "../../../../shared/lib/utils";
import {createOrder} from "@/app/actions";
import toast from "react-hot-toast";


export default function CheckoutPage() {
    const [submitting, setSubmitting] = React.useState(false)
    const {removeCartItem, updateItemQuantity, items, totalAmount, loading} = useCart()

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',
        }
    })


    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {

        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1

        updateItemQuantity(id, newQuantity)

    }

    const onSubmit = async (data: CheckoutFormValues) => {

        try {
            setSubmitting(true)

            const url = await createOrder(data)

            toast.success('Заказ успешно оформлен! Переходим на оплату...', {
                icon: '✅',
            })


            if (url) {
                window.location.href = url
            }


        } catch (e) {
            toast.error('Произошла ошибка при оформлении заказа', {
                icon: '🚨',
            })
            console.error(e)
            setSubmitting(false)


        } finally {

            setSubmitting(false)

        }
    }

    return (
        <Container className={'mt-10'}>
            <Title text={'Оформление заказа'} className={'font-extrabold mb-8 text-[36px]'}/>
            <FormProvider {...form} >

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className={'flex gap-10'}>
                        <div className={'flex flex-col gap-10 flex-1 mb-20'}>


                            <CheckoutCart
                                items={items}
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                loading={loading}
                            />

                            <CheckoutPersonalInfo className={loading ? 'opacity-40 pointer-events-none' : ''}/>

                            <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''}/>


                        </div>

                        <div className={'w-[450px]'}>

                            <CheckoutSidebar loading={loading || submitting} totalAmount={totalAmount}/>

                        </div>

                    </div>
                </form>

            </FormProvider>
        </Container>
    );
};