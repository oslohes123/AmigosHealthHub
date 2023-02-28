import NutrientSearchInterface from '../api_interfaces/nutrientSearchInterface';
import  specificFoodNutritionInterface, { Food } from '../interfaces/specificFoodNutritionInterface';

export default function transformNutrientSearchInterface(data: NutrientSearchInterface): specificFoodNutritionInterface {
    const transformedFoods: Food[] = data.foods.map(food => {
        const transformedFood: Food = {
            food_name: food.food_name,
            brand_name: food.brand_name,
            serving_qty: food.serving_qty,
            serving_unit: food.serving_unit,
            serving_weight_grams: food.serving_weight_grams,
            calories: food.nf_calories,
            total_fat: food.nf_total_fat,
            protein: food.nf_protein,
            total_carbohydrates: food.nf_total_carbohydrate,
            sugar: food.nf_sugars,
            Fiber: food.nf_dietary_fiber,
        };
        return transformedFood;
    });

    const transformedData: specificFoodNutritionInterface = {
        foods: transformedFoods,
    };

    return transformedData;
}
