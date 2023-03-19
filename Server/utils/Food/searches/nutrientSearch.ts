import { baseUrl } from '../../../constants'
import type NutrientSearchInterface from '../../../interfaces/Food/api_interfaces/nutrientSearchInterface'
import authHeaders from './headersObject'
export default async function nutrientSearch (foodItem: string): Promise<NutrientSearchInterface> {
  const data = { query: foodItem }
  return await (await fetch(baseUrl + 'natural/nutrients', {
    method: 'POST',
    headers: authHeaders,
    body: new URLSearchParams(data)
  })).json()
}
