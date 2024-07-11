import {cn} from "@/lib/utils";
import {ProductImage} from "@/components/shared/ProductImage";
import {Title} from "@/components/shared";
import {Button} from "@/components/ui";


interface ChoosePizzaFormProps {

    imageUrl: string
    name: string;
    ingredients: any[];
    items?: any[];
    onClickAdd?: VoidFunction
    className?: string;

}


export const ChooseProductForm = ({
                                      className,
                                      name,
                                      imageUrl,
                                      ingredients,
                                      items,
                                      onClickAdd
                                  }: ChoosePizzaFormProps) => {

    const textDetails = '30 см, традиционное тесто 30'
    const totalPrice = 300


    return (

        <div className={cn(className, 'flex flex-1 justify-between items-center h-[500px]')}>


            <div className='flex items-center justify-center flex-1 relative w-full '>
                <img src={imageUrl}
                     alt={name}
                     className={'relative left-2 top-2 transition-all z-10 duration-300 w-[300px] h-[300px]'}
                />
            </div>


            <div className='w-[490px] bg-[#f7f6f5] p-7 h-[500px] flex flex-col justify-between'>

                <div>
                    <Title text={name} size='md' className='font-extrabold mb-1'/>
                    <p className='text-gray-400'>{textDetails}</p>
                </div>

                {/*<Button onClick={onClickAdd}*/}
                {/*        className='absolute bottom-10 w-[435px] h-[55px] px-10 text-base rounded-[18px] '*/}
                {/*>*/}
                {/*    Добавить в корзину за {totalPrice} р*/}
                {/*</Button>*/}
                <Button onClick={onClickAdd}
                        className='  h-[55px] px-10 text-base rounded-[18px] w-full mb-4'
                >
                    Добавить в корзину за {totalPrice} р
                </Button>
            </div>
        </div>
    );
};