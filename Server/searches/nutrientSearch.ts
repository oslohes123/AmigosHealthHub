import {baseUrl} from "../constants";
import NutrientSearchInterface from "../interfaces/nutrientSearchInterface";
import authHeaders from './headersObject';
export default async function nutrientSearch(foodItem: string): Promise<NutrientSearchInterface> {
    const data = {query:foodItem}
    return (await fetch(baseUrl + "natural/nutrients", {
        method: "POST",
        headers: authHeaders,
        body: new URLSearchParams(data)
    })).json();
}
