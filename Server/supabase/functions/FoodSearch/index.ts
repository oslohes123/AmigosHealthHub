// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import {serve} from "https://deno.land/std@0.168.0/http/server.ts";
import {searchMethods} from "./constants.ts";
import instantSearch from "./searches/instantFoodSearch.ts";
import brandedSearch from "./searches/brandedSearch.ts";
import nutrientSearch from "./searches/nutrientSearch.ts";

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

// // To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"value":"banana","code":1}'
