'use client'
import {FilterCheckboxProps, FilterCheckbox} from "@/components/shared/FilterCheckbox";
import {Input} from "@/components/ui";
import React, {ChangeEvent, useState} from "react";


type Item = FilterCheckboxProps

type DefaultValue = {
    text: string,
    value: string
}

interface CheckboxFiltersProps {
    title: string
    items: Item[];
    defaultItems: Item[];
    limit?: number;
    searchInputPlaceholder?: string
    onChange?: (values: string[]) => void
    defaultValue?: DefaultValue[]
    className?: string;

}


export const CheckboxFiltersGroup = ({
                                         title,
                                         className,
                                         defaultItems,
                                         items,
                                         defaultValue,
                                         searchInputPlaceholder = 'Поиск...',
                                         limit = 5,
                                         onChange
                                     }: CheckboxFiltersProps) => {

    const [showAll, setShowAll] = useState<boolean | null>(false)
    const [search, setSearch] = useState<string>('')

    const list = showAll ? items : defaultItems.slice(0, limit)


    const changeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const toggleShowAll = () => {
        setShowAll(prev => !prev)
    }

    return (
        <div className={className}>
            <p className='font-bold mb-3'>{title}</p>


            {showAll && (
                <div className='mb-5'>
                    <Input value={search} onChange={changeSearchInput}  placeholder={searchInputPlaceholder} className='bg-gray-50 border-none'/>
                </div>
            )}


            <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>

                {
                    list.flatMap((item) => (
                        item.text.toLowerCase().includes(search.toLowerCase()) ? (
                            <FilterCheckbox
                                text={item.text}
                                value={item.value}
                                key={String(item.value)}
                                onCheckedChange={(ids) => console.log(ids)}
                                checked={false}
                                endAdornment={item.endAdornment}
                            />
                        ) : []
                    ))
                }




            </div>


            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-200 mt-4  ' : ''}>

                    <button onClick={toggleShowAll} className={'text-primary mt-3'}>
                        {showAll ? 'Скрыть' : 'Показать всё'}
                    </button>

                </div>
            )}


        </div>
    );
};