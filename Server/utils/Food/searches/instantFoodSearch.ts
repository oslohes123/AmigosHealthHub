import type instantSearchInterface from '../../../interfaces/Food/api_interfaces/instantFoodSearchInterface'
import { baseUrl } from '../../../constants'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import authHeaders from './headersObject'
dotenv.config()

/**
 * Searches the instant food database for a specific food item
 * @param food
 * @returns instantSearchInterface
 */
export default async function instantSearch (food: string): Promise<instantSearchInterface> {
  return await (await fetch(baseUrl + 'search/instant?query=' + food, {
    method: 'GET',
    headers: authHeaders
  })).json()
}
