interface FoodData {
  food_name: string
  brand_name: string
  serving_qty: number
  serving_unit: string
  serving_weight_grams: number
  calories: number
  fat: number
  protein: number
  carbohydrates: number
  sugar: number
  fiber: number
  alt_measures: null | unknown
}

export default interface FoodInput {
  input: {
    foodData: FoodData
    foodIdentifier: string
  }
  userID: string
}
