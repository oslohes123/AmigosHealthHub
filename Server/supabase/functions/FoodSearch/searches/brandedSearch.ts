import brandedSearchInterface from '../interfaces/brandedSearchInterface'
import {baseUrl} from "../constants";
export default async function brandedSearch(nix_item_id: string): Promise<brandedSearchInterface> {
    return (await fetch(baseUrl + "search/item?nix_item_id=" + nix_item_id, {
        method: "GET",
        headers: {
            "x-app-id": process.env.X_APP_ID as string,
            "x-app-key": process.env.X_APP_KEY as string,
        },
    })).json();
}
