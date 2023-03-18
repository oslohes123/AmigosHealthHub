export default interface specificFoodNutritionInterface {
  food_name: string
  brand_name: string | null
  serving_qty: number
  serving_unit: string
  serving_weight_grams: number
  calories: number
  fat: number
  protein: number
  carbohydrates: number
  sugar: number
  fiber: number
  alt_measures: AltMeasures[] | null
}

export interface AltMeasures {
  serving_weight: number
  measure: string
  seq: number | null
  qty: number
}
