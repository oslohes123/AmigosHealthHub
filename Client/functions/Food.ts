import axios, {AxiosResponse, AxiosError} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
var randomColor = require('randomcolor');


const portENV = process.env["PORT"];
const ip_addressENV = process.env["IP_ADDRESS"];
let currentDate = new Date().toISOString().split("T")[0];
// For testing purposes
// Update this with your own UrlService
let ip_address: string | undefined = ip_addressENV;
let port: string | undefined = portENV;

export async function getTrackedFood(Date: string, userID: string) {
    let url: string = `http://${ip_address}:${port}/api/food/getTrackedFood/${Date}.${userID}`;
    let response: AxiosResponse;
    try {
        const {token} = JSON.parse(
            (await AsyncStorage.getItem("user")) as string
        );
        response = await axios.get(url, {
            headers: {
                authorization: token,
            },
        });
    } catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            console.log("Got an error from the server");
            console.log(error.response);
        } else {
            console.log("Default error handler" + error);
        }
        return error;
    }
    return response.data;
}

export async function getSpecificTrackedFood(logID: string) {
    let url: string = `http://${ip_address}:${port}/api/food/getSpecificTrackedFood/${logID}`;
    let response: AxiosResponse;
    try {
        const {token} = JSON.parse(
            (await AsyncStorage.getItem("user")) as string
        );
        response = await axios.get(url, {
            headers: {
                authorization: token,
            },
        });
    } catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            console.log("Error when getting specific tracked food");
            console.log(error.response);
        } else {
            console.log("Default error handler" + error);
        }
        return error;
    }
    return response.data[0];
}

export async function addTrackedFood(input: JSON, userID: string) {
    let url: string = `http://${ip_address}:${port}/api/food/addTrackedFood`;
    let response: AxiosResponse;
    try {
        const {token} = JSON.parse(
            (await AsyncStorage.getItem("user")) as string
        );
        response = await axios.post(
            url,
            {
                input,
                userID,
            },
            {
                headers: {
                    authorization: token,
                },
            }
        );
    } catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            console.log("Got an error from the server");
            console.log(error.response);
        } else {
            console.log("Default error handler" + error);
        }
        return error;
    }

    return response.status;
}

export async function deleteTrackedFood(logID: string) {
    let url: string = `http://${ip_address}:${port}/api/food/deleteTrackedFood/`;
    let response: AxiosResponse;
    try {
        const {token} = JSON.parse(
            (await AsyncStorage.getItem("user")) as string
        );
        response = await axios.post(
            url,
            {logID},
            {
                headers: {
                    authorization: token,
                },
            }
        );
    } catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            console.log("Got an error from the server");
            console.log(error.response);
        } else {
            console.log("Default error handler" + error);
        }
        return error;
    }
    return response.status;
}

export async function updateTrackedFood(input: any) {
    let url: string = `http://${ip_address}:${port}/api/food/updateTrackedFood`;
    let response: AxiosResponse;
    try {
        const {token} = JSON.parse(
            (await AsyncStorage.getItem("user")) as string
        );
        response = await axios.post(
            url,
            {
                Quantity: input.Quantity,
                LogID: input.LogID,
                Measure: input.Measure,
                Calories: input.Calories,
            },
            {
                headers: {
                    authorization: token,
                },
            }
        );
    } catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            console.log("Got an error from the server");
            console.log(error.response);
        } else {
            console.log("Default error handler" + error);
        }
        return error;
    }
    return response.status;
}

export async function getFood(foodID: string) {
    let url: string = `http://${ip_address}:${port}/api/food/getFood/${foodID}`;
    let response: AxiosResponse;
    try {
        const {token} = JSON.parse(
            (await AsyncStorage.getItem("user")) as string
        );
        response = await axios.get(url, {
            headers: {
                authorization: token,
            },
        });
    } catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            console.log("Got an error from the server");
            console.log(error.response);
        } else {
            console.log("Default error handler" + error);
        }
        return error;
    }
    return response.data[0];
}

export async function getMultipleFood(foodIDs: string[]) {
    let url = `http://${ip_address}:${port}/api/food/getMultipleFood`;
    let response: AxiosResponse;
    try {
        const {token} = JSON.parse(
            (await AsyncStorage.getItem("user")) as string
        );
        response = await axios.post(url, {foodIDs}, {
            headers: {
                authorization: token,
            },
        });
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            console.log("Got an error from the server");
            console.log(error.response);
        } else {
            console.log("Default error handler" + error);
        }
        return error;
    }
    return response.data;

}

function sumNutrients(data: any) {
    let protein = 0;
    let sugar = 0;
    let carbohydrates = 0;
    let fat = 0;
    let fiber = 0;
  
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      protein += parseFloat(item.Protein.toFixed(2)) * item.Quantity;
      sugar += parseFloat((item.Sugar * item.Quantity).toFixed(2));
      carbohydrates += parseFloat(item.Carbohydrate.toFixed(2)) * item.Quantity;
      fat += parseFloat(item.Fat.toFixed(2)) * item.Quantity;
      fiber += parseFloat(item.Fiber.toFixed(2)) * item.Quantity;
    }
    sugar = Number(sugar.toFixed(2))
    fat = Number(fat.toFixed(2))
    carbohydrates = Number(carbohydrates.toFixed(2))
    protein = Number(protein.toFixed(2))
    fiber = Number(fiber.toFixed(2))
    
    return { protein, sugar, carbohydrates, fat, fiber };
}


export async function getPieChartData(UserID:string,inputDate:string = currentDate) {
    let currentFood = await getTrackedFood(inputDate , UserID )
    if(currentFood.length == 0 || currentFood == undefined){
        return [];
    }
    let foodIDs = currentFood.map((food:any) => food.FoodID);
    let foods = await getMultipleFood(foodIDs)
    let allFoods = mergeTwoFoods(foods,currentFood)
    let data = sumNutrients(allFoods);
    let myColours = [
        "red",
        "darkblue",
        "darkgreen",
        "purple",
        "black",

    ]
    const output = Object.entries(data).map(([name, amount],index) => ({
        name,
        amount,
        color: myColours[index],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }));
    return output;
}

function mergeTwoFoods(dataArray:any[],quantityArray: any[]){
    for(let i = 0; i < quantityArray.length; i++) {
        let currentObj = quantityArray[i]
        for(let j = 0; j < dataArray.length; j++) {
          let nutrientObj = dataArray[j]
          if(currentObj.FoodID === nutrientObj.FoodID) {
            // merge nutrient information
            currentObj.Calories = nutrientObj.Calories
            currentObj.Carbohydrate = nutrientObj.Carbohydrate
            currentObj.Fat = nutrientObj.Fat
            currentObj.Fiber = nutrientObj.Fiber
            currentObj.Protein = nutrientObj.Protein
            currentObj.Sugar = nutrientObj.Sugar
            break
          }
        }
      }
    return quantityArray
}

