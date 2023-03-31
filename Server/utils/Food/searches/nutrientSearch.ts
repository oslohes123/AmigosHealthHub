import { baseUrl } from '../../../constants'
import type NutrientSearchInterface from '../../../interfaces/Food/api_interfaces/nutrientSearchInterface'
import authHeaders from './headersObject'

/**
 * Searches the nutrient database for a specific food item
 * @param foodItem
 * @returns NutrientSearchInterface
 */
export default async function nutrientSearch (foodItem: string): Promise<NutrientSearchInterface> {
  const data = { query: foodItem }
  return await (await fetch(baseUrl + 'natural/nutrients', {
    method: 'POST',
    headers: authHeaders,
    body: new URLSearchParams(data)
  })).json()
}
