import { FoodFactsEntry } from "./FoodFactsEntry";

export type LocalFoodEntry = {
    info: {
        product_name: string;
        quantity: string;
    }
    images: {
        image_front_url: string;
    }
    ingredients: {
        ingredients_text: string;
    }
}

export const newLocalFoodEntry = (derivedEntry: FoodFactsEntry): LocalFoodEntry => {
    return {
        info: {
            product_name: derivedEntry.product.product_name,
            quantity: derivedEntry.product.quantity
        },
        images: {
            image_front_url: derivedEntry.product.image_front_url
        },
        ingredients: {
            ingredients_text: undefined
        }
    }
}