import {getUserSession} from "../../../../../shared/lib/get-user-session";
import {NextResponse} from "next/server";
import {prisma} from "../../../../../prisma/prisma-client";

export async function GET() {
    try {

        const user = await getUserSession()

        if (!user) {
            return NextResponse.json({message: 'Unauthorized'}, {status: 401})
        }

        const data = await prisma.user.findUnique({
            where: {
                id: Number(user.id)
            },
            select: {
                email: true,
                fullName: true,
                password: false

            }
        })

        return NextResponse.json(data, {status: 200})

    } catch (error) {
        console.error(error)
    }
}