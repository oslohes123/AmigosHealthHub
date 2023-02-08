// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import {serve} from "https://deno.land/std@0.168.0/http/server.ts";

const baseUrl = "https://trackapi.nutritionix.com/v2/";

async function instantSearch(food: string): Promise<JSON> {
    try {
        return (await fetch(baseUrl + "search/instant?query=" + food, {
            method: "GET",
            headers: {
                "x-app-id": Deno.env.get('X_APP_ID') as string,
                "x-app-key": Deno.env.get('X_APP_KEY') as string,
            },
        })).json();

    } catch (error) {
        console.error(error);
        throw error;
    }
}


async function brandedSearch(nix_item_id: string): Promise<JSON> {
    try {
        return (await fetch(baseUrl + "search/item?nix_item_id=" + nix_item_id, {
            method: "GET",
            headers: {
                "x-app-id": Deno.env.get('X_APP_ID') as string,
                "x-app-key": Deno.env.get('X_APP_KEY') as string,
            },
        })).json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}


instantSearch("apple").then(
    output => {
        console.log(output[0].common)
    }
)





serve(async (req) => {
    const {name} = await req.json();
    const data = {
        message: `Hello my name is ${name}!`,
    };

    return new Response(JSON.stringify(data), {
        headers: {"Content-Type": "application/json"},
    });
});

// fetch(baseUrl + "search/instant?query=balls", {
//   method: "GET",
//   headers: {
//     "x-app-id": "8aca1c28",
//     "x-app-key": "f2f9ec07613190d7278f404a8e26dda8",
//   },
// })
//     .then((response) => response.json())
//     .then((response) => console.log(response))
//     .catch((err) => console.log(err));


// // To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Ashley Tyagi"}'
