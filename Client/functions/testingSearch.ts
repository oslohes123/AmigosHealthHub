import {genericSearch} from "./nutritionIX";
async function getData(){
    let a = await genericSearch("apple")
    console.log(a)
}

getData()

