import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import {compare, hashSync} from "bcrypt";
import {UserRole} from "@prisma/client";
import {prisma} from "../../../../../prisma/prisma-client";


export const authOptions = {

    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
            profile(profile) {
                return {

                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: 'USER' as UserRole,

                }

            }
        }),
        CredentialProvider({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null
                }
                const values = {
                    email: credentials.email,
                }


                const findUser = await prisma.user.findFirst({
                    where: values

                })

                if (!findUser) {
                    return null
                }
                const isPasswordValid = await compare(credentials.password, findUser.password)

                if (!isPasswordValid) {
                    return null
                }

                if (!findUser.verified) {
                    return null
                }

                return {
                    id: String(findUser.id),
                    name: findUser.fullName,
                    email: findUser.email,
                    role: findUser.role
                }
            }
        })

    ],

    secret: process.env.AUTH_SECRET,
    session: {
        strategy: 'jwt',
    },

    callbacks: {

        async signIn({user, account}) {
            try {


                if (account?.provider === 'credentials') {
                    return true
                }

                if (!user.email) {
                    return false
                }

                const findUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            {provider: account?.provider, providerId: account?.providerAccountId},
                            {email: user.email}
                        ]

                    }
                })

                if(findUser) {
                    await prisma.user.update({
                        where: {
                            id: findUser.id
                        },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId
                        }
                    })

                    return  true
                }


                await prisma.user.create({
                    data: {
                        email: user.email,
                        fullName: user.name || 'User #' + user.id.toString(),
                        password: hashSync(user.id.toString(), 10),
                        verified: new Date(),
                        provider: account?.provider,
                        providerId: account?.providerAccountId
                    }
                })

            } catch (e) {
                console.error("Error [SIGNIN]", e)
                return false
            }
        },

        async jwt({token}) {
            const findUser = await prisma.user.findFirst({
                where: {
                    email: token.email
                }
            })

            if (findUser) {

                token.id = String(findUser.id)
                token.email = findUser.email
                token.role = findUser.role
                token.fullName = findUser.fullName


            }

            return token
        },

        async session({session, token}) {

            if (session?.user) {

                session.user.id = token.id
                session.user.role = token.role

            }


            return session
        }
    }


}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}