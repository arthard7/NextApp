'use client'
import {Dialog} from "@/components/ui";

import {cn} from "@/lib/utils";
import {DialogContent} from "@/components/ui/dialog";
import {useRouter} from "next/navigation";
import {ChooseProductForm} from "@/components/shared/modals/ChooseProductForm";
import {ProductWithRelations} from "../../../../@types/product";


interface chooseProductModalProps {
    product: ProductWithRelations
    className?: string;

}


export const ChooseProductModal = ({className, product}: chooseProductModalProps) => {

    const router = useRouter()
const isPizzaForm = Boolean(product.items[0].pizzaType)





    return (

        <Dialog open={Boolean(product)} onOpenChange={router.back} >
            <DialogContent
                className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px]  bg-white overflow-hidden ', className)}>

                {

                    isPizzaForm
                        ? 'PizzaForm'
                        : <ChooseProductForm imageUrl={product.imageUrl} name={product.name} ingredients={[]} />


                }            </DialogContent>
        </Dialog>



    );
};