import axios from 'axios';

interface NutritionixResponse {
  item_name: string;
  brand_name: string;
  item_id: string;
  nf_calories: number;
}

const nutritionixAPI = axios.create({
  baseURL: 'https://trackapi.nutritionix.com/v2/',
});

const instantSearch = async (query: string): Promise<NutritionixResponse[] | null> => {
  try {
    const response = await nutritionixAPI.get(`/search/${query}`, {
      params: {
        results: '0:10',
        fields: 'item_name,brand_name,item_id,nf_calories',
        appId: '[YOUR_APP_ID]',
        appKey: '[YOUR_APP_KEY]'
      }
    });
    return response.data.hits;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default instantSearch;
