'use client'
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/app/shared/components/ui/sheet";
import {Button} from "@/app/shared/components/ui";
import Link from "next/link";
import {ArrowRight} from "lucide-react";

import {Props} from "next/script";
import {CartDrawerItem} from "@/app/shared/components/shared/CartDrawerItem";
import {getCartItemDetails} from "../../../../../shared/lib/get-cart-item-details";
import {useCartStore} from "../../../../../shared/store/cart";
import React, {useEffect} from "react";
import {PizzaSize, PizzaType} from "../../../../../shared/constants/pizza";
import {state} from "sucrase/dist/types/parser/traverser/base";
import {removeCartItem} from "../../../../../shared/services/cart";


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

                <SheetHeader className={'mt-6 ml-6'}>
                    <SheetTitle>

                        В корзине <span className='font-bold '>{items.length} товаров</span>

                    </SheetTitle>
                </SheetHeader>

                {/*<div className={' overflow-auto flex-1  '}>*/}
                {/*    <CartDrawerItem*/}
                {/*        className={'mb-2'}*/}
                {/*        name={'сырная'}*/}
                {/*        details={getCartItemDetails(2, 30, [{name: 'Сыр'}, {name: 'Помидоры'}])}*/}
                {/*        price={320}*/}
                {/*        imageUrl={'https://media.dodostatic.net/image/r:233x233/11EE7D610D2925109AB2E1C92CC5383C.avif'}*/}
                {/*        id={1} quantity={1}/>*/}
                {/*</div>*/}


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

                            <span className={'font-bold text-lg'}>{totalAmount}</span>
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
