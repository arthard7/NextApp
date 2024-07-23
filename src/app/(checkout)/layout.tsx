import Dashboard from "@/app/(dashboard)/dashboard/page";
import {Container, Header} from "@/app/shared/components/shared";

export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
}

export default function CheckoutLayout({children}: { children: React.ReactNode }) {
    return (

        <main className={'min-h-screen bg-[#F4F1EE]'}>
            <Container>
                <Header hasCart={false} hasSearch={false} className={'border-b-gray-200'}/>
                {children}
            </Container>


        </main>
    )
}
