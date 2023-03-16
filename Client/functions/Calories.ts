import axios, { AxiosResponse, AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTrackedFood } from "./Food";
import { log } from "react-native-reanimated";


const portENV = process.env["PORT"];
const ip_addressENV = process.env["IP_ADDRESS"];
const currentDate = new Date().toISOString().split('T')[0];

// For testing purposes
// Update this with your own UrlService
let ip_address: string | undefined = ip_addressENV;
let port: string | undefined = portENV;


export async function getLatestCalorieGoal(UserID: string,inputDate:string = ""){
    // Get the all the calorie goals for the user
    let data = await getGeneralCalorieGoal(UserID);
    if (data.length == 0) {
        await addCalorieGoal(UserID, 2000, new Date().toISOString().split('T')[0]);
        data = await getGeneralCalorieGoal(UserID);
    }
    // If a date is passed in, filter the data to only include calorie goals before the date
    if(inputDate != ""){
        data = data.filter((item:any) => {
            return item.Date <= inputDate;

        })
    }
    // Return the latest calorie goal
    if(data.length == 0){
        return -1;
    }else{
        return data.reduce((acc: any, curr: any) => {
            return new Date(curr.Date) > new Date(acc.Date) ? curr : acc;
        })
    }
}

export async function getCaloriesRemaining(UserID: string, Date: string, calorieGoal: number = -1): Promise<number> {
    // Get the total calories for the day
    let food = await getTrackedFood(Date, UserID);
    let totalCalories = 0;

    // If there is no food logged for the day, return the calorie goal
    if (food.length != 0) {
        totalCalories = food.reduce((acc: any, curr: any) => {
            return acc + curr.CaloriesInMeal;
        }, 0);
    }

    // If no calorie goal is passed in, get the latest calorie goal using the api call,
    // otherwise use the passed in calorie goal
    if (calorieGoal == -1) {
        let currentCalorieGoal = await getLatestCalorieGoal(UserID);
        return Number((currentCalorieGoal - totalCalories).toFixed(2));

    } else {
        return Number((calorieGoal - totalCalories).toFixed(2));
    }


}

export async function getGeneralCalorieGoal(UserID: string) {
    let url: string = `http://${ip_address}:${port}/api/food/calorieTrack/General.${UserID}`;
    let response: AxiosResponse;
    try {
        const { token } = JSON.parse(
            (await AsyncStorage.getItem("user")) as string
        );
        response = await axios.get(url, {
            headers: {
                authorization: token,
            },
        });
    } catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            console.log("Error when getting calorie goal");
            console.log(error.response);
        } else {
            console.log("Default error handler" + error);
        }
        return error;
    }
    return response.data;
}

export async function addCalorieGoal(UserID:string,CalorieGoal:number,Date: string = currentDate){
    let url: string = `http://${ip_address}:${port}/api/food/calorieTrack/createCalorieLog`;

    let response: AxiosResponse;
    try {
        const { token } = JSON.parse(
            (await AsyncStorage.getItem("user")) as string
        );
        response = await axios.post(url, {
            CalorieGoal: CalorieGoal,
            UserID: UserID,
            Date: Date,
        }, {
            headers: {
                authorization: token,
            },
        });
    } catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            console.log("Error when inserting calorie goal");
            console.log(error.response);
        } else {
            console.log("Default error handler" + error);
        }
        return error;
    }
    // Return the response
    return response.data;

}

export async function updateCalorieGoal(UserID: string, CalorieGoal: number, Date: string = currentDate ) {
    // Get the latest calorie goal
    let currentCalorieGoal = await getLatestCalorieGoal(UserID);
    let url: string = `http://${ip_address}:${port}/api/food/calorieTrack/`;
    let inputData ={};

    // If the latest calorie goal is for the current date, update the calorie goal 
    // otherwise create a new calorie goal
    if (currentCalorieGoal.Date == currentDate) {
        url = url + "updateCalories";
        inputData ={
            CalorieGoal: CalorieGoal,
            id: currentCalorieGoal.id
        }
    }else{
        url = url + "createCalorieLog";
        
        inputData ={
            CalorieGoal: CalorieGoal,
            UserID: UserID,
            Date: Date,
        }
    }

    // Make the api call
    let response: AxiosResponse;
    try {
        const { token } = JSON.parse(
            (await AsyncStorage.getItem("user")) as string
        );
        response = await axios.post(url, inputData, {
            headers: {
                authorization: token,
            },
        });
    } catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            console.log("Error when inserting calorie goal");
            console.log(error.response);
        } else {
            console.log("Default error handler" + error);
        }
        return error;
    }
    // Return the response
    return response.data;

}

