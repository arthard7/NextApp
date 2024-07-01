import {prisma} from "./prisma-client";
import {hashSync} from "bcrypt";
import {_ingredients, Categories, products} from "./constants";
import {Prisma} from ".prisma/client";

type generateItem = {

    productId: number,
    pizzaType?: 1 | 2,
    size?: 20 | 30 | 40
}
const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
}

const generateProductItem = ({productId, pizzaType, size}: generateItem) => {
    return {
        productId,
        price: randomDecimalNumber(190, 600),
        pizzaType,
        size
    } as Prisma.ProductItemUncheckedCreateInput
}


async function create() {

    await prisma.user.createMany({
        data: [
            {
                fullName: 'User',
                email: 'user@mail.ru',
                password: hashSync('user123', 10),
                verified: new Date(),
                role: 'USER'
            },

            {
                fullName: 'Admin',
                email: 'admin@mail.ru',
                password: hashSync('admin123', 10),
                verified: new Date(),
                role: 'ADMIN'
            }
        ]
    })
    await prisma.category.createMany({
        data: Categories
    })


    await prisma.ingredient.createMany({
        data: _ingredients
    })

    await prisma.product.createMany({
        data: products
    })


    const pizza1 = await prisma.product.create({
        data: {
            name: 'сырная',
            imageUrl: 'public/pizzaImg/cheese.png',
            categoryId: 1,
            ingredients: {
                connect: _ingredients.slice(0, 5)
            },
        },
    })

    const pizza2 = await prisma.product.create({
        data: {
            name: 'Пеперонни',
            imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
            categoryId: 1,
            ingredients: {
                connect: _ingredients.slice(5, 10)
            },
        },
    })


    const pizza3 = await prisma.product.create({
        data: {
            name: 'Карбонара',
            imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D61389AB51A8F648A0DBA5B1689.avif',
            categoryId: 1,
            ingredients: {
                connect: _ingredients.slice(10, 40)
            },
        },
    })


    await prisma.productItem.createMany({
        data: [
            // Пицца "Пепперони фреш"
            generateProductItem({productId: pizza1.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza1.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza1.id, pizzaType: 2, size: 40}),

            // Пицца "Сырная"
            generateProductItem({productId: pizza2.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza2.id, pizzaType: 1, size: 30}),
            generateProductItem({productId: pizza2.id, pizzaType: 1, size: 40}),
            generateProductItem({productId: pizza2.id, pizzaType: 2, size: 20}),
            generateProductItem({productId: pizza2.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza2.id, pizzaType: 2, size: 40}),

            // Пицца "Чоризо фреш"
            generateProductItem({productId: pizza3.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza3.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza3.id, pizzaType: 2, size: 40}),

            // Остальные продукты
            generateProductItem({productId: 1}),
            generateProductItem({productId: 2}),
            generateProductItem({productId: 3}),
            generateProductItem({productId: 4}),
            generateProductItem({productId: 5}),
            generateProductItem({productId: 6}),
            generateProductItem({productId: 7}),
            generateProductItem({productId: 8}),
            generateProductItem({productId: 9}),
            generateProductItem({productId: 10}),
            generateProductItem({productId: 11}),
            generateProductItem({productId: 12}),
            generateProductItem({productId: 13}),
            generateProductItem({productId: 14}),
            generateProductItem({productId: 15}),
            generateProductItem({productId: 16}),
            generateProductItem({productId: 17}),
        ]
    })


    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: '11111'
            },

            {
                userId: 2,
                totalAmount: 0,
                token: '22222'
            },

        ]
    })

    await prisma.cartItem.create({
        data: {
            productItemId: 1,
            cartId: 1,
            quantity: 2,
            ingredients: {
                connect: [{id: 1}, {id: 2}, {id: 3}]
            }
        }
    })


}


async function clear() {

    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;


}


async function main() {


    try {


        await clear()
        await create()


    } catch (e) {
        console.error(e)
    }

}

main().then(async () => {

    await prisma.$disconnect()

}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})