'use client'
import {Dialog} from "../ui";

import {cn} from "../../../../../shared/lib/utils";
import {DialogContent} from "@/app/shared/components/ui/dialog";
import {useRouter} from "next/navigation";
import {ChooseProductForm} from "@/app/shared/components/shared/ChooseProductForm";
import {ProductWithRelations} from "../../../../../@types/product";
import {ChoosePizzaForm} from "@/app/shared/components/shared/choose-pizza-form";


interface chooseProductModalProps {
    product: ProductWithRelations
    className?: string;

}


export const ChooseProductModal = ({className, product}: chooseProductModalProps) => {

    const router = useRouter()
    const isPizzaForm = Boolean(product.items[0].pizzaType)


    return (

        <Dialog open={Boolean(product)} onOpenChange={router.back}>
            <DialogContent
                className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[600px]  bg-white overflow-hidden flex items-center ', className)}>

                {

                    isPizzaForm
                        ? <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name}
                                           ingredients={product.ingredients}
                                           items={product.items}
                        />
                        : <ChooseProductForm
                            imageUrl={product.imageUrl}
                            name={product.name}
                        />


                }            </DialogContent>
        </Dialog>


    );
};