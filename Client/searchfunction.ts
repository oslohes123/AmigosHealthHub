import {createClient} from '@supabase/supabase-js'
import {anonKey, searchMethods, supabaseURL} from "./constants";


// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseURL, anonKey)


async function nutrientSearch(input:string) {
    const {data, error} = await supabase.functions.invoke("FoodSearch", {
        body: {value:input, code: searchMethods.nutrientSearch},
    })
    if(error) {
        console.log(error)
        return error;
    }else{
        return data
    }
}

let x = nutrientSearch("apple")

x.then(response => console.log(response))