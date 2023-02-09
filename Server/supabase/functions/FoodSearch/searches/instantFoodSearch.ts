import instantSearchResult from "../interfaces/instantFoodSearchInterface.ts";
import {baseUrl} from "../constants.ts";

export default async function instantSearch(food: string): Promise<instantSearchResult> {
    return (await fetch(baseUrl + "search/instant?query=" + food, {
        method: "GET",
        headers: {
            "x-app-id": Deno.env.get('X_APP_ID') as string,
            "x-app-key": Deno.env.get('X_APP_KEY') as string,
        },
    })).json();
}
