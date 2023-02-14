import {nurtitionSearch} from "./searchFunction";
async function getData(){
    let a = await nurtitionSearch("apple")
    console.log(a.foods[0].full_nutrients[0].value)
}

getData()

