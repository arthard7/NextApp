import {FilterChecboxProps, FilterCheckbox} from "@/components/shared/FilterCheckbox";
import {Input} from "@/components/ui";


type Item = FilterChecboxProps

type DefaultValue = {
    text: string,
    value: string
}
interface CheckboxFiltersProps {
    title: string
    items: Item[];
    defaultItems?: Item[];
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

    return (
        <div className={className}>
            <p className='font-bold mb-3'>{title}</p>

            <div className='mb-5'>
                <Input placeholder={searchInputPlaceholder} className='bg-gray-50 border-none'/>
            </div>

            <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>

                {items.map((item, index) => (
                    <FilterCheckbox
                        text={item.text}
                        value={item.value}
                        key={String(item.value)}
                        onCheckedChange={(ids) => console.log(ids)}
                        checked={false}
                        endAdornment={item.endAdornment}
                    />
                ))}

            </div>

        </div>
    );
};