import {createClient} from '@supabase/supabase-js'
import {anonKey, searchMethods, supabaseURL} from "./constants";
import {searchInterface} from "./searchInterface";

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseURL, anonKey)


async function nutrientSearch(input_data: searchInterface) {
    const {data, error} = await supabase.functions.invoke("FoodSearch", {
        body: input_data,
    })
    if (error) {
        console.log(error)
        return error;
    } else {
        return data
    }
}

let a: searchInterface = {value: "apples", code: searchMethods.instantSearch}

let x = nutrientSearch(a)

x.then(response => console.log(response))