import {Container, Filters, Title, TopBar} from "@/components/shared";
import {ProductsGroupList} from "@/components/shared/ProductsGroupList";

export default function Home() {
    return (
        <>
            <Container className={'mt-10'}>
                <Title text='Все пиццы' size={"lg"} className={'font-extrabold'}/>
            </Container>
            <TopBar/>


            <Container className={'mt-10 pb-14'}>

                <div className='flex gap-[80px]'>

                    {/*  Фильтрация  */}
                    <div className={'w-[250px] '}>
                        <Filters/>
                    </div>


                    {/*  Список товаров  */}
                    <div className='flex-1'>
                        <div className='flex flex-col gap-16'>
                            <ProductsGroupList  title={'Пиццы'} items={[{
                                id: 1,
                                name: 'Пепперони',
                                price: 500,
                                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610A62D78598406363A9A8AD65.avif'
                            },
                                {
                                    id: 2,
                                    name: 'Пепперони',
                                    price: 500,
                                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610A62D78598406363A9A8AD65.avif'
                                },{
                                    id: 3,
                                    name: 'Пепперони',
                                    price: 500,
                                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610A62D78598406363A9A8AD65.avif'
                                },{
                                    id: 4,
                                    name: 'Пепперони',
                                    price: 500,
                                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610A62D78598406363A9A8AD65.avif'
                                },{
                                    id: 5,
                                    name: 'Пепперони',
                                    price: 500,
                                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610A62D78598406363A9A8AD65.avif'
                                },{
                                    id: 6,
                                    name: 'Пепперони',
                                    price: 500,
                                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610A62D78598406363A9A8AD65.avif'
                                },





                            ]} categoryId={1}  />

                            <ProductsGroupList  title={'Завтрак'} items={[{
                                id: 1,
                                name: 'Пепперони',
                                price: 500,
                                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610A62D78598406363A9A8AD65.avif'
                            },
                                {
                                    id: 2,
                                    name: 'Пепперони',
                                    price: 500,
                                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610A62D78598406363A9A8AD65.avif'
                                },{
                                    id: 3,
                                    name: 'Пепперони',
                                    price: 500,
                                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610A62D78598406363A9A8AD65.avif'
                                },{
                                    id: 4,
                                    name: 'Пепперони',
                                    price: 500,
                                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610A62D78598406363A9A8AD65.avif'
                                },{
                                    id: 5,
                                    name: 'Пепперони',
                                    price: 500,
                                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610A62D78598406363A9A8AD65.avif'
                                },{
                                    id: 6,
                                    name: 'Пепперони',
                                    price: 500,
                                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610A62D78598406363A9A8AD65.avif'
                                },





                            ]} categoryId={2}  />


                        </div>
                    </div>
                </div>
            </Container>

        </>

    );
}
