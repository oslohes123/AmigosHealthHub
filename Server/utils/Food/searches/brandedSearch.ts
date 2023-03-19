/* eslint-disable @typescript-eslint/naming-convention */
// Ignoring this rule because the API returns the data in this format
import type brandedSearchInterface from '../../../interfaces/Food/api_interfaces/brandedSearchInterface'
import { baseUrl } from '../../../constants'
import authHeaders from './headersObject'
export default async function brandedSearch (nix_item_id: string): Promise<brandedSearchInterface> {
  return await (await fetch(baseUrl + 'search/item?nix_item_id=' + nix_item_id, {
    method: 'GET',
    headers: authHeaders
  })).json()
}
