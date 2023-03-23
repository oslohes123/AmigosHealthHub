import AsyncStorage from '@react-native-async-storage/async-storage';

const serverURL = process.env.URL;
const currentDate = new Date().toISOString().split('T')[0];

// For testing purposes
// Update this with your own UrlService

export async function getTrackedFood(Date, userID) {
  const url = `${serverURL}/api/food/getTrackedFood/${Date}.${userID}`;
  let response;
  try {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user')),
    );
    response = await fetch(url, {
      headers: {
        authorization: token,
      },
    });
    if (!response.ok) {
      throw new Error('Response not OK');
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    return error;
  }
  const data = await response.json();
  return data;
}

export async function getSpecificTrackedFood(logID) {
  const url = `${serverURL}/api/food/getSpecificTrackedFood/${logID}`;
  let response;
  try {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user')),
    );
    response = await fetch(url, {
      method: 'GET',
      headers: {
        authorization: token,
      },
    });
    response = await response.json();
  } catch (error) {
    console.log('Error when getting specific tracked food');
    console.log(error);
    return error;
  }
  return response[0];
}

export async function addTrackedFood(input, userID) {
  const url = `${serverURL}/api/food/addTrackedFood`;
  let response;
  try {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user')),
    );
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        input,
        userID,
      }),
    });
  } catch (error) {
    console.log('Got an error from the server');
    console.log(error);
    return error;
  }
  return response.status;
}

export async function deleteTrackedFood(logID) {
  const url = `${serverURL}/api/food/deleteTrackedFood/`;
  let response;
  try {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user')),
    );
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({ logID }),
    });
    if (!response.ok) {
      throw new Error('Response not OK');
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    return error;
  }
  return response.status;
}

export async function updateTrackedFood(input) {
  const url = `${serverURL}/api/food/updateTrackedFood`;
  let response;
  try {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user')),
    );
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        Quantity: input.Quantity,
        LogID: input.LogID,
        Measure: input.Measure,
        Calories: input.Calories,
      }),
    });
  } catch (error) {
    console.log('Got an error from the server');
    console.log(error);
    return error;
  }
  return response.status;
}

export async function getFood(foodID) {
  const url = `${serverURL}/api/food/getFood/${foodID}`;
  let response;
  try {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user')),
    );
    response = await fetch(url, {
      method: 'GET',
      headers: {
        authorization: token,
      },
    });
    response = await response.json();
  } catch (error) {
    console.log('Got an error from the server');
    console.log(error);
    return error;
  }
  return response[0];
}

export async function getMultipleFood(foodIDs) {
  const url = `${serverURL}/api/food/getMultipleFood`;
  let response;
  try {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user')),
    );
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({ foodIDs }),
    });
    response = await response.json();
  } catch (error) {
    console.log('Got an error when getting multiple foods');
    console.log(error);
    return error;
  }
  return response;
}
// This function is used to sum the nutrients of the foods that are being tracked
function sumNutrients(data) {
  let protein = 0;
  let sugar = 0;
  let carbohydrates = 0;
  let fat = 0;
  let fiber = 0;

  for (let i = 0; i < data.length; i += 1) {
    const item = data[i];
    protein += parseFloat(item.Protein.toFixed(2)) * item.Quantity;
    sugar += parseFloat((item.Sugar * item.Quantity).toFixed(2));
    carbohydrates += parseFloat(item.Carbohydrate.toFixed(2)) * item.Quantity;
    fat += parseFloat(item.Fat.toFixed(2)) * item.Quantity;
    fiber += parseFloat(item.Fiber.toFixed(2)) * item.Quantity;
  }
  sugar = Number(sugar.toFixed(2));
  fat = Number(fat.toFixed(2));
  carbohydrates = Number(carbohydrates.toFixed(2));
  protein = Number(protein.toFixed(2));
  fiber = Number(fiber.toFixed(2));

  return {
    protein, sugar, carbohydrates, fat, fiber,
  };
}

// Helper function to merge the data from the food table and the tracked food table
function mergeTwoFoods(dataArray, quantityArray) {
  for (let i = 0; i < quantityArray.length; i += 1) {
    const currentFood = quantityArray[i];
    for (let j = 0; j < dataArray.length; j += 1) {
      const nutrientFood = dataArray[j];
      if (currentFood.FoodID === nutrientFood.FoodID) {
        // merge nutrient information
        currentFood.Calories = nutrientFood.Calories;
        currentFood.Carbohydrate = nutrientFood.Carbohydrate;
        currentFood.Fat = nutrientFood.Fat;
        currentFood.Fiber = nutrientFood.Fiber;
        currentFood.Protein = nutrientFood.Protein;
        currentFood.Sugar = nutrientFood.Sugar;
        break;
      }
    }
  }
  return quantityArray;
}

// This function is used to merge the data from the food table and the tracked food table
export async function getPieChartData(UserID, inputDate = currentDate) {
  const currentFood = await getTrackedFood(inputDate, UserID);
  if (currentFood.length === 0 || currentFood === undefined) {
    return [];
  }
  const foodIDs = currentFood.map((food) => food.FoodID);
  const foodsData = await getMultipleFood(foodIDs);
  const allFoodsData = mergeTwoFoods(foodsData, currentFood);
  const nutrientsData = sumNutrients(allFoodsData);
  const myColors = [
    'red',
    'blue',
    'green',
    'orange',
    'yellow',

  ];
  const output = Object.entries(nutrientsData).map(([name, amount], index) => ({
    name,
    amount,
    color: myColors[index],
    legendFontColor: 'black',
    legendFontSize: 12,
  }));
  return output;
}
