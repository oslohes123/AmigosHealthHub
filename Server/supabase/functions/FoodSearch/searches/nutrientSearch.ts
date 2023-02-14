import {baseUrl} from "../constants.ts";
import NutrientSearchInterface from "../interfaces/nutrientSearchInterface.ts";
export default async function nutrientSearch(foodItem: string): Promise<NutrientSearchInterface> {
    const data = {query:foodItem}
    return (await fetch(baseUrl + "natural/nutrients", {
        method: "POST",
        headers: {
            "x-app-id": Deno.env.get('X_APP_ID') as string,
            "x-app-key": Deno.env.get('X_APP_KEY') as string,
        },
        body: new URLSearchParams(data)
    })).json();
}