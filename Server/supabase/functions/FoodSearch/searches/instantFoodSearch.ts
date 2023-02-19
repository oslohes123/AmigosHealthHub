import instantSearchInterface from "../interfaces/instantFoodSearchInterface";
import {baseUrl} from "../constants";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()


export default async function instantSearch(food: string): Promise<instantSearchInterface> {
    return (await fetch(baseUrl + "search/instant?query=" + food, {
        method: "GET",
        headers: {
            "x-app-id": process.env.X_APP_ID as string,
            "x-app-key": process.env.X_APP_KEY as string,
        },
    })).json();
}
