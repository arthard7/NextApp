import type {Metadata} from "next";
import {Nunito} from "next/font/google";
import "../globals.css";
import {Header} from "@/components/shared";


export const metadata: Metadata = {
    title: "Pizza",
};

export default function HomeLayout({
                                       children,
                                       modal
                                   }: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <main className='min-h-screen'>
            <Header/>
            {children}
            {modal}
        </main>
        </html>
    );
}
