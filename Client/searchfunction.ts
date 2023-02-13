import {createClient} from '@supabase/supabase-js'
import {anonKey, searchMethods, supabaseURL} from "./constants";
import {SearchCriteria} from "./searchCriteria";
import NutrientSearchInterface from "./nutrientinteface";

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseURL, anonKey)

// async function searchFood(input_data: SearchCriteria) {
//     const {data, error} = await supabase.functions.invoke("FoodSearch", {
//         body: input_data,
//     })
//     if (error) {
//         console.log(error)
//         return error;
//     } else {
//         return data;
//     }
// }

function searchFood(input_data: SearchCriteria, callback: Function) {
    supabase.functions.invoke("FoodSearch", {
        body: input_data,
    })
        .then(({data, error}) => {
            if (error) {
                console.log(error)
                callback(error, null);
            } else {
                callback(null, data);
            }
        })
        .catch((error) => {
            console.log(error)
            callback(error, null);
        })
}

let input_data:SearchCriteria = {value:"Apple",code:searchMethods.nutrientSearch}
searchFood(input_data, (error:any, data:NutrientSearchInterface) => {
    if (error) {
        // handle error
    } else {
        // access specific parts of the data
        console.log(data.foods[0].food_named)
    }
});





