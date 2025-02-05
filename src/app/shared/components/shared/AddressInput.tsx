import {AddressSuggestions} from "react-dadata";
import 'react-dadata/dist/react-dadata.css';
import {useFormContext} from "react-hook-form";
import {ClearButton} from "@/app/shared/components/shared/clear-button";

interface AddressInputProps {
    onChange? : (value?: string) => void;

}


export const AddressInput = ({onChange}: AddressInputProps) => {



    return (


        <AddressSuggestions
        token={'bf3389a13f81160408a35a9c04487b09b7ef5807'}
        onChange={(data) => onChange?.(data?.value)}
        >
        </AddressSuggestions>


    );

}