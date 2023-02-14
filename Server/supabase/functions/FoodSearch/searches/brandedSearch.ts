import brandedSearchInterface from '../interfaces/brandedSearchInterface.ts'
import {baseUrl} from "../constants.ts";
export default async function brandedSearch(nix_item_id: string): Promise<brandedSearchInterface> {
    return (await fetch(baseUrl + "search/item?nix_item_id=" + nix_item_id, {
        method: "GET",
        headers: {
            "x-app-id": Deno.env.get('X_APP_ID') as string,
            "x-app-key": Deno.env.get('X_APP_KEY') as string,
        },
    })).json();
}