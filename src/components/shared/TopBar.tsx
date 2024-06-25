import {Categories} from "@/components/shared/Categories";
import {SortPopup} from "@/components/shared/SortPopup";
import {cn} from "@/lib/utils";
import {Container} from "./Container";


interface TopBarProps {
    className? : string;

}


export const TopBar = ({className}: TopBarProps) => {

    return (
        <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
            <Container className={'mt-10'}>
            <Categories/>
            <SortPopup/>
            </Container>

        </div>
    );
};