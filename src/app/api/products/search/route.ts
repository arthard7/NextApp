import {NextRequest, NextResponse} from "next/server";
// import {prisma} from "../../../../../prisma/prisma-client";
import {PrismaClient} from "@prisma/client";
import {log} from "util";


const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});


export async function GET(req: NextRequest) {

    const query = req.nextUrl.searchParams.get('query') || ''
    console.log(`Received query: ${query}`);
    // ниже второй вариант который тоже не работает
    // const products = await prisma.$queryRaw`
    //     SELECT * FROM "Product"
    //     WHERE LOWER("name") LIKE LOWER(${`%${query}%`})
    //     LIMIT 5
    // `;

    //баг в призме с русским регистром

    const products = await prisma.product.findMany({
        where: {
            name: {

                contains: query,
                mode: 'insensitive',

            },


        },
        take: 5,


    })
    console.log(`Found products: ${JSON.stringify(products)}`);
    return NextResponse.json(products)
}