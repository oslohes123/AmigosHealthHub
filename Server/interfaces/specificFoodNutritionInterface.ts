export default interface specificFoodNutritionInterface {
    foods: Food[];
}
export interface Food{
    food_name: string;
    brand_name: string | null;
    serving_qty: number;
    serving_unit: string;
    serving_weight_grams: number;
    calories: number;
    total_fat: number;
    protein: number;
    total_carbohydrates: number;
    sugar: number;
    Fiber: number;
}