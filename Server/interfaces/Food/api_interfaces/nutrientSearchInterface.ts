export default interface NutrientSearchInterface {
  foods: Food[]
}

interface Food {
  food_name: string
  brand_name: string | null
  serving_qty: number
  serving_unit: string
  serving_weight_grams: number
  nf_calories: number
  nf_total_fat: number
  nf_saturated_fat: number
  nf_cholesterol: number
  nf_sodium: number
  nf_total_carbohydrate: number
  nf_dietary_fiber: number
  nf_sugars: number
  nf_protein: number
  nf_potassium: number
  nf_p: number
  full_nutrients: fullNutrient[]
  nix_brand_name: string | null
  nix_brand_id: string | null
  nix_item_name: string | null
  nix_item_id: string | null
  upc: string | null
  consumed_at: string
  metadata: {
    is_raw_food: boolean
  }
  source: number
  ndb_no: number
  tags: {
    item: string
    measure: string | null
    quantity: string
    food_group: number
    tag_id: number
  }
  alt_measures: altMeasures[] | null
  lat: number | null
  lng: number | null
  meal_type: number
  photo: Photo
  sub_recipe: string | null
  class_code: string | null
  brick_code: string | null
  tag_id: string | null
}

interface Photo {
  thumb: string
  highres?: any
  is_user_uploaded: boolean
}

interface fullNutrient {
  attr_id: number
  value: number
}

interface altMeasures {
  serving_weight: number
  measure: string
  seq: number | null
  qty: number
}
