import {ProductItem} from "@prisma/client";
import {PizzaSize, pizzaSizes, PizzaType} from "../constants/pizza";
import {useEffect} from "react";

export const getAvailablePizzaSizes = (items: ProductItem[], size: number, type: PizzaType ) => {


    const filteredPizzaByType = items.filter((item) => item.pizzaType === type)
    const availablePizzasSizes = pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzaByType.some((pizza) => Number(pizza.size) === Number(item.value))
    }))


return availablePizzasSizes

};