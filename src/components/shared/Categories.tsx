'use client'
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";
import {useCategoryStore} from "../../../store/category";
import {random} from "nanoid";


interface CategoriesProps {
    className?: string;

}

const CategoriesPizza = [
    {id: 1, name: 'Пиццы'},
    {id: 2, name: 'Завтрак'},
    {id: 3, name: 'Закуски'},
    {id: 4, name: 'Коктейли'},
    {id: 5, name: 'Кофе'},
    {id: 6, name: 'Напитки'},
    {id: 7, name: 'Десерты'}
]










export const Categories = ({className}: CategoriesProps) => {


    const [number, setNumber] = useState(0)
    const [scroll, setScroll] = useState(0)
    const randomInteger = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min) + min)
    }

    const randomNumber = () => {
        return Promise.resolve(randomInteger(9000, 11000))
    }
    

    const categoryActiveId = useCategoryStore((state) => state.activeId)

    const [activeIndex, setActiveIndex] = useState(0)


    const toggleCategories = (index: number) => {

        setActiveIndex(index)


    }


    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>

            {CategoriesPizza.map(({name, id}, index) => (
                <a
                    className={cn(
                        'flex items-center font-bold h-11 rounded-2xl px-5',
                        categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
                    )} key={index}
                    href={`/#${name}`}>
                    <button>{name}</button>

                </a>
            ))}

        </div>
    );
};