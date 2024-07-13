

import {SortPopup} from "./SortPopup";
import {cn} from "../../../../../shared/lib/utils";
import {Container} from "./Container";
import {Category} from "@prisma/client";
import {Categories} from "./Categories";


interface TopBarProps {
    className?: string;
    categories: Category[]
}


export const TopBar = ({className, categories}: TopBarProps) => {

    return (
        <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
            <Container className={'mt-10'}>
                <Categories items={categories}/>
                <SortPopup/>
            </Container>

        </div>
    );
};