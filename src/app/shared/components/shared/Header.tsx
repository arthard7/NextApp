import {cn} from "../../../../../shared/lib/utils";
import {Container} from "./Container";
import Image from "next/image";
import {Button} from "../ui";
import {ArrowRight, ShoppingCart, User} from "lucide-react";
import Link from "next/link";
import {SearchInput} from "./searchInput";
import {CartButton} from "@/app/shared/components/shared/CartButton";


interface HeaderProps {
    className?: string;

}


export const Header = ({className}: HeaderProps) => {


    return (
        <header className={cn('border border-b ', className)}>
            <Container className='flex items-center justify-between py-8'>



                {/* левая часть */}
                <Link href='/'>
                    <div className='flex items-center gap-4'>
                        <Image src='/logo.png' alt='logo' width={35} height={35}/>
                        <div>
                            <h1 className='text-2xl uppercase font-black'> next pizza </h1>
                            <p className='text-sm text-gray-400 leading-3'> вкусней уже некуда</p>
                        </div>
                    </div>
                </Link>

                <div className={'mx-10 flex-1'}>
                    <SearchInput></SearchInput>
                </div>


                {/* правая часть */}
                <div className='flex items-center gap-3 '>
                    <Button variant='outline' className='flex items-center gap-1'>
                        <User size={16}/>
                        Войти
                    </Button>


                    <div>
                        <CartButton/>

                    </div>


                </div>
            </Container>
        </header>
    );
};

