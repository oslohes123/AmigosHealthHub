/* eslint-disable @typescript-eslint/naming-convention */
// Ignoring this rule because the API returns the data in this format
import { type Common, type Branded } from '../../interfaces/Food/api_interfaces/instantFoodSearchInterface'
import type InstantSearchInterface from '../../interfaces/Food/api_interfaces/instantFoodSearchInterface'
import { type Item } from '../../interfaces/Food/genericSearchInterface'
import type genericSearchInterface from '../../interfaces/Food/genericSearchInterface'

/**
 * Transforms the data from the instant search api into a genericSearchInterface
 * @param param0
 * @returns genericSearchInterface
 */
function transformCommon ({ food_name, serving_unit, serving_qty }: Common): Item {
  return {
    food_name,
    serving_unit,
    serving_qty,
    calories: undefined,
    brand_name: undefined,
    item_id: undefined
  }
}

/**
 * Transforms the data from the instant search api into a genericSearchInterface
 * @param param0
 * @returns genericSearchInterface
 */
function transformBranded ({ food_name, serving_unit, serving_qty, nf_calories, brand_name, nix_item_id }: Branded): Item {
  return {
    food_name,
    serving_unit,
    serving_qty,
    calories: nf_calories,
    brand_name,
    item_id: nix_item_id
  }
}

/**
 * Transforms the data from the instant search api into a genericSearchInterface
 * @param instantSearchInterface
 * @returns genericSearchInterface
 */
export default function transformInstantSearchInterface (instantSearchInterface: InstantSearchInterface): genericSearchInterface {
  const items: Item[] = [
    ...instantSearchInterface.common.map(transformCommon),
    ...instantSearchInterface.branded.map(transformBranded)
  ]

  return { items }
}
