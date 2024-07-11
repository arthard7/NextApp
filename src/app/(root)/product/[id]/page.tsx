import {prisma} from "../../../../../prisma/prisma-client";
import {notFound} from "next/navigation";
import {Container, Title} from "@/components/shared";
import {ProductImage} from "@/components/shared/ProductImage";
import {GroupVariants} from "@/components/shared/groupVariants";

export default async function ProductPage({params: {id}}: any) {

    const product =
        await prisma.product.findFirst({where: Number(id) ? {id: Number(id)} : {}})


    if (!product) {
        return notFound()
    }


    return (
        <Container className={' flex flex-col my-10'}>

            <div className={'flex flex-1 mt-24 '}>

                <ProductImage src={product.imageUrl}
                              alt={product.name} className={''}
                              size={40}/>

                <div className={'w-[490px] bg-[#f7f6f5] p-7 '}>
                    <Title text={product.name} size={'md'} className={'font-extrabold mb-1'}></Title>
                    <p className={'text-gray-400 '}><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci beatae doloribus eos, eum explicabo facilis iusto minima nam nemo nulla? Asperiores eos est fuga fugit id illo omnis! Deleniti, quis?</span>
                    </p>
                    <GroupVariants  selectedValue={'2'} items={[{
                        name: 'Маленькая',
                        value: '1',

                    },
                        {

                            name: 'Средняя',
                            value: '2',

                        },
                        {

                            name: 'Большая',
                            value: '3',
                            disabled:   true

                        },]}></GroupVariants>
                </div>


            </div>


        </Container>
    )
}