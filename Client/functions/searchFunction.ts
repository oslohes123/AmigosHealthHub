import {createClient} from '@supabase/supabase-js'
import {anonKey, searchMethods, supabaseURL} from "../constants";
import instantSearchInterface from "../interfaces/instantFoodSearchInterface";
import BrandedSearchInterface from "../interfaces/brandedSearchInterface";
import NutrientSearchInterface from "../interfaces/nutrientSearchInterface";



// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseURL, anonKey)

export async function instantSearch(input:string):Promise<instantSearchInterface>{
    const {data, error} = await supabase.functions.invoke("FoodSearch", {
        body: {value:input,code:searchMethods.instantSearch},
    })
    if (error) {
        console.log(error)
        return error;
    } else {
        return data;
    }
}



export async function brandedSearch(nix_item_id:string):Promise<BrandedSearchInterface>{
    const {data, error} = await supabase.functions.invoke("FoodSearch", {
        body: {value:nix_item_id,code:searchMethods.brandedSearch},
    })
    if (error) {
        console.log(error)
        return error;
    } else {
        return data;
    }
}

export async function nurtitionSearch(input:string):Promise<NutrientSearchInterface>{
    const {data, error} = await supabase.functions.invoke("FoodSearch", {
        body: {value:input,code:searchMethods.nutrientSearch},
    })
    if (error) {
        console.log(error)
        return error;
    } else {
        return data;
    }
}







