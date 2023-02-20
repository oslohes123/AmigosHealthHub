// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import {serve} from "https://deno.land/std@0.168.0/http/server";
import {searchMethods} from "./constants";
import instantSearch from "./searches/instantFoodSearch";
import brandedSearch from "./searches/brandedSearch";
import nutrientSearch from "./searches/nutrientSearch";

serve(async (req) => {
    const {value:inputData, code} = await req.json();
    let data;
    switch (code) {
        case searchMethods.instantSearch:
            data = await instantSearch(inputData)
            break;
        case searchMethods.nutrientSearch:
            data = await nutrientSearch(inputData)
            break;
        case searchMethods.brandedSearch:
            data = await brandedSearch(inputData)
            break;
        default:
            data = `The code was incorrect as ${code} use literal searchMethods for correct code`
    }


    return new Response(JSON.stringify(data), {
        headers: {"Content-Type": "application/json"},
    });
});

