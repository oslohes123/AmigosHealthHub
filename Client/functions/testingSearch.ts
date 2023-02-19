import {nutritionIX} from "./nutritionIX";
async function getData(){
    let x = new nutritionIX();
    let a = await x.instantSearch("apple")
    console.log(a.common)
}

getData()

