import axios, { AxiosResponse, AxiosError } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const portENV = process.env["PORT"];
const ip_addressENV = process.env["IP_ADDRESS"];
// For testing purposes
// Update this with your own UrlService
let ip_address: string | undefined = ip_addressENV;
let port: string | undefined = portENV

export async function addTrackedFood(food: JSON) {
    let url: string = `http://${ip_address}:${port}/api/food/updateTrackedFood`;
    let response: AxiosResponse;
    try {
        const { token } = JSON.parse(
            (await AsyncStorage.getItem('user')) as string
        );
        response = await axios.post(url, {
            food: food,
        },{
            headers: {
                authorization: token
            }
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