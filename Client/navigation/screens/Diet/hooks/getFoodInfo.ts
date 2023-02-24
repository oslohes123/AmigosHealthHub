import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import {SearchCriteria} from "../../../../constants.ts";

const port = process.env['PORT'];
const ip_address = process.env['IP_ADDRESS'];

export const useFoodSearch = (inputData:SearchCriteria) => {
    console.log(`port: ${port}`);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    console.log('In changeProfile');

    useEffect(() => {
        const fetchFoodItems = async () => {
            setIsLoading(true);
            setError(null);
            let result;
            try {
                const {token}= JSON.parse(await AsyncStorage.getItem('user') as string)
                const response = await axios.get(
                    `http://${ip_address}:${port}/edgefunctions/foodsearch/${inputData.code}.${inputData.value}`,{
                        headers :{
                            'authorization': `Bearer ${token}`
                        }
                    }
                );
                result = await response.json();
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
            return result;
        };

        if (inputData) {
            fetchFoodItems();
        } else {
            setFoodItems([]);
        }
    }, [inputData]);

    return { isLoading, foodItems, error };
};

export default useFoodSearch;


