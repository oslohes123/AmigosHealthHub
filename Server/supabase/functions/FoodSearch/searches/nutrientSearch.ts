import {baseUrl} from "../constants";
import NutrientSearchInterface from "../interfaces/nutrientSearchInterface";
export default async function nutrientSearch(foodItem: string): Promise<NutrientSearchInterface> {
    const data = {query:foodItem}
    return (await fetch(baseUrl + "natural/nutrients", {
        method: "POST",
        headers: {
            "x-app-id": process.env.X_APP_ID as string,
            "x-app-key": process.env.X_APP_KEY as string,
        },
        body: new URLSearchParams(data)
    })).json();
}
