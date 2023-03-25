import test from 'ava'
import transformBrandedSearchInterface from '../../../../utils/Food/parseBrandedSearch'
import type specificFoodNutritionInterface from '../../../../interfaces/Food/specificFoodNutritionInterface'
import type BrandedSearchInterface from '../../../../interfaces/Food/api_interfaces/brandedSearchInterface'

test('transformBrandedSearchInterface should transform data correctly', (t) => {
  const inputData: BrandedSearchInterface = {
    foods: [
      {
        food_name: 'Banana',
        brand_name: 'Chiquita',
        serving_qty: 1,
        serving_unit: 'medium',
        serving_weight_grams: 118,
        nf_metric_qty: 100,
        nf_metric_uom: 'g',
        nf_calories: 105,
        nf_total_fat: 0.4,
        nf_saturated_fat: 0.1,
        nf_cholesterol: 0,
        nf_sodium: 1,
        nf_total_carbohydrate: 27,
        nf_dietary_fiber: 3.1,
        nf_sugars: 14.4,
        nf_protein: 1.3,
        nf_potassium: 422,
        nf_p: 22,
        full_nutrients: [
          {
            attr_id: 203,
            value: 1.3
          }
        ],
        nix_brand_name: 'Chiquita',
        nix_brand_id: '12345',
        nix_item_name: 'Banana',
        nix_item_id: '12345',
        metadata: {},
        source: 1,
        photo: {
          thumb: 'https://example.com/thumb.jpg',
          highres: null,
          is_user_uploaded: false
        },
        updated_at: '2021-01-01T00:00:00Z'
      }
    ]
  }

  const expected: specificFoodNutritionInterface = {
    food_name: 'Banana',
    brand_name: 'Chiquita',
    serving_qty: 1,
    serving_unit: 'medium',
    serving_weight_grams: 118,
    calories: 105,
    fat: 0.4,
    protein: 1.3,
    carbohydrates: 27,
    sugar: 14.4,
    fiber: 3.1,
    alt_measures: null
  }

  const result = transformBrandedSearchInterface(inputData)
  t.deepEqual(result, expected)
})
