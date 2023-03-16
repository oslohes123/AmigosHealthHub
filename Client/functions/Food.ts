import axios, {AxiosResponse, AxiosError} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const portENV = process.env["PORT"];
const ip_addressENV = process.env["IP_ADDRESS"];
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
