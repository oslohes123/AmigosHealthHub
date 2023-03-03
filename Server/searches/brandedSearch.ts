import brandedSearchInterface from "../api_interfaces/brandedSearchInterface"
import {baseUrl} from "../constants";
import authHeaders from './headersObject';
export default async function brandedSearch(nix_item_id: string): Promise<brandedSearchInterface> {
    return (await fetch(baseUrl + "search/item?nix_item_id=" + nix_item_id, {
        method: "GET",
        headers: authHeaders,
    })).json();
}
