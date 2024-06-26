'use client'
import {CheckboxFiltersGroup, RangeSlider, Title} from "./index";
import {FilterCheckbox} from './index'
import {Input} from "@/components/ui";

interface FiltersProps {
    className?: string;

}


const defaultItems = [
    {
        text: 'Сырный соус',
        value: '1',
    },
    {
        text: 'Моцарелла',
        value: '2',
    },
    {
        text: 'Чеснок',
        value: '3',
    },
    {
        text: 'Солёный огурчики',
        value: '4',
    },
    {
        text: 'Красный лук',
        value: '5',
    },
    {
        text: 'Томаты',
        value: '6',
    },
]



const items = [
    {
        text: 'Сырный соус',
        value: '1',
    },
    {
        text: 'Моцарелла',
        value: '2',
    },
    {
        text: 'Чеснок',
        value: '3',
    },
    {
        text: 'Солёный огурчики',
        value: '4',
    },
    {
        text: 'Красный лук',
        value: '5',
    },
    {
        text: 'Томаты',
        value: '6',
    },
    {
        text: 'Солёный огурчики',
        value: '7',
    },
    {
        text: 'Красный лук',
        value: '8',
    },
    {
        text: 'Томаты',
        value: '9',
    },

]
export const Filters = ({className}: FiltersProps) => {

    return (
        <div className={className}>
            <Title text='Фильтрация' size={'sm'} className='mb-5 font-bold'/>
            <div className='flex flex-col gap-4'>
                <FilterCheckbox text='Можно собирать' value='1'/>
                <FilterCheckbox text='Новинки' value='2'/>
            </div>

            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
                <p className='font-bold mb-3'> Цена от и до:</p>

                <div className='flex gap-3 mb-5'>
                    <Input step={100} type="number" min={0} max={30000} placeholder='0' defaultValue={0}/>
                    <Input step={100} type="number" min={100} max={5000} placeholder='30000'/>
                </div>


                <RangeSlider min={0} max={5000} step={10} value={[0, 5000]}/>

            </div>

            <CheckboxFiltersGroup items={items} title={'Ингредиенты'} className='mt-5' limit={6} defaultValue={defaultItems} defaultItems={defaultItems}/>

        </div>
    );
};