'use client'
import {Title} from "@/components/shared/Title";
import {cn} from "@/lib/utils";
import {useIntersectionObserver} from "@reactuses/core";
import {ProductCard} from "@/components/shared/ProductCard";
import {useEffect, useRef, useState} from "react";
import {useCategoryStore} from "../../../store/category";

interface ProductsGroupListProps {
    title: string;
    items: any[];
    categoryId: number
    className?: string;
    listClassName?: string
}


export const ProductsGroupList = ({listClassName, className, categoryId, items, title}: ProductsGroupListProps) => {



    const seActiveCategoryId = useCategoryStore((state) => state.setActiveId)


    const intersectionRef = useRef(null)


    const [entry, setEntry] = useState<IntersectionObserverEntry[]>([]);



    const stop = useIntersectionObserver(
        intersectionRef,
        (entry) => {
            setEntry(entry);
        }, {threshold: 0.4}
    );



useEffect(() => {


    if(entry[0]?.isIntersecting){
        seActiveCategoryId(categoryId)
    }




}, [categoryId, entry[0]], )

    console.log()


    // useEffect(() => {
    //
    //     if (entry[0]) {
    //         console.log(entry)
    //     }
    //
    // }, [categoryId, intersectionRef.current])



    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size={"lg"} className={'font-extrabold mb-5'}/>

            <div className={cn('grid grid-cols-3 gap-[50px]')}>
                {items.map((item, i) => (

                    <ProductCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        imageUrl={item.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
};