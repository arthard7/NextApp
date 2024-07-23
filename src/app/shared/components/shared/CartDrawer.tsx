'use client'
import {
    Sheet, SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/app/shared/components/ui/sheet";
import Image from 'next/image'
import {Button} from "@/app/shared/components/ui";
import Link from "next/link";
import {ArrowLeft, ArrowRight} from "lucide-react";

import {Props} from "next/script";
import {CartDrawerItem} from "@/app/shared/components/shared/CartDrawerItem";
import {getCartItemDetails} from "../../../../../shared/lib/get-cart-item-details";
import {useCartStore} from "../../../../../shared/store/cart";
import React, {useEffect} from "react";
import {PizzaSize, PizzaType} from "../../../../../shared/constants/pizza";
import {Title} from "@/app/shared/components/shared/Title";
import {clsx} from "clsx";
import {cn} from "../../../../../shared/lib/utils";


interface CartDrawerProps {
    className?: string;
    children?: React.ReactNode

}


export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({children, className,}: CartDrawerProps) => {


    const [totalAmount, fetchCartItems, updateItemQuantity, removeCartItem, items] = useCartStore((state) => [
        state.totalAmount,
        state.fetchCartItems,
        state.updateItemQuantity,
        state.removeCartItem,
        state.items,
    ])

    useEffect(() => {
        fetchCartItems()
    }, [])


    const onClickRemoveButton = (id: number) => {

        removeCartItem(id)

    }


    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {

        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
        updateItemQuantity(id, newQuantity)

    }


    return (
        <Sheet>

            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className={'flex flex-col justify-between p-0 bg-[#F4F1EE] '}>
                <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>

                    {totalAmount > 0 && items.length === 0 && (
                        <SheetHeader className={'mt-6 ml-6'}>
                            <SheetTitle>

                                В корзине <span className='font-bold '>{items.length} товаров</span>

                            </SheetTitle>
                        </SheetHeader>
                    )}


                    {!items.length && (
                        <div className={'flex flex-col items-center justify-center w-72 mx-auto '}>
                            <Image src={'/assets/images/empty-box.png'} alt={'empty-cart'} width={200} height={200}/>
                            <Title size={'sm'} text={'Корзина пустая'} className={'text-center font-bold my-2'}/>
                            <p className={'text-center text-neutral-500 mb-5'}>
                                Добавьте хотя бы одну пиццу, чтобы совершить заказ
                            </p>

                            <SheetClose>
                                <Button className={'w-56 h-12 text-base'} size={'lg'}>
                                    <ArrowLeft className={'w-5 mr-2'}>
                                        Вернуться назад
                                    </ArrowLeft>
                                </Button>
                            </SheetClose>
                        </div>
                    )}


                    {totalAmount > 0 && items.length > 0 && (
                        <>
                            <div className={'overflow-auto flex-1 '}>

                                {
                                    items.map((item) => (
                                        <CartDrawerItem
                                            onClickRemoveButton={() => onClickRemoveButton(item.id)}
                                            onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                                            key={item.id}
                                            name={item.name}
                                            details={item.pizzaSize && item.pizzaType ? getCartItemDetails(item.pizzaType as PizzaType, item.pizzaSize as PizzaSize, item.ingredients) : ''}
                                            price={item.price}
                                            imageUrl={item.imageUrl}
                                            id={item.id}
                                            quantity={item.quantity}
                                            disabled={item.disabled}

                                        />

                                    ))
                                }
                            </div>


                            <SheetFooter className={' bg-white p-6 '}>
                                <div className={'w-full '}>
                                    <div className={'flex mb-4 '}>
                                <span className='flex flex-1 text-lg text-neutral-500 '> Итого
                                <div
                                    className={'flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'}></div>
                                </span>

                                        <span className={'font-bold text-lg'}>{totalAmount} ₽</span>
                                    </div>

                                    <Link href={'/cart'}>
                                        <Button
                                            // onClick={() => setRedirecting(true)}
                                            // loading={loading || redirecting}
                                            type={'submit'}
                                            className={'w-full h-12 text-base'}>
                                            Оформить заказ
                                            <ArrowRight className={'w-5 ml-2'}/>
                                        </Button>
                                    </Link>


                                </div>
                            </SheetFooter>

                        </>
                    )}
                </div>
            </SheetContent>


        </Sheet>
    )

};


//
// <Sheet >
//
//     <SheetTrigger asChild>{children}</SheetTrigger>
//     <SheetContent className={'flex flex-col justify-between p-0 bg-[#F4F1EE] '}>
//
//         <SheetHeader className={'mt-6 ml-6'}>
//             <SheetTitle>
//
//                 В корзине <span className='font-bold '> 3 товара</span>
//
//             </SheetTitle>
//         </SheetHeader>
//
//
//
//         <SheetFooter className={' bg-white p-6 '}>
//             <div className={'w-full '}>
//                 <div className={'flex mb-4 '}>
//                                 <span className='flex flex-1 text-lg text-neutral-500 '> Итого
//                                 <div
//                                     className={'flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'}></div>
//                                 </span>
//
//                     <span className={'font-bold text-lg'}>500 ₽</span>
//                 </div>
//
//                 <Link href={'/cart'}>
//                     <Button
//                         // onClick={() => setRedirecting(true)}
//                         // loading={loading || redirecting}
//                         type={'submit'}
//                         className={'w-full h-12 text-base'}>
//                         Оформить заказ
//                         <ArrowRight className={'w-5 ml-2'}/>
//                     </Button>
//                 </Link>
//
//
//             </div>
//         </SheetFooter>
//
//
//     </SheetContent>
//
// </Sheet>
