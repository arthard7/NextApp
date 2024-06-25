'use client'
import {cn} from "@/lib/utils";
import {useState} from "react";


interface CategoriesProps {
    className? : string;

}

const CategoriesPizza = ['Пиццы','Комбо','Закуски','Коктейли','Кофе','Напитки','Десерты']
export const Categories = ({className}: CategoriesProps) => {


const [activeIndex, setActiveIndex] = useState(0)


    const toggleCategories = (index: number) => {

    setActiveIndex(index)

    }


    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>

            {CategoriesPizza.map((category, index) => (
               <a
                   onClick={() => toggleCategories(index)}
                   className={cn(
                   'flex items-center font-bold h-11 rounded-2xl px-5',
                   activeIndex === index && 'bg-white shadow-md shadow-gray-200 text-primary'
               )} key={index}>
                   <button>{category}</button>

               </a>
            ))}

        </div>
    );
};